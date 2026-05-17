import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { setTokens, getProjects, getTeamMembers, getOrgInfo } from '../github.js';

function loadTokens() {
  const tokens = [];
  let i = 1;
  while (env[`PAT_${i}`]) {
    tokens.push(env[`PAT_${i}`]);
    i++;
  }
  if (tokens.length === 0 && env.PAT) tokens.push(env.PAT);
  return tokens;
}

async function getCachedData(key, fetcher, ttlSec = 600) {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    return fetcher(); // Fallback to direct fetch if Redis isn't configured
  }

  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = env;

  try {
    // 1. Try to get data from Redis
    const cacheRes = await fetch(`${UPSTASH_REDIS_REST_URL}/get/${key}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    const cacheData = await cacheRes.json();
    
    // Upstash returns { result: "..." } where result is the JSON string we saved
    if (cacheData.result) {
      console.log(`[Cache Hit] ${key}`);
      return JSON.parse(cacheData.result);
    }
  } catch (err) {
    console.error(`[Redis GET Error] ${key}:`, err);
  }

  // 2. Cache Miss -> Fetch fresh data from GitHub API
  console.log(`[Cache Miss] Fetching fresh data for ${key}...`);
  const freshData = await fetcher();

  try {
    // 3. Save fresh data back to Redis with expiration timer (EX = seconds)
    await fetch(`${UPSTASH_REDIS_REST_URL}/set/${key}?EX=${ttlSec}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(freshData)
    });
    console.log(`[Cache Set] ${key} saved to Redis for ${ttlSec}s`);
  } catch (err) {
    console.error(`[Redis SET Error] ${key}:`, err);
  }

  return freshData;
}

export async function load() {
  setTokens(loadTokens());

  // Wrap all our calls in the Redis cache helper with a 10-minute (600s) timeout
  const [projectsResult, teamMembersResult, orgInfoResult] = await Promise.allSettled([
    getCachedData('github_projects', getProjects, 600),
    getCachedData('github_team', getTeamMembers, 600),
    getCachedData('github_org_info', getOrgInfo, 3600) // cache org info longer (1 hr)
  ]);

  const projects = projectsResult.status === 'fulfilled' ? projectsResult.value : [];
  const teamMembers = teamMembersResult.status === 'fulfilled' ? teamMembersResult.value : [];
  const orgInfo = orgInfoResult.status === 'fulfilled' ? orgInfoResult.value : {};

  return {
    projects,
    teamMembers,
    orgDescription: orgInfo.description || ''
  };
}

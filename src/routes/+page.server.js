import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { setTokens, getProjects, getTeamMembers, getOrgInfo } from '../github.js';

// Vercel ISR Configuration: Cache the page on the edge for 1 day
export const config = {
  isr: {
    expiration: 86400
  }
};

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

export async function load({ setHeaders }) {
  // Instruct browsers and regular CDNs to cache it aggressively too
  setHeaders({
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
  });

  setTokens(loadTokens());

  const [projectsResult, teamMembersResult, orgInfoResult] = await Promise.allSettled([
    getProjects(),
    getTeamMembers(),
    getOrgInfo()
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

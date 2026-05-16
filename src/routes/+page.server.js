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

export async function load() {
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

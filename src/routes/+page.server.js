import { env } from '$env/dynamic/private';

export async function load({ fetch }) {
  const backendUrl = env.BACKEND_URL || 'http://127.0.0.1:3000';
  const res = await fetch(`${backendUrl}/api/data`);
  
  if (!res.ok) {
    return { projects: [], teamMembers: [], orgDescription: '' };
  }
  
  const data = await res.json();
  
  return {
    projects: data.projects || [],
    teamMembers: data.team_members || [],
    orgDescription: data.org_description || ''
  };
}

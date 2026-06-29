export async function fetchGithubAPI(endpoint: string) {
  const token = process.env.PAT_1 || process.env.PAT_2 || process.env.PAT_3;
  
  if (!token) {
    console.warn("No GitHub token found in env.");
  }

  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText} (${endpoint})`);
  }

  return res.json();
}

export async function getOrgInfo() {
  try {
    return await fetchGithubAPI("/orgs/LowLevelLab");
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getProjects() {
  try {
    const repos = await fetchGithubAPI("/orgs/LowLevelLab/repos?type=public&sort=stargazers&per_page=10");
    return repos;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getTeamMembers() {
  try {
    return await fetchGithubAPI("/orgs/LowLevelLab/members?per_page=100");
  } catch (e) {
    console.error(e);
    return [];
  }
}

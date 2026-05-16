// Token pool — rotates across requests, never resets mid-session unless tokens change.
let _tokens = [];
let tokenIndex = 0;

export function setTokens(tokens) {
  // Don't reset the rotation if the same tokens are passed in again (e.g. on each load()).
  if (tokens.join('|') === _tokens.join('|')) return;
  _tokens = tokens;
  tokenIndex = 0;
}

function nextToken() {
  if (!_tokens.length) return null;
  const t = _tokens[tokenIndex % _tokens.length];
  tokenIndex = (tokenIndex + 1) % _tokens.length;
  return t;
}

// No caching for data freshness

// Reads the GitHub error body and returns a useful message string.
async function githubErrorMessage(res) {
  try {
    const body = await res.clone().json();
    return body.message || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchGithub(endpoint) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `https://api.github.com${endpoint}`;

  const token = nextToken();
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const msg = await githubErrorMessage(res);
    throw new Error(`GitHub ${res.status}: ${msg}`);
  }

  const data = await res.json();
  return data;
}

export function getProjects() {
  return fetchGithub('/orgs/LowLevelLab/repos?type=public&sort=stargazers');
}

export function getOrgInfo() {
  return fetchGithub('/orgs/LowLevelLab');
}

export function getTeamMembers() {
  return fetchGithub('/orgs/LowLevelLab/members?per_page=100');
}

export function getContributors(url) {
  return fetchGithub(url);
}

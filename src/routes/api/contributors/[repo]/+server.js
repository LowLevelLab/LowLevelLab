import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function GET({ params, fetch }) {
  const backendUrl = env.BACKEND_URL || 'http://127.0.0.1:3000';
  const res = await fetch(`${backendUrl}/api/contributors/${params.repo}`);
  if (!res.ok) return json([]);
  let data = await res.json();
  return json(data);
}

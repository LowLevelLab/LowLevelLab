import { NextResponse } from "next/server";
import { fetchGithubAPI } from "@/lib/github";

export async function GET(_request: Request, { params }: { params: Promise<{ login: string }> }) {
  const { login } = await params;

  try {
    const user = await fetchGithubAPI(`/users/${login}`);
    return NextResponse.json({
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      location: user.location,
      public_repos: user.public_repos,
      followers: user.followers,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

import { Hero } from "@/components/hero";
import { WhatWeDo } from "@/components/what-we-do";
import { Projects } from "@/components/projects";
import { TeamMarquee } from "@/components/team-marquee";
import { Footer } from "@/components/footer";
import { getOrgInfo, getProjects, getTeamMembers } from "@/lib/github";

export default async function Home() {
  const [orgInfo, projects, members] = await Promise.all([
    getOrgInfo(),
    getProjects(),
    getTeamMembers(),
  ]);

  return (
    <>
      <Hero orgInfo={orgInfo} />
      <WhatWeDo />
      <TeamMarquee members={members} />
      <Projects projects={projects} />
      <Footer />
    </>
  );
}

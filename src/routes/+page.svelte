<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { Terminal, Code, Star, GitFork, User, X, Book, Mail } from "lucide-svelte";
  import logoImg from "../assets/lowlevellab.webp";

  let { data } = $props();

  let projects = $derived(data.projects);
  let teamMembers = $derived(data.teamMembers);
  let orgDescription = $derived(data.orgDescription);

  let selectedProject = $state(null);
  let projectContributors = $state([]);
  let loadingContributors = $state(false);

  function openProject(project) {
    selectedProject = project;
    loadingContributors = true;
    projectContributors = [];
    fetch(`/api/contributors/${project.name}`)
      .then((res) => res.json())
      .then((data) => {
        projectContributors = Array.isArray(data) ? data.slice(0, 15) : [];
      })
      .catch(console.error)
      .finally(() => {
        loadingContributors = false;
      });
  }

  function closeProject() {
    selectedProject = null;
    projectContributors = [];
  }
</script>

<div class="container">
  <header class="header">
    <div class="logo">
      <div class="logo-icon">
        <img
          src={logoImg}
          alt="Low Level Labs Logo"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </div>
      <span class="logo-text">LowLevelLabs</span>
    </div>
  </header>

  <main>
    <section class="glass-panel about-grid">
      <div class="terminal-icon">
        <Terminal size={48} color="var(--accent-cyan)" />
      </div>
      <div>
        <h2 class="section-title">LAB</h2>
        <p>{orgDescription}</p>
      </div>
    </section>

    <section class="glass-panel" style="margin-bottom: 3rem;">
      <h2 class="section-title">TEAM</h2>
        <div class="marquee-container">
          <div class="marquee-content">
            {#each teamMembers as member (member.id)}
              <a
                href={member.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="team-member-link"
                title={member.login}
              >
                <div class="team-member">
                  <img
                    src={member.avatar_url}
                    alt={member.login}
                    style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"
                  />
                </div>
                <span class="member-name">{member.login}</span>
              </a>
            {/each}
          </div>
          <div class="marquee-content" aria-hidden="true">
            {#each teamMembers as member (member.id + "-copy")}
              <a
                href={member.html_url}
                target="_blank"
                rel="noopener noreferrer"
                class="team-member-link"
                title={member.login}
              >
                <div class="team-member">
                  <img
                    src={member.avatar_url}
                    alt={member.login}
                    style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"
                  />
                </div>
                <span class="member-name">{member.login}</span>
              </a>
            {/each}
          </div>
        </div>
    </section>

    <section style="margin-bottom: 3rem;">
      <h2 class="section-title">PROJECTS</h2>
        <div class="projects-grid">
          {#each projects as project}
            <button
              class="glass-panel project-card"
              onclick={() => openProject(project)}
              transition:fade
            >
              <div class="project-header" style="width: 100%;">
                <h3 class="project-title">{project.name.toUpperCase()}</h3>
                <Code size={24} />
              </div>
              <div class="project-stats" style="width: 100%;">
                <span class="stat-item"
                  ><Star size={16} /> {project.stargazers_count}</span
                >
                <span class="stat-item"
                  ><GitFork size={16} /> {project.forks_count}</span
                >
              </div>
              <p
                style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary); width: 100%; text-align: left;"
              >
                {project.description || "No description available."}
              </p>
            </button>
          {/each}
        </div>
    </section>

    <section class="glass-panel" style="margin-bottom: 4rem;">
      <h2 class="section-title" style="justify-content: center; margin-bottom: 2rem;">
        CONTACT
      </h2>
      <div style="display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;">
        <a href="mailto:sharmamagi0@gmail.com" class="social-link">
          <Mail size={28} />
          <span>sharmamagi0@gmail.com</span>
        </a>
        <a href="https://github.com/LowLevelLab" target="_blank" rel="noopener noreferrer" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </section>
  </main>

  {#if selectedProject}
    <div
      class="modal-overlay"
      onclick={closeProject}
      transition:fade={{ duration: 200 }}
      role="button"
      tabindex="0"
      onkeypress={(e) => e.key === "Enter" && closeProject()}
    >
      <div
        class="glass-panel modal-content"
        onclick={(e) => e.stopPropagation()}
        transition:fly={{ y: 50, duration: 300 }}
        role="presentation"
      >
        <button class="close-btn" onclick={closeProject}>
          <X size={24} />
        </button>

        <div class="modal-body">
          <h2 style="color: var(--text-primary);">PROJECT:</h2>
          <h2 style="margin-bottom: 2rem;">
            {selectedProject.name.toUpperCase()}
          </h2>

          <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">ABOUT:</h3>
          <p class="modal-description">
            {selectedProject.description || "No description available."}
          </p>

          <h3 style="font-size: 1rem; margin-bottom: 1rem;">CONTRIBUTORS:</h3>
          {#if loadingContributors}
            <p
              style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 2rem;"
            >
              Loading...
            </p>
          {:else if projectContributors.length >= 5}
            <div
              class="marquee-container"
              style="margin-bottom: 2rem; padding: 0.5rem 0;"
            >
              <div class="marquee-content">
                {#each projectContributors as contributor}
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contributor-link"
                    title={contributor.login}
                  >
                    <img src={contributor.avatar_url} alt={contributor.login} />
                    <span class="member-name">{contributor.login}</span>
                  </a>
                {/each}
              </div>
              <div class="marquee-content" aria-hidden="true">
                {#each projectContributors as contributor}
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contributor-link"
                    title={contributor.login}
                  >
                    <img src={contributor.avatar_url} alt={contributor.login} />
                    <span class="member-name">{contributor.login}</span>
                  </a>
                {/each}
              </div>
            </div>
          {:else}
            <div
              style="display: flex; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap;"
            >
              {#each projectContributors as contributor}
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contributor-link"
                  title={contributor.login}
                >
                  <img src={contributor.avatar_url} alt={contributor.login} />
                  <span class="member-name">{contributor.login}</span>
                </a>
              {/each}
              {#if projectContributors.length === 0}
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                  No contributors found.
                </p>
              {/if}
            </div>
          {/if}

          <h3 style="font-size: 1rem; margin-bottom: 1rem;">CODE:</h3>
          <a
            href={selectedProject.html_url}
            target="_blank"
            rel="noopener noreferrer"
            class="github-link"
          >
            <Code size={20} /> View on Github
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

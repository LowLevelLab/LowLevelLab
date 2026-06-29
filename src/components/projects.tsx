"use client";

import { motion, AnimatePresence, useAnimation } from "motion/react";
import { useState, useCallback, useEffect } from "react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  topics?: string[];
  open_issues_count?: number;
  created_at?: string;
  updated_at?: string;
}

// GitHub repo icon (octicon)
function RepoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
    </svg>
  );
}

// GitHub logo
function GitHubLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

// Language color mapping
const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#f34b7d",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Zig: "#ec915c",
};

export function Projects({ projects }: { projects: Repo[] }) {
  const repos = (projects || []).filter((r) => !r.fork);
  const [selected, setSelected] = useState<Repo | null>(null);
  const controls = useAnimation();

  // Set default state to visible (no entry animations when scrolling)
  useEffect(() => {
    controls.set("visible");
  }, [controls]);

  // Trigger cascade animation ONLY when clicking navigation buttons
  useEffect(() => {
    const handleScrollEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.sectionId === "projects") {
        controls.set("hidden");
        // Delay slightly for smooth coordination with the scroll
        setTimeout(() => {
          controls.start("visible");
        }, 250);
      }
    };
    window.addEventListener("btn-click-scroll", handleScrollEvent);
    return () => window.removeEventListener("btn-click-scroll", handleScrollEvent);
  }, [controls]);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  if (repos.length === 0) return null;

  const h2Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
  };

  const pVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05, ease: "easeOut" as any } }
  };

  const containerVariants = {
    visible: { transition: { staggerChildren: 0.05 } },
    hidden: {},
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1] as any,
      },
    },
  };

  return (
    <>
      <section id="projects" className="relative py-32 overflow-hidden">
        <div className="px-8 max-w-[1400px] mx-auto mb-16">
          <motion.h2
            animate={controls}
            variants={h2Variants}
            initial="visible"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight animate-none"
          >
            Projects
          </motion.h2>
          <motion.p
            animate={controls}
            variants={pVariants}
            initial="visible"
            className="mt-3 text-neutral-500 text-lg font-light max-w-md animate-none"
          >
            Open-source tools and experiments from the collective.
          </motion.p>
        </div>

        <div className="px-8 max-w-[1400px] mx-auto">
          <motion.div
            animate={controls}
            initial="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {repos.map((repo) => (
              <motion.button
                key={repo.id}
                onClick={() => setSelected(repo)}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between gap-4 p-6 border border-neutral-800 hover:border-neutral-500 bg-neutral-950 transition-all duration-300 cursor-pointer text-left"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <RepoIcon className="text-neutral-500 group-hover:text-neutral-300 transition-colors flex-shrink-0" />
                    <h3 className="text-[15px] font-semibold text-white tracking-tight truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <p className="text-[13px] text-neutral-400 font-light leading-relaxed line-clamp-2">
                    {repo.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-neutral-800/50">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-[12px] text-neutral-500">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            langColors[repo.language] || "#6e7681",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[12px] text-neutral-500">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </svg>
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-neutral-500">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                    </svg>
                    {repo.forks_count || 0}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as any }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 z-10"
            >
              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Repo icon + name */}
              <div className="flex items-center gap-3 mb-5">
                <RepoIcon className="text-neutral-400 flex-shrink-0" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selected.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[14px] text-neutral-400 font-light leading-relaxed mb-6">
                {selected.description || "No description provided."}
              </p>

              {/* Topics */}
              {selected.topics && selected.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-[11px] px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats row */}
              <div className="flex items-center gap-6 py-5 border-y border-neutral-800">
                {selected.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          langColors[selected.language] || "#6e7681",
                      }}
                    />
                    <span className="text-[13px] text-neutral-300">
                      {selected.language}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-amber-500"
                  >
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                  </svg>
                  <span className="text-[13px] text-neutral-300">
                    {selected.stargazers_count} stars
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-neutral-400"
                  >
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                  </svg>
                  <span className="text-[13px] text-neutral-300">
                    {selected.forks_count || 0} forks
                  </span>
                </div>
              </div>

              {/* GitHub link */}
              <a
                href={selected.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 bg-white text-black px-6 py-2.5 text-[14px] font-medium hover:bg-neutral-200 transition-colors"
              >
                <GitHubLogo />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

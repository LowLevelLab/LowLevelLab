"use client";

import { AnimatePresence, motion, useAnimation, type Variants } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Member {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface UserDetails {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  public_repos: number;
  followers: number;
}

export function TeamMarquee({ members }: { members: Member[] }) {
  const [selected, setSelected] = useState<Member | null>(null);
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.set("visible");
  }, [controls]);

  useEffect(() => {
    const handleScrollEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.sectionId === "team") {
        controls.set("hidden");

        setTimeout(() => {
          controls.start("visible");
        }, 250);
      }
    };
    window.addEventListener("btn-click-scroll", handleScrollEvent);
    return () => window.removeEventListener("btn-click-scroll", handleScrollEvent);
  }, [controls]);

  const openProfile = useCallback(async (member: Member) => {
    setSelected(member);
    setDetails(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/github/user/${member.login}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setDetails(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    setDetails(null);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  if (!members || members.length === 0) return null;

  const h2Variants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const pVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.05, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    visible: { transition: { staggerChildren: 0.04 } },
    hidden: {},
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <>
      <section id="team" className="relative py-24 overflow-hidden">
        <div className="px-8 max-w-[1400px] mx-auto mb-16">
          <motion.h2
            animate={controls}
            variants={h2Variants}
            initial="visible"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight animate-none"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            animate={controls}
            variants={pVariants}
            initial="visible"
            className="mt-3 text-neutral-500 text-lg font-light max-w-md animate-none"
          >
            The people behind the code.
          </motion.p>
        </div>

        <div className="px-8 max-w-[1400px] mx-auto">
          <motion.div
            animate={controls}
            initial="visible"
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
          >
            {members.map((member) => {
              const roleMap: Record<string, string> = {
                magi8101: "Founder & Head",
                "vattsa-11": "Co-founder",
                sharveswar007: "CTO",
                "hemagiri-rs": "Sr. Developer",
                mathan527: "Developer",
                ajith200215: "Creative",
              };
              const role = roleMap[member.login.toLowerCase()] || "Developer";

              return (
                <motion.button
                  key={member.id}
                  onClick={() => openProfile(member)}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col items-center gap-3 p-5 border border-neutral-800 hover:border-neutral-500 bg-neutral-950 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-700 group-hover:border-neutral-400 transition-colors">
                    <Image
                      src={member.avatar_url}
                      alt={member.login}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <span className="text-[13px] text-neutral-300 group-hover:text-white transition-colors font-medium text-center truncate w-full">
                      {member.login}
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-1 uppercase tracking-wider text-center truncate w-full group-hover:text-neutral-400 transition-colors">
                      {role}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-neutral-950 border border-neutral-800 p-8 z-10"
            >
              <button
                type="button"
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

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-700 mb-5">
                  <Image
                    src={selected.avatar_url}
                    alt={selected.login}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {loading ? selected.login : details?.name || selected.login}
                </h3>
                {details?.name && (
                  <p className="text-[13px] text-neutral-500 mt-0.5">@{details.login}</p>
                )}

                <div className="mt-4 min-h-[2.5rem]">
                  {loading ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse [animation-delay:0.3s]" />
                    </div>
                  ) : (
                    <p className="text-[14px] text-neutral-400 font-light leading-relaxed">
                      {details?.bio || "No bio yet."}
                    </p>
                  )}
                </div>

                {/* Stats */}
                {details && !loading && (
                  <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-neutral-800 w-full">
                    <div className="flex flex-col items-center">
                      <span className="text-[15px] font-semibold text-white">
                        {details.public_repos}
                      </span>
                      <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                        Repos
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[15px] font-semibold text-white">
                        {details.followers}
                      </span>
                      <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                        Followers
                      </span>
                    </div>
                    {details.location && (
                      <div className="flex flex-col items-center">
                        <span className="text-[13px] text-white truncate max-w-[100px]">
                          {details.location}
                        </span>
                        <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                          Location
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <a
                  href={selected.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2.5 bg-white text-black px-6 py-2.5 text-[14px] font-medium hover:bg-neutral-200 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

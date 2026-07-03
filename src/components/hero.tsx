"use client";

import { animate, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface OrgInfo {
  name?: string;
  description?: string;
}

export function Hero({ orgInfo }: { orgInfo: OrgInfo | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  const handleMeetTeamClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = "team";
    const element = document.getElementById(id);
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.scrollY - 70;
      const startY = window.scrollY;

      window.dispatchEvent(new CustomEvent("btn-click-scroll", { detail: { sectionId: id } }));

      animate(startY, targetY, {
        type: "spring",
        stiffness: 65,
        damping: 16,
        mass: 0.8,
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden matrix-bg"
    >
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.95] tracking-tighter select-none"
        >
          Low Level Labs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 text-neutral-400 text-lg md:text-xl max-w-lg font-light leading-relaxed"
        >
          {orgInfo?.description ||
            "Open-source collective building compilers, allocators, and bare-metal infrastructure."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex gap-4"
        >
          <button
            type="button"
            onClick={handleMeetTeamClick}
            className="bg-white text-black px-6 py-3 text-[15px] font-medium hover:bg-neutral-200 transition-colors"
          >
            Meet the Team
          </button>
          <a
            href="https://github.com/LowLevelLab"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neutral-700 text-white px-6 py-3 text-[15px] font-light hover:border-neutral-400 transition-colors"
          >
            View on GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

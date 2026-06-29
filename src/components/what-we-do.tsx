"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const PHRASES = [
  { id: "systems", text: "high-performance systems," },
  { id: "gpu", text: "scale GPU computing," },
  { id: "fullstack", text: "architect full stack platforms," },
  { id: "ai", text: "and advance AI/ML." },
];

export function WhatWeDo() {
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-28 md:py-44 overflow-hidden bg-black border-t border-neutral-900 flex flex-col items-center justify-center">

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-25"
        style={{
          background: hoveredId
            ? `radial-gradient(circle 500px at 50% 50%, rgba(16, 185, 129, 0.15), transparent 80%)`
            : "none"
        }}
      />

      <div className="px-6 md:px-8 max-w-[1100px] mx-auto text-center relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-center gap-3 text-neutral-500 uppercase tracking-widest text-[12px] font-mono font-medium"
        >
          <span className="w-8 h-[1px] bg-neutral-800" />
          <span>Capabilities</span>
          <span className="w-8 h-[1px] bg-neutral-800" />
        </motion.div>


        <div className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-display font-bold tracking-tight leading-[1.25] text-center select-none flex flex-wrap justify-center items-center gap-x-3 gap-y-2">

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className={`transition-all duration-300 text-white ${hoveredId ? "opacity-25 blur-[0.5px]" : "opacity-100"
              }`}
          >
            We engineer
          </motion.span>


          {PHRASES.map((phrase, idx) => {
            const isHovered = hoveredId === phrase.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <span key={phrase.id} className="inline-block">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  onMouseEnter={() => setHoveredId(phrase.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`inline-block cursor-pointer transition-all duration-300 transform origin-center ${isHovered
                      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 bg-clip-text text-transparent scale-[1.04]"
                      : isAnyHovered
                        ? "opacity-25 blur-[0.5px]"
                        : "text-white"
                    }`}
                >
                  {phrase.text}
                </motion.span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

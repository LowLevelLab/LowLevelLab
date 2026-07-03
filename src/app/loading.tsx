"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black matrix-bg overflow-hidden relative">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1, 0.98] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white font-bold text-3xl md:text-5xl tracking-tighter"
        >
          Low Level Labs
        </motion.div>
        <div className="flex gap-2">
          <motion.div
            animate={{ height: [8, 24, 8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            className="w-1.5 bg-neutral-600 rounded-full"
          />
          <motion.div
            animate={{ height: [8, 24, 8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            className="w-1.5 bg-neutral-400 rounded-full"
          />
          <motion.div
            animate={{ height: [8, 24, 8] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-1.5 bg-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black matrix-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        role="alert"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">System Fault Detected</h2>
        <p className="text-neutral-400 font-light leading-relaxed mb-8">
          We encountered an unexpected error while fetching the collective's data from GitHub. The
          API might be rate-limited or temporarily unavailable.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="bg-white text-black px-8 py-3 text-[15px] font-medium hover:bg-neutral-200 transition-colors"
        >
          Reboot System
        </button>
      </motion.div>
    </div>
  );
}

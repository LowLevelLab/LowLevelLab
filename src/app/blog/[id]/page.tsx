"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const POSTS: Record<string, { title: string; date: string; tag: string; content: string }> = {
  "1": {
    title: "Building a Custom Memory Allocator",
    date: "Jun 15, 2026",
    tag: "Systems",
    content: "Writing a custom memory allocator is a rite of passage for systems programmers. In this post, we explore the design of a lock-free slab allocator implemented in Rust. We dive into the unsafe boundaries, pointer arithmetic, and the performance characteristics compared to standard jemalloc.",
  },
  "2": {
    title: "eBPF Tracing for Fun and Profit",
    date: "Jun 01, 2026",
    tag: "Linux",
    content: "eBPF has revolutionized Linux observability. By hooking into tracepoints and kprobes, we can extract extremely granular metrics with near-zero overhead. Here is our approach to building a minimal BPF program that traces network socket states in real-time.",
  },
  "3": {
    title: "Demystifying the LLVM Backend",
    date: "May 20, 2026",
    tag: "Compilers",
    content: "LLVM is a beast. Lowering IR into machine code requires multiple passes of optimization, register allocation, and instruction selection. In this post, we break down the SelectionDAG and FastISel algorithms used to generate x86_64 assembly.",
  },
};

export default function BlogPost() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const post = POSTS[id] || {
    title: "Not Found",
    date: "",
    tag: "",
    content: "This post does not exist.",
  };

  return (
    <div className="max-w-[640px] mx-auto px-6 w-full pt-12 pb-24">
      <Link href="/blog" className="text-[13px] text-neutral-500 hover:text-white transition-colors mb-10 inline-block">
        ← Back
      </Link>

      <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="text-[13px] text-neutral-600 mb-3 tabular-nums">{post.date}</div>
        <h1 className="text-[32px] font-semibold tracking-tight mb-8 leading-tight">{post.title}</h1>
        <div className="text-[16px] text-neutral-400 leading-[1.75]">
          <p>{post.content}</p>
        </div>
      </motion.article>
    </div>
  );
}

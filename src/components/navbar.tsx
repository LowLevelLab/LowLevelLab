"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { animate } from "motion/react";

const links = [
  { href: "/#team", label: "Team", id: "team" },
  { href: "/#projects", label: "Projects", id: "projects" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

useEffect(() => {
  if (pathname !== "/") {
    setActiveSection("");
    return;
  }

  const setFromHash = () => {
    const hashId = window.location.hash.replace("#", "");
    if (hashId) setActiveSection(hashId);
  };

  setFromHash();
  window.addEventListener("hashchange", setFromHash);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: "-80px 0px -80% 0px" }
  );

  links.forEach(({ id }) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });

  return () => {
    window.removeEventListener("hashchange", setFromHash);
    observer.disconnect();
  };
}, [pathname]);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, targetId: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const targetY = element.getBoundingClientRect().top + window.scrollY - 70;
        const startY = window.scrollY;

        window.history.replaceState(null, "", href);
        setActiveSection(targetId);

        window.dispatchEvent(new CustomEvent("btn-click-scroll", { detail: { sectionId: targetId } }));

        animate(startY, targetY, {
          type: "spring",
          stiffness: 65,
          damping: 16,
          mass: 0.8,
          onUpdate: (latest) => window.scrollTo(0, latest),
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-8 max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="w-8 h-7" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label, id }) => {
            const active = activeSection === id;
            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleScrollClick(e, href, id)}
                className={`relative text-[15px] font-light tracking-wide transition-colors ${active ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
              >
                {label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="https://github.com/LowLevelLab"
            target="_blank"
            className="text-[15px] text-black bg-white px-4 py-1.5 font-medium hover:bg-neutral-200 transition-colors"
          >
            GitHub
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-neutral-800 px-8 py-5 flex flex-col gap-4">
          {links.map(({ href, label, id }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => {
                setOpen(false);
                handleScrollClick(e, href, id);
              }}
              className="text-[15px] text-neutral-400 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

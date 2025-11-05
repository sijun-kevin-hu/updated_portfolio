"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useIntro } from "./IntroContext";
import { ThemeToggle } from "./ThemeToggle";
import { SocialLinks } from "./SocialLinks";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { introCompleted } = useIntro();

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: introCompleted ? 1 : 0,
        y: introCompleted ? 0 : -20
      }}
      transition={{ duration: 0.6, delay: introCompleted ? 0.3 : 0 }}
      style={{ pointerEvents: introCompleted ? "auto" : "none" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-neutral-900/60 backdrop-blur py-2 pl-3 pr-2 shadow-sm">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Kevin Hu
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:opacity-80">Home</Link>
            <Link href="/projects" className="hover:opacity-80">Projects</Link>
            <Link href="/about" className="hover:opacity-80">About</Link>
            <Link href="/socials" className="hover:opacity-80">Socials</Link>
            <SocialLinks />
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              className="rounded-md border px-3 py-2 text-sm"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur p-4 space-y-3">
          <Link href="/" onClick={() => setOpen(false)} className="block">Home</Link>
          <Link href="/projects" onClick={() => setOpen(false)} className="block">Projects</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block">About</Link>
          <Link href="/socials" onClick={() => setOpen(false)} className="block">Socials</Link>
          <SocialLinks className="pt-2" />
        </div>
      )}
    </motion.header>
  );
}



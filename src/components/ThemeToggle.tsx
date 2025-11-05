"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-3 py-2 text-sm font-medium shadow-sm hover:bg-white/80 dark:hover:bg-neutral-900/80 transition-colors"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}



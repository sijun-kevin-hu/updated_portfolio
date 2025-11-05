import { useRef, useState, useEffect } from "react";
import { INTRO_CONFIG } from "../constants";

type UseScrollProgressOptions = {
  onComplete: () => void;
  enabled?: boolean;
};

export function useScrollProgress(containerRef: React.RefObject<HTMLElement>, options: UseScrollProgressOptions) {
  const { onComplete, enabled = true } = options;
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasCompletedRef = useRef(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const calculateProgress = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const scrollY = window.scrollY;
      const containerHeight = containerRef.current.offsetHeight;

      const relativeScroll = Math.max(0, scrollY - containerTop);
      const progress = Math.min(Math.max(0, relativeScroll / containerHeight), 1);

      // Only update if progress changed significantly
      if (Math.abs(progress - lastScrollRef.current) > 0.01) {
        lastScrollRef.current = progress;
        setScrollProgress(progress);

        // Check completion
        if (progress >= INTRO_CONFIG.COMPLETION_THRESHOLD && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }
    };

    let rafId: number;
    const update = () => {
      calculateProgress();
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    window.addEventListener("scroll", calculateProgress, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", calculateProgress);
    };
  }, [containerRef, onComplete, enabled]);

  return { scrollProgress };
}


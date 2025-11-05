"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: ReactNode;
  enabled?: boolean;
};

export function LenisProvider({ children, enabled = true }: LenisProviderProps) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 2),
      syncTouch: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}



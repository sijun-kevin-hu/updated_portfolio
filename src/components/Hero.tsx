"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import { CinematicScene } from "./CinematicScene";

// Subtle floating text component
function FloatingText({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const y = useTransform(scrollProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollProgress, [0, 0.6, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      style={{ y, opacity, scale }}
    >
      <div className="text-center px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/90 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <span className="block">Kevin Hu</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-4 text-sm sm:text-base md:text-lg text-white/70 font-light tracking-wide"
        >
          Engineering extraordinary experiences
        </motion.p>
      </div>
    </motion.div>
  );
}

// Subtle scroll indicator
function ScrollIndicator({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.8, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      style={{ opacity }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start start", "end start"] 
  });

  // Less aggressive spring for performance
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 50, 
    damping: 25 
  });

  return (
    <section 
      ref={ref} 
      className="relative min-h-[120vh] w-full overflow-hidden bg-black"
    >
      {/* 3D Scene - Full viewport */}
      <div className="absolute inset-0 z-0">
        <CinematicScene scrollProgress={smoothProgress} />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Subtle floating text */}
      <FloatingText scrollProgress={smoothProgress} />

      {/* Scroll indicator */}
      <ScrollIndicator scrollProgress={smoothProgress} />
    </section>
  );
}

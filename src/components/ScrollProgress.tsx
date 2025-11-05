"use client";

import { motion, useScroll } from "framer-motion";
import { useIntro } from "./IntroContext";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { introCompleted } = useIntro();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-900 to-neutral-400 dark:from-neutral-100 dark:to-neutral-500 z-[60]"
      style={{ 
        scaleX: scrollYProgress, 
        transformOrigin: "0% 50%",
        opacity: introCompleted ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    />
  );
}



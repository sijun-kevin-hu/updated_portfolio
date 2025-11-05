"use client";

import { motion } from "framer-motion";

export function AnimatedHeading({ children }: { children: string }) {
  return (
    <motion.h3
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="text-2xl sm:text-3xl font-semibold tracking-tight"
    >
      {children}
    </motion.h3>
  );
}



"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

type StorySectionProps = {
  id: string;
  heading: string;
  copy: string;
  imageUrl?: string;
  reverse?: boolean;
};

export function StorySection({ id, heading, copy, imageUrl = "/images/placeholder-1.jpg", reverse = false }: StorySectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  
  // Smooth spring for better feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Text animations
  const textY = useTransform(smoothProgress, [0, 0.5, 1], [50, 0, -30]);
  const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const textScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  // Image animations (different parallax speed)
  const imageY = useTransform(smoothProgress, [0, 1], [40, -40]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const imageScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1.1, 1, 1, 0.9]);
  const imageRotate = useTransform(smoothProgress, [0, 1], reverse ? [-2, 2] : [2, -2]);

  // Background blur effect
  const blurAmount = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [8, 0, 0, 8]);
  const blurFilter = useTransform(blurAmount, (b) => `blur(${b}px)`);

  return (
    <section id={id} className="relative min-h-[100svh]">
      <div ref={ref} className="sticky top-20 sm:top-24 py-20">
        <motion.div
          style={{ filter: blurFilter }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/50 to-transparent dark:via-neutral-900/50 pointer-events-none"
        />
        
        <div className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
          <motion.div
            style={{
              y: textY,
              opacity: textOpacity,
              scale: textScale,
            }}
            className="space-y-4"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            >
              {heading.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed"
            >
              {copy}
            </motion.p>
          </motion.div>
          
          <motion.div
            style={{
              y: imageY,
              opacity: imageOpacity,
              scale: imageScale,
              rotate: imageRotate,
            }}
            className="relative rounded-2xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100 dark:bg-neutral-900 aspect-[4/3] shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              style={{ opacity: imageOpacity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}



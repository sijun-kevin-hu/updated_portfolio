"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useIntro } from "@/components/IntroContext";
import { IntroSequence } from "@/components/intro";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import Link from "next/link";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { introCompleted, setIntroCompleted } = useIntro();

  const handleIntroComplete = () => {
    setIntroCompleted(true);
  };

  return (
    <main className="relative">
      {/* Cinematic Intro Sequence */}
      <IntroSequence onComplete={handleIntroComplete} contentRef={contentRef} />

      {/* Main Content - Hidden until intro completes */}
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, visibility: "hidden" as const }}
        animate={{ 
          opacity: introCompleted ? 1 : 0,
          visibility: introCompleted ? "visible" as const : "hidden" as const
        }}
        transition={{ duration: 0.8 }}
        className="relative"
        style={{ pointerEvents: introCompleted ? "auto" : "none" }}
      >
        <Hero />

        <StorySection
          id="story-1"
          heading="Mobile-first by design"
          copy="Layouts scale gracefully from small screens upward, with sticky sections and scroll-driven reveals that stay smooth at 60fps on modern devices."
          imageUrl="/images/placeholder-1.jpg"
        />
        <StorySection
          id="story-2"
          heading="Buttery animations"
          copy="Careful easing, subtle parallax, and micro-interactions add delight without sacrificing performance or accessibility."
          imageUrl="/images/placeholder-2.jpg"
          reverse
        />

        <Section id="projects" className="pt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Highlighted Projects</h2>
            <Link href="/projects" className="text-sm underline underline-offset-4">View all</Link>
          </div>
          <div className="mt-8">
            <ProjectGrid limit={3} />
          </div>
        </Section>
      </motion.div>
    </main>
  );
}

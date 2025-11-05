"use client";

import { useRef } from "react";
import { IntroScene } from "./IntroScene";
import { IntroOverlay } from "./IntroOverlay";
import { useScrollProgress } from "./hooks/useScrollProgress";

type IntroSequenceProps = {
  onComplete: () => void;
  contentRef: React.RefObject<HTMLElement>;
};

export function IntroSequence({ onComplete, contentRef }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollProgress } = useScrollProgress(containerRef, { onComplete });

  const handleSkip = () => {
    if (contentRef.current) {
      const contentTop = contentRef.current.offsetTop;
      window.scrollTo({ top: contentTop, behavior: "smooth" });
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <IntroScene />
        <IntroOverlay onSkip={handleSkip} scrollProgress={scrollProgress} />
      </div>
    </div>
  );
}


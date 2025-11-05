"use client";

import { SkipButton } from "./SkipButton";
import { ScrollCue } from "./ScrollCue";
import { ProgressBar } from "./ProgressBar";
import { INTRO_CONFIG } from "./constants";

type IntroOverlayProps = {
  onSkip: () => void;
  scrollProgress: number;
};

export function IntroOverlay({ onSkip, scrollProgress }: IntroOverlayProps) {
  const showSkip = scrollProgress < INTRO_CONFIG.COMPLETION_THRESHOLD;
  const showScrollCue = scrollProgress < INTRO_CONFIG.SCROLL_CUE_THRESHOLD;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <SkipButton onSkip={onSkip} show={showSkip} />
      <ScrollCue show={showScrollCue} />
      <ProgressBar progress={scrollProgress} show={showSkip} />
    </div>
  );
}


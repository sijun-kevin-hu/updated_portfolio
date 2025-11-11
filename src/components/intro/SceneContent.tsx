import { memo } from "react";
import { useScroll } from "@react-three/drei";
import { AnimatedScene } from "./AnimatedScene";

type SceneContentProps = {
  isMobile: boolean;
};

export const SceneContent = memo(function SceneContent({ isMobile }: SceneContentProps) {
  const scroll = useScroll();
  const scrollProgress = scroll.offset;

  return <AnimatedScene scrollProgress={scrollProgress} isMobile={isMobile} />;
});


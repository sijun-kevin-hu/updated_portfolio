import { useScroll } from "@react-three/drei";
import { SceneLights } from "./SceneLights";
import { Stars } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { Earth } from "./Earth";
import { ScrollCamera } from "./ScrollCamera";
import { STARS_CONFIG } from "./constants";

type SceneContentProps = {
  isMobile: boolean;
};

export function SceneContent({ isMobile }: SceneContentProps) {
  const scroll = useScroll();
  const scrollProgress = scroll.offset;
  const starCount = isMobile ? STARS_CONFIG.MOBILE_COUNT : STARS_CONFIG.DESKTOP_COUNT;

  return (
    <>
      <SceneLights />
      
      <Stars 
        radius={STARS_CONFIG.RADIUS} 
        depth={STARS_CONFIG.DEPTH} 
        count={starCount} 
        factor={STARS_CONFIG.FACTOR} 
        fade 
        speed={STARS_CONFIG.SPEED} 
      />
      
      <ParticleField scrollProgress={scrollProgress} isMobile={isMobile} />
      <Earth scrollProgress={scrollProgress} isMobile={isMobile} />
      <ScrollCamera scrollProgress={scrollProgress} />
    </>
  );
}


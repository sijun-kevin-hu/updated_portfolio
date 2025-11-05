import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Mesh } from "three";
import { EarthMaterial } from "./EarthMaterial";
import { EARTH_CONFIG } from "./constants";

type EarthProps = {
  scrollProgress: number;
  isMobile: boolean;
};

export function Earth({ scrollProgress, isMobile }: EarthProps) {
  const earthRef = useRef<Mesh>(null);
  const scaleRef = useRef(1);

  useFrame(() => {
    if (earthRef.current) {
      // Continuous rotation
      earthRef.current.rotation.y += EARTH_CONFIG.ROTATION_SPEED;
      
      // Scroll-based scale
      const newScale = 1 + scrollProgress * EARTH_CONFIG.SCALE_MULTIPLIER;
      if (Math.abs(newScale - scaleRef.current) > 0.01) {
        scaleRef.current = newScale;
        earthRef.current.scale.set(newScale, newScale, newScale);
      }
    }
  });

  const segments = isMobile ? EARTH_CONFIG.MOBILE_SEGMENTS : EARTH_CONFIG.DESKTOP_SEGMENTS;

  return (
    <Sphere ref={earthRef} args={[EARTH_CONFIG.RADIUS, segments, segments]}>
      <EarthMaterial scrollProgress={scrollProgress} />
    </Sphere>
  );
}


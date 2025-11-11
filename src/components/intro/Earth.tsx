import { useRef, useMemo } from "react";
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
  const rotationRef = useRef(0);
  const lastProgressRef = useRef(-1);

  // Memoize segments calculation
  const segments = useMemo(() => isMobile ? 24 : 32, [isMobile]);

  useFrame((state, delta) => {
    if (!earthRef.current) return;
    
    // Smooth continuous rotation (always update)
    rotationRef.current += delta * 0.05;
    earthRef.current.rotation.y = rotationRef.current;
    earthRef.current.rotation.x = 0.15;
    
    // Only update scale if scroll progress changed significantly
    if (Math.abs(scrollProgress - lastProgressRef.current) > 0.01) {
      const easedProgress = scrollProgress * scrollProgress * (3.0 - 2.0 * scrollProgress);
      const targetScale = 1 + easedProgress * EARTH_CONFIG.SCALE_MULTIPLIER;
      scaleRef.current += (targetScale - scaleRef.current) * 0.15;
      earthRef.current.scale.setScalar(scaleRef.current);
      lastProgressRef.current = scrollProgress;
    }
  });

  return (
    <Sphere ref={earthRef} args={[EARTH_CONFIG.RADIUS, segments, segments]}>
      <EarthMaterial scrollProgress={scrollProgress} />
    </Sphere>
  );
}


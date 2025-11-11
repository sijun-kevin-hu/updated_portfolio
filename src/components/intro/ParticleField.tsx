import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PARTICLE_CONFIG } from "./constants";

type ParticleFieldProps = {
  scrollProgress: number;
  isMobile: boolean;
};

export function ParticleField({ scrollProgress, isMobile }: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const lastProgressRef = useRef(-1);
  
  const count = useMemo(() => 
    isMobile ? PARTICLE_CONFIG.MOBILE_COUNT : PARTICLE_CONFIG.DESKTOP_COUNT,
    [isMobile]
  );
  const size = useMemo(() => 
    isMobile ? PARTICLE_CONFIG.MOBILE_SIZE : PARTICLE_CONFIG.DESKTOP_SIZE,
    [isMobile]
  );

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD;
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (particlesRef.current) {
      // Only update if scroll progress changed significantly
      if (Math.abs(scrollProgress - lastProgressRef.current) > 0.01) {
        particlesRef.current.rotation.y = scrollProgress * PARTICLE_CONFIG.ROTATION_Y;
        particlesRef.current.rotation.x = scrollProgress * PARTICLE_CONFIG.ROTATION_X;
        // Access material through points object
        const material = particlesRef.current.material as THREE.PointsMaterial;
        if (material) {
          material.opacity = PARTICLE_CONFIG.BASE_OPACITY + scrollProgress * PARTICLE_CONFIG.OPACITY_MULTIPLIER;
        }
        lastProgressRef.current = scrollProgress;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color="#ffffff"
        transparent
        opacity={PARTICLE_CONFIG.BASE_OPACITY}
        sizeAttenuation
      />
    </points>
  );
}


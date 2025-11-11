import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SceneLights } from "./SceneLights";
import { Stars } from "@react-three/drei";
import { PARTICLE_CONFIG, EARTH_CONFIG, CAMERA_CONFIG, STARS_CONFIG } from "./constants";
import { EarthMaterial } from "./EarthMaterial";
import { Sphere } from "@react-three/drei";
import { Mesh } from "three";

type AnimatedSceneProps = {
  scrollProgress: number;
  isMobile: boolean;
};

export function AnimatedScene({ scrollProgress, isMobile }: AnimatedSceneProps) {
  const { camera } = useThree();
  
  // Earth refs
  const earthRef = useRef<Mesh>(null);
  const earthScaleRef = useRef(1);
  const earthRotationRef = useRef(0);
  const lastEarthProgressRef = useRef(-1);
  
  // Particles refs
  const particlesRef = useRef<THREE.Points>(null);
  const lastParticleProgressRef = useRef(-1);
  
  // Camera refs
  const lastCameraProgressRef = useRef(-1);
  const easedProgressRef = useRef(0);
  
  // Frame skipping for performance
  const frameCountRef = useRef(0);
  const FRAME_SKIP = isMobile ? 2 : 1; // Skip every other frame on mobile
  
  // Particle setup
  const particleCount = isMobile ? PARTICLE_CONFIG.MOBILE_COUNT : PARTICLE_CONFIG.DESKTOP_COUNT;
  const particleSize = isMobile ? PARTICLE_CONFIG.MOBILE_SIZE : PARTICLE_CONFIG.DESKTOP_SIZE;
  const starCount = isMobile ? STARS_CONFIG.MOBILE_COUNT : STARS_CONFIG.DESKTOP_COUNT;
  const earthSegments = isMobile ? EARTH_CONFIG.MOBILE_SEGMENTS : EARTH_CONFIG.DESKTOP_SEGMENTS;
  
  // Particle positions (memoized in component that creates geometry)
  const particlePositions = useRef<Float32Array | null>(null);
  if (!particlePositions.current) {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD;
    }
    particlePositions.current = positions;
  }

  useFrame((state, delta) => {
    // Update Earth rotation (always smooth, no throttling)
    if (earthRef.current) {
      earthRotationRef.current += delta * 0.05;
      earthRef.current.rotation.y = earthRotationRef.current;
      earthRef.current.rotation.x = 0.15;
      
      // Only update scale if scroll changed significantly
      if (Math.abs(scrollProgress - lastEarthProgressRef.current) > 0.02) {
        const easedProgress = scrollProgress * scrollProgress * (3.0 - 2.0 * scrollProgress);
        const targetScale = 1 + easedProgress * EARTH_CONFIG.SCALE_MULTIPLIER;
        earthScaleRef.current += (targetScale - earthScaleRef.current) * 0.15;
        earthRef.current.scale.setScalar(earthScaleRef.current);
        lastEarthProgressRef.current = scrollProgress;
      }
    }
    
    // Throttle scroll-based updates (only update every Nth frame on mobile)
    frameCountRef.current++;
    const shouldUpdate = frameCountRef.current % FRAME_SKIP === 0;
    
    // Update particles (only if scroll changed and frame allows)
    if (shouldUpdate && particlesRef.current && Math.abs(scrollProgress - lastParticleProgressRef.current) > 0.02) {
      particlesRef.current.rotation.y = scrollProgress * PARTICLE_CONFIG.ROTATION_Y;
      particlesRef.current.rotation.x = scrollProgress * PARTICLE_CONFIG.ROTATION_X;
      const material = particlesRef.current.material as THREE.PointsMaterial;
      if (material) {
        material.opacity = PARTICLE_CONFIG.BASE_OPACITY + scrollProgress * PARTICLE_CONFIG.OPACITY_MULTIPLIER;
      }
      lastParticleProgressRef.current = scrollProgress;
    }
    
    // Update camera (only if scroll changed significantly and frame allows)
    if (shouldUpdate && Math.abs(scrollProgress - lastCameraProgressRef.current) > 0.01) {
      easedProgressRef.current = scrollProgress * scrollProgress * (3.0 - 2.0 * scrollProgress);
      const distance = CAMERA_CONFIG.INITIAL_DISTANCE + easedProgressRef.current * CAMERA_CONFIG.DISTANCE_MULTIPLIER;
      const angle = easedProgressRef.current * CAMERA_CONFIG.ANGLE_MULTIPLIER;
      const verticalOffset = Math.sin(easedProgressRef.current * Math.PI) * 0.5;
      
      camera.position.x = Math.sin(angle) * distance;
      camera.position.z = Math.cos(angle) * distance;
      camera.position.y = easedProgressRef.current * CAMERA_CONFIG.Y_POSITION_MULTIPLIER + verticalOffset;
      
      const lookAtOffset = easedProgressRef.current * 0.3;
      camera.lookAt(lookAtOffset, 0, 0);
      camera.updateProjectionMatrix();
      
      lastCameraProgressRef.current = scrollProgress;
    }
  });

  return (
    <>
      <SceneLights />
      
      {!isMobile && (
        <Stars 
          radius={STARS_CONFIG.RADIUS} 
          depth={STARS_CONFIG.DEPTH} 
          count={starCount} 
          factor={STARS_CONFIG.FACTOR} 
          fade 
          speed={STARS_CONFIG.SPEED} 
        />
      )}
      
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={particleSize}
          color="#ffffff"
          transparent
          opacity={PARTICLE_CONFIG.BASE_OPACITY}
          sizeAttenuation
        />
      </points>
      
      <Sphere ref={earthRef} args={[EARTH_CONFIG.RADIUS, earthSegments, earthSegments]}>
        <EarthMaterial scrollProgress={scrollProgress} />
      </Sphere>
    </>
  );
}


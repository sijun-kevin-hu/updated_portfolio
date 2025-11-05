"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sphere } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

// Simplified Earth component - no custom shader for performance
function Earth({ scrollProgress, isMobile }: { scrollProgress: MotionValue<number>; isMobile: boolean }) {
  const earthRef = useRef<Mesh>(null);
  const rotationRef = useRef(0);
  const scaleRef = useRef(1);
  const lastScroll = useRef(0);

  useFrame((state, delta) => {
    if (!earthRef.current) return;
    
    // Very slow continuous rotation - only update every few frames
    rotationRef.current += delta * 0.1;
    earthRef.current.rotation.y = rotationRef.current;
    
    // Scroll-based scale - only update when scroll changes significantly
    const scroll = scrollProgress.get();
    if (Math.abs(scroll - lastScroll.current) > 0.01) {
      lastScroll.current = scroll;
      const newScale = 1 + scroll * 0.3;
      if (Math.abs(newScale - scaleRef.current) > 0.02) {
        scaleRef.current = newScale;
        earthRef.current.scale.set(newScale, newScale, newScale);
      }
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, isMobile ? 16 : 32, isMobile ? 16 : 32]}>
      <meshStandardMaterial
        color="#1e3a8a"
        emissive="#1e40af"
        emissiveIntensity={0.3}
        metalness={0.1}
        roughness={0.8}
      />
    </Sphere>
  );
}

// Simplified particle field - minimal
function ParticleField({ scrollProgress, isMobile }: { scrollProgress: MotionValue<number>; isMobile: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = isMobile ? 100 : 300; // Much lower
  const lastScroll = useRef(0);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;
    
    const scroll = scrollProgress.get();
    // Only update if scroll changed significantly
    if (Math.abs(scroll - lastScroll.current) > 0.01) {
      lastScroll.current = scroll;
      particlesRef.current.rotation.y = scroll * Math.PI * 0.2;
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
        size={isMobile ? 0.015 : 0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}


// Combined camera controller - optimized
function ScrollCamera({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const lastScroll = useRef(-1);

  useFrame(() => {
    const scroll = scrollProgress.get();
    
    // Only update if scroll changed significantly (0.01 threshold)
    if (Math.abs(scroll - lastScroll.current) > 0.01) {
      lastScroll.current = scroll;
      
      const distance = 8 + scroll * 2.5;
      const angle = scroll * Math.PI * 0.1;
      
      camera.position.x = Math.sin(angle) * distance;
      camera.position.z = Math.cos(angle) * distance;
      camera.position.y = scroll * 1.2;
      
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

// Loading fallback
function SceneLoader() {
  return null;
}

// Main scene component - heavily optimized
export function CinematicScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    
    // Small delay to ensure smooth initial load
    const timer = setTimeout(() => setIsReady(true), 100);
    
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);


  if (!isReady) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950 to-black" />
    );
  }

  return (
    <Canvas
      gl={{ 
        antialias: false, // Disable for performance
        alpha: true, 
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      }}
      dpr={isMobile ? 1 : 1.2} // Lower DPR
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      performance={{ min: 0.5, max: 0.8 }}
    >
      <Suspense fallback={<SceneLoader />}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <Stars 
          radius={60} 
          depth={30} 
          count={isMobile ? 200 : 800} 
          factor={2} 
          fade 
          speed={0.2} 
        />
        
        <ParticleField scrollProgress={scrollProgress} isMobile={isMobile} />
        
        <Earth scrollProgress={scrollProgress} isMobile={isMobile} />
        
        <ScrollCamera scrollProgress={scrollProgress} />
        
        <fog attach="fog" args={["#000011", 8, 40]} />
      </Suspense>
    </Canvas>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { SceneContent } from "./SceneContent";
import { useIsMobile } from "./hooks/useIsMobile";
import { INTRO_CONFIG, CANVAS_CONFIG } from "./constants";

export function IntroScene() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      gl={{ 
        antialias: false, 
        alpha: true, 
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      }}
      dpr={isMobile ? CANVAS_CONFIG.MOBILE_DPR : CANVAS_CONFIG.DESKTOP_DPR}
      style={{ position: "absolute", inset: 0 }}
      camera={{ 
        position: CANVAS_CONFIG.INITIAL_CAMERA_POSITION, 
        fov: CANVAS_CONFIG.CAMERA_FOV 
      }}
      performance={{ min: 0.5, max: 0.8 }}
      frameloop="always"
    >
      <ScrollControls pages={INTRO_CONFIG.PAGES} damping={INTRO_CONFIG.DAMPING}>
        <SceneContent isMobile={isMobile} />
      </ScrollControls>
    </Canvas>
  );
}


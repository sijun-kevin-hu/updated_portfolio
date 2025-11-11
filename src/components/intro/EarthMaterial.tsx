import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type EarthMaterialProps = {
  scrollProgress: number;
};

export function EarthMaterial({ scrollProgress }: EarthMaterialProps) {
  const material = useMemo(() => {
    // Create gradient texture for more realistic Earth appearance
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      // Create ocean gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 128);
      oceanGrad.addColorStop(0, "#1e3a8a"); // Deep ocean
      oceanGrad.addColorStop(0.5, "#2563eb"); // Medium ocean
      oceanGrad.addColorStop(1, "#1e40af"); // Shallow ocean
      
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 256, 128);
      
      // Add some continent-like shapes
      ctx.fillStyle = "#166534"; // Green
      ctx.beginPath();
      ctx.ellipse(64, 40, 30, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(180, 70, 25, 18, 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(120, 100, 20, 12, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      emissive: new THREE.Color(0x1e40af),
      emissiveIntensity: 0.2,
      metalness: 0.2,
      roughness: 0.7,
    });
  }, []);

  const materialRef = useRef(material);
  const lastProgressRef = useRef(-1);

  useFrame(() => {
    if (materialRef.current) {
      // Only update if scroll progress changed significantly (increased threshold)
      if (Math.abs(scrollProgress - lastProgressRef.current) > 0.02) {
        materialRef.current.emissiveIntensity = 0.2 + scrollProgress * 0.3;
        lastProgressRef.current = scrollProgress;
      }
    }
  });

  return <primitive object={material} attach="material" />;
}

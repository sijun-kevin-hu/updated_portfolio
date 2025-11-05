import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type EarthMaterialProps = {
  scrollProgress: number;
};

const vertexShader = `
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float opacity;
  uniform float scrollProgress;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel effect for atmosphere - intensity increases with scroll
    float fresnel = pow(1.0 - dot(viewDirection, normal), 2.0);
    float atmosphereIntensity = 0.25 + scrollProgress * 0.3;
    
    // Base color (ocean blue)
    vec3 baseColor = vec3(0.1, 0.3, 0.6);
    
    // Simplified noise for better performance
    float noise = sin(vWorldPosition.x * 0.3 + time * 0.05) * 
                 cos(vWorldPosition.y * 0.3 + time * 0.05);
    vec3 continentColor = mix(vec3(0.2, 0.5, 0.2), vec3(0.3, 0.4, 0.2), noise * 0.5 + 0.5);
    
    // Mix based on position
    float continentMask = smoothstep(0.3, 0.7, noise * 0.5 + 0.5);
    vec3 finalColor = mix(baseColor, continentColor, continentMask * 0.3);
    
    // Add atmospheric glow - intensity increases with scroll
    finalColor += vec3(0.3, 0.5, 0.8) * fresnel * atmosphereIntensity;
    
    // Simplified specular
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float specular = pow(max(dot(reflect(-lightDir, normal), viewDirection), 0.0), 16.0);
    finalColor += vec3(1.0) * specular * 0.3;
    
    gl_FragColor = vec4(finalColor, opacity);
  }
`;

export function EarthMaterial({ scrollProgress }: EarthMaterialProps) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 1 },
        scrollProgress: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.scrollProgress.value = scrollProgress;
    }
  });

  return <primitive object={material} attach="material" />;
}


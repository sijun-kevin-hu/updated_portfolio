import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA_CONFIG } from "./constants";

type ScrollCameraProps = {
  scrollProgress: number;
};

export function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  const { camera } = useThree();
  const lastScroll = useRef(0);

  useFrame(() => {
    // Only update if scroll changed significantly
    if (Math.abs(scrollProgress - lastScroll.current) > CAMERA_CONFIG.UPDATE_THRESHOLD) {
      lastScroll.current = scrollProgress;
      
      // Dolly effect: move camera forward/backward
      const distance = CAMERA_CONFIG.INITIAL_DISTANCE + scrollProgress * CAMERA_CONFIG.DISTANCE_MULTIPLIER;
      const angle = scrollProgress * CAMERA_CONFIG.ANGLE_MULTIPLIER;
      
      camera.position.x = Math.sin(angle) * distance;
      camera.position.z = Math.cos(angle) * distance;
      camera.position.y = scrollProgress * CAMERA_CONFIG.Y_POSITION_MULTIPLIER;
      
      // Look at Earth
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}


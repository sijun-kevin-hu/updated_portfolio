import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA_CONFIG } from "./constants";

type ScrollCameraProps = {
  scrollProgress: number;
};

export function ScrollCamera({ scrollProgress }: ScrollCameraProps) {
  const { camera } = useThree();
  const lastScroll = useRef(0);
  const easedProgressRef = useRef(0);

  useFrame(() => {
    // Only update if scroll changed significantly (increased threshold)
    if (Math.abs(scrollProgress - lastScroll.current) > 0.005) {
      lastScroll.current = scrollProgress;
      
      // Smooth camera movement with easing for better flow
      easedProgressRef.current = scrollProgress * scrollProgress * (3.0 - 2.0 * scrollProgress);
      
      // Dolly effect: move camera forward/backward with smoother transition
      const distance = CAMERA_CONFIG.INITIAL_DISTANCE + easedProgressRef.current * CAMERA_CONFIG.DISTANCE_MULTIPLIER;
      const angle = easedProgressRef.current * CAMERA_CONFIG.ANGLE_MULTIPLIER;
      
      // Add slight vertical movement for more dynamic feel
      const verticalOffset = Math.sin(easedProgressRef.current * Math.PI) * 0.5;
      
      camera.position.x = Math.sin(angle) * distance;
      camera.position.z = Math.cos(angle) * distance;
      camera.position.y = easedProgressRef.current * CAMERA_CONFIG.Y_POSITION_MULTIPLIER + verticalOffset;
      
      // Look at Earth with slight offset for better composition
      const lookAtOffset = easedProgressRef.current * 0.3;
      camera.lookAt(lookAtOffset, 0, 0);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}


// Intro sequence configuration
export const INTRO_CONFIG = {
  PAGES: 4,
  DAMPING: 0.15,
  COMPLETION_THRESHOLD: 0.98,
  SCROLL_CUE_THRESHOLD: 0.3,
} as const;

// Earth configuration
export const EARTH_CONFIG = {
  RADIUS: 2,
  MOBILE_SEGMENTS: 16,
  DESKTOP_SEGMENTS: 24,
  ROTATION_SPEED: 0.001,
  SCALE_MULTIPLIER: 0.4,
} as const;

// Camera configuration
export const CAMERA_CONFIG = {
  INITIAL_DISTANCE: 8,
  DISTANCE_MULTIPLIER: 3,
  ANGLE_MULTIPLIER: Math.PI * 0.12,
  Y_POSITION_MULTIPLIER: 1.5,
  UPDATE_THRESHOLD: 0.005, // Increased threshold for better performance
} as const;

// Particle configuration (reduced for better performance)
export const PARTICLE_CONFIG = {
  MOBILE_COUNT: 100,
  DESKTOP_COUNT: 300,
  MOBILE_SIZE: 0.02,
  DESKTOP_SIZE: 0.04,
  SPREAD: 40,
  ROTATION_X: Math.PI * 0.15,
  ROTATION_Y: Math.PI * 0.3,
  BASE_OPACITY: 0.3,
  OPACITY_MULTIPLIER: 0.2,
} as const;

// Stars configuration (reduced for better performance)
export const STARS_CONFIG = {
  RADIUS: 80,
  DEPTH: 40,
  MOBILE_COUNT: 200,
  DESKTOP_COUNT: 500,
  FACTOR: 3,
  SPEED: 0.3,
} as const;

// Canvas configuration
export const CANVAS_CONFIG = {
  MOBILE_DPR: [1, 1] as [number, number], // Reduced DPR for better performance
  DESKTOP_DPR: [1, 1.2] as [number, number], // Reduced DPR for better performance
  CAMERA_FOV: 50,
  INITIAL_CAMERA_POSITION: [0, 0, 8] as [number, number, number],
} as const;

// Mobile breakpoint
export const MOBILE_BREAKPOINT = 768;


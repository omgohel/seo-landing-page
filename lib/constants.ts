/**
 * Application constants
 */

// API Configuration
export const API_CONFIG = {
  LOOPS_API_URL: process.env.NEXT_PUBLIC_LOOPS_API_URL || "https://app.loops.so/api/newsletter-form/cmjjpmnp60fji0i1d6mu1cckm",
  FORM_ID: process.env.NEXT_PUBLIC_LOOPS_FORM_ID || "cmjjpmnp60fji0i1d6mu1cckm",
} as const;

// LocalStorage Keys
export const STORAGE_KEYS = {
  FORM_SUBMITTED: "loops-form-submitted",
  FORM_TIMESTAMP: "loops-form-timestamp",
} as const;

// Color Palette
export const COLORS = {
  PRIMARY: {
    PURPLE_400: "#503DF5",
    PURPLE_500: "#5048E5",
    PURPLE_600: "#6B54E8",
    PURPLE_700: "#8B63E9",
    PURPLE_800: "#A83CF6",
  },
  NEUTRAL: {
    GRAY_900: "#171717",
    GRAY_700: "#65758B",
    GRAY_400: "#E0E0EB",
    WHITE: "#FFFFFF",
  },
  SEMANTIC: {
    RED_500: "#EF4444",
  },
} as const;

// Confetti Configuration
export const CONFETTI_CONFIG = {
  DURATION: 3000, // 3 seconds
  COLORS: ["#5048E5", "#8B63E9", "#6B54E8", "#A83CF6"],
  PARTICLE_COUNT: 2,
  SPREAD: 55,
  START_VELOCITY: 60,
} as const;

// Rate Limiting
export const RATE_LIMIT = {
  COOLDOWN_MS: 60000, // 1 minute
} as const;


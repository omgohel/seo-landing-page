import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { CONFETTI_CONFIG } from "@/lib/constants";

/**
 * Custom hook for triggering confetti animation with proper cleanup
 * @param shouldTrigger - Whether to trigger the confetti animation
 */
export function useConfetti(shouldTrigger: boolean) {
  const animationFrameRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldTrigger) {
      // Cleanup if confetti should not be triggered
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const end = Date.now() + CONFETTI_CONFIG.DURATION;
    endTimeRef.current = end;

    const frame = () => {
      if (endTimeRef.current === null || Date.now() > endTimeRef.current) {
        animationFrameRef.current = null;
        return;
      }

      confetti({
        particleCount: CONFETTI_CONFIG.PARTICLE_COUNT,
        angle: 60,
        spread: CONFETTI_CONFIG.SPREAD,
        startVelocity: CONFETTI_CONFIG.START_VELOCITY,
        origin: { x: 0, y: 0.5 },
        colors: [...CONFETTI_CONFIG.COLORS],
      });
      confetti({
        particleCount: CONFETTI_CONFIG.PARTICLE_COUNT,
        angle: 120,
        spread: CONFETTI_CONFIG.SPREAD,
        startVelocity: CONFETTI_CONFIG.START_VELOCITY,
        origin: { x: 1, y: 0.5 },
        colors: [...CONFETTI_CONFIG.COLORS],
      });

      animationFrameRef.current = requestAnimationFrame(frame);
    };

    frame();

    // Cleanup function
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      endTimeRef.current = null;
    };
  }, [shouldTrigger]);
}


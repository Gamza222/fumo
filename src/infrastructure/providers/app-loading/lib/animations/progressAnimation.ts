import { AppLoadingState } from "../../model/types/types";

const STATE_UPDATE_INTERVAL = 50;

export const createProgressAnimation = (
  onSetState: (state: Partial<AppLoadingState>) => void,
  currentProgressRef: React.MutableRefObject<number>
) => {
  const easingFunction = (progress: number) =>
    progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const animateToProgress = (
    targetProgress: number,
    duration: number
  ): void => {
    const startProgress = currentProgressRef.current;
    const totalDistance = targetProgress - startProgress;
    const startTime = performance.now();
    let lastStateUpdate = 0;
    let lastRenderedProgress = Math.round(startProgress);

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easingFunction(progress);

      currentProgressRef.current = startProgress + totalDistance * easeProgress;
      const roundedProgress = Math.round(currentProgressRef.current);

      const now = performance.now();
      if (
        (now - lastStateUpdate >= STATE_UPDATE_INTERVAL &&
          roundedProgress !== lastRenderedProgress) ||
        progress >= 1
      ) {
        onSetState({ progress: roundedProgress });
        lastStateUpdate = now;
        lastRenderedProgress = roundedProgress;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        currentProgressRef.current = targetProgress;
        if (targetProgress !== lastRenderedProgress) {
          onSetState({ progress: targetProgress });
        }
      }
    };

    requestAnimationFrame(animate);
  };

  return { animateToProgress };
};

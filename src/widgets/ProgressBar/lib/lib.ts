/**
 * Format progress percentage for display
 */
export const formatProgress = (progress: number): string => {
  return `${Math.round(progress)}%`;
};

/**
 * Get progress bar width based on progress
 */
export const getProgressBarWidth = (progress: number): string => {
  return `${Math.min(100, Math.max(0, progress))}%`;
};

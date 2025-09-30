/**
 * InitialLoader Widget Logic
 *
 * Widget-specific logic and utilities.
 * Keeps the UI component clean and focused.
 */

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Check if progress has reached completion threshold
 */
export const isProgressComplete = (progress: number): boolean => {
  return progress >= 100;
};

/**
 * Get loading message based on progress
 */
export const getLoadingMessage = (currentStep: string, progress: number): string => {
  if (progress >= 100) return 'Ready!';
  if (currentStep) return `Loading ${currentStep}...`;
  return 'Loading...';
};

// ============================================================================
// STEP UTILITIES
// ============================================================================

/**
 * Format step name for display
 */
export const formatStepName = (stepName: string): string => {
  if (!stepName) return '';

  // Convert camelCase to Title Case
  return stepName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

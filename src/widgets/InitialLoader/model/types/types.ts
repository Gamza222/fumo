/**
 * InitialLoader Widget Types
 *
 * Type definitions for the initial app loading widget.
 * Follows FSD principles with widget-specific types.
 */

// ============================================================================
// WIDGET STATE
// ============================================================================

export interface InitialLoaderState {
  isVisible: boolean;
  progress: number;
  currentStep: string;
  isFadingOut: boolean;
}

export interface UseFadeAnimationProps {
  isOverallLoading: boolean;
  timeoutMs?: number; // Configurable timeout
}

export interface InitialLoaderLoadingState {
  isOverallLoading: boolean;
  progress: number;
  currentStep: string;
  hasError: boolean;
  errorMessage?: string;
  restart: () => void;
}

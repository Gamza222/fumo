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
  /**
   * Whether the loader is currently visible
   */
  isVisible: boolean;

  /**
   * Current progress percentage (0-100)
   */
  progress: number;

  /**
   * Current loading step name
   */
  currentStep: string;

  /**
   * Whether the fade-out animation is running
   */
  isFadingOut: boolean;
}

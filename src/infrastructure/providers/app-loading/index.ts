/**
 * App Loading Infrastructure Exports
 *
 * Clean exports for the initial app loading system.
 * Exports what external consumers need for basic usage + extensibility.
 */

// ============================================================================
// CORE PUBLIC API
// ============================================================================

// Provider & Hook
export { AppLoadingProvider } from './ui/AppLoadingProvider';
export { useAppLoadingContext } from './hooks/useAppLoadingContext/useAppLoadingContext';

// Essential Types
export type { LoadingStep } from './model/types/types';

// ============================================================================
// EXTENSIBILITY API (for advanced usage)
// ============================================================================

// Enums - for creating custom conditions and error handling
export {
  AppLoadingConditionId,
  AppLoadingConditionName,
  AppLoadingPriority,
} from './model/enums/enums';

// Key Constants - for timeout configuration and debugging
export { TIMEOUTS, MINIMUM_DISPLAY_TIME, DEFAULT_TIMEOUT } from './model/constants/constants';

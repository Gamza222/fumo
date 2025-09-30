/**
 * App Loading Constants
 *
 * Simple constants using our enums.
 * No overengineering - just what we need.
 */

import { AppLoadingConditionId, AppLoadingPriority } from '../enums/enums';

// ============================================================================
// TIMEOUTS
// ============================================================================

export const TIMEOUTS = {
  [AppLoadingConditionId.DOM_READY]: 2000,
  [AppLoadingConditionId.CRITICAL_CSS]: 2000,
  [AppLoadingConditionId.THEME_INITIALIZED]: 2000,
  [AppLoadingConditionId.CORE_JAVASCRIPT]: 2000,
  [AppLoadingConditionId.MINIMUM_DISPLAY_TIME]: 3000,
} as const;

// ============================================================================
// PRIORITIES
// ============================================================================

export const PRIORITIES = {
  [AppLoadingConditionId.DOM_READY]: AppLoadingPriority.HIGHEST,
  [AppLoadingConditionId.CRITICAL_CSS]: AppLoadingPriority.HIGH,
  [AppLoadingConditionId.THEME_INITIALIZED]: AppLoadingPriority.MEDIUM,
  [AppLoadingConditionId.CORE_JAVASCRIPT]: AppLoadingPriority.LOW,
  [AppLoadingConditionId.MINIMUM_DISPLAY_TIME]: AppLoadingPriority.LOWEST,
} as const;

// ============================================================================
// MINIMUM TIMING
// ============================================================================

export const MINIMUM_DISPLAY_TIME = 1200;
export const CHECK_INTERVAL = 100;

// ============================================================================
// SELECTORS
// ============================================================================

export const SELECTORS = {
  CRITICAL_CSS: 'link[rel="stylesheet"][data-critical="true"]',
  THEME_ATTRIBUTE: 'data-theme',
  THEME_CLASS: 'theme-initialized',
  THEME_APPLIED_CLASS: 'theme-applied',
} as const;

// ============================================================================
// DOCUMENT STATES
// ============================================================================

export const DOCUMENT_COMPLETE = 'complete';
export const DOCUMENT_LOADING = 'loading';

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export const FADE_OUT_DELAY = 400;

// ============================================================================
// TIMEOUT CONFIGURATION
// ============================================================================

export const DEFAULT_TIMEOUT = 5000;

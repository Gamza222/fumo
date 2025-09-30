/**
 * App Loading Enums
 *
 * Minimal enums for initial app loading system.
 * No duplicates - only what we actually need.
 */

// ============================================================================
// LOADING CONDITION IDS
// ============================================================================

export enum AppLoadingConditionId {
  DOM_READY = 'dom-ready',
  CRITICAL_CSS = 'critical-css',
  THEME_INITIALIZED = 'theme-initialized',
  CORE_JAVASCRIPT = 'core-javascript',
  MINIMUM_DISPLAY_TIME = 'minimum-display-time',
}

// ============================================================================
// LOADING CONDITION NAMES
// ============================================================================

export enum AppLoadingConditionName {
  PREPARING_APPLICATION = 'Preparing Application',
  LOADING_STYLES = 'Loading Styles',
  APPLYING_THEME = 'Applying Theme',
  LOADING_CORE_FEATURES = 'Loading Core Features',
  FINALIZING_SETUP = 'Finalizing Setup',
}

// ============================================================================
// LOADING PRIORITIES
// ============================================================================

export enum AppLoadingPriority {
  HIGHEST = 1,
  HIGH = 2,
  MEDIUM = 3,
  LOW = 4,
  LOWEST = 5,
}

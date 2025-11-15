/**
 * App Loading Constants
 */

import { AppLoadingConditionId, AppLoadingPriority } from "../enums/enums";

export const STEP_PROGRESS = {
  [AppLoadingConditionId.DOM_READY]: 15,
  [AppLoadingConditionId.CRITICAL_CSS]: 30,
  [AppLoadingConditionId.THEME_INITIALIZED]: 45,
  [AppLoadingConditionId.CORE_JAVASCRIPT]: 60,
  [AppLoadingConditionId.MEDIA_BACKGROUND]: 100,
} as const;

export const MAX_TIMEOUTS = {
  [AppLoadingConditionId.DOM_READY]: 5000,
  [AppLoadingConditionId.CRITICAL_CSS]: 5000,
  [AppLoadingConditionId.THEME_INITIALIZED]: 5000,
  [AppLoadingConditionId.CORE_JAVASCRIPT]: 8000,
  [AppLoadingConditionId.MEDIA_BACKGROUND]: 10000,
} as const;

export const TIMEOUTS = {
  [AppLoadingConditionId.DOM_READY]: 300,
  [AppLoadingConditionId.CRITICAL_CSS]: 300,
  [AppLoadingConditionId.THEME_INITIALIZED]: 500,
  [AppLoadingConditionId.CORE_JAVASCRIPT]: 1000,
  [AppLoadingConditionId.MEDIA_BACKGROUND]: 2000,
} as const;

export const PRIORITIES = {
  [AppLoadingConditionId.DOM_READY]: AppLoadingPriority.HIGHEST,
  [AppLoadingConditionId.CRITICAL_CSS]: AppLoadingPriority.HIGH,
  [AppLoadingConditionId.THEME_INITIALIZED]: AppLoadingPriority.MEDIUM,
  [AppLoadingConditionId.CORE_JAVASCRIPT]: AppLoadingPriority.LOW,
  [AppLoadingConditionId.MEDIA_BACKGROUND]: AppLoadingPriority.LOWEST,
} as const;

export const SELECTORS = {
  CRITICAL_CSS: 'link[rel="stylesheet"][data-critical="true"]',
  THEME_ATTRIBUTE: "data-theme",
  THEME_CLASS: "theme-initialized",
  THEME_APPLIED_CLASS: "theme-applied",
  MEDIA_BACKGROUND: '[data-media-background="true"]',
} as const;

export const VISIT_KEY = "fumo_has_visited";

export const FAST_LOAD_THRESHOLD_MS = 100;

export const DOCUMENT_COMPLETE = "complete";
export const DEFAULT_TIMEOUT = 5000;
export const COMPLETION_DELAY = 500;

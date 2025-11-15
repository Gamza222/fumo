/**
 * Condition Check Utilities
 */

import { SELECTORS, DOCUMENT_COMPLETE } from "../../model/constants/constants";

export const checkDOMReady = (): boolean => {
  return document.readyState === DOCUMENT_COMPLETE;
};

export const checkCriticalCSS = (): boolean => {
  const criticalCSS = document.querySelector(SELECTORS.CRITICAL_CSS);
  return criticalCSS !== null;
};

export const checkThemeInitialized = (): boolean => {
  const themeElement = document.documentElement;
  return (
    themeElement.hasAttribute(SELECTORS.THEME_ATTRIBUTE) ||
    themeElement.classList.contains(SELECTORS.THEME_CLASS) ||
    themeElement.classList.contains(SELECTORS.THEME_APPLIED_CLASS)
  );
};

export const checkCoreJavaScript = (): boolean => {
  return typeof window !== "undefined" && window.document !== undefined;
};

export const checkMediaBackground = (): boolean => {
  const mediaElement = document.querySelector(SELECTORS.MEDIA_BACKGROUND);
  if (!mediaElement || !(mediaElement instanceof HTMLImageElement)) {
    return false;
  }

  return mediaElement.complete && mediaElement.naturalWidth > 0;
};

export const ensureMinimumDisplayTime = async (
  minTime: number
): Promise<void> => {
  const startTime = performance.now();
  const elapsedTime = performance.now() - startTime;
  const remainingTime = Math.max(0, minTime - elapsedTime);
  if (remainingTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  }
};

export const ensureMinimumDisplayTimeForCondition = async (
  conditionTimeout: number,
  conditionStartTime: number
): Promise<void> => {
  const elapsedTime = performance.now() - conditionStartTime;
  const remainingTime = Math.max(0, conditionTimeout - elapsedTime);

  if (remainingTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  }
};

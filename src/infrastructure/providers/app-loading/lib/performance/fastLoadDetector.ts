import { FAST_LOAD_THRESHOLD_MS } from "../../model/constants/constants";

export const isFastLoad = (): boolean => {
  const navigationTiming = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;

  if (!navigationTiming) return false;

  const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
  return loadTime < FAST_LOAD_THRESHOLD_MS && loadTime > 0;
};

export const areResourcesReady = (): boolean => {
  return document.readyState === "complete" && document.styleSheets.length > 0;
};

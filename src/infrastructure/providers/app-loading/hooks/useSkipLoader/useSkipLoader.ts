"use client";

import { useState, useEffect } from "react";
import {
  isFastLoad,
  areResourcesReady,
} from "../../lib/performance/fastLoadDetector";
import { hasVisitedBefore, markVisited } from "../../lib/storage/visitTracker";

// Check skip conditions synchronously on client
const getInitialSkipState = (): boolean => {
  if (typeof window === "undefined") {
    return false; // SSR: always return false
  }

  try {
    // NEVER skip on home page
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
      return false;
    }

    const hasVisited = hasVisitedBefore();
    const resourcesReady = areResourcesReady();
    const fastLoad = isFastLoad();
    return hasVisited && (resourcesReady || fastLoad);
  } catch {
    return false;
  }
};

export const useSkipLoader = (): boolean => {
  // Initialize with actual value immediately (client-side)
  const [shouldSkip] = useState(() => getInitialSkipState());

  useEffect(() => {
    // Mark as visited for next time
    const hasVisited = hasVisitedBefore();
    if (!hasVisited) {
      markVisited();
    }
  }, []);

  return shouldSkip;
};

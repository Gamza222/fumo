"use client";

import { useState, useEffect } from "react";
import { INITIAL_LOADER_HIDE_EVENT } from "@/widgets/InitialLoader";
import { VISIT_KEY } from "@/infrastructure/providers/app-loading/model/constants/constants";

/**
 * Hook to manage navbar visibility
 *
 * Shows navbar after:
 * 1. InitialLoader completes and hides (INITIAL_LOADER_HIDE_EVENT)
 * 2. Immediately if loader was skipped (cached visit to non-HOME page)
 *
 * @returns isVisible - boolean indicating if navbar should be visible
 */
export const useNavbarVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleLoaderHide = () => {
      setIsVisible(true);
    };

    const shouldShowImmediately = () => {
      if (typeof window === "undefined") return false;

      try {
        const hasVisited = localStorage.getItem(VISIT_KEY) === "true";
        const isHomePage = window.location.pathname === "/";
        return hasVisited && !isHomePage;
      } catch {
        return false;
      }
    };

    if (shouldShowImmediately()) {
      setIsVisible(true);
    }

    // Listen for loader hide event
    window.addEventListener(INITIAL_LOADER_HIDE_EVENT, handleLoaderHide);

    // Cleanup
    return () => {
      window.removeEventListener(INITIAL_LOADER_HIDE_EVENT, handleLoaderHide);
    };
  }, []);

  return isVisible;
};

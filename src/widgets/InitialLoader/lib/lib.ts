"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { UseFadeAnimationProps } from "../model/types/types";
import { INITIAL_LOADER_HIDE_EVENT } from "../model/constants/constants";

// ============================================================================
// STEP UTILITIES
// ============================================================================

/**
 * Format step name for display
 */
export const formatStepName = (stepName: string): string => {
  if (!stepName) return "";

  // Convert camelCase to Title Case
  return stepName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export const useFadeAnimation = ({
  isOverallLoading,
  timeoutMs = 400,
}: UseFadeAnimationProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const hideLoader = useCallback(() => {
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent(INITIAL_LOADER_HIDE_EVENT));
    // Cancel timeout if it exists
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isOverallLoading) {
      setIsFadingOut(false);
      setIsVisible(true);
      return;
    }
    setIsFadingOut(true);
  }, [isOverallLoading]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (e.animationName === "fadeOut" && isFadingOut) {
        hideLoader();
      }
    },
    [isFadingOut, hideLoader]
  );

  useEffect(() => {
    if (isFadingOut) {
      const id = setTimeout(() => hideLoader(), timeoutMs);
      timeoutIdRef.current = id;
      return () => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      };
    }
    return undefined;
  }, [isFadingOut, timeoutMs, hideLoader]);

  return { isFadingOut, isVisible, handleAnimationEnd };
};

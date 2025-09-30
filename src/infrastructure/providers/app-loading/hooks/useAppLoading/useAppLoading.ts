/**
 * useAppLoading Hook
 *
 * Manages initial app loading state and progress.
 * Checks multiple conditions sequentially with minimum display time.
 * Provides smooth loading experience with progress tracking.
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AppLoadingConditionId,
  AppLoadingConditionName,
  AppLoadingPriority,
} from '../../model/enums/enums';
import {
  TIMEOUTS,
  PRIORITIES,
  MINIMUM_DISPLAY_TIME,
  SELECTORS,
  DOCUMENT_COMPLETE,
  DEFAULT_TIMEOUT,
} from '../../model/constants/constants';
import { LoadingCondition, LoadingStep, UseAppLoadingReturn } from '../../model/types/types';

// ============================================================================
// CONDITION CHECKS (Single Responsibility - Each checks one thing)
// ============================================================================

const checkDOMReady = (): boolean => document.readyState === DOCUMENT_COMPLETE;

const checkCriticalCSS = (): boolean => {
  const criticalSheets = document.querySelectorAll(SELECTORS.CRITICAL_CSS);
  return (
    criticalSheets.length === 0 ||
    Array.from(criticalSheets).every((sheet) => (sheet as HTMLLinkElement).sheet !== null)
  );
};

const checkThemeInitialized = (): boolean => {
  return (
    document.documentElement.hasAttribute(SELECTORS.THEME_ATTRIBUTE) ||
    document.body.classList.contains(SELECTORS.THEME_CLASS) ||
    document.documentElement.classList.contains(SELECTORS.THEME_APPLIED_CLASS)
  );
};

const checkCoreJavaScript = (): boolean => {
  return typeof window !== 'undefined' && document.readyState === DOCUMENT_COMPLETE;
};

const ensureMinimumDisplayTime = async (): Promise<void> => {
  const startTime = performance.now();
  const elapsedTime = performance.now() - startTime;
  const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - elapsedTime);

  if (remainingTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  }
};

// ============================================================================
// CONDITIONS CONFIGURATION (Open/Closed - Easy to extend)
// ============================================================================

const createLoadingConditions = (): LoadingCondition[] => [
  {
    id: AppLoadingConditionId.DOM_READY,
    name: AppLoadingConditionName.PREPARING_APPLICATION,
    priority: PRIORITIES[AppLoadingConditionId.DOM_READY],
    check: checkDOMReady,
    timeout: TIMEOUTS[AppLoadingConditionId.DOM_READY],
  },
  {
    id: AppLoadingConditionId.CRITICAL_CSS,
    name: AppLoadingConditionName.LOADING_STYLES,
    priority: PRIORITIES[AppLoadingConditionId.CRITICAL_CSS],
    check: checkCriticalCSS,
    timeout: TIMEOUTS[AppLoadingConditionId.CRITICAL_CSS],
  },
  {
    id: AppLoadingConditionId.THEME_INITIALIZED,
    name: AppLoadingConditionName.APPLYING_THEME,
    priority: PRIORITIES[AppLoadingConditionId.THEME_INITIALIZED],
    check: checkThemeInitialized,
    timeout: TIMEOUTS[AppLoadingConditionId.THEME_INITIALIZED],
  },
  {
    id: AppLoadingConditionId.CORE_JAVASCRIPT,
    name: AppLoadingConditionName.LOADING_CORE_FEATURES,
    priority: PRIORITIES[AppLoadingConditionId.CORE_JAVASCRIPT],
    check: checkCoreJavaScript,
    timeout: TIMEOUTS[AppLoadingConditionId.CORE_JAVASCRIPT],
  },
];

// ============================================================================
// MAIN HOOK (Orchestrates everything)
// ============================================================================

export function useAppLoading(): UseAppLoadingReturn {
  const [state, setState] = useState({
    isInitialLoading: true,
    progress: 0,
    currentStep: '',
    steps: [] as LoadingStep[],
    isSuspenseLoading: false,
  });

  const loadingConditions = useMemo(() => createLoadingConditions(), []);

  const checkLoadingSteps = useCallback(async () => {
    const stepsWithStatus: LoadingStep[] = loadingConditions.map((condition) => ({
      id: condition.id,
      name: condition.name,
      completed: false,
      priority: condition.priority || AppLoadingPriority.LOWEST,
    }));

    setState((prev) => ({ ...prev, steps: stepsWithStatus }));

    // Start continuous progress updates with requestAnimationFrame
    const startTime = performance.now();
    const totalExpectedTime = loadingConditions.length * MINIMUM_DISPLAY_TIME;

    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const smoothProgress = Math.min((elapsed / totalExpectedTime) * 100, 100);
      setState((prev) => ({ ...prev, progress: smoothProgress }));

      if (smoothProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(updateProgress);

    // Process conditions sequentially
    for (let index = 0; index < loadingConditions.length; index++) {
      const condition = loadingConditions[index] as LoadingCondition;

      // Update current step
      setState((prev) => ({
        ...prev,
        currentStep: condition.name,
      }));

      try {
        const result = await Promise.race([
          Promise.resolve(condition.check()),
          new Promise<boolean>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), condition.timeout || DEFAULT_TIMEOUT)
          ),
        ]);

        await ensureMinimumDisplayTime();

        setState((prev) => ({
          ...prev,
          steps: prev.steps.map((step) =>
            step.id === condition.id ? { ...step, completed: result } : step
          ),
        }));
      } catch (error) {
        await ensureMinimumDisplayTime();

        setState((prev) => ({
          ...prev,
          steps: prev.steps.map((step) =>
            step.id === condition.id ? { ...step, completed: true } : step
          ),
        }));
      }
    }

    // Clean up animation frame and complete
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    setState((prev) => ({
      ...prev,
      isInitialLoading: false,
      progress: 100,
      currentStep: 'Ready',
    }));
  }, [loadingConditions]);

  useEffect(() => {
    void checkLoadingSteps();
  }, [checkLoadingSteps]);

  const forceComplete = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isInitialLoading: false,
      progress: 100,
      currentStep: 'Ready',
    }));
  }, []);

  const restart = useCallback(() => {
    setState({
      isInitialLoading: true,
      progress: 0,
      currentStep: '',
      steps: [],
      isSuspenseLoading: false,
    });
    void checkLoadingSteps();
  }, [checkLoadingSteps]);

  const setSuspenseLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isSuspenseLoading: loading }));
  }, []);

  const isOverallLoading = state.isInitialLoading || state.isSuspenseLoading;

  return {
    ...state,
    isOverallLoading,
    forceComplete,
    restart,
    setSuspenseLoading,
  };
}

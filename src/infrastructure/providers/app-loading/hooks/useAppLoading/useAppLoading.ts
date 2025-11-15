"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  UseAppLoadingReturn,
  LoadingStep,
  AppLoadingState,
} from "../../model/types/types";
import { createLoadingConditions } from "../../lib/conditions/conditionsFactory";
import { createLoadingActions } from "../../lib/actions/loadingActions";
import { createProgressAnimation } from "../../lib/animations/progressAnimation";
import { createConditionRunner } from "../../lib/conditions/conditionRunner";
import { useSkipLoader } from "../useSkipLoader/useSkipLoader";

const DEFAULT_STATE: AppLoadingState = {
  isInitialLoading: true,
  progress: 0,
  currentStep: "",
  steps: [] as LoadingStep[],
  hasError: false,
  errorMessage: "",
} as const;

const LOADING_CONDITIONS = createLoadingConditions();

export function useAppLoading(): UseAppLoadingReturn {
  const shouldSkipLoader = useSkipLoader();

  const [state, setState] = useState<AppLoadingState>(DEFAULT_STATE);
  const currentProgressRef = useRef(0);
  const hasRunInitialCheck = useRef(false);

  const onSetState = useCallback((state: Partial<AppLoadingState>) => {
    setState((prev) => ({ ...prev, ...state }));
  }, []);

  const loadingActions = useMemo(
    () => createLoadingActions(DEFAULT_STATE, onSetState),
    [onSetState]
  );

  const progressAnimation = useMemo(
    () => createProgressAnimation(onSetState, currentProgressRef),
    [onSetState]
  );

  const conditionRunner = useMemo(
    () =>
      createConditionRunner(onSetState, progressAnimation.animateToProgress),
    [onSetState, progressAnimation]
  );

  const checkLoadingSteps = useCallback(() => {
    if (shouldSkipLoader) {
      return Promise.resolve();
    }
    return conditionRunner.runLoadingConditions(LOADING_CONDITIONS);
  }, [shouldSkipLoader, conditionRunner]);

  const restart = useCallback(
    () => loadingActions.restart(checkLoadingSteps),
    [loadingActions, checkLoadingSteps]
  );

  const forceComplete = useCallback(
    () => loadingActions.forceComplete(),
    [loadingActions]
  );

  // Run loading check only once on mount
  useEffect(() => {
    if (!hasRunInitialCheck.current) {
      hasRunInitialCheck.current = true;
      void checkLoadingSteps();
    }
  }, [checkLoadingSteps]);

  const isOverallLoading = state.isInitialLoading;

  return {
    isInitialLoading: state.isInitialLoading,
    isOverallLoading,
    progress: state.progress,
    currentStep: state.currentStep,
    steps: state.steps,
    hasError: state.hasError,
    errorMessage: state.errorMessage,
    shouldSkipLoader,
    forceComplete,
    restart,
  };
}

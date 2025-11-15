import { AppLoadingState, LoadingCondition } from "../../model/types/types";
import {
  STEP_PROGRESS,
  TIMEOUTS,
  MAX_TIMEOUTS,
  DEFAULT_TIMEOUT,
  COMPLETION_DELAY,
} from "../../model/constants/constants";
import { ensureMinimumDisplayTimeForCondition } from "../conditions/conditionChecks";

const initializeSteps = (
  conditions: LoadingCondition[],
  onSetState: (state: Partial<AppLoadingState>) => void
) => {
  const initialSteps = conditions.map((condition) => ({
    id: condition.id,
    name: condition.name,
    completed: false,
    priority: condition.priority || 0,
  }));
  onSetState({ steps: initialSteps });
};

const updateCurrentStep = (
  stepName: string,
  onSetState: (state: Partial<AppLoadingState>) => void
) => {
  onSetState({ currentStep: stepName });
};

const handleError = (
  errorMessage: string,
  onSetState: (state: Partial<AppLoadingState>) => void
) => {
  onSetState({
    hasError: true,
    errorMessage,
  });
};

const completeLoading = (
  onSetState: (state: Partial<AppLoadingState>) => void
) => {
  onSetState({
    isInitialLoading: false,
    progress: 100,
    currentStep: "Ready",
  });
};

const updateStepCompletion = (
  conditionId: string,
  completed: boolean,
  currentSteps: any[],
  onSetState: (state: Partial<AppLoadingState>) => void
): any[] => {
  const updatedSteps = currentSteps.map((step) =>
    step.id === conditionId ? { ...step, completed } : step
  );
  onSetState({ steps: updatedSteps });
  return updatedSteps;
};

const executeCondition = async (
  condition: LoadingCondition,
  animateToProgress: (targetProgress: number, duration: number) => void
): Promise<boolean> => {
  const conditionStartTime = performance.now();
  const stepProgressValue =
    (STEP_PROGRESS as Record<string, number>)[condition.id] || 0;
  const stepDuration = (TIMEOUTS as Record<string, number>)[condition.id] || 0;

  animateToProgress(stepProgressValue, stepDuration);

  const result = await Promise.race([
    Promise.resolve(condition.check()),
    new Promise<boolean>((_, reject) =>
      setTimeout(
        () => reject(new Error("Timeout")),
        (MAX_TIMEOUTS as Record<string, number>)[condition.id] ||
          DEFAULT_TIMEOUT
      )
    ),
  ]);

  await ensureMinimumDisplayTimeForCondition(stepDuration, conditionStartTime);
  return result;
};

export const createConditionRunner = (
  onSetState: (state: Partial<AppLoadingState>) => void,
  animateToProgress: (targetProgress: number, duration: number) => void
) => {
  const runLoadingConditions = async (
    loadingConditions: LoadingCondition[]
  ) => {
    initializeSteps(loadingConditions, onSetState);

    let currentSteps = loadingConditions.map((condition) => ({
      id: condition.id,
      name: condition.name,
      completed: false,
      priority: condition.priority || 0,
    }));

    for (const condition of loadingConditions) {
      updateCurrentStep(condition.name, onSetState);

      try {
        const result = await executeCondition(condition, animateToProgress);
        currentSteps = updateStepCompletion(
          condition.id,
          result,
          currentSteps,
          onSetState
        );
      } catch (error) {
        handleError(`Loading failed: ${condition.name}`, onSetState);
        return;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, COMPLETION_DELAY));
    completeLoading(onSetState);
  };

  return { runLoadingConditions };
};

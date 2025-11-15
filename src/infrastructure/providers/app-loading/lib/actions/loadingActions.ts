import { AppLoadingState } from "../../model/types/types";

export const createLoadingActions = (
  defaultState: AppLoadingState,
  onSetState: (state: Partial<AppLoadingState>) => void
) => {
  const forceComplete = () => {
    onSetState({
      isInitialLoading: false,
      progress: 100,
      currentStep: "Ready",
    });
  };

  const restart = (checkLoadingSteps: () => Promise<void>) => {
    onSetState({ ...defaultState });
    void checkLoadingSteps();
  };

  return {
    forceComplete,
    restart,
  };
};

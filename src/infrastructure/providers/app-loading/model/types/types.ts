import { ReactNode } from "react";

export interface LoadingCondition {
  id: string;
  name: string;
  check: () => Promise<boolean> | boolean;
  timeout?: number;
  priority?: number;
}

export interface LoadingStep {
  id: string;
  name: string;
  completed: boolean;
  priority: number;
}

export interface AppLoadingProviderProps {
  children: ReactNode;
}

export interface AppLoadingState {
  isInitialLoading: boolean;
  progress: number;
  currentStep: string;
  steps: LoadingStep[];
  hasError: boolean;
  errorMessage: string;
}

export interface UseAppLoadingReturn {
  isInitialLoading: boolean;
  isOverallLoading: boolean;
  progress: number;
  currentStep: string;
  steps: LoadingStep[];
  hasError: boolean;
  errorMessage?: string;
  shouldSkipLoader: boolean;
  forceComplete: () => void;
  restart: () => void;
}

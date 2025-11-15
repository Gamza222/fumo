"use client";

import { useMemo } from "react";
import {
  useAppLoadingContext,
  UseAppLoadingReturn,
} from "@/infrastructure/providers/app-loading";

export const useInitialLoaderLoading = (): Pick<
  UseAppLoadingReturn,
  | "isOverallLoading"
  | "progress"
  | "currentStep"
  | "hasError"
  | "errorMessage"
  | "restart"
  | "shouldSkipLoader"
> => {
  const context = useAppLoadingContext();

  return useMemo(
    () => ({
      isOverallLoading: context.isOverallLoading,
      progress: context.progress,
      currentStep: context.currentStep,
      hasError: context.hasError,
      errorMessage: context.errorMessage,
      restart: context.restart,
      shouldSkipLoader: context.shouldSkipLoader,
    }),
    [
      context.isOverallLoading,
      context.progress,
      context.currentStep,
      context.hasError,
      context.errorMessage,
      context.restart,
      context.shouldSkipLoader,
    ]
  );
};

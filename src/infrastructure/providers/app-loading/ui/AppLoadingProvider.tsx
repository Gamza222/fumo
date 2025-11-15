/**
 * AppLoadingProvider
 *
 * UI Provider component that provides loading context to children.
 */

"use client";

import { createContext, useMemo } from "react";
import { useAppLoading } from "../hooks/useAppLoading/useAppLoading";
import {
  AppLoadingProviderProps,
  UseAppLoadingReturn,
} from "../model/types/types";

// ============================================================================
// CONTEXT CREATION
// ============================================================================

// Create context with null default (will be provided by provider)
const AppLoadingContext = createContext<UseAppLoadingReturn | null>(null);

// ============================================================================
// PROVIDER COMPONENT (UI Layer Only)
// ============================================================================

/**
 * AppLoadingProvider - Provides loading state to all child components
 *
 * This is a PURE UI component - no logic, just context provision.
 * All logic is handled by useAppLoading hook.
 *
 * Usage:
 * <AppLoadingProvider>
 *   <YourApp />
 * </AppLoadingProvider>
 */
export function AppLoadingProvider({ children }: AppLoadingProviderProps) {
  // Get loading state from our hook (logic layer)
  const appLoadingState = useAppLoading();

  const contextValue = useMemo(
    () => appLoadingState,
    [
      appLoadingState.isInitialLoading,
      appLoadingState.isOverallLoading,
      appLoadingState.isSuspenseLoading,
      appLoadingState.progress,
      appLoadingState.currentStep,
      appLoadingState.steps,
      appLoadingState.hasError,
      appLoadingState.errorMessage,
      appLoadingState.shouldSkipLoader,
      appLoadingState.forceComplete,
      appLoadingState.restart,
      appLoadingState.setSuspenseLoading,
    ]
  );

  return (
    <AppLoadingContext.Provider value={contextValue}>
      {children}
    </AppLoadingContext.Provider>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { AppLoadingContext };

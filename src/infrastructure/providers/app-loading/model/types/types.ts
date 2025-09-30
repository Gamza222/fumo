/**
 * App Loading Types
 *
 * Types for initial app loading system.
 * Handles loading conditions and progress tracking.
 */

import { ReactNode } from 'react';

// ============================================================================
// LOADING CONDITIONS
// ============================================================================

export interface LoadingCondition {
  id: string;
  name: string;
  check: () => Promise<boolean> | boolean;
  timeout?: number; // ms
  priority?: number; // 1 = highest, 5 = lowest
}

export interface LoadingStep {
  id: string;
  name: string;
  completed: boolean;
  priority: number;
}

// ============================================================================
// APP LOADING STATE
// ============================================================================

export interface AppLoadingState {
  isInitialLoading: boolean;
  isOverallLoading: boolean;
  isSuspenseLoading: boolean;
  progress: number;
  currentStep: string;
  steps: LoadingStep[];
}

// ============================================================================
// PROVIDER PROPS
// ============================================================================

export interface AppLoadingProviderProps {
  children: ReactNode;
}

// ============================================================================
// HOOK RETURN TYPE
// ============================================================================

export interface UseAppLoadingReturn extends AppLoadingState {
  forceComplete: () => void;
  restart: () => void;
  setSuspenseLoading: (loading: boolean) => void;
}

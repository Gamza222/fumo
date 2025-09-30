/**
 * useAppLoadingContext Hook
 *
 * Hook for consuming AppLoading context safely.
 */

'use client';

import { useContext } from 'react';
import { AppLoadingContext } from '../../ui/AppLoadingProvider';
import { UseAppLoadingReturn } from '../../model/types/types';

// ============================================================================
// CONTEXT HOOK (Logic Layer)
// ============================================================================

/**
 * useAppLoadingContext - Hook to access loading state from context
 *
 * This hook handles context consumption logic with proper error handling.
 * Memoized for performance optimization.
 *
 * Usage:
 * const { isInitialLoading, progress, forceComplete } = useAppLoadingContext();
 *
 * @throws Error if used outside of AppLoadingProvider
 * @returns AppLoadingContextType - Loading state and methods
 */
export function useAppLoadingContext(): UseAppLoadingReturn {
  // Get context from provider
  const context = useContext(AppLoadingContext);

  if (!context) {
    throw new Error(
      'useAppLoadingContext must be used within an AppLoadingProvider. ' +
        'Make sure your component is wrapped with <AppLoadingProvider>.'
    );
  }

  return context;
}

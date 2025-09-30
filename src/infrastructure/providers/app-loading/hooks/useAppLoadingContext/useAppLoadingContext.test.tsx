/**
 * useAppLoadingContext Hook Tests
 */

import { renderHook } from '@testing-library/react';
import React from 'react';
import { useAppLoadingContext } from './useAppLoadingContext';
import { AppLoadingContext } from '../../ui/AppLoadingProvider';
import { UseAppLoadingReturn } from '../../model/types/types';

// ============================================================================
// TEST UTILITIES
// ============================================================================

const mockContextValue: UseAppLoadingReturn = {
  isInitialLoading: true,
  isOverallLoading: true,
  progress: 50,
  currentStep: 'Loading',
  steps: [],
  isSuspenseLoading: false,
  forceComplete: jest.fn(),
  restart: jest.fn(),
  setSuspenseLoading: jest.fn(),
};

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <AppLoadingContext.Provider value={mockContextValue}>{children}</AppLoadingContext.Provider>
);

const NoProviderWrapper = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// ============================================================================
// TESTS
// ============================================================================

describe('useAppLoadingContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return context value when used within provider', () => {
    const { result } = renderHook(() => useAppLoadingContext(), {
      wrapper: ProviderWrapper,
    });

    expect(result.current).toBe(mockContextValue);
    expect(result.current.isInitialLoading).toBe(true);
    expect(result.current.progress).toBe(50);
  });

  it('should throw error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAppLoadingContext(), {
        wrapper: NoProviderWrapper,
      });
    }).toThrow('useAppLoadingContext must be used within an AppLoadingProvider');

    consoleSpy.mockRestore();
  });

  it('should throw error when context is null', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const NullProviderWrapper = ({ children }: { children: React.ReactNode }) => (
      <AppLoadingContext.Provider value={null}>{children}</AppLoadingContext.Provider>
    );

    expect(() => {
      renderHook(() => useAppLoadingContext(), {
        wrapper: NullProviderWrapper,
      });
    }).toThrow('useAppLoadingContext must be used within an AppLoadingProvider');

    consoleSpy.mockRestore();
  });
});

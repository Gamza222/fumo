/**
 * AppLoadingProvider Tests
 *
 * Tests for the React Context provider component.
 * Tests provider functionality and context provision.
 * Note: useAppLoadingContext will be tested separately.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppLoadingProvider } from './AppLoadingProvider';
import { UseAppLoadingReturn } from '../model/types/types';

// ============================================================================
// MOCK SETUP
// ============================================================================

// Mock the useAppLoading hook (from hooks/useAppLoading/useAppLoading.ts)
jest.mock('../hooks/useAppLoading/useAppLoading', () => ({
  useAppLoading: jest.fn(),
}));

import { useAppLoading } from '../hooks/useAppLoading/useAppLoading';

const mockUseAppLoading = useAppLoading as jest.MockedFunction<typeof useAppLoading>;

// ============================================================================
// TEST COMPONENT
// ============================================================================

// Simple test component that renders children
const TestChild = ({ testId, children }: { testId: string; children?: React.ReactNode }) => (
  <div data-testid={testId}>{children}</div>
);

// ============================================================================
// TESTS
// ============================================================================

describe('AppLoadingProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Provider Rendering', () => {
    it('should render single child without crashing', () => {
      const mockLoadingState: UseAppLoadingReturn = {
        isInitialLoading: true,
        isOverallLoading: true,
        progress: 50,
        currentStep: 'Loading Styles',
        steps: [],
        isSuspenseLoading: false,
        forceComplete: jest.fn(),
        restart: jest.fn(),
        setSuspenseLoading: jest.fn(),
      };

      mockUseAppLoading.mockReturnValue(mockLoadingState);

      render(
        <AppLoadingProvider>
          <TestChild testId="single-child">Single Child Content</TestChild>
        </AppLoadingProvider>
      );

      expect(screen.getByTestId('single-child')).toBeInTheDocument();
      expect(screen.getByText('Single Child Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      const mockLoadingState: UseAppLoadingReturn = {
        isInitialLoading: true,
        isOverallLoading: true,
        progress: 50,
        currentStep: 'Loading Styles',
        steps: [],
        isSuspenseLoading: false,
        forceComplete: jest.fn(),
        restart: jest.fn(),
        setSuspenseLoading: jest.fn(),
      };
      mockUseAppLoading.mockReturnValue(mockLoadingState);

      render(
        <AppLoadingProvider>
          <TestChild testId="child-1">Child 1</TestChild>
          <TestChild testId="child-2">Child 2</TestChild>
          <TestChild testId="child-3">Child 3</TestChild>
        </AppLoadingProvider>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('Hook Integration', () => {
    it('should call useAppLoading hook once', () => {
      const mockLoadingState: UseAppLoadingReturn = {
        isInitialLoading: true,
        isOverallLoading: true,
        progress: 50,
        currentStep: 'Loading Styles',
        steps: [],
        isSuspenseLoading: false,
        forceComplete: jest.fn(),
        restart: jest.fn(),
        setSuspenseLoading: jest.fn(),
      };

      mockUseAppLoading.mockReturnValue(mockLoadingState);

      render(
        <AppLoadingProvider>
          <TestChild testId="test-child">Test</TestChild>
        </AppLoadingProvider>
      );

      expect(mockUseAppLoading).toHaveBeenCalledTimes(1);
      expect(mockUseAppLoading).toHaveBeenCalledWith();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      const mockLoadingState: UseAppLoadingReturn = {
        isInitialLoading: true,
        isOverallLoading: true,
        progress: 50,
        currentStep: 'Loading Styles',
        steps: [],
        isSuspenseLoading: false,
        forceComplete: jest.fn(),
        restart: jest.fn(),
        setSuspenseLoading: jest.fn(),
      };

      mockUseAppLoading.mockReturnValue(mockLoadingState);

      expect(() => {
        render(<AppLoadingProvider>{null}</AppLoadingProvider>);
      }).not.toThrow();
    });

    it('should handle undefined children', () => {
      const mockLoadingState: UseAppLoadingReturn = {
        isInitialLoading: true,
        isOverallLoading: true,
        progress: 50,
        currentStep: 'Loading Styles',
        steps: [],
        isSuspenseLoading: false,
        forceComplete: jest.fn(),
        restart: jest.fn(),
        setSuspenseLoading: jest.fn(),
      };

      mockUseAppLoading.mockReturnValue(mockLoadingState);

      expect(() => {
        render(<AppLoadingProvider>{undefined}</AppLoadingProvider>);
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle hook throwing error', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockUseAppLoading.mockImplementation(() => {
        throw new Error('Hook failed');
      });

      expect(() => {
        render(
          <AppLoadingProvider>
            <TestChild testId="test-child">Test</TestChild>
          </AppLoadingProvider>
        );
      }).toThrow('Hook failed');

      consoleSpy.mockRestore();
    });
  });
});

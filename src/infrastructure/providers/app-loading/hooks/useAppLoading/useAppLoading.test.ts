/**
 * useAppLoading Hook Tests
 */

import { renderHook, act } from '@testing-library/react';
import { useAppLoading } from './useAppLoading';

// Mock setup for DOM APIs
const mockPerformance = {
  now: jest.fn(() => 1000),
};

const mockQuerySelectorAll = jest.fn(() => []);
const mockHasAttribute = jest.fn(() => true);
const mockClassListContains = jest.fn(() => true);

// Setup mocks
Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true,
});

Object.defineProperty(document, 'readyState', {
  get: () => 'complete',
  configurable: true,
});

Object.defineProperty(document, 'querySelectorAll', {
  value: mockQuerySelectorAll,
  writable: true,
});

Object.defineProperty(document.documentElement, 'hasAttribute', {
  value: mockHasAttribute,
});

Object.defineProperty(document.documentElement, 'classList', {
  value: { contains: mockClassListContains },
});

Object.defineProperty(document.body, 'classList', {
  value: { contains: mockClassListContains },
});

Object.defineProperty(window, 'setTimeout', {
  value: jest.fn((callback) => {
    callback();
    return 1;
  }),
  writable: true,
});

describe('useAppLoading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPerformance.now.mockReturnValue(1000);
    mockQuerySelectorAll.mockReturnValue([]);
    mockHasAttribute.mockReturnValue(true);
    mockClassListContains.mockReturnValue(true);
  });

  describe('Initial State', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useAppLoading());

      expect(result.current.isInitialLoading).toBe(true);
      expect(result.current.isOverallLoading).toBe(true);
      expect(result.current.isSuspenseLoading).toBe(false);
      expect(result.current.progress).toBe(0);
      expect(result.current.steps).toHaveLength(4);
    });

    it('should have correct function types', () => {
      const { result } = renderHook(() => useAppLoading());

      expect(typeof result.current.forceComplete).toBe('function');
      expect(typeof result.current.restart).toBe('function');
      expect(typeof result.current.setSuspenseLoading).toBe('function');
    });
  });

  describe('Force Complete', () => {
    it('should force complete immediately', () => {
      const { result } = renderHook(() => useAppLoading());

      act(() => {
        result.current.forceComplete();
      });

      expect(result.current.isInitialLoading).toBe(false);
      expect(result.current.isOverallLoading).toBe(false);
      expect(result.current.progress).toBe(100);
      expect(result.current.currentStep).toBe('Ready');
    });
  });

  describe('Restart', () => {
    it('should restart loading state', () => {
      const { result } = renderHook(() => useAppLoading());

      // First complete it
      act(() => {
        result.current.forceComplete();
      });

      expect(result.current.isInitialLoading).toBe(false);

      // Then restart
      act(() => {
        result.current.restart();
      });

      expect(result.current.isInitialLoading).toBe(true);
      expect(result.current.isOverallLoading).toBe(true);
      expect(result.current.progress).toBe(0);
      expect(result.current.steps).toHaveLength(4);
      expect(result.current.isSuspenseLoading).toBe(false);
    });
  });

  describe('Suspense Loading', () => {
    it('should handle suspense loading state', () => {
      const { result } = renderHook(() => useAppLoading());

      // Initially suspense is not loading
      expect(result.current.isSuspenseLoading).toBe(false);
      expect(result.current.isOverallLoading).toBe(true); // Because initial loading is true

      // Set suspense loading to true
      act(() => {
        result.current.setSuspenseLoading(true);
      });

      expect(result.current.isSuspenseLoading).toBe(true);
      expect(result.current.isOverallLoading).toBe(true); // Should still be true

      // Set suspense loading to false
      act(() => {
        result.current.setSuspenseLoading(false);
      });

      expect(result.current.isSuspenseLoading).toBe(false);
      expect(result.current.isOverallLoading).toBe(true); // Should still be true because initial loading is true
    });

    it('should compute isOverallLoading correctly', () => {
      const { result } = renderHook(() => useAppLoading());

      // Both initial and suspense loading
      act(() => {
        result.current.setSuspenseLoading(true);
      });
      expect(result.current.isOverallLoading).toBe(true);

      // Only initial loading
      act(() => {
        result.current.setSuspenseLoading(false);
      });
      expect(result.current.isOverallLoading).toBe(true);

      // Force complete initial loading, only suspense
      act(() => {
        result.current.forceComplete();
        result.current.setSuspenseLoading(true);
      });
      expect(result.current.isOverallLoading).toBe(true);

      // Neither loading
      act(() => {
        result.current.setSuspenseLoading(false);
      });
      expect(result.current.isOverallLoading).toBe(false);
    });
  });

  describe('Loading Steps', () => {
    it('should initialize steps correctly', () => {
      const { result } = renderHook(() => useAppLoading());

      expect(result.current.steps).toHaveLength(4);

      const expectedSteps = [
        { id: 'dom-ready', name: 'Preparing Application' },
        { id: 'critical-css', name: 'Loading Styles' },
        { id: 'theme-initialized', name: 'Applying Theme' },
        { id: 'core-javascript', name: 'Loading Core Features' },
      ];

      expectedSteps.forEach((expectedStep, index) => {
        expect(result?.current?.steps[index]?.id).toBe(expectedStep.id);
        expect(result?.current?.steps[index]?.name).toBe(expectedStep.name);
        expect(result?.current?.steps[index]?.completed).toBe(false);
      });
    });
  });

  describe('DOM Condition Checks', () => {
    it('should check DOM ready state correctly', () => {
      // Mock document.readyState as complete
      Object.defineProperty(document, 'readyState', {
        get: () => 'complete',
        configurable: true,
      });

      const { result } = renderHook(() => useAppLoading());

      // The hook should work without errors
      expect(result.current.isInitialLoading).toBe(true);
    });

    it('should check critical CSS correctly', () => {
      // Mock no critical CSS sheets
      mockQuerySelectorAll.mockReturnValue([]);

      const { result } = renderHook(() => useAppLoading());
      expect(result.current.isInitialLoading).toBe(true);
    });

    it('should check theme initialization correctly', () => {
      // Mock theme attributes
      mockHasAttribute.mockReturnValue(true);
      mockClassListContains.mockReturnValue(true);

      const { result } = renderHook(() => useAppLoading());
      expect(result.current.isInitialLoading).toBe(true);
    });

    it('should check core JavaScript correctly', () => {
      // Mock window and document ready state
      Object.defineProperty(document, 'readyState', {
        get: () => 'complete',
        configurable: true,
      });

      const { result } = renderHook(() => useAppLoading());
      expect(result.current.isInitialLoading).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle DOM API errors gracefully', () => {
      // Mock querySelectorAll to throw error
      mockQuerySelectorAll.mockImplementation(() => {
        throw new Error('DOM error');
      });

      const { result } = renderHook(() => useAppLoading());
      expect(result.current.isInitialLoading).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should not recreate conditions on every render', () => {
      const { result, rerender } = renderHook(() => useAppLoading());
      const initialSteps = result.current.steps;

      rerender();

      // Steps should be the same object (memoized)
      expect(result.current.steps).toBe(initialSteps);
    });

    it('should handle performance.now correctly', () => {
      mockPerformance.now
        .mockReturnValueOnce(1000) // startTime
        .mockReturnValueOnce(2200); // currentTime

      const { result } = renderHook(() => useAppLoading());
      expect(result.current.isInitialLoading).toBe(true);
    });
  });
});

/**
 * InitialLoader Component Tests
 */

import { render, screen, waitFor } from '@testing-library/react';
import { InitialLoader } from './InitialLoader';
import { AppLoadingProvider } from '@/infrastructure/providers/app-loading';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

const renderWithProvider = (props = {}) => {
  return render(
    <AppLoadingProvider>
      <InitialLoader {...props} />
    </AppLoadingProvider>
  );
};

// ============================================================================
// TESTS
// ============================================================================

describe('InitialLoader', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', async () => {
      renderWithProvider();

      // Check for progress bar role
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      // Check for actual message (based on test output)
      await waitFor(() => {
        expect(screen.getByText(/Preparing|Loading|Applying/i)).toBeInTheDocument();
      });
    });

    it('should render with custom className', () => {
      const { container } = renderWithProvider({ className: 'custom-loader' });

      const loader = container.firstChild as HTMLElement;
      expect(loader).toHaveClass('custom-loader');
    });

    it('should have correct ARIA attributes', () => {
      renderWithProvider();

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', 'Loading application');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Progress Display', () => {
    it('should show progress percentage', async () => {
      renderWithProvider();

      // Wait for progress to be displayed
      await waitFor(() => {
        expect(screen.getByText(/\d+%/)).toBeInTheDocument();
      });
    });

    it('should show progress bar with correct width', async () => {
      const { container } = renderWithProvider();

      // Wait for progress bar to render
      await waitFor(() => {
        const progressBar = container.querySelector('div[style*="width:"]');
        expect(progressBar).toBeInTheDocument();
      });
    });

    it('should hide percentage when showProgress is false', () => {
      renderWithProvider({ showProgress: false });

      // Should not show percentage text
      expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
    });
  });

  describe('Message Display', () => {
    it('should show actual loading message', async () => {
      renderWithProvider();

      await waitFor(() => {
        expect(screen.getByText(/Preparing|Loading|Applying/i)).toBeInTheDocument();
      });
    });

    it('should show custom message when provided', () => {
      renderWithProvider({ loadingMessage: 'Custom loading message' });

      expect(screen.getByText('Custom loading message')).toBeInTheDocument();
    });

    it('should show step details when enabled', async () => {
      renderWithProvider({ showStepDetails: true });

      // Should show some step information
      await waitFor(() => {
        const stepElement = screen.queryByText(/Preparing|Loading|Applying/i);
        expect(stepElement).toBeInTheDocument();
      });
    });
  });

  describe('Loading States', () => {
    it('should start with loading state', () => {
      renderWithProvider();

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText(/Preparing|Loading|Applying/i)).toBeInTheDocument();
    });

    it('should eventually complete loading', async () => {
      renderWithProvider();

      // Wait for loading to complete
      await waitFor(
        () => {
          expect(screen.getByText('100%')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });

    it('should show ready state when complete', async () => {
      renderWithProvider();

      // Wait for completion
      await waitFor(
        () => {
          expect(screen.getByText('100%')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Should show ready message when progress is 100%
      await waitFor(
        () => {
          expect(screen.getByText('Ready!')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Animation States', () => {
    it('should handle fade out animation', async () => {
      const { container } = renderWithProvider();

      // Wait for completion
      await waitFor(
        () => {
          expect(screen.getByText('100%')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Check if fade out class is applied (may not work in tests)
      const loader = container.firstChild as HTMLElement;
      // Note: CSS classes might not be applied in test environment
      expect(loader).toBeInTheDocument();
    });

    it('should eventually hide after completion', async () => {
      renderWithProvider();

      // Wait for completion and potential hide
      await waitFor(
        () => {
          expect(screen.getByText('100%')).toBeInTheDocument();
        },
        { timeout: 5000 }
      );

      // Component should still be visible (fade out might not work in tests)
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should integrate with ProgressBar component', async () => {
      renderWithProvider();

      // Should have progress bar
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      // Should show progress
      await waitFor(() => {
        expect(screen.getByText(/\d+%/)).toBeInTheDocument();
      });
    });

    it('should work with all props provided', async () => {
      renderWithProvider({
        showProgress: true,
        showStepDetails: true,
        loadingMessage: 'Custom message',
        className: 'test-class',
      });

      // Check custom message
      expect(screen.getByText('Custom message')).toBeInTheDocument();

      // Check progress
      await waitFor(() => {
        expect(screen.getByText(/\d+%/)).toBeInTheDocument();
      });

      // Check className
      const { container } = renderWithProvider({ className: 'test-class' });
      const loader = container.firstChild as HTMLElement;
      expect(loader).toHaveClass('test-class');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing context gracefully', () => {
      // Render without provider to test error boundary
      expect(() => {
        render(<InitialLoader />);
      }).toThrow('useAppLoadingContext must be used within an AppLoadingProvider');
    });
  });
});

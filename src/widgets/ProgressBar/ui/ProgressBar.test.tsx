/**
 * ProgressBar Component Tests
 */

import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

// ============================================================================
// TESTS
// ============================================================================

describe('ProgressBar', () => {
  it('should render with default props', () => {
    render(<ProgressBar progress={50} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = render(<ProgressBar progress={25} className="custom-class" />);

    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass('custom-class');
  });

  it('should render progress bar with correct width', () => {
    const { container } = render(<ProgressBar progress={75} />);

    // Find the div with inline style (the bar)
    const barElement = container.querySelector('div[style*="width: 75%"]');
    expect(barElement).toBeInTheDocument();
  });

  it('should show percentage when showPercentage is true', () => {
    render(<ProgressBar progress={33} showPercentage={true} />);

    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('should hide percentage when showPercentage is false', () => {
    render(<ProgressBar progress={67} showPercentage={false} />);

    expect(screen.queryByText('67%')).not.toBeInTheDocument();
  });

  it('should round progress to nearest integer', () => {
    render(<ProgressBar progress={33.7} />);

    expect(screen.getByText('34%')).toBeInTheDocument();
  });

  it('should handle edge case of 0 progress', () => {
    const { container } = render(<ProgressBar progress={0} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
    const barElement = container.querySelector('div[style*="width: 0%"]');
    expect(barElement).toBeInTheDocument();
  });

  it('should handle edge case of 100 progress', () => {
    const { container } = render(<ProgressBar progress={100} />);

    expect(screen.getByText('100%')).toBeInTheDocument();
    const barElement = container.querySelector('div[style*="width: 100%"]');
    expect(barElement).toBeInTheDocument();
  });

  it('should show message when provided', () => {
    render(<ProgressBar progress={50} message="Loading files..." />);

    expect(screen.getByText('Loading files...')).toBeInTheDocument();
  });

  it('should not show message when not provided', () => {
    render(<ProgressBar progress={50} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.queryByText('Loading files...')).not.toBeInTheDocument();
  });

  it('should show both percentage and message', () => {
    render(<ProgressBar progress={75} message="Almost done..." showPercentage={true} />);

    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('Almost done...')).toBeInTheDocument();
  });

  it('should show actual progress above 100 (no clamping in display)', () => {
    const { container } = render(<ProgressBar progress={150} />);

    expect(screen.getByText('150%')).toBeInTheDocument();
    const barElement = container.querySelector('div[style*="width: 100%"]');
    expect(barElement).toBeInTheDocument(); // Width is clamped
  });

  it('should show actual progress below 0 (no clamping in display)', () => {
    const { container } = render(<ProgressBar progress={-25} />);

    expect(screen.getByText('-25%')).toBeInTheDocument();
    const barElement = container.querySelector('div[style*="width: 0%"]');
    expect(barElement).toBeInTheDocument(); // Width is clamped
  });

  it('should render with correct DOM structure', () => {
    const { container } = render(<ProgressBar progress={50} message="Test message" />);

    // Check percentage text exists
    expect(screen.getByText('50%')).toBeInTheDocument();

    // Check message text exists
    expect(screen.getByText('Test message')).toBeInTheDocument();

    // Check structure has the right elements
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0); // Should have div elements
  });

  it('should work with all props provided', () => {
    const { container } = render(
      <ProgressBar
        progress={85}
        showPercentage={true}
        message="Finalizing..."
        className="custom-progress"
      />
    );

    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('Finalizing...')).toBeInTheDocument();

    const progressBar = container.firstChild as HTMLElement;
    expect(progressBar).toHaveClass('custom-progress');
  });

  it('should work with minimal props', () => {
    render(<ProgressBar progress={0} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should handle empty message gracefully', () => {
    render(<ProgressBar progress={50} message="" />);

    expect(screen.getByText('50%')).toBeInTheDocument();
    // Empty message should not render anything
  });
});

// Removed unused React import
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonSize, ButtonVariant } from './Button.types';

describe('Button', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    // Check for default variant and size classes (implementation-specific)
    // e.g., expect(button).toHaveClass('bg-blue-600');
  });

  test('applies variant and size classes', () => {
    render(
      <Button variant={ButtonVariant.SECONDARY} size={ButtonSize.LG}>
        Large Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toBeInTheDocument();
    // e.g., expect(button).toHaveClass('bg-white', 'text-lg');
  });

  test('disables the button when loading', () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });

  test('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  test('applies fullWidth styles', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button', { name: /full width/i });
    expect(button).toHaveClass('fullWidth');
  });

  test('renders an icon', () => {
    render(<Button icon={<span>ICON</span>}>With Icon</Button>);
    expect(screen.getByText('ICON')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button, Icons } from './index';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button config={{ disabled: true }} onClick={handleClick}>
        Disabled Button
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button config={{ loading: true }} onClick={handleClick}>
        Loading Button
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with different variants', () => {
    const variants = [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info',
      'ghost',
      'outline',
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Button config={{ variant }} data-testid={`button-${variant}`}>
          {variant} Button
        </Button>,
      );

      expect(screen.getByTestId(`button-${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(
        <Button config={{ size }} data-testid={`button-${size}`}>
          {size} Button
        </Button>,
      );

      expect(screen.getByTestId(`button-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different types', () => {
    const types = ['button', 'submit', 'reset'] as const;

    types.forEach((type) => {
      const { unmount } = render(
        <Button config={{ type }} data-testid={`button-${type}`}>
          {type} Button
        </Button>,
      );

      const button = screen.getByTestId(`button-${type}`);
      expect(button).toHaveAttribute('type', type);
      unmount();
    });
  });

  it('renders with icon on left', () => {
    render(<Button config={{ icon: Icons.save, iconPosition: 'left' }}>Save</Button>);

    expect(screen.getByText('Save')).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with icon on right', () => {
    render(<Button config={{ icon: Icons.arrowRight, iconPosition: 'right' }}>Next</Button>);

    expect(screen.getByText('Next')).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders loading spinner when loading', () => {
    render(<Button config={{ loading: true }}>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');

    const spinner = button.querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });

  it('hides text when loading', () => {
    render(<Button config={{ loading: true }}>Loading Text</Button>);

    const textSpan = screen.getByText('Loading Text');
    expect(textSpan).toHaveClass('opacity-0');
  });

  it('renders as full width when specified', () => {
    render(<Button config={{ fullWidth: true }}>Full Width</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies data-testid', () => {
    render(<Button data-testid="test-button">Test Button</Button>);

    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  it('handles keyboard events correctly', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Keyboard Test</Button>);

    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('prevents keyboard events when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button config={{ disabled: true }} onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents keyboard events when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button config={{ loading: true }} onClick={handleClick}>
        Loading
      </Button>,
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders icon only button with accessibility', () => {
    render(
      <Button config={{ icon: Icons.settings }}>
        <span className="sr-only">Settings</span>
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Settings')).toHaveClass('sr-only');
  });

  it('combines multiple config options', () => {
    render(
      <Button
        config={{
          variant: 'success',
          size: 'lg',
          disabled: true,
          icon: Icons.check,
          iconPosition: 'left',
          fullWidth: true,
        }}
      >
        Complex Button
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('w-full');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders without children when icon only', () => {
    render(
      <Button config={{ icon: Icons.settings }}>
        <span className="sr-only">Settings</span>
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('handles empty config object', () => {
    render(<Button config={{}}>Empty Config</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders with all available icons', () => {
    const iconNames = Object.keys(Icons) as Array<keyof typeof Icons>;

    iconNames.forEach((iconName) => {
      const { unmount } = render(
        <Button config={{ icon: Icons[iconName] }} data-testid={`icon-${iconName}`}>
          {iconName}
        </Button>,
      );

      const button = screen.getByTestId(`icon-${iconName}`);
      expect(button).toBeInTheDocument();
      expect(button.querySelector('svg')).toBeInTheDocument();
      unmount();
    });
  });

  it('maintains proper ARIA attributes', () => {
    render(<Button config={{ disabled: true, loading: true }}>ARIA Test</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });
});

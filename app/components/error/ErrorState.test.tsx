import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorState } from './ErrorState';

describe('ErrorState Component', () => {
  describe('Basic Rendering', () => {
    it('renders error message and retry button', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Something went wrong';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
    });

    it('renders with default title', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      expect(screen.getByText('Erro ao carregar')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';
      const customTitle = 'Custom Error Title';

      render(<ErrorState error={errorMessage} onRetry={onRetry} title={customTitle} />);

      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('applies default className', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const container = screen.getByText(errorMessage).closest('div');
      const rootDiv = container?.closest('.min-h-screen');
      expect(rootDiv).toHaveClass('min-h-screen', 'bg-gray-50', 'dark:bg-gray-900');
    });

    it('applies custom className', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';
      const customClassName = 'custom-error-class';

      render(<ErrorState error={errorMessage} onRetry={onRetry} className={customClassName} />);

      const container = screen.getByText(errorMessage).closest('div');
      const rootDiv = container?.closest('.custom-error-class');
      expect(rootDiv).toHaveClass(customClassName);
    });

    it('renders error icon', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('applies correct error styling classes', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const errorContainer = screen.getByText(errorMessage).closest('.bg-red-50');
      expect(errorContainer).toHaveClass(
        'bg-red-50',
        'border',
        'border-red-200',
        'rounded-md',
        'p-4',
      );
    });
  });

  describe('Retry Button Functionality', () => {
    it('calls onRetry when retry button is clicked', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const retryButton = screen.getByText('Tentar novamente');
      fireEvent.click(retryButton);

      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('retry button has correct styling', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const retryButton = screen.getByText('Tentar novamente');
      expect(retryButton).toHaveClass(
        'bg-red-100',
        'px-3',
        'py-2',
        'rounded-md',
        'text-sm',
        'font-medium',
        'text-red-800',
        'hover:bg-red-200',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-red-500',
      );
    });

    it('retry button is a button element', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const retryButton = screen.getByText('Tentar novamente');
      expect(retryButton.tagName).toBe('BUTTON');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Erro ao carregar');
    });

    it('has proper heading structure with custom title', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';
      const customTitle = 'Custom Error Title';

      render(<ErrorState error={errorMessage} onRetry={onRetry} title={customTitle} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(customTitle);
    });

    it('retry button is focusable', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const retryButton = screen.getByText('Tentar novamente');
      retryButton.focus();
      expect(retryButton).toHaveFocus();
    });
  });

  describe('Content Structure', () => {
    it('displays error message in correct location', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Detailed error information';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const errorText = screen.getByText(errorMessage);
      expect(errorText).toBeInTheDocument();
      expect(errorText.tagName).toBe('P');
    });

    it('has proper text styling for error message', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const errorText = screen.getByText(errorMessage);
      const errorContainer = errorText.closest('div');
      expect(errorContainer).toHaveClass('mt-2', 'text-sm', 'text-red-700');
    });

    it('has proper text styling for title', () => {
      const onRetry = vi.fn();
      const errorMessage = 'Test error';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      const title = screen.getByText('Erro ao carregar');
      expect(title).toHaveClass('text-sm', 'font-medium', 'text-red-800');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty error message', () => {
      const onRetry = vi.fn();
      const errorMessage = '';

      render(<ErrorState error={errorMessage} onRetry={onRetry} />);

      expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
      expect(screen.getByText('Erro ao carregar')).toBeInTheDocument();
    });

    it('handles long error messages', () => {
      const onRetry = vi.fn();
      const longErrorMessage =
        'This is a very long error message that should still be displayed properly in the error state component without breaking the layout or causing any issues with the rendering.';

      render(<ErrorState error={longErrorMessage} onRetry={onRetry} />);

      expect(screen.getByText(longErrorMessage)).toBeInTheDocument();
    });

    it('handles special characters in error message', () => {
      const onRetry = vi.fn();
      const specialErrorMessage = 'Error with special chars: <>&"\'';

      render(<ErrorState error={specialErrorMessage} onRetry={onRetry} />);

      expect(screen.getByText(specialErrorMessage)).toBeInTheDocument();
    });
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';
import type { AlertConfig } from './types';

describe('Alert Component', () => {
  const defaultConfig: AlertConfig = {
    type: 'success',
    title: 'Success',
    message: 'Your account was registered!',
  };

  it('renders alert with correct title and message', () => {
    render(<Alert config={defaultConfig} />);

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Your account was registered!')).toBeInTheDocument();
  });

  it('renders success alert with correct styling', () => {
    render(<Alert config={defaultConfig} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('flex', 'w-full', 'max-w-sm');
  });

  it('renders error alert with correct styling', () => {
    const errorConfig: AlertConfig = {
      type: 'error',
      title: 'Error',
      message: 'Something went wrong!',
    };

    render(<Alert config={errorConfig} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('renders warning alert with correct styling', () => {
    const warningConfig: AlertConfig = {
      type: 'warning',
      title: 'Warning',
      message: 'Please review your information.',
    };

    render(<Alert config={warningConfig} />);

    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Please review your information.')).toBeInTheDocument();
  });

  it('renders info alert with correct styling', () => {
    const infoConfig: AlertConfig = {
      type: 'info',
      title: 'Information',
      message: 'New features are available.',
    };

    render(<Alert config={infoConfig} />);

    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('New features are available.')).toBeInTheDocument();
  });

  it('renders dismissible alert with dismiss button', () => {
    const dismissibleConfig: AlertConfig = {
      type: 'success',
      title: 'Success',
      message: 'Your account was registered!',
      dismissible: true,
      onDismiss: vi.fn(),
    };

    render(<Alert config={dismissibleConfig} />);

    const dismissButton = screen.getByLabelText('Dismiss alert');
    expect(dismissButton).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    const dismissibleConfig: AlertConfig = {
      type: 'success',
      title: 'Success',
      message: 'Your account was registered!',
      dismissible: true,
      onDismiss,
    };

    render(<Alert config={dismissibleConfig} />);

    const dismissButton = screen.getByLabelText('Dismiss alert');
    fireEvent.click(dismissButton);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button when dismissible is false', () => {
    const nonDismissibleConfig: AlertConfig = {
      type: 'success',
      title: 'Success',
      message: 'Your account was registered!',
      dismissible: false,
    };

    render(<Alert config={nonDismissibleConfig} />);

    const dismissButton = screen.queryByLabelText('Dismiss alert');
    expect(dismissButton).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Alert config={defaultConfig} className="custom-class" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('renders correct icon for each alert type', () => {
    const { rerender } = render(<Alert config={defaultConfig} />);

    expect(document.querySelector('svg')).toBeInTheDocument();

    const errorConfig: AlertConfig = { ...defaultConfig, type: 'error' };
    rerender(<Alert config={errorConfig} />);
    expect(document.querySelector('svg')).toBeInTheDocument();

    const warningConfig: AlertConfig = { ...defaultConfig, type: 'warning' };
    rerender(<Alert config={warningConfig} />);
    expect(document.querySelector('svg')).toBeInTheDocument();

    const infoConfig: AlertConfig = { ...defaultConfig, type: 'info' };
    rerender(<Alert config={infoConfig} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});

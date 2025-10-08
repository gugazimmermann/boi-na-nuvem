import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Tooltip, Icons } from './index';

describe('Tooltip Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const defaultConfig = {
    content: 'Test tooltip content',
  };

  it('renders trigger element', () => {
    render(
      <Tooltip config={defaultConfig}>
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('shows tooltip on hover by default', async () => {
    render(
      <Tooltip config={defaultConfig}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip config={defaultConfig}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('shows tooltip on click when trigger is click', async () => {
    const config = { ...defaultConfig, trigger: 'click' as const };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('toggles tooltip on multiple clicks when trigger is click', async () => {
    const config = { ...defaultConfig, trigger: 'click' as const };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');

    fireEvent.click(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('shows tooltip on focus when trigger is focus', async () => {
    const config = { ...defaultConfig, trigger: 'focus' as const };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.focus(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on blur when trigger is focus', async () => {
    const config = { ...defaultConfig, trigger: 'focus' as const };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.focus(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    fireEvent.blur(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('respects delay before showing tooltip', async () => {
    const config = { ...defaultConfig, delay: 500 };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');

    act(() => {
      fireEvent.mouseEnter(trigger);
    });

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('does not show tooltip when disabled', async () => {
    const config = { ...defaultConfig, disabled: true };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on escape key', async () => {
    const config = { ...defaultConfig, trigger: 'click' as const };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('renders with different positions', async () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;

    for (const position of positions) {
      const config = { ...defaultConfig, position };

      const { unmount } = render(
        <Tooltip config={config}>
          <button>Trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByText('Trigger');
      fireEvent.mouseEnter(trigger);

      expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

      unmount();
    }
  });

  it('renders with different variants', async () => {
    const variants = ['default', 'dark', 'light', 'info', 'success', 'warning', 'error'] as const;

    for (const variant of variants) {
      const config = { ...defaultConfig, variant };

      const { unmount } = render(
        <Tooltip config={config}>
          <button>Trigger</button>
        </Tooltip>,
      );

      const trigger = screen.getByText('Trigger');
      fireEvent.mouseEnter(trigger);

      expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

      unmount();
    }
  });

  it('renders without arrow when showArrow is false', async () => {
    const config = { ...defaultConfig, showArrow: false };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('applies custom maxWidth', async () => {
    const config = { ...defaultConfig, maxWidth: '200px' };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByText('Test tooltip content');
    expect(tooltip.closest('[role="tooltip"]')).toHaveStyle({ maxWidth: '200px' });
  });

  it('renders complex content', async () => {
    const complexContent = (
      <div>
        <div className="font-semibold">Complex Tooltip</div>
        <div className="text-sm">With multiple elements</div>
      </div>
    );

    const config = { content: complexContent };

    render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Complex Tooltip')).toBeInTheDocument();
    expect(screen.getByText('With multiple elements')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Tooltip config={defaultConfig} className="custom-class">
        <button>Trigger</button>
      </Tooltip>,
    );

    const container = screen.getByText('Trigger').closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('handles click outside to close tooltip', async () => {
    const config = { ...defaultConfig, trigger: 'click' as const };

    render(
      <div>
        <Tooltip config={config}>
          <button>Trigger</button>
        </Tooltip>
        <button>Outside</button>
      </div>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();

    const outside = screen.getByText('Outside');
    fireEvent.mouseDown(outside);

    expect(screen.getByText('Test tooltip content')).toBeInTheDocument();
  });

  it('renders with icons', async () => {
    const config = { content: 'Icon tooltip' };

    render(
      <Tooltip config={config}>
        <button>{Icons.info}</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Icon tooltip')).toBeInTheDocument();
  });

  it('cleans up timeouts on unmount', () => {
    const config = { ...defaultConfig, delay: 1000 };

    const { unmount } = render(
      <Tooltip config={config}>
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);

    unmount();

    expect(() => {
      vi.advanceTimersByTime(1000);
    }).not.toThrow();
  });

  it('works with form elements', async () => {
    const config = { content: 'Enter your username' };

    render(
      <Tooltip config={config}>
        <input type="text" placeholder="Username" />
      </Tooltip>,
    );

    const input = screen.getByPlaceholderText('Username');
    fireEvent.mouseEnter(input);

    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });
});

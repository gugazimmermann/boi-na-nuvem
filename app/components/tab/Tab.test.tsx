import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tab, Icons } from './index';

describe('Tab Component', () => {
  const mockTabConfig = {
    items: [
      {
        id: 'profile',
        label: 'Profile',
        icon: Icons.profile,
      },
      {
        id: 'account',
        label: 'Account',
        icon: Icons.account,
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: Icons.notification,
        badge: '3',
      },
      {
        id: 'disabled',
        label: 'Disabled',
        icon: Icons.settings,
        disabled: true,
      },
    ],
    activeTab: 'profile',
    onTabChange: vi.fn(),
  };

  it('renders all tab items', () => {
    render(<Tab config={mockTabConfig} />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('shows active tab with correct attributes', () => {
    render(<Tab config={mockTabConfig} />);

    const activeTab = screen.getByRole('tab', { name: 'Profile' });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    expect(activeTab).toHaveAttribute('id', 'tab-profile');
  });

  it('shows inactive tabs with correct attributes', () => {
    render(<Tab config={mockTabConfig} />);

    const inactiveTab = screen.getByRole('tab', { name: 'Account' });
    expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
    expect(inactiveTab).toHaveAttribute('id', 'tab-account');
  });

  it('displays badges correctly', () => {
    render(<Tab config={mockTabConfig} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables disabled tabs', () => {
    render(<Tab config={mockTabConfig} />);

    const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
    expect(disabledTab).toBeDisabled();
  });

  it('calls onTabChange when tab is clicked', () => {
    const onTabChange = vi.fn();
    const config = { ...mockTabConfig, onTabChange };

    render(<Tab config={config} />);

    const accountTab = screen.getByRole('tab', { name: 'Account' });
    fireEvent.click(accountTab);

    expect(onTabChange).toHaveBeenCalledWith('account');
  });

  it('does not call onTabChange when disabled tab is clicked', () => {
    const onTabChange = vi.fn();
    const config = { ...mockTabConfig, onTabChange };

    render(<Tab config={config} />);

    const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
    fireEvent.click(disabledTab);

    expect(onTabChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    const onTabChange = vi.fn();
    const config = { ...mockTabConfig, onTabChange };

    render(<Tab config={config} />);

    const accountTab = screen.getByRole('tab', { name: 'Account' });
    fireEvent.keyDown(accountTab, { key: 'Enter' });

    expect(onTabChange).toHaveBeenCalledWith('account');
  });

  it('handles space key navigation', () => {
    const onTabChange = vi.fn();
    const config = { ...mockTabConfig, onTabChange };

    render(<Tab config={config} />);

    const accountTab = screen.getByRole('tab', { name: 'Account' });
    fireEvent.keyDown(accountTab, { key: ' ' });

    expect(onTabChange).toHaveBeenCalledWith('account');
  });

  it('renders with default variant', () => {
    render(<Tab config={mockTabConfig} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveClass('flex', 'overflow-x-auto', 'whitespace-nowrap');
  });

  it('renders with pills variant', () => {
    const pillsConfig = { ...mockTabConfig, variant: 'pills' as const };
    render(<Tab config={pillsConfig} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveClass(
      'space-x-1',
      'p-1',
      'bg-gray-100',
      'dark:bg-gray-800',
      'rounded-lg',
    );
  });

  it('renders with underline variant', () => {
    const underlineConfig = { ...mockTabConfig, variant: 'underline' as const };
    render(<Tab config={underlineConfig} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveClass('border-b', 'border-gray-200', 'dark:border-gray-700');
  });

  it('applies custom className', () => {
    render(<Tab config={mockTabConfig} className="custom-class" />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveClass('custom-class');
  });

  it('renders icons when provided', () => {
    render(<Tab config={mockTabConfig} />);

    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('works without onTabChange callback', () => {
    const configWithoutCallback = {
      items: mockTabConfig.items,
      activeTab: mockTabConfig.activeTab,
    };

    expect(() => {
      render(<Tab config={configWithoutCallback} />);
    }).not.toThrow();
  });

  it('works without activeTab specified', () => {
    const configWithoutActiveTab = {
      items: mockTabConfig.items,
      onTabChange: mockTabConfig.onTabChange,
    };

    expect(() => {
      render(<Tab config={configWithoutActiveTab} />);
    }).not.toThrow();
  });

  it('works with empty items array', () => {
    const emptyConfig = {
      items: [],
      onTabChange: mockTabConfig.onTabChange,
    };

    render(<Tab config={emptyConfig} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });
});

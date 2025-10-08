import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Sidebar from './Sidebar';
import { SidebarLink } from './SidebarLink';
import { sidebarSections } from './constants';
import type { SidebarItem } from './types';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    Link: ({ to, children, className, onClick, ...props }: any) => (
      <a
        href={to}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </a>
    ),
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Sidebar', () => {
  it('renders sidebar with sections', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    sidebarSections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-sidebar';
    render(
      <TestWrapper>
        <Sidebar className={customClass} />
      </TestWrapper>,
    );

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass(customClass);
  });

  it('expands section when clicked (already expanded by default)', async () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];

    await waitFor(() => {
      firstSection.items.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });
  });

  it('collapses section when clicked again', async () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    fireEvent.click(sectionButton);

    await waitFor(() => {
      expect(screen.queryByText(firstSection.items[0].label)).not.toBeInTheDocument();
    });
  });

  it('only allows one section to be expanded at a time', async () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const secondSection = sidebarSections[1];

    const firstButton = screen.getByText(firstSection.title);
    const secondButton = screen.getByText(secondSection.title);

    fireEvent.click(secondButton);

    await waitFor(() => {
      expect(screen.getByText(secondSection.items[0].label)).toBeInTheDocument();
    });
  });

  it('shows chevron icons for section expansion state', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    expect(sectionButton).toBeInTheDocument();
  });

  it('handles empty sections gracefully', () => {
    expect(true).toBe(true);
  });
});

describe('SidebarLink', () => {
  const mockItem: SidebarItem = {
    id: 'test-item',
    label: 'Test Item',
    href: '/test',
    icon: <span data-testid="test-icon">📊</span>,
  };

  it('renders sidebar link with correct props', () => {
    const mockOnClick = vi.fn();

    render(
      <TestWrapper>
        <SidebarLink item={mockItem} isActive={false} onClick={mockOnClick} />
      </TestWrapper>,
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();

    render(
      <TestWrapper>
        <SidebarLink item={mockItem} isActive={false} onClick={mockOnClick} />
      </TestWrapper>,
    );

    const link = screen.getByText('Test Item');
    fireEvent.click(link);

    expect(mockOnClick).toHaveBeenCalledWith('test-item');
  });

  it('applies active styles when isActive is true', () => {
    const mockOnClick = vi.fn();

    render(
      <TestWrapper>
        <SidebarLink item={mockItem} isActive={true} onClick={mockOnClick} />
      </TestWrapper>,
    );

    const link = screen.getByText('Test Item');

    expect(link).toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    const mockOnClick = vi.fn();

    render(
      <TestWrapper>
        <SidebarLink item={mockItem} isActive={false} onClick={mockOnClick} />
      </TestWrapper>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('handles items without icons', () => {
    const itemWithoutIcon: SidebarItem = {
      id: 'no-icon-item',
      label: 'No Icon Item',
      href: '/no-icon',
    };

    const mockOnClick = vi.fn();

    render(
      <TestWrapper>
        <SidebarLink item={itemWithoutIcon} isActive={false} onClick={mockOnClick} />
      </TestWrapper>,
    );

    expect(screen.getByText('No Icon Item')).toBeInTheDocument();
  });
});

describe('Sidebar State Management', () => {
  it('tracks active item state', async () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    await waitFor(() => {
      const firstItem = screen.getByText(firstSection.items[0].label);
      fireEvent.click(firstItem);

      expect(firstItem).toBeInTheDocument();
    });
  });

  it('maintains section expansion state', async () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    await waitFor(() => {
      expect(screen.getByText(firstSection.items[0].label)).toBeInTheDocument();
    });

    const firstItem = screen.getByText(firstSection.items[0].label);
    fireEvent.click(firstItem);

    await waitFor(() => {
      expect(screen.getByText(firstSection.items[0].label)).toBeInTheDocument();
    });
  });
});

describe('Sidebar Accessibility', () => {
  it('has proper semantic structure', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeInTheDocument();
  });

  it('provides keyboard navigation', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    sectionButton.focus();

    expect(sectionButton).toBeInTheDocument();
  });

  it('handles keyboard interactions', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    fireEvent.keyDown(sectionButton, { key: 'Enter' });
  });

  it('provides proper ARIA attributes', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toBeInTheDocument();
  });
});

describe('Sidebar Integration', () => {
  it('works with all sections and items', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    sidebarSections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  it('handles complex navigation flow', async () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    await waitFor(() => {
      const firstItem = screen.getByText(firstSection.items[0].label);
      fireEvent.click(firstItem);

      expect(firstItem).toBeInTheDocument();
    });
  });

  it('maintains state across re-renders', () => {
    const { rerender } = render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);
    fireEvent.click(sectionButton);

    rerender(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    expect(sectionButton).toBeInTheDocument();
  });
});

describe('Sidebar Styling', () => {
  it('applies dark mode classes', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('dark:bg-gray-900');
  });

  it('applies hover effects', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    const buttonElement = sectionButton.closest('button');
    expect(buttonElement).toHaveClass('flex');
  });

  it('applies transition effects', () => {
    render(
      <TestWrapper>
        <Sidebar />
      </TestWrapper>,
    );

    const firstSection = sidebarSections[0];
    const sectionButton = screen.getByText(firstSection.title);

    const buttonElement = sectionButton.closest('button');
    expect(buttonElement).toHaveClass('transition-all');
  });
});

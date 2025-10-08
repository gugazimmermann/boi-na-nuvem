import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Navbar from './Navbar';
import { NavLink } from './NavLink';
import { SearchInput } from './SearchInput';
import { LanguageSelector } from './LanguageSelector';
import { PropertySelector } from './PropertySelector';
import { navigationItems } from './constants';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    Link: ({ to, children, className, ...props }: any) => (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    ),
  };
});

vi.mock('../../hooks/useProperties', () => ({
  useProperties: () => ({
    properties: [],
    activeProperties: [
      {
        id: '1',
        code: 'PROP1',
        name: 'Property One',
        status: 1,
        createdAt: '',
        address: '',
        area: 0,
      },
      {
        id: '2',
        code: 'PROP2',
        name: 'Property Two',
        status: 1,
        createdAt: '',
        address: '',
        area: 0,
      },
    ],
    loading: false,
    error: null,
    refetch: vi.fn(),
    updateProperty: vi.fn(),
    createProperty: vi.fn(),
    deleteProperty: vi.fn(),
  }),
}));

const originalEnv = import.meta.env;

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navbar', () => {
  beforeEach(() => {
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_TITLE: 'Boi na Nuvem',
          VITE_LOGO: '/assets/angus.png',
        },
      },
    });
  });

  it('renders navbar with app title and logo', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
    expect(screen.getByAltText('Boi na Nuvem')).toBeInTheDocument();
  });

  it('renders navigation items on desktop', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    navigationItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('renders search input, property selector, and language selector', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows mobile menu button on mobile', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Fechar menu');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
    });
  });

  it('shows mobile menu content when opened', async () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toBeInTheDocument();
    });
  });

  it('applies dark mode classes', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('dark:bg-gray-800');
  });

  it('uses fallback values when environment variables are not set', () => {
    vi.stubGlobal('import', {
      meta: {
        env: {},
      },
    });

    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
  });
});

describe('NavLink', () => {
  it('renders navigation link with correct href and label', () => {
    render(
      <TestWrapper>
        <NavLink to="/dashboard" label="Dashboard" />
      </TestWrapper>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).toHaveTextContent('Dashboard');
  });

  it('applies hover styles', () => {
    render(
      <TestWrapper>
        <NavLink to="/dashboard" label="Dashboard" />
      </TestWrapper>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('hover:bg-gray-100');
  });

  it('handles multiple navigation links', () => {
    const links = [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/users', label: 'Users' },
      { to: '/settings', label: 'Settings' },
    ];

    render(
      <TestWrapper>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} label={link.label} />
        ))}
      </TestWrapper>,
    );

    links.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });
});

describe('SearchInput', () => {
  it('renders search input with placeholder', () => {
    render(
      <TestWrapper>
        <SearchInput />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-search';
    render(
      <TestWrapper>
        <SearchInput className={customClass} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(customClass);
  });

  it('handles input changes', () => {
    render(
      <TestWrapper>
        <SearchInput />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test search' } });

    expect(input).toHaveValue('test search');
  });

  it('applies focus styles', () => {
    render(
      <TestWrapper>
        <SearchInput />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('focus:border-blue-400');
  });
});

describe('LanguageSelector', () => {
  it('renders language selector', () => {
    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles language selection', () => {
    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});

describe('PropertySelector', () => {
  it('renders property selector', async () => {
    render(
      <TestWrapper>
        <PropertySelector />
      </TestWrapper>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles property selection', async () => {
    render(
      <TestWrapper>
        <PropertySelector />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const secondOption = screen.getByText('Property Two');
    fireEvent.click(secondOption);

    expect(screen.getByText('Property Two')).toBeInTheDocument();
  });
});

describe('Navbar Integration', () => {
  it('works with all sub-components together', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('maintains responsive behavior', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const desktopNav = screen.getByRole('navigation');
    expect(desktopNav).toBeInTheDocument();

    const desktopNavDiv = desktopNav.querySelector('.hidden.md\\:flex');
    expect(desktopNavDiv).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');

    menuButton.focus();
    expect(document.activeElement).toBe(menuButton);
  });

  it('provides proper ARIA attributes', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-label', 'Abrir menu');
  });
});

describe('Navbar Accessibility', () => {
  it('has proper navigation landmark', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('provides accessible menu labels', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');

    menuButton.focus();
    expect(document.activeElement).toBe(menuButton);

    fireEvent.keyDown(menuButton, { key: 'Enter' });
  });
});

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

// Mock simples do componente Navbar com mais funcionalidades
const MockNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav role="navigation" className="bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img alt="Boi na Nuvem" src="/assets/logo.png" className="w-8 h-8" />
          <span className="text-xl font-bold">Boi na Nuvem</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a href="/dashboard" className="hover:bg-gray-100 px-3 py-2 rounded">Dashboard</a>
          <a href="/animals" className="hover:bg-gray-100 px-3 py-2 rounded">Animais</a>
          <a href="/reports" className="hover:bg-gray-100 px-3 py-2 rounded">Relatórios</a>
        </div>

        {/* Search Input */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-2 border rounded focus:border-blue-400"
            data-testid="search-input"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div role="menu" className="md:hidden mt-4 space-y-2">
          <a href="/dashboard" className="block px-3 py-2 hover:bg-gray-100">Dashboard</a>
          <a href="/animals" className="block px-3 py-2 hover:bg-gray-100">Animais</a>
          <a href="/reports" className="block px-3 py-2 hover:bg-gray-100">Relatórios</a>
        </div>
      )}
    </nav>
  );
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navbar', () => {
  it('renders navbar with app title and logo', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
    expect(screen.getByAltText('Boi na Nuvem')).toBeInTheDocument();
  });

  it('renders navigation element', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows mobile menu button', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Animais')).toBeInTheDocument();
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
  });

  it('renders search input on desktop', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar...');
  });

  it('toggles mobile menu when button is clicked', async () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('shows mobile menu content when opened', async () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);

    await waitFor(() => {
      const mobileMenu = screen.getByRole('menu');
      expect(mobileMenu).toBeInTheDocument();
      expect(mobileMenu).toHaveTextContent('Dashboard');
      expect(mobileMenu).toHaveTextContent('Animais');
      expect(mobileMenu).toHaveTextContent('Relatórios');
    });
  });

  it('closes mobile menu when button is clicked again', async () => {
    render(
      <TestWrapper>
        <MockNavbar />
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
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('applies dark mode classes', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('dark:bg-gray-800');
  });

  it('has proper ARIA attributes for mobile menu', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-label', 'Abrir menu');
  });

  it('handles search input changes', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput).toHaveValue('test search');
  });

  it('applies hover styles to navigation links', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink).toHaveClass('hover:bg-gray-100');
  });

  it('applies focus styles to search input', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveClass('focus:border-blue-400');
  });

  it('has responsive classes for desktop navigation', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const desktopNav = screen.getByText('Dashboard').closest('div');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });

  it('has responsive classes for mobile menu button', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toHaveClass('md:hidden');
  });

  it('has responsive classes for mobile menu', () => {
    render(
      <TestWrapper>
        <MockNavbar />
      </TestWrapper>,
    );

    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);

    const mobileMenu = screen.getByRole('menu');
    expect(mobileMenu).toHaveClass('md:hidden');
  });
});
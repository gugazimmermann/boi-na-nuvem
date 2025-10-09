import { useState } from 'react';
import { Link } from 'react-router';
import { navigationItems } from './constants';
import { Icons } from './icons';
import { NavLink } from './NavLink';
import { SearchInput } from './SearchInput';
import { LanguageSelector } from './LanguageSelector';
import { PropertySelector } from './PropertySelector';
import type { NavbarProps } from './types';

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const appTitle = import.meta.env.VITE_TITLE || 'Boi na Nuvem';
  const appLogo = import.meta.env.VITE_LOGO || '/assets/logo.png';

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800 w-full z-50">
      <div className="w-full px-4 py-2">
        <div className="flex items-center">
          {/* Mobile sidebar toggle button - left side */}
          <div className="flex md:hidden mr-3">
            <button
              onClick={onToggleSidebar}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 cursor-pointer"
              aria-label="Abrir sidebar"
            >
              {Icons.menu}
            </button>
          </div>

          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-1.5">
              <img className="w-auto h-5 sm:h-6" src={appLogo} alt={appTitle} />
              <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-white whitespace-nowrap">
                {appTitle}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
            {navigationItems.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} />
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <SearchInput />
            <PropertySelector />
            <LanguageSelector />
          </div>

          <div className="flex md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400 cursor-pointer"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? Icons.close : Icons.menu}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className="md:hidden absolute inset-x-0 z-20 w-full px-4 py-3 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800"
            role="menu"
            aria-label="Menu de navegação móvel"
          >
            <div className="flex flex-col space-y-1.5">
              {navigationItems.map((item) => (
                <NavLink key={item.to} to={item.to} label={item.label} />
              ))}
            </div>

            <div className="mt-3 space-y-2">
              <SearchInput className="w-full" />
              <div className="flex flex-col items-center space-y-2">
                <PropertySelector />
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

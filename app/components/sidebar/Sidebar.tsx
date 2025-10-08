import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { sidebarSections, styles } from './constants';
import { SidebarLink } from './SidebarLink';
import { Icons } from './icons';
import type { SidebarProps } from './types';

export default function Sidebar({ className = '', isOpen = true, onToggle }: SidebarProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('animais');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const findActiveItemAndSection = () => {
    const currentPath = location.pathname;

    for (const section of sidebarSections) {
      for (const item of section.items) {
        if (currentPath.startsWith(item.href) || currentPath === item.href) {
          return { activeItem: item.id, sectionTitle: section.title };
        }
      }
    }

    return { activeItem: 'animais', sectionTitle: 'Cadastros' };
  };

  useEffect(() => {
    const { activeItem: newActiveItem, sectionTitle } = findActiveItemAndSection();
    setActiveItem(newActiveItem);
    setExpandedSection(sectionTitle);
  }, [location.pathname]);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection((prev) => {
      if (prev === sectionTitle) {
        return null;
      }

      return sectionTitle;
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside className={`${styles.sidebar} ${className} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Mobile close button */}
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={onToggle}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Fechar sidebar"
          >
            {Icons.close}
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <nav className="-mx-2 space-y-1">
            {sidebarSections.map((section) => {
              const isExpanded = expandedSection === section.title;
              const isActiveSection = expandedSection === section.title;
              const hasActiveItem = section.items.some((item) => item.id === activeItem);

              return (
                <div key={section.title} className="space-y-0.5">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={
                      isActiveSection && hasActiveItem
                        ? styles.sectionButtonActive
                        : styles.sectionButton
                    }
                  >
                    <span
                      className={
                        isActiveSection && hasActiveItem
                          ? styles.sectionTitleActive
                          : styles.sectionTitle
                      }
                    >
                      {section.title}
                    </span>
                    {isExpanded ? Icons.chevronDown : Icons.chevronRight}
                  </button>

                  {isExpanded && (
                    <div className="ml-1.5 space-y-0.5">
                      {section.items.map((item) => (
                        <SidebarLink
                          key={item.id}
                          item={item}
                          isActive={activeItem === item.id}
                          onClick={handleItemClick}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

import type { ReactNode } from 'react';

export interface HeaderAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: ReactNode;
}

export interface HeaderInfo {
  label: string;
  value: string;
  icon?: ReactNode;
  className?: string;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  backButton?: {
    label: string;
    onClick: () => void;
  };
  info?: HeaderInfo[];
  actions?: ReactNode;
  className?: string;
}

export function Header({
  title,
  subtitle,
  icon,
  backButton,
  info = [],
  actions,
  className = '',
}: HeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {backButton && (
        <button
          onClick={backButton.onClick}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-all duration-150 group cursor-pointer"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backButton.label}
        </button>
      )}

      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 rounded-lg p-4 border border-blue-100 dark:border-gray-600 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {icon && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  {icon}
                </div>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{subtitle}</p>
              )}
              {info.length > 0 && (
                <div className="flex items-center space-x-4">
                  {info.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-1 ${item.className || ''}`}
                    >
                      {item.icon}
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

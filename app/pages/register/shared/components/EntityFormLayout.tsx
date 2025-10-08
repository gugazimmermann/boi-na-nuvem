import { memo } from 'react';
import type { ReactNode } from 'react';

interface EntityFormLayoutProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  showFooter?: boolean;
  icon?: ReactNode;
  variant?: 'default' | 'modern';
  isEdit?: boolean;
  // Adapter props to support legacy usages
  config?: { title?: string; description?: string } | any;
  backButton?: { label: string; onClick: () => void };
  // Legacy/adapter props (ignored by layout but allowed for compatibility)
  onSubmit?: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string | null;
  containerClasses?: string;
  contentClasses?: string;
}

export const EntityFormLayout = memo<EntityFormLayoutProps>(
  ({
    title,
    subtitle,
    children,
    onBack,
    backLabel = 'Voltar para lista',
    showFooter = true,
    icon,
    variant = 'modern',
    isEdit = false,
    config,
    backButton,
    containerClasses,
    contentClasses,
  }) => {
    const resolvedTitle = title ?? config?.title ?? '';
    const resolvedSubtitle = subtitle ?? config?.description ?? '';
    const resolvedBack = onBack ?? backButton?.onClick ?? (() => window.history.back());
    const resolvedBackLabel = backButton?.label ?? backLabel;
    if (variant === 'default') {
      return (
        <div className={containerClasses ?? 'min-h-screen bg-gray-50 dark:bg-gray-900'}>
          <div className={contentClasses ?? 'max-w-4xl mx-auto px-4 py-4'}>
            <div className="flex items-center mb-4">
              <button
                onClick={resolvedBack}
                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-3 transition-all duration-150 group cursor-pointer"
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
                {resolvedBackLabel}
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center mb-4">
                {icon && <div className="flex-shrink-0 mr-4">{icon}</div>}
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{resolvedTitle}</h1>
                  <p className="text-gray-600 text-sm">{resolvedSubtitle}</p>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={
          containerClasses ?? 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4'
        }
      >
        <div className={contentClasses ?? 'max-w-6xl mx-auto px-4'}>
          {/* Back Button */}
          <button
            onClick={resolvedBack}
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-3 transition-all duration-150 group cursor-pointer"
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
            {resolvedBackLabel}
          </button>

          {/* Form Container */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Form Header */}
            <div
              className={`px-3 py-2 ${isEdit ? 'bg-gradient-to-r from-yellow-600 to-yellow-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'}`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {icon || (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="text-base font-medium text-white">{resolvedTitle}</h2>
                  <p className={`text-xs ${isEdit ? 'text-yellow-100' : 'text-blue-100'}`}>
                    {resolvedSubtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-4 py-6">{children}</div>
          </div>

          {/* Footer Info */}
          {showFooter && (
            <div className="mt-6 text-center">
              <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full ${isEdit ? 'bg-yellow-50' : 'bg-blue-50'}`}
              >
                <svg
                  className={`w-5 h-5 mr-2 ${isEdit ? 'text-yellow-600' : 'text-blue-600'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-xs font-medium ${isEdit ? 'text-yellow-700' : 'text-blue-700'}`}
                >
                  Todos os campos marcados com * são obrigatórios
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

EntityFormLayout.displayName = 'EntityFormLayout';

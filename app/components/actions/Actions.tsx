import type { ReactNode } from 'react';
import { Button } from '~/components/button';
import type { ButtonConfig } from '~/components/button/types';

export interface ActionItem {
  id: string;
  label: string;
  onClick: () => void;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'ghost'
    | 'outline';
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export interface ActionsProps {
  title: string;
  description?: string;
  actions: ActionItem[];
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'responsive';
}

export function Actions({
  title,
  description,
  actions,
  className = '',
  layout = 'responsive',
}: ActionsProps) {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-row space-x-4 space-y-0';
      case 'vertical':
        return 'flex flex-col space-y-3 space-x-0';
      case 'responsive':
      default:
        return 'flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto';
    }
  };

  const getContainerClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-row items-center space-x-6';
      case 'vertical':
        return 'flex flex-col items-start space-y-4 space-x-0';
      case 'responsive':
      default:
        return 'flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6';
    }
  };

  return (
    <div className={`bg-white shadow-sm rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className={getContainerClasses()}>
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
        <div className={getLayoutClasses()}>
          {actions.map((action) => {
            const buttonConfig: ButtonConfig = {
              variant: action.variant || 'primary',
              size: 'sm',
              icon: action.icon,
              iconPosition: 'left',
              disabled: action.disabled,
              loading: action.loading,
              className: 'shadow-sm hover:shadow-md transition-all duration-150',
            };

            return (
              <Button
                key={action.id}
                config={buttonConfig}
                onClick={action.onClick}
                className="px-4 py-2 rounded-md font-medium"
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

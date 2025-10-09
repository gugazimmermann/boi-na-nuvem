import { memo } from 'react';

export type BadgeVariant = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray' | 'brown';

interface CountBadgeProps {
  count: number;
  variant?: BadgeVariant;
  className?: string;
  children?: React.ReactNode;
}

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  blue: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  gray: 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300',
  brown: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
};

const BASE_CLASSES = 'text-xs font-medium px-2.5 py-0.5 rounded-full';

export const CountBadge = memo<CountBadgeProps>(
  ({ count, variant = 'blue', className = '', children }) => {
    const variantClasses = BADGE_VARIANTS[variant];

    return (
      <span className={`${BASE_CLASSES} ${variantClasses} ${className}`}>{children || count}</span>
    );
  },
);

CountBadge.displayName = 'CountBadge';

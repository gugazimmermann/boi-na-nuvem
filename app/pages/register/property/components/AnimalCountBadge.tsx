import { memo } from 'react';

interface AnimalCountBadgeProps {
  count: number;
  capacity: number;
}

export const AnimalCountBadge = memo<AnimalCountBadgeProps>(({ count, capacity }) => {
  const percentage = capacity > 0 ? Math.round((count / capacity) * 100) : 0;

  return (
    <div className="flex items-center justify-center">
      <div className="text-sm font-medium text-gray-700">
        {capacity} / {count} ({percentage}%)
      </div>
    </div>
  );
});

AnimalCountBadge.displayName = 'AnimalCountBadge';

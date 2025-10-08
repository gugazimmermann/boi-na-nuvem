import { memo } from 'react';
import { CountBadge } from './CountBadge';

interface LocationCountBadgeProps {
  count: number;
}

export const LocationCountBadge = memo<LocationCountBadgeProps>(({ count }) => {
  return (
    <div className="flex items-center justify-center">
      <CountBadge count={count} variant="blue" />
    </div>
  );
});

LocationCountBadge.displayName = 'LocationCountBadge';

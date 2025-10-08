import { memo } from 'react';
import { CountBadge } from './CountBadge';

interface EmployeeCountBadgeProps {
  count: number;
}

export const EmployeeCountBadge = memo<EmployeeCountBadgeProps>(({ count }) => {
  return (
    <div className="flex items-center justify-center">
      <CountBadge count={count} variant="blue" />
    </div>
  );
});

EmployeeCountBadge.displayName = 'EmployeeCountBadge';

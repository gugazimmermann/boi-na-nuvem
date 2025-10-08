import { memo } from 'react';
import { LocationQualityType } from '~/types/location';
import { CountBadge } from './CountBadge';

interface LocationQualityBadgeProps {
  quality: LocationQualityType;
}

const QUALITY_LABELS = {
  [LocationQualityType.GOOD]: 'Boa',
  [LocationQualityType.REGULAR]: 'Regular',
  [LocationQualityType.BAD]: 'Ruim',
};

const QUALITY_VARIANTS = {
  [LocationQualityType.GOOD]: 'green' as const,
  [LocationQualityType.REGULAR]: 'orange' as const,
  [LocationQualityType.BAD]: 'red' as const,
};

export const LocationQualityBadge = memo<LocationQualityBadgeProps>(({ quality }) => {
  return (
    <div className="flex items-center justify-center">
      <CountBadge count={0} variant={QUALITY_VARIANTS[quality]} className="bg-opacity-20">
        {QUALITY_LABELS[quality]}
      </CountBadge>
    </div>
  );
});

LocationQualityBadge.displayName = 'LocationQualityBadge';

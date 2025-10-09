import { memo } from 'react';
import { LocationType } from '~/types/location';
import { CountBadge } from './CountBadge';

interface LocationTypeBadgeProps {
  type: LocationType;
}

const TYPE_LABELS = {
  [LocationType.LIVESTOCK]: 'Pecuária',
  [LocationType.CULTIVATION]: 'Cultivo',
  [LocationType.STORAGE]: 'Armazenamento',
  [LocationType.CONFINEMENT]: 'Confinamento',
  [LocationType.SEMI_CONFINEMENT]: 'Semi-confinamento',
};

const TYPE_VARIANTS = {
  [LocationType.LIVESTOCK]: 'green' as const, // Verde - representa pastagem/natureza
  [LocationType.CULTIVATION]: 'blue' as const, // Sky - representa água/cultivo
  [LocationType.STORAGE]: 'gray' as const, // Stone - representa armazenamento/estrutura
  [LocationType.CONFINEMENT]: 'red' as const, // Vermelho - representa confinamento intensivo
  [LocationType.SEMI_CONFINEMENT]: 'purple' as const, // Roxo - representa semi-confinamento
};

export const LocationTypeBadge = memo<LocationTypeBadgeProps>(({ type }) => {
  return (
    <div className="flex items-center justify-center">
      <CountBadge count={0} variant={TYPE_VARIANTS[type]} className="bg-opacity-20">
        {TYPE_LABELS[type]}
      </CountBadge>
    </div>
  );
});

LocationTypeBadge.displayName = 'LocationTypeBadge';

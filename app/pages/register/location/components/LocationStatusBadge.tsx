import { LocationStatus } from '~/types/location';
import { UI_CONSTANTS } from '../../shared/constants';

interface LocationStatusBadgeProps {
  status: LocationStatus;
}

const STATUS_INDICATORS = {
  [LocationStatus.ACTIVE]: '🟢',
  [LocationStatus.INACTIVE]: '⚪',
  [LocationStatus.MAINTENANCE]: '🟡',
};

const STATUS_LABELS = {
  [LocationStatus.ACTIVE]: 'Ativo',
  [LocationStatus.INACTIVE]: 'Inativo',
  [LocationStatus.MAINTENANCE]: 'Manutenção',
};

export function LocationStatusBadge({ status }: LocationStatusBadgeProps) {
  return (
    <span className={UI_CONSTANTS.STATUS_INDICATOR_CLASSES}>
      <span>{STATUS_INDICATORS[status]}</span>
      <span>{STATUS_LABELS[status]}</span>
    </span>
  );
}

import { PropertyStatus } from '~/types/property';
import { UI_CONSTANTS } from '../../shared/constants';
import { STATUS_INDICATORS, STATUS_LABELS } from '../constants/propertyConstants';

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
}

export function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  return (
    <span className={`${UI_CONSTANTS.STATUS_INDICATOR_CLASSES} text-sm`}>
      <span>{STATUS_INDICATORS[status]}</span>
      <span>{STATUS_LABELS[status]}</span>
    </span>
  );
}

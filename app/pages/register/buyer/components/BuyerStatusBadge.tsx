import { UI_CONSTANTS } from '../../shared/constants';

interface BuyerStatusBadgeProps {
  status: string;
}

const STATUS_INDICATORS = {
  active: '🟢',
  inactive: '🔴',
};

const STATUS_LABELS = {
  active: 'Ativo',
  inactive: 'Inativo',
};

export function BuyerStatusBadge({ status }: BuyerStatusBadgeProps) {
  return (
    <span className={`${UI_CONSTANTS.STATUS_INDICATOR_CLASSES} text-sm`}>
      <span>{STATUS_INDICATORS[status as keyof typeof STATUS_INDICATORS]}</span>
      <span>{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
    </span>
  );
}

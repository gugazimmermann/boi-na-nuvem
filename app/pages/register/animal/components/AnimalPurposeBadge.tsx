import { AnimalPurpose } from '~/types/animal';

interface AnimalPurposeBadgeProps {
  purpose: AnimalPurpose;
}

// Function to get purpose badge colors
const getPurposeBadgeColors = (purpose: AnimalPurpose) => {
  switch (purpose) {
    case AnimalPurpose.CORTE:
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case AnimalPurpose.MATRIZ:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case AnimalPurpose.REPRODUTOR:
      return 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200';
    default:
      return 'bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-200';
  }
};

export function AnimalPurposeBadge({ purpose }: AnimalPurposeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPurposeBadgeColors(purpose)}`}
    >
      {purpose}
    </span>
  );
}

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
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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

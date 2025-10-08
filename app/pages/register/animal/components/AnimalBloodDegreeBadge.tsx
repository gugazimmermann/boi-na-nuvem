import { BloodDegree } from '~/types/animal';

interface AnimalBloodDegreeBadgeProps {
  bloodDegree: BloodDegree;
}

export function AnimalBloodDegreeBadge({ bloodDegree }: AnimalBloodDegreeBadgeProps) {
  return (
    <span className="text-sm text-gray-600 dark:text-gray-400 cursor-help underline decoration-dotted">
      {bloodDegree}
    </span>
  );
}

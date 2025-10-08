import { AnimalSex } from '~/types/animal';

interface AnimalSexBadgeProps {
  sex: AnimalSex;
}

// Function to get sex badge colors
const getSexBadgeColors = (sex: AnimalSex) => {
  switch (sex) {
    case AnimalSex.FEMEA:
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
    case AnimalSex.MACHO:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case AnimalSex.TOURO:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export function AnimalSexBadge({ sex }: AnimalSexBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSexBadgeColors(sex)}`}
    >
      {sex}
    </span>
  );
}

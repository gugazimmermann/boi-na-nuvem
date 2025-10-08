import { AnimalBreed } from '~/types/animal';

interface AnimalBreedBadgeProps {
  breed: AnimalBreed;
}

// Function to get breed badge colors (same as LocationAnimalsTab)
const getBreedBadgeColors = (breed: AnimalBreed) => {
  switch (breed) {
    case AnimalBreed.ANGUS:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case AnimalBreed.NELORE:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case AnimalBreed.SRD:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
};

export function AnimalBreedBadge({ breed }: AnimalBreedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBreedBadgeColors(breed)}`}
    >
      {breed}
    </span>
  );
}

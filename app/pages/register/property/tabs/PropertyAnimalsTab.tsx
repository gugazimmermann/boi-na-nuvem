import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import { Tooltip } from '~/components/tooltip';
import type { TableConfig } from '~/components/table/types';
import { usePropertyTabPagination } from './hooks/usePropertyTabPagination';
import { formatAgeFromBirthDate } from '~/utils/ageFormatter';
import { ANIMALS, ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { LOCATION_MOVEMENTS, LOCATIONS } from '~/mocks/locations-mock';
import { LocationMovimentType } from '~/types/location';
import { AnimalBreed } from '~/types/animal';
import type { Property } from '~/types/property';

// Function to get breed badge colors
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

interface PropertyAnimalsTabProps {
  property: Property;
  animalsSearch: string;
  animalsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedAnimalsSearch: string;
  onAnimalsSearchChange: (value: string) => void;
  onAnimalsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function PropertyAnimalsTab({
  property,
  animalsSearch,
  animalsSort,
  debouncedAnimalsSearch,
  onAnimalsSearchChange,
  onAnimalsSortChange,
}: PropertyAnimalsTabProps) {
  const navigate = useNavigate();

  // Function to handle navigation to animal detail page
  const handleAnimalClick = useCallback(
    (animalId: string) => {
      // Store the current page context for navigation back
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('animalFromProperty', 'true');
        sessionStorage.setItem('animalPropertyId', property.id);
      }
      navigate(`/sistema/cadastros/animais/${animalId}`);
    },
    [navigate, property.id],
  );

  // Get animals in all locations of this property
  const animalsInProperty = useMemo(() => {
    // Get all locations for this property
    const propertyLocations = LOCATIONS.filter((location) => location.propertyId === property.id);

    // Get all movements for locations in this property
    const propertyLocationMovements = LOCATION_MOVEMENTS.filter(
      (movement) =>
        propertyLocations.some((location) => location.id === movement.locationId) &&
        (movement.type === LocationMovimentType.ENTRY ||
          movement.type === LocationMovimentType.EXIT),
    );

    // Get all animal locations that reference these movements
    const animalLocations = ANIMAL_LOCATIONS.filter((al) =>
      propertyLocationMovements.some((movement) => movement.id === al.locationMovimentId),
    );

    // For now, let's show all animals that have any movement in this property
    // This is a simplified approach to get the feature working
    const animalsInPropertyIds = new Set<string>();
    animalLocations.forEach((al) => {
      animalsInPropertyIds.add(al.animalId);
    });

    // Get the actual animal objects
    return ANIMALS.filter((animal) => animalsInPropertyIds.has(animal.id));
  }, [property.id]);

  // Apply search filter with debounced search
  const searchAnimals = useCallback((animals: any[], searchTerm: string) => {
    if (!searchTerm.trim()) return animals;

    const term = searchTerm.toLowerCase();
    return animals.filter(
      (animal) =>
        animal.code.toLowerCase().includes(term) ||
        animal.registrationNumber.toLowerCase().includes(term) ||
        animal.breed.toLowerCase().includes(term) ||
        animal.ageInMonths.toString().includes(term),
    );
  }, []);

  // Apply sorting
  const sortAnimals = useCallback(
    (animals: any[], sort: { key: string; direction: 'asc' | 'desc' } | null) => {
      if (!sort) return animals;

      return [...animals].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sort.key) {
          case 'code':
            aValue = a.code;
            bValue = b.code;
            break;
          case 'registrationNumber':
            aValue = a.registrationNumber;
            bValue = b.registrationNumber;
            break;
          case 'breed':
            aValue = a.breed;
            bValue = b.breed;
            break;
          case 'ageInMonths':
            aValue = a.ageInMonths;
            bValue = b.ageInMonths;
            break;
          case 'entryDate':
            aValue = a.entryDate ? new Date(a.entryDate) : new Date(0);
            bValue = b.entryDate ? new Date(b.entryDate) : new Date(0);
            break;
          case 'location':
            aValue = a.currentLocation?.name || '';
            bValue = b.currentLocation?.name || '';
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    },
    [],
  );

  // Calculate age in months, entry date, and current location for each animal
  const animalsWithCalculatedData = useMemo(() => {
    return animalsInProperty.map((animal) => {
      // Calculate age in months
      const birthDate = new Date(animal.birthDate);
      const now = new Date();
      const ageInMonths = Math.floor(
        (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
      ); // Average days per month

      // For now, set default values for entry date and current location
      // This can be enhanced later with proper logic
      const entryDate = new Date(animal.acquisitionDate);
      const currentLocation = { name: 'Localização não especificada' };

      return {
        ...animal,
        ageInMonths,
        entryDate,
        currentLocation,
      };
    });
  }, [animalsInProperty, property.id]);

  // Filter and sort animals with calculated data
  const filteredAndSortedAnimals = useMemo(() => {
    const searched = searchAnimals(animalsWithCalculatedData, debouncedAnimalsSearch);
    return sortAnimals(searched, animalsSort);
  }, [animalsWithCalculatedData, debouncedAnimalsSearch, animalsSort, searchAnimals, sortAnimals]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedAnimals,
    handlePageChange,
    hasPagination,
  } = usePropertyTabPagination({ filteredData: filteredAndSortedAnimals });

  // Table configuration
  const tableConfig: TableConfig<any> = {
    title: 'Animais na Propriedade',
    count: filteredAndSortedAnimals.length,
    countLabel: 'animais',
    columns: [
      {
        key: 'code',
        label: 'Código',
        sortable: true,
        onSort: () => {
          const newDirection =
            animalsSort?.key === 'code' && animalsSort?.direction === 'asc' ? 'desc' : 'asc';
          onAnimalsSortChange({ key: 'code', direction: newDirection });
        },
        render: (value, animal) => (
          <button
            onClick={() => handleAnimalClick(animal.id)}
            className="font-mono text-sm font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors"
          >
            {animal.code}
          </button>
        ),
      },
      {
        key: 'registrationNumber',
        label: 'Número de Registro',
        sortable: true,
        onSort: () => {
          const newDirection =
            animalsSort?.key === 'registrationNumber' && animalsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onAnimalsSortChange({ key: 'registrationNumber', direction: newDirection });
        },
        render: (value, animal) => (
          <button
            onClick={() => handleAnimalClick(animal.id)}
            className="font-mono text-sm font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors"
          >
            {animal.registrationNumber}
          </button>
        ),
      },
      {
        key: 'breed',
        label: 'Raça',
        sortable: true,
        onSort: () => {
          const newDirection =
            animalsSort?.key === 'breed' && animalsSort?.direction === 'asc' ? 'desc' : 'asc';
          onAnimalsSortChange({ key: 'breed', direction: newDirection });
        },
        render: (value, animal) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBreedBadgeColors(animal.breed)}`}
          >
            {animal.breed}
          </span>
        ),
      },
      {
        key: 'ageInMonths',
        label: 'Idade',
        sortable: true,
        onSort: () => {
          const newDirection =
            animalsSort?.key === 'ageInMonths' && animalsSort?.direction === 'asc' ? 'desc' : 'asc';
          onAnimalsSortChange({ key: 'ageInMonths', direction: newDirection });
        },
        render: (value, animal) => (
          <Tooltip
            config={{
              content: formatAgeFromBirthDate(animal.birthDate),
              position: 'top',
              variant: 'default',
              trigger: 'hover',
              delay: 500,
            }}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400 cursor-help underline decoration-dotted">
              {animal.ageInMonths} meses
            </span>
          </Tooltip>
        ),
      },
      {
        key: 'location',
        label: 'Localização Atual',
        sortable: true,
        onSort: () => {
          const newDirection =
            animalsSort?.key === 'location' && animalsSort?.direction === 'asc' ? 'desc' : 'asc';
          onAnimalsSortChange({ key: 'location', direction: newDirection });
        },
        render: (value, animal) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {animal.currentLocation?.name || 'Não disponível'}
          </span>
        ),
      },
      {
        key: 'entryDate',
        label: 'Data de Entrada',
        sortable: true,
        onSort: () => {
          const newDirection =
            animalsSort?.key === 'entryDate' && animalsSort?.direction === 'asc' ? 'desc' : 'asc';
          onAnimalsSortChange({ key: 'entryDate', direction: newDirection });
        },
        render: (value, animal) => {
          if (!animal.entryDate) {
            return <span className="text-sm text-gray-400 dark:text-gray-500">Não disponível</span>;
          }

          try {
            const date = new Date(animal.entryDate);
            return (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR')}
              </span>
            );
          } catch (error) {
            return <span className="text-sm text-gray-400 dark:text-gray-500">Data inválida</span>;
          }
        },
      },
    ],
    data: paginatedAnimals,
    search: {
      value: animalsSearch,
      onChange: onAnimalsSearchChange,
      placeholder: 'Buscar por código, registro ou raça...',
    },
    ...(hasPagination
      ? {
        pagination: {
          currentPage,
          totalPages,
          itemsPerPage,
          totalItems: filteredAndSortedAnimals.length,
          onPageChange: handlePageChange,
        },
      }
      : {}),
  };

  return <Table config={tableConfig} />;
}

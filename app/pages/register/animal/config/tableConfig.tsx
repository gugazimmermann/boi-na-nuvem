import type { TableColumn } from '~/components/table/types';
import { ANIMAL_CONFIG } from './animalConfig';
import type { Animal } from '~/types/animal';
import { AnimalBreedBadge } from '../components/AnimalBreedBadge';
import { AnimalBloodDegreeBadge } from '../components/AnimalBloodDegreeBadge';
import { AnimalSexBadge } from '../components/AnimalSexBadge';
import { AnimalPurposeBadge } from '../components/AnimalPurposeBadge';
import { AnimalActions } from '../components/AnimalActions';
import { Tooltip } from '~/components/tooltip';
import { formatAgeFromBirthDate } from '~/utils/ageFormatter';

interface CreateTableConfigParams {
  filteredAnimals: Animal[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  breedFilter: string;
  setBreedFilter: (breed: string) => void;
  handleSort: (field: string) => void;
  getAnimalCurrentLocation: (animalId: string) => {
    location: any;
    property: any | null;
    entryDate: Date | null;
  };
  onEditAnimal: (animal: Animal) => void;
  onDeleteAnimal: (animal: Animal) => void;
  onAddAnimal: () => void;
  onViewAnimal: (animal: Animal) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export const createTableConfig = ({
  filteredAnimals,
  searchTerm,
  setSearchTerm,
  breedFilter,
  setBreedFilter,
  handleSort,
  getAnimalCurrentLocation,
  onEditAnimal,
  onDeleteAnimal,
  onAddAnimal,
  onViewAnimal,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigParams) => {
  const columns: TableColumn<Animal>[] = [
    {
      key: 'code',
      label: 'Código',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('code'),
      render: (value: any, animal: Animal) => (
        <button
          onClick={() => onViewAnimal(animal)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors cursor-pointer"
        >
          {animal.code}
        </button>
      ),
    },
    {
      key: 'registrationNumber',
      label: 'Número de Registro',
      sortable: true,
      className: 'w-48',
      onSort: () => handleSort('registrationNumber'),
      render: (value: any, animal: Animal) => (
        <button
          onClick={() => onViewAnimal(animal)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
        >
          {animal.registrationNumber}
        </button>
      ),
    },
    {
      key: 'breed',
      label: 'Raça',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('breed'),
      render: (value: any, animal: Animal) => <AnimalBreedBadge breed={animal.breed} />,
    },
    {
      key: 'bloodDegree',
      label: 'Grau de Sangue',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('bloodDegree'),
      render: (value: any, animal: Animal) => (
        <Tooltip
          config={{
            content: `${animal.bloodPercentage}% de sangue`,
            position: 'top',
            variant: 'default',
            trigger: 'hover',
            delay: 500,
          }}
        >
          <span className="cursor-help">
            <AnimalBloodDegreeBadge bloodDegree={animal.bloodDegree} />
          </span>
        </Tooltip>
      ),
    },
    {
      key: 'ageInMonths',
      label: 'Idade',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('ageInMonths'),
      render: (value: any, animal: Animal) => {
        // Calculate age in months
        const birthDate = new Date(animal.birthDate);
        const now = new Date();
        const ageInMonths = Math.floor(
          (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
        ); // Average days per month

        return (
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
              {ageInMonths} meses
            </span>
          </Tooltip>
        );
      },
    },
    {
      key: 'sex',
      label: 'Sexo',
      sortable: true,
      className: 'w-24',
      onSort: () => handleSort('sex'),
      render: (value: any, animal: Animal) => <AnimalSexBadge sex={animal.sex} />,
    },
    {
      key: 'purpose',
      label: 'Finalidade',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('purpose'),
      render: (value: any, animal: Animal) => <AnimalPurposeBadge purpose={animal.purpose} />,
    },
    {
      key: 'property',
      label: 'Propriedade',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('property'),
      render: (value: any, animal: Animal) => {
        const { property } = getAnimalCurrentLocation(animal.id);
        if (!property) {
          return <span className="text-sm text-gray-400 dark:text-gray-500">Não definida</span>;
        }
        return (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="font-medium">{property.code}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{property.name}</div>
          </div>
        );
      },
    },
    {
      key: 'currentLocation',
      label: 'Localização Atual',
      sortable: true,
      className: 'w-48',
      onSort: () => handleSort('currentLocation'),
      render: (value: any, animal: Animal) => {
        const { location } = getAnimalCurrentLocation(animal.id);
        if (!location) {
          return <span className="text-sm text-gray-400 dark:text-gray-500">Não localizado</span>;
        }
        return (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="font-medium">{location.code}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{location.name}</div>
          </div>
        );
      },
    },
    {
      key: 'entryDate',
      label: 'Data de Entrada',
      sortable: true,
      className: 'w-40',
      onSort: () => handleSort('entryDate'),
      render: (value: any, animal: Animal) => {
        const { entryDate } = getAnimalCurrentLocation(animal.id);
        if (!entryDate) {
          return <span className="text-sm text-gray-400 dark:text-gray-500">Não disponível</span>;
        }

        try {
          const date = new Date(entryDate);
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
  ];

  return {
    title: ANIMAL_CONFIG.title,
    subtitle: ANIMAL_CONFIG.subtitle,
    count: filteredAnimals.length,
    countLabel: ANIMAL_CONFIG.countLabel,
    data: filteredAnimals,
    columns,
    filters: ANIMAL_CONFIG.filterOptions.map((option) => ({
      label: option.label,
      active: breedFilter === option.key,
      onClick: () => setBreedFilter(option.key),
    })),
    search: {
      placeholder: ANIMAL_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    rowActions: (animal: Animal) => (
      <AnimalActions animal={animal} onEdit={onEditAnimal} onDelete={onDeleteAnimal} />
    ),
    actions: {
      add: {
        label: 'Novo Animal',
        onClick: onAddAnimal || (() => console.log('Add new animal')),
      },
    },
    ...(hasPagination && onPageChange
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems,
            onPageChange,
          },
        }
      : {}),
  };
};

import type { PropertySummary } from '~/types/property';
import { PropertyStatus } from '~/types/property';
import { PROPERTY_CONFIG } from './propertyConfig';
import { PropertyStatusBadge } from '../components/PropertyStatusBadge';
import { LocationCountBadge } from '../components/LocationCountBadge';
import { AnimalCountBadge } from '../components/AnimalCountBadge';
import { EmployeeCountBadge } from '../components/EmployeeCountBadge';
import { PropertyActions } from '../components/PropertyActions';

interface CreateTableConfigProps {
  filteredProperties: PropertySummary[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: PropertyStatus | 'all';
  setStatusFilter: (filter: PropertyStatus | 'all') => void;
  handleSort: (key: string) => void;
  onEditProperty?: (property: PropertySummary) => void;
  onDeleteProperty?: (property: PropertySummary) => void;
  onAddProperty?: () => void;
  onViewProperty?: (property: PropertySummary) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export function createTableConfig({
  filteredProperties,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  onEditProperty,
  onDeleteProperty,
  onAddProperty,
  onViewProperty,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigProps) {
  return {
    title: PROPERTY_CONFIG.title,
    subtitle: PROPERTY_CONFIG.subtitle,
    count: filteredProperties.length,
    countLabel: PROPERTY_CONFIG.countLabel,
    data: filteredProperties,
    columns: [
      {
        key: 'code',
        label: 'Código',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('code'),
        render: (value: any, property: PropertySummary) => (
          <button
            onClick={() => onViewProperty?.(property)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors cursor-pointer"
          >
            {property.codigo}
          </button>
        ),
      },
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        className: 'w-64',
        onSort: () => handleSort('name'),
        render: (value: any, property: PropertySummary) => (
          <button
            onClick={() => onViewProperty?.(property)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
          >
            {property.nome}
          </button>
        ),
      },
      {
        key: 'location',
        label: 'Localização',
        sortable: false,
        className: 'w-48',
        render: (value: any, property: PropertySummary) => {
          const cityState = [property.endereco.city, property.endereco.state].filter(Boolean).join(', ');
          const country = property.endereco.country;
          const location =
            cityState && country ? `${cityState} - ${country}` : cityState || country || '-';
          return location;
        },
      },
      {
        key: 'locationCount',
        label: 'Localizações',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('locationCount'),
        render: (value: any, property: PropertySummary) => {
          return <LocationCountBadge count={property.quantidadeLocalizacoes} />;
        },
      },
      {
        key: 'animalCount',
        label: 'Capacidade',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('animalCount'),
        render: (value: any, property: PropertySummary) => {
          return <AnimalCountBadge count={property.capacidade.totalAnimais} capacity={property.capacidade.total} />;
        },
      },
      {
        key: 'employeeCount',
        label: 'Colaboradores',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('employeeCount'),
        render: (value: any, property: PropertySummary) => {
          return <EmployeeCountBadge count={property.totalColaboradores} />;
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-24',
        onSort: () => handleSort('status'),
        render: (value: any, property: PropertySummary) => (
          <PropertyStatusBadge status={property.status} />
        ),
      },
    ],
    filters: PROPERTY_CONFIG.filterOptions.map((option) => ({
      label: option.label,
      active: statusFilter === option.key,
      onClick: () => setStatusFilter(option.key as PropertyStatus | 'all'),
    })),
    search: {
      placeholder: PROPERTY_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    rowActions: (property: PropertySummary) => (
      <PropertyActions property={property} onEdit={onEditProperty} onDelete={onDeleteProperty} />
    ),
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
    actions: {
      add: {
        label: 'Nova Propriedade',
        onClick: onAddProperty || (() => console.log('Add new property')),
      },
    },
    // Highlight selected property row if it matches the id stored in localStorage
    rowClassName: (property: PropertySummary) => {
      try {
        const id = window?.localStorage?.getItem('bnn:selectedPropertyId');
        if (id && id === property.id) {
          return 'bg-blue-50 dark:bg-blue-900/20';
        }
      } catch {}
      return undefined;
    },
  };
}

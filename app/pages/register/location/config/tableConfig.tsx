import type { TableColumn } from '~/components/table/types';
import { LOCATION_CONFIG } from './locationConfig';
import type { Location } from '~/types/location';
import type { LocationWithProperty } from '~/hooks/useLocations';
import { LocationStatusBadge } from '../components/LocationStatusBadge';
import { LocationTypeBadge } from '../components/LocationTypeBadge';
import { LocationQualityBadge } from '../components/LocationQualityBadge';
import { LocationActions } from '../components/LocationActions';

interface CreateTableConfigParams {
  filteredLocations: LocationWithProperty[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  handleSort: (field: string) => void;
  getLocationQuality: (locationId: string) => any;
  getAnimalCountByLocation: (locationId: string) => number;
  onEditLocation: (location: LocationWithProperty) => void;
  onDeleteLocation: (location: LocationWithProperty) => void;
  onAddLocation: () => void;
  onViewLocation: (location: LocationWithProperty) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export const createTableConfig = ({
  filteredLocations,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  getLocationQuality,
  getAnimalCountByLocation,
  onEditLocation,
  onDeleteLocation,
  onAddLocation,
  onViewLocation,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigParams) => {
  const columns: TableColumn<LocationWithProperty>[] = [
    {
      key: 'code',
      label: 'Código',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('code'),
      render: (value: any, location: LocationWithProperty) => (
        <button
          onClick={() => onViewLocation(location)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors cursor-pointer"
        >
          {location.code}
        </button>
      ),
    },
    {
      key: 'name',
      label: 'Nome',
      sortable: true,
      className: 'w-64',
      onSort: () => handleSort('name'),
      render: (value: any, location: LocationWithProperty) => (
        <button
          onClick={() => onViewLocation(location)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
        >
          {location.name}
        </button>
      ),
    },
    {
      key: 'property',
      label: 'Propriedade',
      sortable: true,
      className: 'w-48',
      onSort: () => handleSort('property'),
      render: (value: any, location: LocationWithProperty) => (
        <div className="text-left">
          {location.property ? (
            <>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {location.property.code}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {location.property.name}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400 dark:text-gray-500">Não informado</div>
          )}
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Tipo',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('type'),
      render: (value: any, location: LocationWithProperty) => (
        <LocationTypeBadge type={location.type} />
      ),
    },
    {
      key: 'area',
      label: 'Área',
      sortable: true,
      className: 'w-32',
      onSort: () => handleSort('area'),
      render: (value: any, location: LocationWithProperty) => {
        const areaText = location.area ? location.area.toLocaleString('pt-BR') : '-';
        const unit =
          location.areaType === 'hectares'
            ? 'ha'
            : location.areaType === 'metros_quadrados'
              ? 'm²'
              : location.areaType === 'acres'
                ? 'ac'
                : location.areaType || '';
        return (
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">
              {areaText} {unit}
            </div>
          </div>
        );
      },
    },
    {
      key: 'capacity',
      label: 'Capacidade',
      sortable: true,
      className: 'w-48',
      onSort: () => handleSort('capacity'),
      render: (value: any, location: LocationWithProperty) => {
        const animalCount = getAnimalCountByLocation(location.id);
        const capacity = location.capacity || 0;
        const percentage = capacity > 0 ? Math.round((animalCount / capacity) * 100) : 0;

        return (
          <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
            {capacity} / {animalCount} ({percentage}%)
          </div>
        );
      },
    },
    {
      key: 'quality',
      label: 'Qualidade',
      sortable: true,
      className: 'w-48',
      onSort: () => handleSort('quality'),
      render: (value: any, location: LocationWithProperty) => {
        const latestQuality = getLocationQuality(location.id);

        if (!latestQuality) {
          return (
            <div className="flex items-center justify-center">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                Não avaliada
              </span>
            </div>
          );
        }

        return (
          <div className="flex items-center justify-center">
            <LocationQualityBadge quality={latestQuality} />
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      className: 'w-24',
      onSort: () => handleSort('status'),
      render: (value: any, location: Location) => <LocationStatusBadge status={location.status} />,
    },
  ];

  return {
    title: LOCATION_CONFIG.title,
    subtitle: LOCATION_CONFIG.subtitle,
    count: filteredLocations.length,
    countLabel: LOCATION_CONFIG.countLabel,
    data: filteredLocations,
    columns,
    filters: LOCATION_CONFIG.filterOptions.map((option) => ({
      label: option.label,
      active: statusFilter === option.key,
      onClick: () => setStatusFilter(option.key),
    })),
    search: {
      placeholder: LOCATION_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    rowActions: (location: LocationWithProperty) => (
      <LocationActions location={location} onEdit={onEditLocation} onDelete={onDeleteLocation} />
    ),
    actions: {
      add: {
        label: 'Nova Localização',
        onClick: onAddLocation || (() => console.log('Add new location')),
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

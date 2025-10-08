import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import type { TableConfig } from '~/components/table/types';
import { usePropertyTabPagination } from './hooks/usePropertyTabPagination';
import { LOCATIONS, LOCATION_OBSERVATIONS } from '~/mocks/locations-mock';
import type { Location, LocationObservation } from '~/types/location';
import type { Property } from '~/types/property';

interface PropertyObservationsTabProps {
  property: Property;
  observationsSearch: string;
  observationsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedObservationsSearch: string;
  onObservationsSearchChange: (value: string) => void;
  onObservationsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function PropertyObservationsTab({
  property,
  observationsSearch,
  observationsSort,
  debouncedObservationsSearch,
  onObservationsSearchChange,
  onObservationsSortChange,
}: PropertyObservationsTabProps) {
  const navigate = useNavigate();

  // Handler to navigate to location details with observations tab active
  const handleLocationClick = useCallback(
    (locationId: string) => {
      // Store context that we're coming from property observations tab
      sessionStorage.setItem('locationFromProperty', 'true');
      sessionStorage.setItem('propertyId', property.id);
      sessionStorage.setItem('propertyTab', 'observations');
      // Store the active tab in sessionStorage so the location detail page opens with observations tab
      sessionStorage.setItem('locationDetailActiveTab', 'observations');
      navigate(`/cadastros/localizacoes/${locationId}`);
    },
    [navigate, property.id],
  );
  // Helper functions for location data
  const getLocationName = useCallback((locationId: string, propertyLocations: Location[]) => {
    const location = propertyLocations.find((loc) => loc.id === locationId);
    return location ? location.name : 'Localização não encontrada';
  }, []);

  const getLocationCode = useCallback((locationId: string, propertyLocations: Location[]) => {
    const location = propertyLocations.find((loc) => loc.id === locationId);
    return location ? location.code : 'N/A';
  }, []);

  // Get property locations
  const propertyLocations = useMemo(
    () => LOCATIONS.filter((location) => location.propertyId === property.id),
    [property.id],
  );
  const propertyLocationIds = useMemo(
    () => propertyLocations.map((loc) => loc.id),
    [propertyLocations],
  );

  // Filter observations for this property's locations and get only the latest observation per location
  const basePropertyObservations = useMemo(() => {
    // First, filter observations for this property's locations and exclude deleted ones
    const propertyObservations = LOCATION_OBSERVATIONS.filter(
      (observation) =>
        propertyLocationIds.includes(observation.locationId) && !observation.deletedAt,
    );

    // Group by locationId and get the latest observation for each location
    const latestObservationsByLocation = new Map<string, LocationObservation>();

    propertyObservations.forEach((observation) => {
      const existingObservation = latestObservationsByLocation.get(observation.locationId);
      if (
        !existingObservation ||
        new Date(observation.createdAt) > new Date(existingObservation.createdAt)
      ) {
        latestObservationsByLocation.set(observation.locationId, observation);
      }
    });

    return Array.from(latestObservationsByLocation.values());
  }, [propertyLocationIds]);

  // Memoized search function
  const searchObservations = useCallback(
    (observations: LocationObservation[], searchTerm: string, propertyLocations: Location[]) => {
      if (!searchTerm.trim()) return observations;

      const term = searchTerm.toLowerCase().trim();
      return observations.filter((observation) => {
        const locationName = getLocationName(
          observation.locationId,
          propertyLocations,
        ).toLowerCase();
        const locationCode = getLocationCode(
          observation.locationId,
          propertyLocations,
        ).toLowerCase();
        const observationText = observation.observation.toLowerCase();

        return (
          locationName.includes(term) ||
          locationCode.includes(term) ||
          observationText.includes(term)
        );
      });
    },
    [getLocationName, getLocationCode],
  );

  // Apply search filter with debounced search
  const filteredPropertyObservations = useMemo(
    () =>
      searchObservations(basePropertyObservations, debouncedObservationsSearch, propertyLocations),
    [basePropertyObservations, debouncedObservationsSearch, propertyLocations, searchObservations],
  );

  // Apply sorting with memoization
  const sortedPropertyObservations = useMemo(() => {
    if (!observationsSort) {
      // Default sort by date (newest first)
      return [...filteredPropertyObservations].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return [...filteredPropertyObservations].sort((a, b) => {
      let aValue: any = a[observationsSort.key as keyof LocationObservation];
      let bValue: any = b[observationsSort.key as keyof LocationObservation];

      // Handle date sorting
      if (observationsSort.key === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle location sorting (by name)
      if (observationsSort.key === 'locationId') {
        aValue = getLocationName(aValue, propertyLocations).toLowerCase();
        bValue = getLocationName(bValue, propertyLocations).toLowerCase();
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return observationsSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return observationsSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredPropertyObservations, observationsSort, propertyLocations, getLocationName]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedObservations,
    handlePageChange,
    hasPagination,
  } = usePropertyTabPagination({ filteredData: sortedPropertyObservations });

  // Table configuration
  const tableConfig: TableConfig<LocationObservation> = {
    title: 'Observações da Propriedade',
    subtitle: `Propriedade: ${property.name}`,
    count: sortedPropertyObservations.length,
    countLabel: 'observações',
    columns: [
      {
        key: 'createdAt',
        label: 'Data',
        sortable: true,
        className: 'w-40',
        onSort: () => {
          const newDirection =
            observationsSort?.key === 'createdAt' && observationsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onObservationsSortChange({ key: 'createdAt', direction: newDirection });
        },
        render: (value: string) => (
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {new Date(value).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        ),
      },
      {
        key: 'locationId',
        label: 'Localização',
        sortable: true,
        className: 'w-64',
        onSort: () => {
          const newDirection =
            observationsSort?.key === 'locationId' && observationsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onObservationsSortChange({ key: 'locationId', direction: newDirection });
        },
        render: (value: string, observation: LocationObservation) => (
          <div className="text-sm">
            <button
              onClick={() => handleLocationClick(value)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline transition-colors text-left cursor-pointer"
            >
              {getLocationName(value, propertyLocations)}
            </button>
            <div className="text-gray-500 dark:text-gray-400">
              {getLocationCode(value, propertyLocations)}
            </div>
          </div>
        ),
      },
      {
        key: 'observation',
        label: 'Observação',
        sortable: false,
        className: 'w-96',
        render: (value: string) => (
          <div className="text-sm text-gray-900 dark:text-gray-100">{value}</div>
        ),
      },
    ],
    data: paginatedObservations,
    search: {
      placeholder: 'Pesquisar observações...',
      value: observationsSearch,
      onChange: onObservationsSearchChange,
    },
    ...(hasPagination
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems: sortedPropertyObservations.length,
            onPageChange: handlePageChange,
          },
        }
      : {}),
  };

  if (sortedPropertyObservations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma observação encontrada
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Esta propriedade ainda não possui observações registradas.
        </p>
      </div>
    );
  }

  return <Table config={tableConfig} />;
}

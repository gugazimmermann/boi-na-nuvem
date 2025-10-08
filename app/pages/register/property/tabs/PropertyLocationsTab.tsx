import { useMemo, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import type { TableConfig } from '~/components/table/types';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '~/components/drawer';
import { usePropertyTabPagination } from './hooks/usePropertyTabPagination';
import { LOCATIONS, LOCATION_QUALITIES, LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import {
  LocationType,
  LocationStatus,
  LocationMovimentType,
  type Location,
  type LocationQuality,
} from '~/types/location';
import type { Property } from '~/types/property';
import { LocationTypeBadge } from '../../location/components/LocationTypeBadge';
import { LocationStatusBadge } from '../../location/components/LocationStatusBadge';
import { LocationQualityBadge } from '../../location/components/LocationQualityBadge';
import {
  AddLocationForm,
  type AddLocationFormRef,
} from '../../location/components/AddLocationForm';
import { useLocations } from '~/hooks/useLocations';
import { Button } from '~/components/button';

interface PropertyLocationsTabProps {
  property: Property;
  locationsSearch: string;
  locationsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedLocationsSearch: string;
  onLocationsSearchChange: (value: string) => void;
  onLocationsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function PropertyLocationsTab({
  property,
  locationsSearch,
  locationsSort,
  debouncedLocationsSearch,
  onLocationsSearchChange,
  onLocationsSortChange,
}: PropertyLocationsTabProps) {
  const navigate = useNavigate();
  const { createLocation } = useLocations();

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<AddLocationFormRef>(null);

  // Drawer control functions
  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setIsSubmitting(false);
    formRef.current?.resetForm();
  }, []);

  // Handle form submission
  const handleSubmitLocation = useCallback(
    async (locationData: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        setIsSubmitting(true);
        await createLocation(locationData);
        handleCloseDrawer();
        // Optionally refresh the locations list or show success message
      } catch (error) {
        console.error('Error creating location:', error);
        // Handle error (show toast, etc.)
      } finally {
        setIsSubmitting(false);
      }
    },
    [createLocation, handleCloseDrawer],
  );

  // Function to navigate to location details
  const handleLocationClick = useCallback(
    (locationId: string) => {
      // Store context that we're coming from property locations tab
      sessionStorage.setItem('locationFromProperty', 'true');
      sessionStorage.setItem('propertyId', property.id);
      sessionStorage.setItem('propertyTab', 'locations');
      navigate(`/cadastros/localizacoes/${locationId}`);
    },
    [navigate, property.id],
  );

  // Helper function to get location type label (for search)
  const getLocationTypeLabel = useCallback((type: LocationType) => {
    switch (type) {
      case LocationType.LIVESTOCK:
        return 'Pecuária';
      case LocationType.CULTIVATION:
        return 'Cultivo';
      case LocationType.STORAGE:
        return 'Armazenamento';
      case LocationType.CONFINEMENT:
        return 'Confinamento';
      case LocationType.SEMI_CONFINEMENT:
        return 'Semi-confinamento';
      default:
        return type;
    }
  }, []);

  // Helper function to get last quality for a location
  const getLastLocationQuality = useCallback((locationId: string): LocationQuality | null => {
    const locationQualities = LOCATION_QUALITIES.filter(
      (quality) => quality.locationId === locationId && !quality.deletedAt,
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return locationQualities.length > 0 ? locationQualities[0] : null;
  }, []);

  // Helper function to get location status label (for search)
  const getLocationStatusInfo = useCallback((status: LocationStatus) => {
    switch (status) {
      case LocationStatus.ACTIVE:
        return { label: 'Ativo' };
      case LocationStatus.INACTIVE:
        return { label: 'Inativo' };
      case LocationStatus.MAINTENANCE:
        return { label: 'Manutenção' };
      default:
        return { label: status };
    }
  }, []);

  // Helper function to get animal count for a specific location
  const getAnimalCountByLocation = useCallback((locationId: string) => {
    // Get all movements for this location
    const locationMovements = LOCATION_MOVEMENTS.filter(
      (movement) =>
        movement.locationId === locationId &&
        (movement.type === LocationMovimentType.ENTRY ||
          movement.type === LocationMovimentType.EXIT),
    );

    // Get all animal locations that reference these movements
    const animalLocations = ANIMAL_LOCATIONS.filter((al) =>
      locationMovements.some((movement) => movement.id === al.locationMovimentId),
    );

    // Count animals currently in location (ENTRY movements without corresponding EXIT)
    let currentCount = 0;
    const animalMovementMap = new Map<string, string[]>(); // animalId -> movementIds

    // Group animal movements by animal ID
    animalLocations.forEach((al) => {
      if (!animalMovementMap.has(al.animalId)) {
        animalMovementMap.set(al.animalId, []);
      }
      animalMovementMap.get(al.animalId)!.push(al.locationMovimentId);
    });

    // For each animal, check if they're currently in the location
    animalMovementMap.forEach((movementIds, animalId) => {
      const movements = movementIds
        .map((id) => locationMovements.find((m) => m.id === id))
        .filter(Boolean);

      // Sort by creation date to get chronological order
      movements.sort((a, b) => new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime());

      // Check if the last movement is an ENTRY (animal is currently in location)
      const lastMovement = movements[movements.length - 1];
      if (lastMovement && lastMovement.type === LocationMovimentType.ENTRY) {
        currentCount++;
      }
    });

    return currentCount;
  }, []);

  // Filter locations for this property
  const basePropertyLocations = useMemo(
    () => LOCATIONS.filter((location) => location.propertyId === property.id),
    [property.id],
  );

  // Apply search filter with debounced search
  const searchLocations = useCallback(
    (locations: Location[], searchTerm: string) => {
      if (!searchTerm.trim()) return locations;

      const term = searchTerm.toLowerCase().trim();
      return locations.filter(
        (location) =>
          location.name.toLowerCase().includes(term) ||
          location.code.toLowerCase().includes(term) ||
          getLocationTypeLabel(location.type).toLowerCase().includes(term) ||
          getLocationStatusInfo(location.status).label.toLowerCase().includes(term),
      );
    },
    [getLocationTypeLabel, getLocationStatusInfo],
  );

  const propertyLocations = useMemo(
    () => searchLocations(basePropertyLocations, debouncedLocationsSearch),
    [basePropertyLocations, debouncedLocationsSearch, searchLocations],
  );

  // Apply sorting with memoization
  const sortedPropertyLocations = useMemo(() => {
    if (!locationsSort) return propertyLocations;

    return [...propertyLocations].sort((a, b) => {
      let aValue: any = a[locationsSort.key as keyof Location];
      let bValue: any = b[locationsSort.key as keyof Location];

      // Handle type sorting (by label)
      if (locationsSort.key === 'type') {
        aValue = getLocationTypeLabel(aValue).toLowerCase();
        bValue = getLocationTypeLabel(bValue).toLowerCase();
      }

      // Handle status sorting (by label)
      if (locationsSort.key === 'status') {
        aValue = getLocationStatusInfo(aValue).label.toLowerCase();
        bValue = getLocationStatusInfo(bValue).label.toLowerCase();
      }

      // Handle quality sorting (by quality type)
      if (locationsSort.key === 'quality') {
        const aQuality = getLastLocationQuality(a.id);
        const bQuality = getLastLocationQuality(b.id);
        aValue = aQuality ? aQuality.quality : 'not_assessed';
        bValue = bQuality ? bQuality.quality : 'not_assessed';
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return locationsSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return locationsSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [
    propertyLocations,
    locationsSort,
    getLocationTypeLabel,
    getLocationStatusInfo,
    getLastLocationQuality,
  ]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedLocations,
    handlePageChange,
    hasPagination,
  } = usePropertyTabPagination({ filteredData: sortedPropertyLocations });

  // Table configuration
  const tableConfig: TableConfig<Location> = {
    title: 'Localizações da Propriedade',
    subtitle: `Propriedade: ${property.name}`,
    count: sortedPropertyLocations.length,
    countLabel: 'localizações',
    columns: [
      {
        key: 'code',
        label: 'Código',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'code' && locationsSort?.direction === 'asc' ? 'desc' : 'asc';
          onLocationsSortChange({ key: 'code', direction: newDirection });
        },
        render: (value: string, location: Location) => (
          <button
            onClick={() => handleLocationClick(location.id)}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200 text-left cursor-pointer"
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
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'name' && locationsSort?.direction === 'asc' ? 'desc' : 'asc';
          onLocationsSortChange({ key: 'name', direction: newDirection });
        },
        render: (value: string, location: Location) => (
          <button
            onClick={() => handleLocationClick(location.id)}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-200 text-left cursor-pointer"
          >
            {location.name}
          </button>
        ),
      },
      {
        key: 'type',
        label: 'Tipo',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'type' && locationsSort?.direction === 'asc' ? 'desc' : 'asc';
          onLocationsSortChange({ key: 'type', direction: newDirection });
        },
        render: (value: LocationType) => <LocationTypeBadge type={value} />,
      },
      {
        key: 'area',
        label: 'Área',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'area' && locationsSort?.direction === 'asc' ? 'desc' : 'asc';
          onLocationsSortChange({ key: 'area', direction: newDirection });
        },
        render: (value: number, location: Location) => (
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {value} {location.areaType}
          </div>
        ),
      },
      {
        key: 'capacity',
        label: 'Capacidade',
        sortable: true,
        className: 'w-48',
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'capacity' && locationsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onLocationsSortChange({ key: 'capacity', direction: newDirection });
        },
        render: (value: number, location: Location) => {
          const animalCount = getAnimalCountByLocation(location.id);
          const percentage = value > 0 ? Math.round((animalCount / value) * 100) : 0;

          return (
            <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
              {value} / {animalCount} ({percentage}%)
            </div>
          );
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'status' && locationsSort?.direction === 'asc' ? 'desc' : 'asc';
          onLocationsSortChange({ key: 'status', direction: newDirection });
        },
        render: (value: LocationStatus) => <LocationStatusBadge status={value} />,
      },
      {
        key: 'quality',
        label: 'Qualidade',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            locationsSort?.key === 'quality' && locationsSort?.direction === 'asc' ? 'desc' : 'asc';
          onLocationsSortChange({ key: 'quality', direction: newDirection });
        },
        render: (value: any, location: Location) => {
          const lastQuality = getLastLocationQuality(location.id);
          return lastQuality ? (
            <LocationQualityBadge quality={lastQuality.quality} />
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                Não avaliada
              </span>
            </div>
          );
        },
      },
    ],
    data: paginatedLocations,
    actions: {
      add: {
        label: 'Nova Localização',
        onClick: handleOpenDrawer,
      },
    },
    search: {
      placeholder: 'Pesquisar localizações...',
      value: locationsSearch,
      onChange: onLocationsSearchChange,
    },
    ...(hasPagination
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems: sortedPropertyLocations.length,
            onPageChange: handlePageChange,
          },
        }
      : {}),
  };

  if (sortedPropertyLocations.length === 0) {
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma localização encontrada
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Esta propriedade ainda não possui localizações cadastradas.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table config={tableConfig} />

      {/* Add Location Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        config={{ position: 'right', size: 'xl' }}
        data-testid="add-location-drawer"
      >
        <DrawerHeader
          title="Nova Localização"
          subtitle={`Adicione uma nova localização para a propriedade ${property.name}`}
          onClose={handleCloseDrawer}
        />
        <DrawerBody>
          <AddLocationForm
            ref={formRef}
            property={property}
            onSubmit={handleSubmitLocation}
            onCancel={handleCloseDrawer}
            loading={isSubmitting}
          />
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={handleCloseDrawer}
            config={{
              variant: 'secondary',
              type: 'button',
              disabled: isSubmitting,
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => formRef.current?.resetForm()}
            config={{
              variant: 'outline',
              type: 'button',
              disabled: isSubmitting,
            }}
          >
            Limpar
          </Button>
          <Button
            onClick={() => formRef.current?.submitForm()}
            config={{
              variant: 'primary',
              type: 'button',
              loading: isSubmitting,
            }}
          >
            Adicionar Localização
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

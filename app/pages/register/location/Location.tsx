import { useMemo } from 'react';
import { useLocations, type LocationWithProperty } from '~/hooks/useLocations';
import {
  useLocationFilters,
  useLocationPagination,
  useLocationNavigation,
  useLocationQuality,
  useAnimalCountByLocation,
} from './hooks';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { LOCATION_CONFIG, LOCATION_MESSAGES } from './config/locationConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';

export default function LocationPage() {
  const { locations, loading, error, refetch, deleteLocation } = useLocations();
  const { selectedPropertyId, isAllSelected } = useSelectedProperty();
  const { handleEditLocation, handleViewLocation, handleAddLocation } = useLocationNavigation();
  const { getLocationQuality } = useLocationQuality();
  const { getAnimalCountByLocation } = useAnimalCountByLocation();

  const locationsFilteredByProperty = useMemo(() => {
    if (!locations) return [];
    if (!selectedPropertyId || isAllSelected) return locations;
    return locations.filter((loc) => loc.propertyId === selectedPropertyId);
  }, [locations, selectedPropertyId, isAllSelected]);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredEntities: filteredLocations,
  } = useLocationFilters({ locations: locationsFilteredByProperty, getLocationQuality });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedLocations,
    handlePageChange,
    hasPagination,
  } = useLocationPagination({ filteredLocations: filteredLocations || [] });

  const tableConfig = createTableConfig({
    filteredLocations: paginatedLocations,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    getLocationQuality,
    getAnimalCountByLocation,
    onEditLocation: (location: LocationWithProperty) => handleEditLocation(location.id, false),
    onDeleteLocation: (location: LocationWithProperty) => deleteLocation(location.id),
    onAddLocation: handleAddLocation,
    onViewLocation: (location: LocationWithProperty) => handleViewLocation(location.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredLocations.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={locations || []}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={deleteLocation}
      filteredEntities={filteredLocations || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={LOCATION_MESSAGES.loading}
      errorTitle={LOCATION_MESSAGES.errorTitle}
      entityType={LOCATION_CONFIG.entityType}
      entityNameKey="name"
    />
  );
}

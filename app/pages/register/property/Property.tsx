import { useMemo } from 'react';
import { useProperties } from '~/hooks/useProperties';
import type { Property } from '~/types/property';
import {
  usePropertyFilters,
  usePropertyPagination,
  useLocationCount,
  useAnimalCount,
  useCapacity,
  useEmployeeCount,
} from './hooks';
import { usePropertyNavigation } from './utils/navigation';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { PROPERTY_CONFIG, PROPERTY_MESSAGES } from './config/propertyConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';

export default function PropertyPage() {
  const { properties, loading, error, refetch, deleteProperty } = useProperties();
  const { selectedPropertyId } = useSelectedProperty();
  const { getLocationCount } = useLocationCount();
  const { getAnimalCount } = useAnimalCount();
  const { getCapacity } = useCapacity();
  const { getEmployeeCount } = useEmployeeCount();
  const { handleEditProperty, handleViewProperty, handleAddProperty } = usePropertyNavigation();

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredProperties,
  } = usePropertyFilters({ properties, getLocationCount, getAnimalCount, getEmployeeCount });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedProperties,
    handlePageChange,
    hasPagination,
  } = usePropertyPagination({ filteredProperties: filteredProperties || [] });

  const tableConfig = createTableConfig({
    filteredProperties: paginatedProperties,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    getLocationCount,
    getAnimalCount,
    getCapacity,
    getEmployeeCount,
    onEditProperty: (property: Property) => handleEditProperty(property.id),
    onDeleteProperty: (property: Property) => deleteProperty(property.id),
    onAddProperty: handleAddProperty,
    onViewProperty: (property: Property) => handleViewProperty(property.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredProperties.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={properties}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={deleteProperty}
      filteredEntities={filteredProperties || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={PROPERTY_MESSAGES.loading}
      errorTitle={PROPERTY_MESSAGES.errorTitle}
      entityType={PROPERTY_CONFIG.entityType}
      entityNameKey="name"
    />
  );
}

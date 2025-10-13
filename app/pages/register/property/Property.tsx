import { useMemo } from 'react';
import { useProperties } from '~/hooks/useProperties';
import type { PropertySummary } from '~/types/property';
import {
  usePropertyFilters,
  usePropertyPagination,
} from './hooks';
import { usePropertyNavigation } from './utils/navigation';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { PROPERTY_CONFIG, PROPERTY_MESSAGES } from './config/propertyConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';

export default function PropertyPage() {
  const { properties, loading, error, refetch } = useProperties();
  const { selectedPropertyId } = useSelectedProperty();
  const { handleEditProperty, handleViewProperty, handleAddProperty } = usePropertyNavigation();

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredProperties,
  } = usePropertyFilters({ properties });

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
    onEditProperty: (property: PropertySummary) => handleEditProperty(property.id),
    onDeleteProperty: (property: PropertySummary) => console.log('Delete not implemented', property.id),
    onAddProperty: handleAddProperty,
    onViewProperty: (property: PropertySummary) => handleViewProperty(property.id),
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
      deleteEntity={() => console.log('Delete not implemented')}
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

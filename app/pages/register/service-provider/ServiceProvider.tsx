import { useMemo } from 'react';
import { useServiceProviders } from '~/hooks/useServiceProviders';
import type { ServiceProvider } from '~/types/service-provider';
import { useServiceProviderFilters, useServiceProviderPagination } from './hooks';
import { useServiceProviderNavigation } from './utils/navigation';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { SERVICEPROVIDER_CONFIG, SERVICEPROVIDER_MESSAGES } from './config/serviceProviderConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';
import { SERVICEPROVIDERHASPROPERTY } from '~/mocks/service-provider-mock';

export default function ServiceProviderPage() {
  const { serviceProviders, loading, error, refetch, deleteServiceProvider } =
    useServiceProviders();
  const { selectedPropertyId, isAllSelected } = useSelectedProperty();
  const { handleEditServiceProvider, handleViewServiceProvider, handleAddServiceProvider } =
    useServiceProviderNavigation();

  const serviceProvidersFilteredByProperty = useMemo(() => {
    if (!serviceProviders) return [];
    if (!selectedPropertyId || isAllSelected) return serviceProviders;
    return serviceProviders.filter((sp) =>
      SERVICEPROVIDERHASPROPERTY.some(
        (rel) => rel.serviceProvider_id === sp.id && rel.property_id === selectedPropertyId,
      ),
    );
  }, [serviceProviders, selectedPropertyId, isAllSelected]);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredServiceProviders,
  } = useServiceProviderFilters({ serviceProviders: serviceProvidersFilteredByProperty });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedServiceProviders,
    handlePageChange,
    hasPagination,
  } = useServiceProviderPagination({ filteredServiceProviders: filteredServiceProviders || [] });

  const tableConfig = createTableConfig({
    filteredServiceProviders: paginatedServiceProviders,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    onEditServiceProvider: (serviceProvider: ServiceProvider) =>
      handleEditServiceProvider(serviceProvider.id),
    onDeleteServiceProvider: (serviceProvider: ServiceProvider) =>
      deleteServiceProvider(serviceProvider.id),
    onAddServiceProvider: handleAddServiceProvider,
    onViewServiceProvider: (serviceProvider: ServiceProvider) =>
      handleViewServiceProvider(serviceProvider.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredServiceProviders.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={serviceProviders}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={async (id: string) => {
        await deleteServiceProvider(id);
      }}
      filteredEntities={filteredServiceProviders || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={SERVICEPROVIDER_MESSAGES.loading}
      errorTitle={SERVICEPROVIDER_MESSAGES.errorTitle}
      entityType={SERVICEPROVIDER_CONFIG.entityType}
      entityNameKey="name"
    />
  );
}

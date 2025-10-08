import { useMemo } from 'react';
import { useSuppliers } from '~/hooks/useSuppliers';
import type { Supplier } from '~/types/supplier';
import { useSupplierFilters, useSupplierPagination } from './hooks';
import { useSupplierNavigation } from './utils/navigation';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { SUPPLIER_CONFIG, SUPPLIER_MESSAGES } from './config/supplierConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';
import { PROPERTYHASSUPPLIER } from '~/mocks/supplier-mock';

export default function SupplierPage() {
  const { suppliers, loading, error, refetch, deleteSupplier } = useSuppliers();
  const { selectedPropertyId, isAllSelected } = useSelectedProperty();
  const { handleEditSupplier, handleViewSupplier, handleAddSupplier } = useSupplierNavigation();

  const suppliersFilteredByProperty = useMemo(() => {
    if (!suppliers) return [];
    if (!selectedPropertyId || isAllSelected) return suppliers;
    return suppliers.filter((s) =>
      PROPERTYHASSUPPLIER.some(
        (rel) => rel.supplierId === s.id && rel.propertyId === selectedPropertyId,
      ),
    );
  }, [suppliers, selectedPropertyId, isAllSelected]);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredSuppliers,
  } = useSupplierFilters({ suppliers: suppliersFilteredByProperty });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedSuppliers,
    handlePageChange,
    hasPagination,
  } = useSupplierPagination({ filteredSuppliers: filteredSuppliers || [] });

  const tableConfig = createTableConfig({
    filteredSuppliers: paginatedSuppliers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    onEditSupplier: (supplier: Supplier) => handleEditSupplier(supplier.id),
    onDeleteSupplier: (supplier: Supplier) => deleteSupplier(supplier.id),
    onAddSupplier: handleAddSupplier,
    onViewSupplier: (supplier: Supplier) => handleViewSupplier(supplier.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredSuppliers.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={suppliers}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={async (id: string) => {
        await deleteSupplier(id);
      }}
      filteredEntities={filteredSuppliers || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={SUPPLIER_MESSAGES.loading}
      errorTitle={SUPPLIER_MESSAGES.errorTitle}
      entityType={SUPPLIER_CONFIG.entityType}
      entityNameKey="name"
    />
  );
}

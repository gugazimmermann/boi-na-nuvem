import { useMemo } from 'react';
import { useBuyers } from '~/hooks/useBuyers';
import type { Buyer } from '~/types/buyer';
import { useBuyerFilters, useBuyerPagination } from './hooks';
import { useBuyerNavigation } from './utils/navigation';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { BUYER_CONFIG, BUYER_MESSAGES } from './config/buyerConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';
import { filterBySelectedProperty } from '~/utils/filterBySelectedProperty';
import { PROPERTYHASBUYER } from '~/mocks/buyer-mock';

export default function BuyerPage() {
  const { buyers, loading, error, refetch, deleteBuyer } = useBuyers();
  const { selectedPropertyId, isAllSelected } = useSelectedProperty();
  const { handleEditBuyer, handleViewBuyer, handleAddBuyer } = useBuyerNavigation();

  const buyersFilteredByProperty = useMemo(() => {
    if (!buyers) return [];
    if (!selectedPropertyId || isAllSelected) return buyers;
    return buyers.filter((b) =>
      PROPERTYHASBUYER.some((rel) => rel.buyerId === b.id && rel.propertyId === selectedPropertyId),
    );
  }, [buyers, selectedPropertyId, isAllSelected]);

  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, handleSort, filteredBuyers } =
    useBuyerFilters({ buyers: buyersFilteredByProperty });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedBuyers,
    handlePageChange,
    hasPagination,
  } = useBuyerPagination({ filteredBuyers: filteredBuyers || [] });

  const tableConfig = createTableConfig({
    filteredBuyers: paginatedBuyers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    onEditBuyer: (buyer: Buyer) => handleEditBuyer(buyer.id),
    onDeleteBuyer: (buyer: Buyer) => deleteBuyer(buyer.id),
    onAddBuyer: handleAddBuyer,
    onViewBuyer: (buyer: Buyer) => handleViewBuyer(buyer.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredBuyers.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={buyers}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={async (id: string) => {
        await deleteBuyer(id);
      }}
      filteredEntities={filteredBuyers || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={BUYER_MESSAGES.loading}
      errorTitle={BUYER_MESSAGES.errorTitle}
      entityType={BUYER_CONFIG.entityType}
      entityNameKey="name"
    />
  );
}

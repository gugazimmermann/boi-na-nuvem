import { useState, useMemo, useCallback } from 'react';
import type { Buyer } from '~/types/buyer';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UseBuyerPaginationProps {
  filteredBuyers: Buyer[];
  itemsPerPage?: number;
}

export function useBuyerPagination({
  filteredBuyers,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseBuyerPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredBuyers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedBuyers = useMemo(() => {
    return filteredBuyers.slice(startIndex, endIndex);
  }, [filteredBuyers, startIndex, endIndex]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedBuyers,
    handlePageChange,
    resetPagination,
    hasPagination: filteredBuyers.length > itemsPerPage,
  };
}

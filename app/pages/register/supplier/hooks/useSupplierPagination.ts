import { useState, useMemo, useCallback } from 'react';
import type { Supplier } from '~/types/supplier';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UseSupplierPaginationProps {
  filteredSuppliers: Supplier[];
  itemsPerPage?: number;
}

export function useSupplierPagination({
  filteredSuppliers,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseSupplierPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedSuppliers = useMemo(() => {
    return filteredSuppliers.slice(startIndex, endIndex);
  }, [filteredSuppliers, startIndex, endIndex]);

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
    paginatedSuppliers,
    handlePageChange,
    resetPagination,
    hasPagination: filteredSuppliers.length > itemsPerPage,
  };
}

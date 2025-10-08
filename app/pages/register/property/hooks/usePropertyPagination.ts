import { useState, useMemo, useCallback } from 'react';
import type { Property } from '~/types/property';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UsePropertyPaginationProps {
  filteredProperties: Property[];
  itemsPerPage?: number;
}

export function usePropertyPagination({
  filteredProperties,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UsePropertyPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProperties = useMemo(() => {
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, startIndex, endIndex]);

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
    paginatedProperties,
    handlePageChange,
    resetPagination,
    hasPagination: filteredProperties.length > itemsPerPage,
  };
}

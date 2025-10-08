import { useState, useMemo, useCallback } from 'react';
import type { Location } from '~/types/location';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UseLocationPaginationProps {
  filteredLocations: Location[];
  itemsPerPage?: number;
}

export function useLocationPagination({
  filteredLocations,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseLocationPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedLocations = useMemo(() => {
    return filteredLocations.slice(startIndex, endIndex);
  }, [filteredLocations, startIndex, endIndex]);

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
    paginatedLocations,
    handlePageChange,
    resetPagination,
    hasPagination: filteredLocations.length > itemsPerPage,
  };
}

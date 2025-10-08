import { useState, useMemo, useCallback } from 'react';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UsePropertyTabPaginationProps<T> {
  filteredData: T[];
  itemsPerPage?: number;
}

export function usePropertyTabPagination<T>({
  filteredData,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UsePropertyTabPaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = useMemo(() => {
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, startIndex, endIndex]);

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
    paginatedData,
    handlePageChange,
    resetPagination,
    hasPagination: filteredData.length > itemsPerPage,
  };
}

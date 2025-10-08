import { useState, useMemo, useCallback } from 'react';
import type { Employee } from '~/types/employee';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UseEmployeePaginationProps {
  filteredEmployees: Employee[];
  itemsPerPage?: number;
}

export function useEmployeePagination({
  filteredEmployees,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseEmployeePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedEmployees = useMemo(() => {
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, startIndex, endIndex]);

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
    paginatedEmployees,
    handlePageChange,
    resetPagination,
    hasPagination: filteredEmployees.length > itemsPerPage,
  };
}

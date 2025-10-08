import { useState, useMemo, useCallback } from 'react';
import type { ServiceProvider } from '~/types/service-provider';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UseServiceProviderPaginationProps {
  filteredServiceProviders: ServiceProvider[];
  itemsPerPage?: number;
}

export function useServiceProviderPagination({
  filteredServiceProviders,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseServiceProviderPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredServiceProviders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedServiceProviders = useMemo(() => {
    return filteredServiceProviders.slice(startIndex, endIndex);
  }, [filteredServiceProviders, startIndex, endIndex]);

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
    paginatedServiceProviders,
    handlePageChange,
    resetPagination,
    hasPagination: filteredServiceProviders.length > itemsPerPage,
  };
}

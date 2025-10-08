import { useState, useMemo, useCallback } from 'react';
import type { Animal } from '~/types/animal';
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

interface UseAnimalPaginationProps {
  filteredAnimals: Animal[];
  itemsPerPage?: number;
}

interface UseAnimalPaginationReturn {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  paginatedAnimals: Animal[];
  handlePageChange: (page: number) => void;
  hasPagination: boolean;
}

export function useAnimalPagination({
  filteredAnimals,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: UseAnimalPaginationProps): UseAnimalPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredAnimals.length / itemsPerPage);
  }, [filteredAnimals.length, itemsPerPage]);

  const paginatedAnimals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAnimals.slice(startIndex, endIndex);
  }, [filteredAnimals, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const hasPagination = totalPages > 1;

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedAnimals,
    handlePageChange,
    hasPagination,
  };
}

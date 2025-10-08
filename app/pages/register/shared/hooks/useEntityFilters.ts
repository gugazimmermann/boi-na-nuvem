import { useState, useMemo } from 'react';

interface UseEntityFiltersParams<T> {
  entities: T[];
  searchFields: (keyof T)[];
}

export const useEntityFilters = <T extends Record<string, any>>({
  entities,
  searchFields,
}: UseEntityFiltersParams<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredEntities = useMemo(() => {
    let filtered = entities;

    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((entity) =>
        searchFields.some((field) => {
          const value = entity[field];
          return value && value.toString().toLowerCase().includes(lowercaseSearch);
        }),
      );
    }

    if (statusFilter !== 'all' && 'status' in entities[0]) {
      filtered = filtered.filter((entity) => entity.status === statusFilter);
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [entities, searchTerm, statusFilter, sortField, sortDirection, searchFields]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    handleSort,
    filteredEntities,
  };
};

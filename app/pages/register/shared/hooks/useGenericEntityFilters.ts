import { useState, useMemo } from 'react';

interface UseGenericEntityFiltersProps<T> {
  entities: T[];
  searchFields: (keyof T)[];
}

export const useGenericEntityFilters = <T>({
  entities,
  searchFields,
}: UseGenericEntityFiltersProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredEntities = useMemo(() => {
    let filtered = [...entities];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((entity) =>
        searchFields.some((field) => {
          const value = entity[field];
          return value && String(value).toLowerCase().includes(term);
        }),
      );
    }

    if (statusFilter !== 'all' && entities.length > 0 && 'status' in entities[0]) {
      filtered = filtered.filter((entity) => (entity as any).status === statusFilter);
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = (a as any)[sortField];
        const bValue = (b as any)[sortField];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
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
    handleSort,
    filteredEntities,
  };
};

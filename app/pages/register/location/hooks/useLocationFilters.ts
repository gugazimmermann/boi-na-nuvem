import { useState, useMemo } from 'react';
import type { Location, LocationQualityType } from '~/types/location';

interface UseLocationFiltersParams {
  locations: Location[];
  getLocationQuality?: (locationId: string) => LocationQualityType | null;
}

export const useLocationFilters = ({ locations, getLocationQuality }: UseLocationFiltersParams) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const searchFields: (keyof Location)[] = ['name', 'code', 'description', 'type'];

  const filteredEntities = useMemo(() => {
    let filtered = locations;

    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((location) =>
        searchFields.some((field) => {
          const value = location[field];
          return value && value.toString().toLowerCase().includes(lowercaseSearch);
        }),
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((location) => location.status === statusFilter);
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortField === 'quality') {
          aValue = getLocationQuality?.(a.id) || 'not_evaluated';
          bValue = getLocationQuality?.(b.id) || 'not_evaluated';
        } else {
          aValue = a[sortField as keyof Location];
          bValue = b[sortField as keyof Location];
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue, 'pt-BR', { sensitivity: 'base' })
            : bValue.localeCompare(aValue, 'pt-BR', { sensitivity: 'base' });
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [
    locations,
    searchTerm,
    statusFilter,
    sortField,
    sortDirection,
    searchFields,
    getLocationQuality,
  ]);

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

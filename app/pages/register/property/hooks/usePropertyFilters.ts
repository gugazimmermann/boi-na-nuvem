import { useState, useMemo, useCallback } from 'react';
import type { Property } from '~/types/property';
import { PropertyStatus } from '~/types/property';
import { SORT_DIRECTIONS } from '../../shared/constants';
import { PROPERTY_CONFIG } from '../config/propertyConfig';

type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  key: string;
  direction: SortDirection;
};

interface UsePropertyFiltersProps {
  properties: Property[];
  getLocationCount?: (propertyId: string) => number;
  getAnimalCount?: (propertyId: string) => number;
  getEmployeeCount?: (propertyId: string) => number;
}

export function usePropertyFilters({
  properties,
  getLocationCount,
  getAnimalCount,
  getEmployeeCount,
}: UsePropertyFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'createdAt',
    direction: SORT_DIRECTIONS.DESC,
  });

  const normalizeText = useCallback((text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }, []);

  const matchesSearchTerm = useCallback(
    (property: Property, term: string) => {
      const normalizedTerm = normalizeText(term);
      const searchFields = PROPERTY_CONFIG.searchFields.map(
        (field) => property[field as keyof Property] || '',
      );

      return searchFields.some((field) => {
        const normalizedField = normalizeText(String(field));

        if (normalizedField.includes(normalizedTerm)) {
          return true;
        }

        const words = normalizedTerm.split(/\s+/);
        return words.every((word) => word.length > 0 && normalizedField.includes(word));
      });
    },
    [normalizeText],
  );

  const handleSort = useCallback((key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        const nextDirection =
          prevConfig.direction === SORT_DIRECTIONS.ASC
            ? SORT_DIRECTIONS.DESC
            : prevConfig.direction === SORT_DIRECTIONS.DESC
              ? SORT_DIRECTIONS.NONE
              : SORT_DIRECTIONS.ASC;
        return { key, direction: nextDirection };
      } else {
        return { key, direction: SORT_DIRECTIONS.ASC };
      }
    });
  }, []);

  const filteredProperties = useMemo(() => {
    let filtered = properties || [];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((property) => property.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((property) => matchesSearchTerm(property, searchTerm));
    }

    if (sortConfig.direction && sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortConfig.key) {
          case 'code':
            aValue = a.code;
            bValue = b.code;
            break;
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'locationCount':
            aValue = getLocationCount?.(a.id) || 0;
            bValue = getLocationCount?.(b.id) || 0;
            break;
          case 'animalCount':
            aValue = getAnimalCount?.(a.id) || 0;
            bValue = getAnimalCount?.(b.id) || 0;
            break;
          case 'employeeCount':
            aValue = getEmployeeCount?.(a.id) || 0;
            bValue = getEmployeeCount?.(b.id) || 0;
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt || 0).getTime();
            bValue = new Date(b.createdAt || 0).getTime();
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue, 'pt-BR', {
            sensitivity: 'base',
            numeric: true,
          });
          return sortConfig.direction === SORT_DIRECTIONS.ASC ? comparison : -comparison;
        }

        if (aValue < bValue) return sortConfig.direction === SORT_DIRECTIONS.ASC ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === SORT_DIRECTIONS.ASC ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [properties, searchTerm, statusFilter, sortConfig, matchesSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredProperties,
  };
}

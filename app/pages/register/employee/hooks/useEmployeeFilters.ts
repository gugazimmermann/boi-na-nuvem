import { useState, useMemo, useCallback } from 'react';
import type { Employee } from '~/types/employee';
import { SORT_DIRECTIONS } from '../../shared/constants';
import { EMPLOYEE_CONFIG } from '../config/employeeConfig';

type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  key: string;
  direction: SortDirection;
};

interface UseEmployeeFiltersProps {
  employees: Employee[];
}

export function useEmployeeFilters({ employees }: UseEmployeeFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
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
    (employee: Employee, term: string) => {
      const normalizedTerm = normalizeText(term);
      const searchFields = EMPLOYEE_CONFIG.searchFields.map(
        (field) => employee[field as keyof Employee] || '',
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

  const filteredEmployees = useMemo(() => {
    let filtered = employees || [];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((employee) => employee.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((employee) => matchesSearchTerm(employee, searchTerm));
    }

    if (sortConfig.direction && sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortConfig.key) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'email':
            aValue = a.email;
            bValue = b.email;
            break;
          case 'phone':
            aValue = a.phone;
            bValue = b.phone;
            break;
          case 'city':
            aValue = a.city;
            bValue = b.city;
            break;
          case 'state':
            aValue = a.state;
            bValue = b.state;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
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
  }, [employees, searchTerm, statusFilter, sortConfig, matchesSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredEmployees,
  };
}

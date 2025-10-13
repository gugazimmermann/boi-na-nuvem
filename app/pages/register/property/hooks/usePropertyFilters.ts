import { useState, useMemo, useCallback } from 'react';
import type { PropertySummary } from '~/types/property';
import { PropertyStatus } from '~/types/property';
import { SORT_DIRECTIONS } from '../../shared/constants';
import { PROPERTY_CONFIG } from '../config/propertyConfig';

type SortDirection = 'asc' | 'desc' | null;
type SortConfig = {
  key: string;
  direction: SortDirection;
};

interface UsePropertyFiltersProps {
  properties: PropertySummary[];
}

export function usePropertyFilters({
  properties,
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
    (property: PropertySummary, term: string) => {
      const normalizedTerm = normalizeText(term);
      const searchFields = [
        property.codigo,
        property.nome,
        property.endereco.city,
        property.endereco.state,
        property.endereco.country,
      ].filter(Boolean);

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
            aValue = a.codigo;
            bValue = b.codigo;
            break;
          case 'name':
            aValue = a.nome;
            bValue = b.nome;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'locationCount':
            aValue = a.quantidadeLocalizacoes;
            bValue = b.quantidadeLocalizacoes;
            break;
          case 'animalCount':
            aValue = a.capacidade.totalAnimais;
            bValue = b.capacidade.totalAnimais;
            break;
          case 'employeeCount':
            aValue = a.totalColaboradores;
            bValue = b.totalColaboradores;
            break;
          case 'capacity':
            aValue = a.capacidade.total;
            bValue = b.capacidade.total;
            break;
          case 'occupancy':
            aValue = a.capacidade.porcentagemOcupacao;
            bValue = b.capacidade.porcentagemOcupacao;
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

import { useState, useMemo, useCallback } from 'react';
import type { Animal } from '~/types/animal';

interface UseAnimalFiltersProps {
  animals: Animal[];
}

interface UseAnimalFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  breedFilter: string;
  setBreedFilter: (breed: string) => void;
  handleSort: (key: string) => void;
  filteredEntities: Animal[];
}

export function useAnimalFilters({ animals }: UseAnimalFiltersProps): UseAnimalFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({
    key: 'createdAt',
    direction: 'desc',
  });

  const handleSort = useCallback((key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const filteredEntities = useMemo(() => {
    let filtered = animals.filter((animal) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();

        const birthDate = new Date(animal.birthDate);
        const now = new Date();
        const ageInMonths = Math.floor(
          (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
        );

        const matchesSearch =
          animal.code.toLowerCase().includes(searchLower) ||
          animal.registrationNumber.toLowerCase().includes(searchLower) ||
          animal.breed.toLowerCase().includes(searchLower) ||
          animal.bloodDegree.toLowerCase().includes(searchLower) ||
          animal.sex.toLowerCase().includes(searchLower) ||
          animal.purpose.toLowerCase().includes(searchLower) ||
          ageInMonths.toString().includes(searchLower);

        if (!matchesSearch) return false;
      }

      if (breedFilter !== 'all') {
        if (animal.breed !== breedFilter) return false;
      }

      return true;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'ageInMonths') {
          const aBirthDate = new Date(a.birthDate);
          const bBirthDate = new Date(b.birthDate);
          const now = new Date();
          aValue = Math.floor(
            (now.getTime() - aBirthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
          );
          bValue = Math.floor(
            (now.getTime() - bBirthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
          );
        } else {
          aValue = a[sortConfig.key as keyof Animal];
          bValue = b[sortConfig.key as keyof Animal];

          if (
            sortConfig.key === 'birthDate' ||
            sortConfig.key === 'acquisitionDate' ||
            sortConfig.key === 'createdAt'
          ) {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
          }
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [animals, searchTerm, breedFilter, sortConfig]);

  return {
    searchTerm,
    setSearchTerm,
    breedFilter,
    setBreedFilter,
    handleSort,
    filteredEntities,
  };
}

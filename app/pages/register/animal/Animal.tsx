import { useMemo } from 'react';
import { useAnimals } from '~/hooks/useAnimals';
import type { Animal } from '~/types/animal';
import {
  useAnimalFilters,
  useAnimalPagination,
  useAnimalNavigation,
  useAnimalLocation,
} from './hooks';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { ANIMAL_CONFIG, ANIMAL_MESSAGES } from './config/animalConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';
import { filterBySelectedProperty } from '~/utils/filterBySelectedProperty';

export default function AnimalPage() {
  const { animals, loading, error, refetch, deleteAnimal } = useAnimals();
  const { selectedPropertyId, isAllSelected } = useSelectedProperty();
  const { handleEditAnimal, handleViewAnimal, handleAddAnimal } = useAnimalNavigation();
  const { getAnimalCurrentLocation } = useAnimalLocation();

  const animalsFilteredByProperty = useMemo(() => {
    return filterBySelectedProperty(animals, selectedPropertyId, isAllSelected, (animal) => {
      const current = getAnimalCurrentLocation(animal.id);
      return current?.property?.id || null;
    });
  }, [animals, selectedPropertyId, isAllSelected, getAnimalCurrentLocation]);

  const {
    searchTerm,
    setSearchTerm,
    breedFilter,
    setBreedFilter,
    handleSort,
    filteredEntities: filteredAnimals,
  } = useAnimalFilters({ animals: animalsFilteredByProperty });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedAnimals,
    handlePageChange,
    hasPagination,
  } = useAnimalPagination({ filteredAnimals: filteredAnimals || [] });

  const tableConfig = createTableConfig({
    filteredAnimals: paginatedAnimals || [],
    searchTerm,
    setSearchTerm,
    breedFilter,
    setBreedFilter,
    handleSort,
    getAnimalCurrentLocation,
    onEditAnimal: (animal: Animal) => handleEditAnimal(animal.id, false),
    onDeleteAnimal: (animal: Animal) => deleteAnimal(animal.id),
    onAddAnimal: handleAddAnimal,
    onViewAnimal: (animal: Animal) => handleViewAnimal(animal.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredAnimals.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={animals || []}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={deleteAnimal}
      filteredEntities={filteredAnimals || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={breedFilter}
      setStatusFilter={setBreedFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={ANIMAL_MESSAGES.loading}
      errorTitle={ANIMAL_MESSAGES.errorTitle}
      entityType={ANIMAL_CONFIG.entityType}
      entityNameKey="code"
    />
  );
}

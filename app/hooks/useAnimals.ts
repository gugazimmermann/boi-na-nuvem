import { useState, useEffect, useCallback } from 'react';
import type { Animal, AnimalBreed, BloodDegree } from '~/types/animal';
import { ANIMALS } from '~/mocks/animals-mock';

interface UseAnimalsReturn {
  animals: Animal[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createAnimal: (animalData: Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>) => Promise<Animal>;
  updateAnimal: (id: string, animalData: Partial<Animal>) => Promise<Animal>;
  deleteAnimal: (id: string) => Promise<void>;
  getAnimalById: (id: string) => Promise<Animal | null>;
  getAnimalsByBreed: (breed: AnimalBreed) => Promise<Animal[]>;
  getAnimalsByBloodDegree: (bloodDegree: BloodDegree) => Promise<Animal[]>;
  searchAnimals: (query: string) => Promise<Animal[]>;
  getAnimalsByAgeRange: (minAge: number, maxAge: number) => Promise<Animal[]>;
  getAnimalsByParent: (parentId: string) => Promise<Animal[]>;
}

export function useAnimals(): UseAnimalsReturn {
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAnimals(ANIMALS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar animais');
    } finally {
      setLoading(false);
    }
  }, []);

  const createAnimal = useCallback(
    async (animalData: Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        const newAnimal: Animal = {
          ...animalData,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          deletedAt: null,
        };
        setAnimals((prev) => (prev ? [...prev, newAnimal] : [newAnimal]));
        return newAnimal;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar animal');
        throw err;
      }
    },
    [],
  );

  const updateAnimal = useCallback(
    async (id: string, animalData: Partial<Animal>) => {
      try {
        setAnimals((prev) =>
          prev
            ? prev.map((animal) => (animal.id === id ? { ...animal, ...animalData } : animal))
            : null,
        );
        return animals?.find((a) => a.id === id) || ANIMALS[0];
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar animal');
        throw err;
      }
    },
    [animals],
  );

  const deleteAnimal = useCallback(async (id: string) => {
    try {
      setAnimals((prev) =>
        prev
          ? prev.map((animal) =>
              animal.id === id ? { ...animal, deletedAt: new Date().toISOString() } : animal,
            )
          : null,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir animal');
      throw err;
    }
  }, []);

  const getAnimalById = useCallback(
    async (id: string) => {
      try {
        return animals?.find((animal) => animal.id === id) || null;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar animal');
        throw err;
      }
    },
    [animals],
  );

  const getAnimalsByBreed = useCallback(
    async (breed: AnimalBreed) => {
      try {
        return animals?.filter((animal) => animal.breed === breed) || [];
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar animais por raça');
        throw err;
      }
    },
    [animals],
  );

  const getAnimalsByBloodDegree = useCallback(
    async (bloodDegree: BloodDegree) => {
      try {
        return animals?.filter((animal) => animal.bloodDegree === bloodDegree) || [];
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar animais por grau de sangue');
        throw err;
      }
    },
    [animals],
  );

  const searchAnimals = useCallback(
    async (query: string) => {
      try {
        const lowercaseQuery = query.toLowerCase();
        return (
          animals?.filter(
            (animal) =>
              animal.code.toLowerCase().includes(lowercaseQuery) ||
              animal.registrationNumber.toLowerCase().includes(lowercaseQuery) ||
              animal.breed.toLowerCase().includes(lowercaseQuery) ||
              animal.bloodDegree.toLowerCase().includes(lowercaseQuery),
          ) || []
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao pesquisar animais');
        throw err;
      }
    },
    [animals],
  );

  const getAnimalsByAgeRange = useCallback(
    async (minAge: number, maxAge: number) => {
      try {
        const now = new Date();
        return (
          animals?.filter((animal) => {
            const birthDate = new Date(animal.birthDate);
            const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
            return ageInYears >= minAge && ageInYears <= maxAge;
          }) || []
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar animais por faixa etária');
        throw err;
      }
    },
    [animals],
  );

  const getAnimalsByParent = useCallback(
    async (parentId: string) => {
      try {
        return (
          animals?.filter(
            (animal) => animal.fatherId === parentId || animal.motherId === parentId,
          ) || []
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar animais por parente');
        throw err;
      }
    },
    [animals],
  );

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  return {
    animals,
    loading,
    error,
    refetch: fetchAnimals,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimalById,
    getAnimalsByBreed,
    getAnimalsByBloodDegree,
    searchAnimals,
    getAnimalsByAgeRange,
    getAnimalsByParent,
  };
}

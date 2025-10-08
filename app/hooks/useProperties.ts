import { useState, useEffect, useCallback } from 'react';
import { type Property, PropertyStatus } from '~/types/property';
import { PROPERTIES } from '~/mocks/properties-mock';

interface UsePropertiesReturn {
  properties: Property[];
  activeProperties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProperty: (id: string, data: Partial<Property>) => Promise<Property>;
  createProperty: (data: Omit<Property, 'id'>) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
}

export function useProperties(): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeProperties, setActiveProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const allProperties = PROPERTIES.filter(
        (property) => property.code !== 'ALL' && !property.deletedAt,
      );
      setProperties(allProperties);

      const selectorProperties = [...PROPERTIES];
      const activeSelectorProperties = selectorProperties.filter(
        (property) => property.status === PropertyStatus.ACTIVE && !property.deletedAt,
      );
      setActiveProperties(activeSelectorProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar propriedades');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateProperty = useCallback(
    async (id: string, data: Partial<Property>): Promise<Property> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));

        const propertyIndex = PROPERTIES.findIndex((p) => p.id === id);
        if (propertyIndex === -1) {
          throw new Error('Propriedade não encontrada');
        }

        const updatedProperty = {
          ...PROPERTIES[propertyIndex],
          ...data,
          id,
        };

        PROPERTIES[propertyIndex] = updatedProperty;

        await fetchProperties();
        return updatedProperty;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar propriedade');
        throw err;
      }
    },
    [fetchProperties],
  );

  const createProperty = useCallback(
    async (data: Omit<Property, 'id'>): Promise<Property> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));

        const newProperty: Property = {
          ...data,
          id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };

        PROPERTIES.push(newProperty);

        await fetchProperties();
        return newProperty;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar propriedade');
        throw err;
      }
    },
    [fetchProperties],
  );

  const deleteProperty = useCallback(
    async (id: string): Promise<void> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));

        const propertyIndex = PROPERTIES.findIndex((p) => p.id === id);
        if (propertyIndex === -1) {
          throw new Error('Propriedade não encontrada');
        }

        PROPERTIES[propertyIndex].deletedAt = new Date().toISOString();

        await fetchProperties();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao excluir propriedade');
        throw err;
      }
    },
    [fetchProperties],
  );

  return {
    properties,
    activeProperties,
    loading,
    error,
    refetch: fetchProperties,
    updateProperty,
    createProperty,
    deleteProperty,
  };
}

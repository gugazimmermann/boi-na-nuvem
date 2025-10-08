import { useState, useEffect, useCallback } from 'react';
import type { Location, LocationType, LocationStatus } from '~/types/location';
import type { Property } from '~/types/property';
import { LOCATIONS } from '~/mocks/locations-mock';
import { PROPERTIES } from '~/mocks/properties-mock';

export interface LocationWithProperty extends Location {
  property?: Property;
}

interface UseLocationsReturn {
  locations: LocationWithProperty[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createLocation: (
    locationData: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>,
  ) => Promise<LocationWithProperty>;
  updateLocation: (id: string, locationData: Partial<Location>) => Promise<LocationWithProperty>;
  deleteLocation: (id: string) => Promise<void>;
  getLocationById: (id: string) => Promise<LocationWithProperty | null>;
  getLocationsByPropertyId: (propertyId: string) => Promise<LocationWithProperty[]>;
  searchLocations: (query: string) => Promise<LocationWithProperty[]>;
  getLocationsByStatus: (status: LocationStatus) => Promise<LocationWithProperty[]>;
  getLocationsByType: (type: LocationType) => Promise<LocationWithProperty[]>;
}

export function useLocations(): UseLocationsReturn {
  const [locations, setLocations] = useState<LocationWithProperty[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const locationsWithProperties: LocationWithProperty[] = LOCATIONS.map((location) => {
        const property = PROPERTIES.find((p) => p.id === location.propertyId);
        return {
          ...location,
          property,
        };
      });

      setLocations(locationsWithProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar localizações');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLocation = useCallback(
    async (locationData: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        const newLocation: Location = {
          ...locationData,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          deletedAt: null,
        };

        const property = PROPERTIES.find((p) => p.id === locationData.propertyId);
        const locationWithProperty: LocationWithProperty = {
          ...newLocation,
          property,
        };

        setLocations((prev) => (prev ? [...prev, locationWithProperty] : [locationWithProperty]));
        return locationWithProperty;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar localização');
        throw err;
      }
    },
    [],
  );

  const updateLocation = useCallback(
    async (id: string, locationData: Partial<Location>) => {
      try {
        setLocations((prev) =>
          prev
            ? prev.map((location) => {
                if (location.id === id) {
                  const updatedLocation = { ...location, ...locationData };
                  const property = PROPERTIES.find((p) => p.id === updatedLocation.propertyId);
                  return { ...updatedLocation, property };
                }
                return location;
              })
            : null,
        );
        const updatedLocation = locations?.find((l) => l.id === id);
        if (updatedLocation) {
          const property = PROPERTIES.find((p) => p.id === updatedLocation.propertyId);
          return { ...updatedLocation, property };
        }
        return locations?.[0] || (LOCATIONS[0] as LocationWithProperty);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar localização');
        throw err;
      }
    },
    [locations],
  );

  const deleteLocation = useCallback(async (id: string) => {
    try {
      setLocations((prev) =>
        prev
          ? prev.map((location) =>
              location.id === id ? { ...location, deletedAt: new Date().toISOString() } : location,
            )
          : null,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir localização');
      throw err;
    }
  }, []);

  const getLocationById = useCallback(
    async (id: string) => {
      try {
        return locations?.find((location) => location.id === id) || null;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar localização');
        throw err;
      }
    },
    [locations],
  );

  const getLocationsByPropertyId = useCallback(
    async (propertyId: string) => {
      try {
        return locations?.filter((location) => location.propertyId === propertyId) || [];
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar localizações da propriedade');
        throw err;
      }
    },
    [locations],
  );

  const searchLocations = useCallback(
    async (query: string) => {
      try {
        const lowercaseQuery = query.toLowerCase();
        return (
          locations?.filter(
            (location) =>
              location.name.toLowerCase().includes(lowercaseQuery) ||
              location.code.toLowerCase().includes(lowercaseQuery) ||
              location.description.toLowerCase().includes(lowercaseQuery) ||
              location.property?.name.toLowerCase().includes(lowercaseQuery) ||
              location.property?.code.toLowerCase().includes(lowercaseQuery),
          ) || []
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao pesquisar localizações');
        throw err;
      }
    },
    [locations],
  );

  const getLocationsByStatus = useCallback(
    async (status: LocationStatus) => {
      try {
        return locations?.filter((location) => location.status === status) || [];
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar localizações por status');
        throw err;
      }
    },
    [locations],
  );

  const getLocationsByType = useCallback(
    async (type: LocationType) => {
      try {
        return locations?.filter((location) => location.type === type) || [];
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar localizações por tipo');
        throw err;
      }
    },
    [locations],
  );

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return {
    locations,
    loading,
    error,
    refetch: fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    getLocationById,
    getLocationsByPropertyId,
    searchLocations,
    getLocationsByStatus,
    getLocationsByType,
  };
}

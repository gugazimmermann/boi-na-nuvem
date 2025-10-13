import { useState, useEffect, useCallback } from 'react';
import { type PropertySummary } from '~/types/property';
import { PropertyService } from '~/services/propertyService';

interface UsePropertiesReturn {
  properties: PropertySummary[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProperties(): UsePropertiesReturn {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const propertiesData = await PropertyService.getAllProperties();
      setProperties(propertiesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar propriedades');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const refetch = useCallback(async () => {
    await PropertyService.refreshProperties().then(setProperties);
  }, []);

  return {
    properties,
    loading,
    error,
    refetch,
  };
}

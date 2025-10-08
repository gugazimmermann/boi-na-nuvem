import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLocations } from '~/hooks/useLocations';
import { useProperties } from '~/hooks/useProperties';
import { LOCATIONS } from '~/mocks/locations-mock';
import type { Location } from '~/types/location';

interface UseLocationFormParams {
  isEdit?: boolean;
  locationId?: string;
  cameFromDetails?: boolean;
}

export const useLocationForm = ({
  isEdit = false,
  locationId,
  cameFromDetails = false,
}: UseLocationFormParams = {}) => {
  const navigate = useNavigate();
  const { createLocation, updateLocation, getLocationById } = useLocations();
  const { activeProperties } = useProperties();

  const [formData, setFormData] = useState<Partial<Location>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleValidationChange = useCallback((field: string, isValid: boolean) => { }, []);

  const handleSubmit = useCallback(
    async (values: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        setLoading(true);
        setError(null);

        if (isEdit && locationId) {
          await updateLocation(locationId, values);
        } else {
          await createLocation(values);
        }

        if (cameFromDetails) {
          navigate(`/sistema/cadastros/localizacoes/${locationId}`);
        } else {
          navigate('/sistema/cadastros/localizacoes');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar localização');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isEdit, locationId, cameFromDetails, navigate, createLocation, updateLocation],
  );

  const handleReset = useCallback(() => {
    setFormData({});
    setError(null);
  }, []);

  const fetchLocation = useCallback(async () => {
    if (!isEdit || !locationId) return;

    try {
      setLoading(true);
      setError(null);
      const location = await getLocationById(locationId);
      if (location) {
        setFormData(location);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar localização');
    } finally {
      setLoading(false);
    }
  }, [isEdit, locationId, getLocationById]);

  const fetchLocationById = useCallback(async (id: string) => {
    try {
      const location = LOCATIONS.find((l) => l.id === id);
      if (!location) {
        throw new Error('Localização não encontrada');
      }
      return location;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erro ao carregar localização');
    }
  }, []);

  return {
    formData,
    loading,
    error,
    activeProperties,
    handleChange,
    handleValidationChange,
    handleSubmit,
    handleReset,
    fetchLocation: fetchLocationById,
  };
};

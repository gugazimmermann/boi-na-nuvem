import { useState, useCallback } from 'react';
import { PropertyService } from '~/services/propertyService';
import { 
  type CreatePropertyRequest, 
  type UpdatePropertyRequest, 
  type Property,
  type PropertySummary 
} from '~/types/property';

interface UsePropertyCrudReturn {
  // Estados
  loading: boolean;
  error: string | null;
  
  // Operações CRUD
  createProperty: (data: CreatePropertyRequest) => Promise<Property>;
  updateProperty: (id: string, data: UpdatePropertyRequest) => Promise<Property>;
  deleteProperty: (id: string) => Promise<boolean>;
  getPropertyById: (id: string) => Promise<Property>;
  restoreProperty: (id: string) => Promise<Property>;
  
  // Utilitários
  clearError: () => void;
  refreshProperties: () => Promise<void>;
}

export function usePropertyCrud(): UsePropertyCrudReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((err: unknown) => {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    setError(errorMessage);
    throw err;
  }, []);

  const createProperty = useCallback(async (data: CreatePropertyRequest): Promise<Property> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await PropertyService.createProperty(data);
      return result;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw para manter a interface da Promise
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const updateProperty = useCallback(async (id: string, data: UpdatePropertyRequest): Promise<Property> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await PropertyService.updateProperty(id, data);
      return result;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw para manter a interface da Promise
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const deleteProperty = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await PropertyService.deleteProperty(id);
      return result;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw para manter a interface da Promise
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const getPropertyById = useCallback(async (id: string): Promise<Property> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await PropertyService.getPropertyById(id);
      return result;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw para manter a interface da Promise
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const restoreProperty = useCallback(async (id: string): Promise<Property> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await PropertyService.restoreProperty(id);
      return result;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw para manter a interface da Promise
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const refreshProperties = useCallback(async (): Promise<void> => {
    try {
      await PropertyService.refreshProperties();
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  return {
    loading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    restoreProperty,
    clearError,
    refreshProperties,
  };
}

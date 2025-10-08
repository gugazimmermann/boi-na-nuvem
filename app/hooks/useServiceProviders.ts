import { useState, useEffect, useCallback } from 'react';
import { SERVICEPROVIDERS } from '~/mocks/service-provider-mock';
import type { ServiceProvider } from '~/types/service-provider';

export const useServiceProviders = () => {
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceProviders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setServiceProviders(SERVICEPROVIDERS);
    } catch (err) {
      setError('Erro ao carregar prestadores de serviço');
      console.error('Error fetching service providers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addServiceProvider = useCallback(
    async (serviceProvider: Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const newServiceProvider: ServiceProvider = {
          ...serviceProvider,
          id: `sp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          deletedAt: null,
        };

        setServiceProviders((prev) => [newServiceProvider, ...prev]);
        return newServiceProvider;
      } catch (err) {
        setError('Erro ao adicionar prestador de serviço');
        console.error('Error adding service provider:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateServiceProvider = useCallback(
    async (id: string, updates: Partial<ServiceProvider>) => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        setServiceProviders((prev) =>
          prev.map((sp) => (sp.id === id ? { ...sp, ...updates } : sp)),
        );

        return true;
      } catch (err) {
        setError('Erro ao atualizar prestador de serviço');
        console.error('Error updating service provider:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteServiceProvider = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setServiceProviders((prev) =>
        prev.map((sp) => (sp.id === id ? { ...sp, deletedAt: new Date().toISOString() } : sp)),
      );

      return true;
    } catch (err) {
      setError('Erro ao excluir prestador de serviço');
      console.error('Error deleting service provider:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchServiceProviders();
  }, [fetchServiceProviders]);

  useEffect(() => {
    fetchServiceProviders();
  }, [fetchServiceProviders]);

  return {
    serviceProviders,
    loading,
    error,
    refetch,
    addServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
  };
};

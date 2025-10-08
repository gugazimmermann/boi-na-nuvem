import { useCallback } from 'react';
import { useServiceProviders } from '~/hooks/useServiceProviders';
import { SERVICEPROVIDERS } from '~/mocks/service-provider-mock';
import { useEntityForm } from '../../shared/hooks';
import { SERVICEPROVIDER_ROUTES } from '../config/serviceProviderConfig';
import type { ServiceProvider } from '~/types/service-provider';

interface UseServiceProviderFormProps {
  isEdit?: boolean;
  serviceProviderId?: string;
  cameFromDetails?: boolean;
}

export const useServiceProviderForm = ({
  isEdit = false,
  serviceProviderId,
  cameFromDetails,
}: UseServiceProviderFormProps) => {
  const { addServiceProvider, updateServiceProvider } = useServiceProviders();

  const entityForm = useEntityForm<
    ServiceProvider,
    Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'>
  >({
    isEdit,
    entityId: serviceProviderId,
    cameFromDetails,
    createEntity: async (data) => {
      await addServiceProvider(data);
    },
    updateEntity: async (id, data) => {
      await updateServiceProvider(id, data);
    },
    entities: SERVICEPROVIDERS,
    entityType: 'prestador de serviço',
    listRoute: SERVICEPROVIDER_ROUTES.list,
    detailRoute: SERVICEPROVIDER_ROUTES.detail,
  });

  const fetchServiceProvider = useCallback(async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const foundServiceProvider = SERVICEPROVIDERS.find((sp) => sp.id === id);

      if (!foundServiceProvider) {
        throw new Error('Prestador de serviço não encontrado');
      }

      return foundServiceProvider;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao carregar prestador de serviço');
    }
  }, []);

  return {
    handleSubmit: entityForm.handleSubmit as (
      values: Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'>,
    ) => Promise<void>,
    handleReset: entityForm.handleReset,
    handleChange: entityForm.handleChange,
    handleValidationChange: entityForm.handleValidationChange,
    fetchServiceProvider,
    isSubmitting: entityForm.isSubmitting,
  };
};

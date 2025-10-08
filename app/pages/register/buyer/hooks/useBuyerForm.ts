import { useCallback } from 'react';
import { useBuyers } from '~/hooks/useBuyers';
import { BUYERS } from '~/mocks/buyer-mock';
import { useEntityForm } from '../../shared/hooks';
import { BUYER_ROUTES } from '../config/buyerConfig';
import type { Buyer } from '~/types/buyer';

interface UseBuyerFormProps {
  isEdit?: boolean;
  buyerId?: string;
  cameFromDetails?: boolean;
}

export const useBuyerForm = ({ isEdit = false, buyerId, cameFromDetails }: UseBuyerFormProps) => {
  const { addBuyer, updateBuyer } = useBuyers();

  const entityForm = useEntityForm<Buyer, Omit<Buyer, 'id' | 'createdAt' | 'deletedAt'>>({
    isEdit,
    entityId: buyerId,
    cameFromDetails,
    createEntity: async (data) => {
      await addBuyer(data);
    },
    updateEntity: async (id, data) => {
      await updateBuyer(id, data);
    },
    entities: BUYERS,
    entityType: 'comprador',
    listRoute: BUYER_ROUTES.list,
    detailRoute: BUYER_ROUTES.detail,
  });

  const fetchBuyer = useCallback(async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const foundBuyer = BUYERS.find((buyer) => buyer.id === id);

      if (!foundBuyer) {
        throw new Error('Comprador não encontrado');
      }

      return foundBuyer;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao carregar comprador');
    }
  }, []);

  return {
    handleSubmit: entityForm.handleSubmit as (
      values: Omit<Buyer, 'id' | 'createdAt' | 'deletedAt'>,
    ) => Promise<void>,
    handleReset: entityForm.handleReset,
    handleChange: entityForm.handleChange,
    handleValidationChange: entityForm.handleValidationChange,
    fetchBuyer,
  };
};

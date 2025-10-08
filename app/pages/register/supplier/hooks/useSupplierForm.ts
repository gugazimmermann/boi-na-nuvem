import { useCallback } from 'react';
import { useSuppliers } from '~/hooks/useSuppliers';
import { SUPPLIERS } from '~/mocks/supplier-mock';
import { useEntityForm } from '../../shared/hooks';
import { SUPPLIER_ROUTES } from '../config/supplierConfig';
import type { Supplier } from '~/types/supplier';

interface UseSupplierFormProps {
  isEdit?: boolean;
  supplierId?: string;
  cameFromDetails?: boolean;
}

export const useSupplierForm = ({
  isEdit = false,
  supplierId,
  cameFromDetails,
}: UseSupplierFormProps) => {
  const { addSupplier, updateSupplier } = useSuppliers();

  const entityForm = useEntityForm<Supplier, Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>>({
    isEdit,
    entityId: supplierId,
    cameFromDetails,
    createEntity: async (data) => {
      await addSupplier(data);
    },
    updateEntity: async (id, data) => {
      await updateSupplier(id, data);
    },
    entities: SUPPLIERS,
    entityType: 'fornecedor',
    listRoute: SUPPLIER_ROUTES.list,
    detailRoute: SUPPLIER_ROUTES.detail,
  });

  const fetchSupplier = useCallback(async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const foundSupplier = SUPPLIERS.find((supplier) => supplier.id === id);

      if (!foundSupplier) {
        throw new Error('Fornecedor não encontrado');
      }

      return foundSupplier;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao carregar fornecedor');
    }
  }, []);

  return {
    handleSubmit: entityForm.handleSubmit as (
      values: Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>,
    ) => Promise<void>,
    handleReset: entityForm.handleReset,
    handleChange: entityForm.handleChange,
    handleValidationChange: entityForm.handleValidationChange,
    fetchSupplier,
  };
};

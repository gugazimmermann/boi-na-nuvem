import { useCallback } from 'react';
import { useProperties } from '~/hooks/useProperties';
import { PROPERTIES } from '~/mocks/properties-mock';
import { useEntityForm } from '../../shared/hooks';
import { PROPERTY_ROUTES } from '../config/propertyConfig';
import type { Property } from '~/types/property';

interface UsePropertyFormProps {
  isEdit?: boolean;
  propertyId?: string;
  cameFromDetails?: boolean;
}

export const usePropertyForm = ({
  isEdit = false,
  propertyId,
  cameFromDetails,
}: UsePropertyFormProps) => {
  const { createProperty, updateProperty } = useProperties();

  const entityForm = useEntityForm<Property, Omit<Property, 'id'>>({
    isEdit,
    entityId: propertyId,
    cameFromDetails,
    createEntity: async (data) => {
      await createProperty(data);
    },
    updateEntity: async (id, data) => {
      await updateProperty(id, data);
    },
    entities: PROPERTIES,
    entityType: 'propriedade',
    listRoute: PROPERTY_ROUTES.list,
    detailRoute: PROPERTY_ROUTES.detail,
  });

  const fetchProperty = useCallback(async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const foundProperty = PROPERTIES.find((p) => p.id === id);

      if (!foundProperty) {
        throw new Error('Propriedade não encontrada');
      }

      return foundProperty;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao carregar propriedade');
    }
  }, []);

  return {
    handleSubmit: entityForm.handleSubmit as (values: Omit<Property, 'id'>) => Promise<void>,
    handleReset: entityForm.handleReset,
    handleChange: entityForm.handleChange,
    handleValidationChange: entityForm.handleValidationChange,
    fetchProperty,
    isSubmitting: entityForm.isSubmitting,
  };
};

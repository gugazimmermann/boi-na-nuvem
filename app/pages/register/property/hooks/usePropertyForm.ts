import { useCallback } from 'react';
import { usePropertyCrud } from '~/hooks/usePropertyCrud';
import { PROPERTY_ROUTES } from '../config/propertyConfig';
import type { Property } from '~/types/property';

interface AddressSuggestion {
  place_id: string;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    suburb?: string;
    neighbourhood?: string;
    postcode?: string;
  };
}

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
  const { createProperty, updateProperty, getPropertyById } = usePropertyCrud();

  // Função para aplicar máscara de CEP
  const applyZipCodeMask = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d)/, '$1-$2');
  };

  // Função para selecionar endereço do autocomplete
  const handleAddressSelect = useCallback((address: AddressSuggestion) => {
    // Esta função não faz nada - o AddressInput vai usar o FormContext diretamente
  }, []);

  // Função para lidar com mudanças nos campos
  const handleFieldChange = useCallback((field: string, value: any) => {
    // Esta função não faz nada - o Form component gerencia seu próprio estado
  }, []);

  const handleValidationChange = useCallback((field: string, isValid: boolean) => {
    // Esta função não faz nada
  }, []);

  const handleSubmit = useCallback(async (values: Omit<Property, 'id'>) => {
    try {
      if (isEdit && propertyId) {
        await updateProperty(propertyId, values);
      } else {
        await createProperty(values);
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao salvar propriedade');
    }
  }, [isEdit, propertyId, createProperty, updateProperty]);

  const handleReset = useCallback(() => {
    // Esta função não faz nada - o Form component gerencia seu próprio estado
  }, []);

  const fetchProperty = useCallback(async (id: string) => {
    try {
      const property = await getPropertyById(id);
      return property;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao carregar propriedade');
    }
  }, [getPropertyById]);

  return {
    handleSubmit,
    handleReset,
    handleChange: handleFieldChange,
    handleValidationChange,
    handleAddressSelect,
    fetchProperty,
    isSubmitting: false,
  };
};

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

interface UseEntityFormProps<T, TCreate = T> {
  isEdit: boolean;
  entityId?: string;
  cameFromDetails?: boolean;
  createEntity: (data: TCreate) => Promise<void>;
  updateEntity: (id: string, data: T) => Promise<void>;
  entities?: T[];
  entityType: string;
  listRoute: string;
  detailRoute?: (id: string) => string;
}

export function useEntityForm<T extends { id: string }, TCreate = T>({
  isEdit,
  entityId,
  cameFromDetails,
  createEntity,
  updateEntity,
  entities,
  entityType,
  listRoute,
  detailRoute,
}: UseEntityFormProps<T, TCreate>) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<T>>({});

  const fetchEntity = useCallback(
    async (id: string): Promise<T> => {
      if (entities) {
        const entity = entities.find((e) => e.id === id);
        if (!entity) {
          throw new Error(`${entityType} não encontrado`);
        }
        return entity;
      }
      throw new Error('Lista de entidades não disponível');
    },
    [entities, entityType],
  );

  const handleSubmit = useCallback(
    async (values: TCreate) => {
      try {
        setIsSubmitting(true);

        if (isEdit && entityId) {
          await updateEntity(entityId, values as unknown as T);
        } else {
          await createEntity(values);
        }

        if (cameFromDetails && entityId && detailRoute) {
          navigate(detailRoute(entityId));
        } else {
          navigate(listRoute);
        }
      } catch (error) {
        console.error(`Erro ao salvar ${entityType}:`, error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isEdit,
      entityId,
      cameFromDetails,
      createEntity,
      updateEntity,
      navigate,
      entityType,
      listRoute,
      detailRoute,
    ],
  );

  const handleReset = useCallback(() => {
    setFormData({});
  }, []);

  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleValidationChange = useCallback((field: string, isValid: boolean) => {
    // Implementar validação se necessário
  }, []);

  return {
    handleSubmit: handleSubmit as (values: TCreate) => Promise<void>,
    handleReset,
    handleChange,
    handleValidationChange,
    fetchEntity,
    isSubmitting,
    formData,
  };
}

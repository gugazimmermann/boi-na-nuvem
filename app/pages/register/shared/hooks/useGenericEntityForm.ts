import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface UseGenericEntityFormProps<T, CreateData> {
  isEdit: boolean;
  entityId?: string;
  cameFromDetails?: boolean;
  service: {
    getById: (id: string) => Promise<T | null>;
    create: (data: CreateData) => Promise<T>;
    update: (id: string, data: Partial<T>) => Promise<T>;
  };
  routes: {
    list: string;
    details: (id: string) => string;
  };
}

export const useGenericEntityForm = <T, CreateData>({
  isEdit,
  entityId,
  cameFromDetails,
  service,
  routes,
}: UseGenericEntityFormProps<T, CreateData>) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    if (isEdit && entityId) {
      fetchEntity();
    }
  }, [isEdit, entityId]);

  const fetchEntity = async () => {
    if (!entityId) return;

    setLoading(true);
    setError(null);

    try {
      const entity = await service.getById(entityId);
      if (entity) {
        setFormData(entity);
      } else {
        setError('Entidade não encontrada');
      }
    } catch (err) {
      setError('Erro ao carregar entidade');
      console.error('Erro ao carregar entidade:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: CreateData) => {
    setLoading(true);
    setError(null);

    try {
      if (isEdit && entityId) {
        await service.update(entityId, values as Partial<T>);
      } else {
        await service.create(values);
      }

      if (cameFromDetails && entityId) {
        navigate(routes.details(entityId));
      } else {
        navigate(routes.list);
      }
    } catch (err) {
      setError('Erro ao salvar entidade');
      console.error('Erro ao salvar entidade:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setError(null);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleValidationChange = (field: string, isValid: boolean) => {
    console.log(`Validation for ${field}: ${isValid}`);
  };

  return {
    loading,
    error,
    formData,
    handleSubmit,
    handleReset,
    handleChange,
    handleValidationChange,
    fetchEntity,
  };
};

import { useState, useCallback } from 'react';
import type { Animal } from '~/types/animal';
import { AnimalBreed, BloodDegree, AnimalSex, AnimalPurpose } from '~/types/animal';

interface UseAnimalFormProps {
  initialData?: Partial<Animal>;
  onSubmit: (data: Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>) => Promise<void>;
}

interface UseAnimalFormReturn {
  formData: Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>>>;
  handleInputChange: (field: keyof Animal, value: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  error: string | null;
  resetForm: () => void;
}

const initialFormData: Omit<Animal, 'id' | 'createdAt' | 'deletedAt'> = {
  code: '',
  registrationNumber: '',
  breed: AnimalBreed.SRD,
  bloodDegree: BloodDegree.SRD,
  bloodPercentage: 0,
  sex: AnimalSex.MACHO,
  purpose: AnimalPurpose.CORTE,
  birthDate: '',
  acquisitionDate: '',
  fatherId: null,
  motherId: null,
};

export function useAnimalForm({ initialData, onSubmit }: UseAnimalFormProps): UseAnimalFormReturn {
  const [formData, setFormData] = useState<Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>>(
    initialData ? { ...initialFormData, ...initialData } : initialFormData,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof Animal, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError(null);
        await onSubmit(formData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar animal');
      } finally {
        setLoading(false);
      }
    },
    [formData, onSubmit],
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setError(null);
  }, []);

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    resetForm,
  };
}

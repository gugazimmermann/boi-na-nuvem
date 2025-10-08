import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Input } from '~/components/input';
import { Select } from '~/components/select';
import { LocationQualityType } from '~/types/location';
import type { Location, LocationQuality } from '~/types/location';

interface AddQualityFormProps {
  location: Location;
  onSubmit: (data: QualityFormData) => void;
  editingQuality?: LocationQuality | null;
}

export interface QualityFormData {
  quality: LocationQualityType;
  date: string;
}

export interface AddQualityFormRef {
  resetForm: () => void;
  fillFormWithQuality: (quality: LocationQuality) => void;
  submitForm: () => void;
}

const qualityOptions = [
  { value: LocationQualityType.GOOD, label: 'Boa' },
  { value: LocationQualityType.REGULAR, label: 'Regular' },
  { value: LocationQualityType.BAD, label: 'Ruim' },
];

export const AddQualityForm = forwardRef<AddQualityFormRef, AddQualityFormProps>(
  ({ location, onSubmit, editingQuality }, ref) => {
    const [formData, setFormData] = useState<QualityFormData>(() => {
      const now = new Date();
      // Ajustar para o fuso horário local e formatar para datetime-local
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM
      return {
        quality: LocationQualityType.GOOD,
        date: localDateTime,
      };
    });

    const [errors, setErrors] = useState<Partial<Record<keyof QualityFormData, string>>>({});

    // Reset form function
    const resetForm = useCallback(() => {
      const now = new Date();
      // Ajustar para o fuso horário local e formatar para datetime-local
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM
      setFormData({
        quality: LocationQualityType.GOOD,
        date: localDateTime,
      });
      setErrors({});
    }, []);

    // Fill form with quality data for editing
    const fillFormWithQuality = useCallback((quality: LocationQuality) => {
      // Convert createdAt to datetime-local format
      const qualityDate = new Date(quality.createdAt);
      const localDateTime = new Date(
        qualityDate.getTime() - qualityDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM

      setFormData({
        quality: quality.quality,
        date: localDateTime,
      });
      setErrors({});
    }, []);

    // Handle input changes
    const handleInputChange = useCallback(
      (field: keyof QualityFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
      [errors],
    );

    // Handle select changes
    const handleSelectChange = useCallback(
      (field: keyof QualityFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user makes selection
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
      [errors],
    );

    // Validate form
    const validateForm = useCallback((): boolean => {
      const newErrors: Partial<Record<keyof QualityFormData, string>> = {};

      if (!formData.quality) {
        newErrors.quality = 'Selecione uma qualidade';
      }

      if (!formData.date) {
        newErrors.date = 'Data e hora são obrigatórios';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle form submission
    const handleSubmit = useCallback(() => {
      if (!validateForm()) {
        return;
      }

      onSubmit(formData);
    }, [formData, validateForm, onSubmit]);

    // Expose functions through ref
    useImperativeHandle(
      ref,
      () => ({
        resetForm,
        fillFormWithQuality,
        submitForm: handleSubmit,
      }),
      [resetForm, fillFormWithQuality, handleSubmit],
    );

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Date and Time */}
          <div>
            <Input
              label="Data e Hora"
              config={{
                type: 'datetime-local',
                value: formData.date,
                required: true,
              }}
              onChange={(e) => handleInputChange('date', e.target.value)}
              error={errors.date}
            />
          </div>

          {/* Quality */}
          <div>
            <Select
              label="Qualidade"
              config={{
                value: formData.quality,
                required: true,
              }}
              options={qualityOptions}
              onChange={(value) => handleSelectChange('quality', value)}
              error={errors.quality}
            />
          </div>
        </div>
      </div>
    );
  },
);

AddQualityForm.displayName = 'AddQualityForm';

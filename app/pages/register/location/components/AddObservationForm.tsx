import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Input } from '~/components/input';
import { Textarea } from '~/components/textarea';
import type { Location, LocationObservation } from '~/types/location';

interface AddObservationFormProps {
  location: Location;
  onSubmit: (data: ObservationFormData) => void;
  editingObservation?: LocationObservation | null;
}

export interface ObservationFormData {
  observation: string;
  date: string;
}

export interface AddObservationFormRef {
  resetForm: () => void;
  fillFormWithObservation: (observation: LocationObservation) => void;
  submitForm: () => void;
}

export const AddObservationForm = forwardRef<AddObservationFormRef, AddObservationFormProps>(
  ({ location, onSubmit, editingObservation }, ref) => {
    const [formData, setFormData] = useState<ObservationFormData>(() => {
      const now = new Date();
      // Ajustar para o fuso horário local e formatar para datetime-local
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM
      return {
        observation: '',
        date: localDateTime,
      };
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ObservationFormData, string>>>({});

    // Reset form function
    const resetForm = useCallback(() => {
      const now = new Date();
      // Ajustar para o fuso horário local e formatar para datetime-local
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM
      setFormData({
        observation: '',
        date: localDateTime,
      });
      setErrors({});
    }, []);

    // Fill form with observation data for editing
    const fillFormWithObservation = useCallback((observation: LocationObservation) => {
      // Convert createdAt to datetime-local format
      const observationDate = new Date(observation.createdAt);
      const localDateTime = new Date(
        observationDate.getTime() - observationDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM

      setFormData({
        observation: observation.observation,
        date: localDateTime,
      });
      setErrors({});
    }, []);

    const handleInputChange = useCallback(
      (field: keyof ObservationFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
      [errors],
    );

    const validateForm = useCallback((): boolean => {
      const newErrors: Partial<Record<keyof ObservationFormData, string>> = {};

      if (!formData.observation.trim()) {
        newErrors.observation = 'Observação é obrigatória';
      }

      if (!formData.date) {
        newErrors.date = 'Data é obrigatória';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(() => {
      if (validateForm()) {
        onSubmit(formData);
      }
    }, [formData, validateForm, onSubmit]);

    // Expose functions through ref
    useImperativeHandle(
      ref,
      () => ({
        resetForm,
        fillFormWithObservation,
        submitForm: handleSubmit,
      }),
      [resetForm, fillFormWithObservation, handleSubmit],
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
              onChange={(value) => handleInputChange('date', value)}
              error={errors.date}
            />
          </div>

          {/* Observation */}
          <div>
            <Textarea
              label="Observação"
              config={{
                value: formData.observation,
                placeholder: 'Descreva a observação...',
                required: true,
                rows: 4,
              }}
              onChange={(value) => handleInputChange('observation', value)}
              error={errors.observation}
            />
          </div>
        </div>
      </div>
    );
  },
);

AddObservationForm.displayName = 'AddObservationForm';

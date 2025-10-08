import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Input } from '~/components/input';
import { Select } from '~/components/select';
import { Textarea } from '~/components/textarea';
import { LocationMovimentType, ResponsibleType } from '~/types/location';
import { EMPLOYESS } from '~/mocks/employee-mock';
import { SERVICEPROVIDERS } from '~/mocks/service-provider-mock';
import type { Location, LocationMoviment } from '~/types/location';

interface AddMovementFormProps {
  location: Location;
  onSubmit: (data: MovementFormData) => void;
  editingMovement?: LocationMoviment | null;
  allowedTypes?: LocationMovimentType[];
}

export interface MovementFormData {
  type: LocationMovimentType;
  description: string;
  date: string;
  responsibleType: ResponsibleType;
  responsibleId: string;
}

export interface AddMovementFormRef {
  resetForm: () => void;
  fillFormWithMovement: (movement: LocationMoviment) => void;
  submitForm: () => void;
}

const allMovementTypeOptions = [
  { value: LocationMovimentType.ENTRY, label: 'Entrada' },
  { value: LocationMovimentType.EXIT, label: 'Saída' },
  { value: LocationMovimentType.SUPPLEMENTATION, label: 'Suplementação' },
  { value: LocationMovimentType.MAINTENANCE, label: 'Manutenção' },
  { value: LocationMovimentType.CLEANING, label: 'Limpeza' },
  { value: LocationMovimentType.CONSTRUCTION, label: 'Construção' },
  { value: LocationMovimentType.EQUIPMENT_INSTALLATION, label: 'Instalação' },
];

const responsibleTypeOptions = [
  { value: ResponsibleType.EMPLOYEE, label: 'Colaborador' },
  { value: ResponsibleType.SERVICE_PROVIDER, label: 'Prestador de Serviços' },
];

export const AddMovementForm = forwardRef<AddMovementFormRef, AddMovementFormProps>(
  ({ location, onSubmit, editingMovement, allowedTypes }, ref) => {
    // Filter movement type options based on allowedTypes
    const movementTypeOptions = allowedTypes
      ? allMovementTypeOptions.filter((option) => allowedTypes.includes(option.value))
      : allMovementTypeOptions;

    const [formData, setFormData] = useState<MovementFormData>(() => {
      const now = new Date();
      // Ajustar para o fuso horário local e formatar para datetime-local
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM
      return {
        type: movementTypeOptions[0]?.value || LocationMovimentType.SUPPLEMENTATION,
        description: '',
        date: localDateTime,
        responsibleType: ResponsibleType.EMPLOYEE,
        responsibleId: '',
      };
    });

    const [errors, setErrors] = useState<Partial<Record<keyof MovementFormData, string>>>({});

    // Reset form function
    const resetForm = useCallback(() => {
      const now = new Date();
      // Ajustar para o fuso horário local e formatar para datetime-local
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM
      setFormData({
        type: LocationMovimentType.SUPPLEMENTATION,
        description: '',
        date: localDateTime,
        responsibleType: ResponsibleType.EMPLOYEE,
        responsibleId: '',
      });
      setErrors({});
    }, []);

    // Fill form with movement data for editing
    const fillFormWithMovement = useCallback((movement: LocationMoviment) => {
      // Convert createdAt to datetime-local format
      const movementDate = new Date(movement.createdAt);
      const localDateTime = new Date(
        movementDate.getTime() - movementDate.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16); // YYYY-MM-DDTHH:MM

      setFormData({
        type: movement.type,
        description: movement.description || '',
        date: localDateTime,
        responsibleType: movement.responsibleType,
        responsibleId:
          movement.responsibleType === ResponsibleType.EMPLOYEE
            ? movement.employeeId || ''
            : movement.serviceProviderId || '',
      });
      setErrors({});
    }, []);

    // Get responsible options based on selected type
    const getResponsibleOptions = useCallback(() => {
      if (formData.responsibleType === ResponsibleType.EMPLOYEE) {
        return (EMPLOYESS || []).map((emp) => ({
          value: emp.id,
          label: emp.name,
        }));
      } else {
        return (SERVICEPROVIDERS || []).map((sp) => ({
          value: sp.id,
          label: sp.name,
        }));
      }
    }, [formData.responsibleType]);

    const handleInputChange = useCallback(
      (field: keyof MovementFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      },
      [errors],
    );

    const validateForm = useCallback((): boolean => {
      const newErrors: Partial<Record<keyof MovementFormData, string>> = {};

      if (!formData.description.trim()) {
        newErrors.description = 'Descrição é obrigatória';
      }

      if (!formData.date) {
        newErrors.date = 'Data é obrigatória';
      }

      if (!formData.responsibleId) {
        newErrors.responsibleId = 'Responsável é obrigatório';
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
        fillFormWithMovement,
        submitForm: handleSubmit,
      }),
      [resetForm, fillFormWithMovement, handleSubmit],
    );

    const handleResponsibleTypeChange = useCallback((value: unknown) => {
      const nextType = value as ResponsibleType;
      setFormData((prev) => ({
        ...prev,
        responsibleType: nextType,
        responsibleId: '', // Reset responsible selection when type changes
      }));
    }, []);

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

          {/* Movement Type */}
          <div>
            <Select
              label="Tipo de Movimentação"
              config={{ value: formData.type, required: true }}
              onChange={(value) => handleInputChange('type', value)}
              options={movementTypeOptions}
              error={errors.type}
            />
          </div>

          {/* Description */}
          <div>
            <Textarea
              label="Descrição"
              config={{
                value: formData.description,
                placeholder: 'Descreva a movimentação...',
                required: true,
                rows: 3,
              }}
              onChange={(value) => handleInputChange('description', value)}
              error={errors.description}
            />
          </div>

          {/* Responsible Type */}
          <div>
            <Select
              label="Tipo de Responsável"
              config={{ value: formData.responsibleType, required: true }}
              onChange={handleResponsibleTypeChange}
              options={responsibleTypeOptions}
            />
          </div>

          {/* Responsible Selection */}
          <div>
            <Select
              label="Responsável"
              config={{
                value: formData.responsibleId,
                placeholder: 'Selecione o responsável...',
                required: true,
              }}
              onChange={(value) => handleInputChange('responsibleId', value)}
              options={getResponsibleOptions()}
              error={errors.responsibleId}
            />
          </div>
        </div>
      </div>
    );
  },
);

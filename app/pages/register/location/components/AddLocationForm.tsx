import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Input } from '~/components/input';
import { Select } from '~/components/select';
import { Textarea } from '~/components/textarea';
import {
  createLocationFormFields,
  createLocationFormConfig,
  getInitialValues,
} from '../utils/formConfig';
import { useLocations } from '~/hooks/useLocations';
import { LocationStatus, LocationType, type Location } from '~/types/location';
import type { Property } from '~/types/property';
import type { FormFieldConfig } from '~/components/form/types';

interface AddLocationFormProps {
  property: Property;
  onSubmit: (location: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export interface AddLocationFormRef {
  resetForm: () => void;
  fillFormWithLocation: (location: Location) => void;
  submitForm: () => void;
}

export interface LocationFormData {
  name: string;
  code: string;
  description: string;
  type: LocationType;
  area: number;
  areaType: string;
  capacity: number;
  status: LocationStatus;
  propertyId: string;
}

export const AddLocationForm = forwardRef<AddLocationFormRef, AddLocationFormProps>(
  ({ property, onSubmit, onCancel, loading = false }, ref) => {
    const { createLocation } = useLocations();
    const [formData, setFormData] = useState<LocationFormData>(() => ({
      ...getInitialValues(),
      propertyId: property.id, // Pre-fill with the current property
    }));

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      resetForm: () => {
        setFormData({
          ...getInitialValues(),
          propertyId: property.id,
        });
        setErrors({});
      },
      fillFormWithLocation: (location: Location) => {
        setFormData({
          name: location.name,
          code: location.code,
          description: location.description,
          type: location.type,
          area: location.area,
          areaType: location.areaType,
          capacity: location.capacity,
          status: location.status,
          propertyId: location.propertyId,
        });
        setErrors({});
      },
      submitForm: () => {
        handleSubmit(new Event('submit') as any);
      },
    }));

    const handleChange = useCallback(
      (field: string, value: any) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: '',
          }));
        }
      },
      [errors],
    );

    const handleValidationChange = useCallback(
      (field: string, isValid: boolean) => {
        if (!isValid && formData[field as keyof LocationFormData]) {
          setErrors((prev) => ({
            ...prev,
            [field]: 'Campo obrigatório',
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            [field]: '',
          }));
        }
      },
      [formData],
    );

    const validateForm = useCallback((): boolean => {
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      } else if (formData.name.trim().length < 3) {
        newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
      }

      if (!formData.code.trim()) {
        newErrors.code = 'Código é obrigatório';
      } else if (formData.code.trim().length < 2) {
        newErrors.code = 'Código deve ter pelo menos 2 caracteres';
      }

      if (!formData.type) {
        newErrors.type = 'Tipo é obrigatório';
      }

      if (!formData.area || formData.area <= 0) {
        newErrors.area = 'Área deve ser maior que zero';
      }

      if (!formData.areaType) {
        newErrors.areaType = 'Unidade de área é obrigatória';
      }

      if (!formData.capacity || formData.capacity <= 0) {
        newErrors.capacity = 'Capacidade deve ser maior que zero';
      }

      if (!formData.status) {
        newErrors.status = 'Status é obrigatório';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
          return;
        }

        try {
          await onSubmit(formData);
        } catch (error) {
          console.error('Error submitting location form:', error);
        }
      },
      [formData, validateForm, onSubmit],
    );

    const handleReset = useCallback(() => {
      setFormData({
        ...getInitialValues(),
        propertyId: property.id,
      });
      setErrors({});
    }, [property.id]);

    // Create form fields without property field and adjust layout for drawer context
    const baseFormFields = createLocationFormFields(false, [property]).filter(
      (field) => field.name !== 'propertyId',
    );

    // Adjust grid columns for better layout in drawer
    const formFields = baseFormFields.map((field) => {
      if (field.name === 'status') {
        return { ...field, gridColumn: 2 }; // Status now takes 2 columns instead of 1
      }
      return field;
    });

    // Create form config without buttons for drawer context
    const formConfig = {
      ...createLocationFormConfig(false),
      showResetButton: false,
      submitButtonText: '', // Empty string to hide submit button
    };

    // Custom form renderer without buttons
    const renderField = (field: FormFieldConfig) => {
      const value = formData[field.name as keyof LocationFormData];
      const error = errors[field.name];

      switch (field.type) {
        case 'input':
          return (
            <Input
              key={field.name}
              label={field.label}
              config={{
                ...field.inputConfig,
                value: value !== undefined && value !== null ? String(value) : '',
                required: field.required,
                disabled: field.disabled,
              }}
              error={error}
              helperText={field.helperText}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={field.className}
              data-testid={field['data-testid']}
            />
          );

        case 'select':
          return (
            <Select
              key={field.name}
              label={field.label}
              options={field.options || []}
              config={{
                ...field.selectConfig,
                value: value || '',
                required: field.required,
                disabled: field.disabled,
              }}
              error={error}
              helperText={field.helperText}
              onChange={(selectedValue) => handleChange(field.name, selectedValue)}
              className={field.className}
              data-testid={field['data-testid']}
            />
          );

        case 'textarea':
          return (
            <Textarea
              key={field.name}
              label={field.label}
              config={{
                ...field.textareaConfig,
                value: value !== undefined && value !== null ? String(value) : '',
                required: field.required,
                disabled: field.disabled,
              }}
              error={error}
              helperText={field.helperText}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={field.className}
              data-testid={field['data-testid']}
            />
          );

        default:
          return null;
      }
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {formFields.map((field) => (
            <div
              key={field.name}
              className={
                field.gridColumn === 3
                  ? 'col-span-3'
                  : field.gridColumn === 2
                    ? 'col-span-2'
                    : 'col-span-1'
              }
            >
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

AddLocationForm.displayName = 'AddLocationForm';

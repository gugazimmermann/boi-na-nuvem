import React from 'react';
import { Form } from '~/components/form/Form';
import { EntityFormLayout } from './EntityFormLayout';

interface NewEntityFormProps<T extends Record<string, any>> {
  // Form configuration
  formFields: any[];
  formConfig: any;
  initialValues: T;

  // Form handlers
  handleSubmit: (values: T) => Promise<void>;
  handleReset: () => void;
  handleChange: (field: string, value: any) => void;
  handleValidationChange: (field: string, isValid: boolean) => void;

  // Navigation
  handleBack: () => void;

  // UI
  title: string;
  subtitle: string;
  backLabel?: string;

  // Icons
  icon?: React.ReactNode;
  variant?: 'default' | 'modern';

  // Test ID
  testId: string;
}

export function NewEntityForm<T extends Record<string, any>>({
  formFields,
  formConfig,
  initialValues,
  handleSubmit,
  handleReset,
  handleChange,
  handleValidationChange,
  handleBack,
  title,
  subtitle,
  backLabel = 'Voltar para lista',
  icon,
  variant = 'modern',
  testId,
}: NewEntityFormProps<T>) {
  return (
    <EntityFormLayout
      title={title}
      subtitle={subtitle}
      onBack={handleBack}
      backLabel={backLabel}
      icon={icon}
      variant={variant}
    >
      <Form
        fields={formFields}
        config={formConfig}
        initialValues={initialValues}
        onSubmit={
          handleSubmit as (values: Record<string, any>, formState: any) => void | Promise<void>
        }
        onReset={handleReset}
        onChange={handleChange as unknown as (values: Record<string, any>, formState: any) => void}
        onValidationChange={
          handleValidationChange as unknown as (
            isValid: boolean,
            errors: Record<string, string>,
          ) => void
        }
        data-testid={testId}
      />
    </EntityFormLayout>
  );
}

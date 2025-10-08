import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { Form } from '~/components/form/Form';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { EntityFormLayout } from './EntityFormLayout';

interface EntityFormProps<T> {
  // Form configuration
  formFields: any[];
  formConfig: any;
  initialValues: T;

  // Form handlers
  handleSubmit: (values: T) => Promise<void>;
  handleReset: () => void;
  handleChange: (field: string, value: any) => void;
  handleValidationChange: (field: string, isValid: boolean) => void;
  fetchEntity: (id: string) => Promise<T>;

  // Navigation
  handleBack: () => void;

  // UI
  title: string;
  subtitle: string;
  backLabel: string;
  loadingMessage: string;
  errorTitle: string;
  notFoundMessage: string;

  // Icons
  icon?: React.ReactNode;
  variant?: 'default' | 'modern';
  isEdit?: boolean;

  // Test ID
  testId: string;
}

export function EntityForm<T extends { id: string; name: string }>({
  formFields,
  formConfig,
  initialValues,
  handleSubmit,
  handleReset,
  handleChange,
  handleValidationChange,
  fetchEntity,
  handleBack,
  title,
  subtitle,
  backLabel,
  loadingMessage,
  errorTitle,
  notFoundMessage,
  icon,
  variant = 'modern',
  isEdit = false,
  testId,
}: EntityFormProps<T>) {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [entityData, setEntityData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if came from details page
  const cameFromDetails = location.state?.from === 'details';

  useEffect(() => {
    const loadEntity = async () => {
      if (!id) {
        setError('ID não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const foundEntity = await fetchEntity(id);
        setEntityData(foundEntity);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadEntity();
  }, [id, fetchEntity]);

  if (loading) {
    return <LoadingState message={loadingMessage} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} title={errorTitle} />;
  }

  if (!entityData) {
    return <ErrorState error={notFoundMessage} onRetry={handleBack} title={notFoundMessage} />;
  }

  return (
    <EntityFormLayout
      title={title}
      subtitle={subtitle}
      onBack={handleBack}
      backLabel={backLabel}
      icon={icon}
      variant={variant}
      isEdit={isEdit}
    >
      <Form
        fields={formFields}
        config={formConfig}
        initialValues={entityData}
        onSubmit={(values, _formState) => handleSubmit(values as T)}
        onReset={(_formState) => handleReset()}
        onChange={(values, _formState) => {
          formFields.forEach((field) => {
            const name = field.name as string;
            handleChange(name, (values as Record<string, any>)[name]);
          });
        }}
        onValidationChange={(isValid, errors) => {
          formFields.forEach((field) => {
            const name = field.name as string;
            const fieldIsValid = !errors[name];
            handleValidationChange(name, fieldIsValid);
          });
        }}
        data-testid={testId}
      />
    </EntityFormLayout>
  );
}

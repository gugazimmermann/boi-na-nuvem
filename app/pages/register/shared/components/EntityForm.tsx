import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import { Form } from '~/components/form/Form';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { EntityFormLayout } from './EntityFormLayout';
import { PropertyPhase } from '~/types/property';

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
  handleAddressSelect?: (address: any) => void;
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

// Função para processar fases de propriedade (para exibição no formulário)
function processPropertyPhases(entityData: any): any {
  if (!entityData || !entityData.phases || !Array.isArray(entityData.phases)) {
    return entityData;
  }

  // Check if it has all three phases (Cria, Recria, Engorda)
  const hasAllThreePhases = entityData.phases.includes(PropertyPhase.CRIA) &&
                           entityData.phases.includes(PropertyPhase.RECRIA) &&
                           entityData.phases.includes(PropertyPhase.ENGORDA);

  // If it has all three phases, show "Ciclo Completo"
  if (hasAllThreePhases) {
    return {
      ...entityData,
      phases: [PropertyPhase.CICLO_COMPLETO]
    };
  }

  // Otherwise, return the original phases
  return entityData;
}

// Função para processar fases de propriedade (para envio ao backend)
function processPropertyPhasesForSubmit(values: any): any {
  if (!values || !values.phases || !Array.isArray(values.phases)) {
    return values;
  }

  // If "Ciclo Completo" is selected, convert to individual phases
  if (values.phases.includes(PropertyPhase.CICLO_COMPLETO)) {
    return {
      ...values,
      phases: [PropertyPhase.CRIA, PropertyPhase.RECRIA, PropertyPhase.ENGORDA]
    };
  }

  // Otherwise, return the original phases
  return values;
}

export function EntityForm<T extends { id: string; name: string }>({
  formFields,
  formConfig,
  initialValues,
  handleSubmit,
  handleReset,
  handleChange,
  handleValidationChange,
  handleAddressSelect,
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
        // Process phases for property entities
        const processedEntity = processPropertyPhases(foundEntity);
        setEntityData(processedEntity);
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
        fields={formFields.map(field => ({
          ...field,
          onAddressSelect: field.type === 'address' ? handleAddressSelect : undefined
        }))}
        config={formConfig}
        initialValues={entityData}
        onSubmit={(values, _formState) => {
          // Process phases before submitting
          const processedValues = processPropertyPhasesForSubmit(values);
          handleSubmit(processedValues as T);
        }}
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

import React from 'react';
import { useServiceProviderForm } from './hooks';
import { useServiceProviderNavigation } from './utils/navigation';
import {
  createServiceProviderFormFields,
  createServiceProviderFormConfig,
  getInitialValues,
} from './utils/formConfig';
import { NewEntityForm } from '../shared/components';
import { SERVICEPROVIDER_ICONS } from './config/serviceProviderConfig';
import type { ServiceProvider } from '~/types/service-provider';

const NewServiceProvider: React.FC = () => {
  const { handleBack } = useServiceProviderNavigation();
  const { handleSubmit, handleReset, handleChange, handleValidationChange } =
    useServiceProviderForm({ isEdit: false });

  const formFields = createServiceProviderFormFields(false);
  const formConfig = createServiceProviderFormConfig(false);
  const initialValues = getInitialValues();

  return (
    <NewEntityForm<Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'>>
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={
        handleSubmit as (
          values: Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'>,
        ) => Promise<void>
      }
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Novo Prestador de Serviço"
      subtitle="Cadastre um novo prestador de serviço"
      backLabel="Voltar para lista"
      icon={SERVICEPROVIDER_ICONS.form}
      testId="new-service-provider-form"
    />
  );
};

export default NewServiceProvider;

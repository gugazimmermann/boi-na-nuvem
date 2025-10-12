import React from 'react';
import { usePropertyForm } from './hooks';
import { usePropertyNavigation } from './utils/navigation';
import {
  createPropertyFormFields,
  createPropertyFormConfig,
  getInitialValues,
} from './utils/formConfig';
import { NewEntityForm } from '../shared/components';
import { PROPERTY_ICONS } from './config/propertyConfig';
import type { Property } from '~/types/property';

const NewProperty: React.FC = () => {
  const { handleBack } = usePropertyNavigation();
  const { handleSubmit, handleReset, handleChange, handleValidationChange, handleAddressSelect } = usePropertyForm({
    isEdit: false,
  });

  const formFields = createPropertyFormFields(false);
  const formConfig = createPropertyFormConfig(false);
  const initialValues = getInitialValues();

  return (
    <NewEntityForm<Omit<Property, 'id'>>
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={handleSubmit as (values: Omit<Property, 'id'>) => Promise<void>}
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleAddressSelect={handleAddressSelect}
      handleBack={handleBack}
      title="Nova Propriedade"
      subtitle="Cadastre uma nova propriedade"
      backLabel="Voltar para lista"
      icon={PROPERTY_ICONS.form}
      testId="new-property-form"
    />
  );
};

export default NewProperty;

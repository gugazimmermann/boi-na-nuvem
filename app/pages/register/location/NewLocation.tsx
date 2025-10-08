import React from 'react';
import { useLocationForm } from './hooks';
import { useLocationNavigation } from './hooks/useLocationNavigation';
import {
  createLocationFormFields,
  createLocationFormConfig,
  getInitialValues,
} from './utils/formConfig';
import { NewEntityForm } from '../shared/components';
import { LOCATION_ICONS } from './config/locationConfig';
import type { Location } from '~/types/location';

const NewLocation: React.FC = () => {
  const { handleBack } = useLocationNavigation();
  const { handleSubmit, handleReset, handleChange, handleValidationChange, activeProperties } =
    useLocationForm({ isEdit: false });

  const formFields = createLocationFormFields(false, activeProperties);
  const formConfig = createLocationFormConfig(false);
  const initialValues = getInitialValues();

  return (
    <NewEntityForm<Omit<Location, 'id' | 'createdAt' | 'deletedAt'>>
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={
        handleSubmit as (values: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>) => Promise<void>
      }
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Nova Localização"
      subtitle="Cadastre uma nova localização"
      backLabel="Voltar para lista"
      icon={LOCATION_ICONS.form}
      testId="new-location-form"
    />
  );
};

export default NewLocation;

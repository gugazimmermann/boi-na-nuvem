import React from 'react';
import { useParams, useLocation } from 'react-router';
import { useLocationForm } from './hooks';
import { useLocationNavigation } from './hooks/useLocationNavigation';
import { createLocationFormFields, createLocationFormConfig } from './utils/formConfig';
import { EntityForm } from '../shared/components';
import { LOCATION_MESSAGES, LOCATION_ICONS } from './config/locationConfig';

const EditLocation: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const cameFromDetails =
    location.state?.from === 'details' ||
    sessionStorage.getItem('editLocationFromDetails') === 'true';

  const { handleBack } = useLocationNavigation(cameFromDetails, id);
  const {
    handleSubmit,
    handleReset,
    handleChange,
    handleValidationChange,
    fetchLocation,
    activeProperties,
  } = useLocationForm({
    isEdit: true,
    locationId: id,
    cameFromDetails,
  });

  const formFields = createLocationFormFields(true, activeProperties);
  const formConfig = createLocationFormConfig(true);

  return (
    <EntityForm
      formFields={formFields}
      formConfig={formConfig}
      initialValues={{} as any}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      fetchEntity={fetchLocation}
      handleBack={handleBack}
      title="Editar Localização"
      subtitle={`Edite as informações da localização`}
      backLabel={cameFromDetails ? 'Voltar para detalhes' : 'Voltar para lista'}
      loadingMessage={LOCATION_MESSAGES.loading}
      errorTitle={LOCATION_MESSAGES.errorTitle}
      notFoundMessage={LOCATION_MESSAGES.notFound}
      icon={LOCATION_ICONS.form}
      isEdit={true}
      testId="edit-location-form"
    />
  );
};

export default EditLocation;

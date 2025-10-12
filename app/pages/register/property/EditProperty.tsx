import React from 'react';
import { useParams, useLocation } from 'react-router';
import { usePropertyForm } from './hooks';
import { usePropertyNavigation } from './utils/navigation';
import { createPropertyFormFields, createPropertyFormConfig } from './utils/formConfig';
import { EntityForm } from '../shared/components';
import { PROPERTY_MESSAGES, PROPERTY_ICONS } from './config/propertyConfig';

const EditProperty: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const cameFromDetails =
    location.state?.from === 'details' ||
    sessionStorage.getItem('editPropertyFromDetails') === 'true';

  const { handleBack } = usePropertyNavigation(cameFromDetails, id);
  const { handleSubmit, handleReset, handleChange, handleValidationChange, handleAddressSelect, fetchProperty } =
    usePropertyForm({
      isEdit: true,
      propertyId: id,
      cameFromDetails,
    });

  const formFields = createPropertyFormFields(true);
  const formConfig = createPropertyFormConfig(true);

  return (
    <EntityForm
      formFields={formFields}
      formConfig={formConfig}
      initialValues={{} as any}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleAddressSelect={handleAddressSelect}
      fetchEntity={fetchProperty}
      handleBack={handleBack}
      title="Editar Propriedade"
      subtitle={`Edite as informações da propriedade`}
      backLabel={cameFromDetails ? 'Voltar para detalhes' : 'Voltar para lista'}
      loadingMessage={PROPERTY_MESSAGES.loading}
      errorTitle={PROPERTY_MESSAGES.errorTitle}
      notFoundMessage={PROPERTY_MESSAGES.notFound}
      icon={PROPERTY_ICONS.form}
      isEdit={true}
      testId="edit-property-form"
    />
  );
};

export default EditProperty;

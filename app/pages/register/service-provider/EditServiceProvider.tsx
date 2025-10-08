import React from 'react';
import { useParams, useLocation } from 'react-router';
import { useServiceProviderForm } from './hooks';
import { useServiceProviderNavigation } from './utils/navigation';
import {
  createServiceProviderFormFields,
  createServiceProviderFormConfig,
} from './utils/formConfig';
import { EntityForm } from '../shared/components';
import { SERVICEPROVIDER_MESSAGES, SERVICEPROVIDER_ICONS } from './config/serviceProviderConfig';

const EditServiceProvider: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const cameFromDetails =
    location.state?.from === 'details' ||
    sessionStorage.getItem('editServiceProviderFromDetails') === 'true';

  const { handleBack } = useServiceProviderNavigation(cameFromDetails, id);
  const { handleSubmit, handleReset, handleChange, handleValidationChange, fetchServiceProvider } =
    useServiceProviderForm({
      isEdit: true,
      serviceProviderId: id,
      cameFromDetails,
    });

  const formFields = createServiceProviderFormFields(true);
  const formConfig = createServiceProviderFormConfig(true);

  return (
    <EntityForm
      formFields={formFields}
      formConfig={formConfig}
      initialValues={{} as any}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      fetchEntity={fetchServiceProvider}
      handleBack={handleBack}
      title="Editar Prestador de Serviço"
      subtitle={`Edite as informações do prestador de serviço`}
      backLabel={cameFromDetails ? 'Voltar para detalhes' : 'Voltar para lista'}
      loadingMessage={SERVICEPROVIDER_MESSAGES.loading}
      errorTitle={SERVICEPROVIDER_MESSAGES.errorTitle}
      notFoundMessage={SERVICEPROVIDER_MESSAGES.notFound}
      icon={SERVICEPROVIDER_ICONS.form}
      isEdit={true}
      testId="edit-service-provider-form"
    />
  );
};

export default EditServiceProvider;

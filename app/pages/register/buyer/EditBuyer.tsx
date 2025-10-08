import React from 'react';
import { useParams, useLocation } from 'react-router';
import { useBuyerForm } from './hooks';
import { useBuyerNavigation } from './utils/navigation';
import { createBuyerFormFields, createBuyerFormConfig } from './utils/formConfig';
import { EntityForm } from '../shared/components';
import type { Buyer } from '~/types/buyer';
import { BUYER_MESSAGES, BUYER_ICONS } from './config/buyerConfig';

const EditBuyer: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const cameFromDetails =
    location.state?.from === 'details' || sessionStorage.getItem('editBuyerFromDetails') === 'true';

  const { handleBack } = useBuyerNavigation(cameFromDetails, id);
  const { handleSubmit, handleReset, handleChange, handleValidationChange, fetchBuyer } =
    useBuyerForm({
      isEdit: true,
      buyerId: id,
      cameFromDetails,
    });

  const formFields = createBuyerFormFields(true);
  const formConfig = createBuyerFormConfig(true);
  const initialValues: Buyer = {
    id: '',
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    deletedAt: null,
  };

  return (
    <EntityForm
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Editar Comprador"
      subtitle="Edite as informações do comprador"
      backLabel={cameFromDetails ? 'Voltar para detalhes' : 'Voltar para lista'}
      icon={BUYER_ICONS.form}
      loadingMessage={BUYER_MESSAGES.loading}
      errorTitle={BUYER_MESSAGES.errorTitle}
      notFoundMessage="Comprador não encontrado"
      testId="buyer-edit-form"
      fetchEntity={fetchBuyer}
    />
  );
};

export default EditBuyer;

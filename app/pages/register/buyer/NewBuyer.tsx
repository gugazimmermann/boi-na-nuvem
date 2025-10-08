import React from 'react';
import { useBuyerForm } from './hooks';
import { useBuyerNavigation } from './utils/navigation';
import { createBuyerFormFields, createBuyerFormConfig, getInitialValues } from './utils/formConfig';
import { NewEntityForm } from '../shared/components';
import { BUYER_ICONS } from './config/buyerConfig';
import type { Buyer } from '~/types/buyer';

const NewBuyer: React.FC = () => {
  const { handleBack } = useBuyerNavigation();
  const { handleSubmit, handleReset, handleChange, handleValidationChange } = useBuyerForm({
    isEdit: false,
  });

  const formFields = createBuyerFormFields(false);
  const formConfig = createBuyerFormConfig(false);
  const initialValues = getInitialValues();

  return (
    <NewEntityForm<Omit<Buyer, 'id' | 'createdAt' | 'deletedAt'>>
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={
        handleSubmit as (values: Omit<Buyer, 'id' | 'createdAt' | 'deletedAt'>) => Promise<void>
      }
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Novo Comprador"
      subtitle="Cadastre um novo comprador"
      backLabel="Voltar para lista"
      icon={BUYER_ICONS.form}
      testId="buyer-new-form"
    />
  );
};

export default NewBuyer;

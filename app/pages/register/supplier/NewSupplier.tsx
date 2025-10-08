import React from 'react';
import { useSupplierForm } from './hooks';
import { useSupplierNavigation } from './utils/navigation';
import {
  createSupplierFormFields,
  createSupplierFormConfig,
  getInitialValues,
} from './utils/formConfig';
import { NewEntityForm } from '../shared/components';
import { SUPPLIER_ICONS } from './config/supplierConfig';
import type { Supplier } from '~/types/supplier';

const NewSupplier: React.FC = () => {
  const { handleBack } = useSupplierNavigation();
  const { handleSubmit, handleReset, handleChange, handleValidationChange } = useSupplierForm({
    isEdit: false,
  });

  const formFields = createSupplierFormFields(false);
  const formConfig = createSupplierFormConfig(false);
  const initialValues = getInitialValues();

  return (
    <NewEntityForm<Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>>
      testId="supplier-new-form"
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={
        handleSubmit as (values: Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>) => Promise<void>
      }
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Novo Fornecedor"
      subtitle="Cadastre um novo fornecedor"
      backLabel="Voltar para lista"
      icon={SUPPLIER_ICONS.form}
    />
  );
};

export default NewSupplier;

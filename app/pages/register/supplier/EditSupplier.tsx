import React from 'react';
import { useParams, useLocation } from 'react-router';
import { useSupplierForm } from './hooks';
import { useSupplierNavigation } from './utils/navigation';
import {
  createSupplierFormFields,
  createSupplierFormConfig,
  getInitialValues,
} from './utils/formConfig';
import { EntityForm } from '../shared/components';
import { SUPPLIER_MESSAGES, SUPPLIER_ICONS } from './config/supplierConfig';
import type { Supplier } from '~/types/supplier';

const EditSupplier: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const cameFromDetails =
    location.state?.from === 'details' ||
    sessionStorage.getItem('editSupplierFromDetails') === 'true';

  const { handleBack } = useSupplierNavigation(cameFromDetails, id);
  const { handleSubmit, handleReset, handleChange, handleValidationChange, fetchSupplier } =
    useSupplierForm({
      isEdit: true,
      supplierId: id,
      cameFromDetails,
    });

  const formFields = createSupplierFormFields(true);
  const formConfig = createSupplierFormConfig(true);

  const initialSupplier: Supplier = {
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
    country: 'Brasil',
    zipCode: '',
    latitude: 0,
    longitude: 0,
    status: 'active',
    createdAt: '',
    deletedAt: null,
  };

  return (
    <EntityForm<Supplier>
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialSupplier}
      handleSubmit={(values) =>
        handleSubmit(values as unknown as Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>)
      }
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Editar Fornecedor"
      subtitle="Edite as informações do fornecedor"
      backLabel={cameFromDetails ? 'Voltar para detalhes' : 'Voltar para lista'}
      icon={SUPPLIER_ICONS.form}
      loadingMessage={SUPPLIER_MESSAGES.loading}
      errorTitle={SUPPLIER_MESSAGES.errorTitle}
      notFoundMessage={SUPPLIER_MESSAGES.notFound}
      testId="supplier-edit-form"
      fetchEntity={fetchSupplier}
    />
  );
};

export default EditSupplier;

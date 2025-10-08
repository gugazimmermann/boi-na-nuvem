import React from 'react';
import { useEmployeeForm } from './hooks';
import { useEmployeeNavigation } from './utils/navigation';
import {
  createEmployeeFormFields,
  createEmployeeFormConfig,
  getInitialValues,
} from './utils/formConfig';
import { NewEntityForm } from '../shared/components';
import { EMPLOYEE_ICONS } from './config/employeeConfig';
import type { Employee } from '~/types/employee';

const NewEmployee: React.FC = () => {
  const { handleBack } = useEmployeeNavigation();
  const { handleSubmit, handleReset, handleChange, handleValidationChange } = useEmployeeForm({
    isEdit: false,
  });

  const formFields = createEmployeeFormFields(false);
  const formConfig = createEmployeeFormConfig(false);
  const initialValues = getInitialValues();

  return (
    <NewEntityForm<Omit<Employee, 'id' | 'createdAt' | 'deletedAt'>>
      formFields={formFields}
      formConfig={formConfig}
      initialValues={initialValues}
      handleSubmit={
        handleSubmit as (values: Omit<Employee, 'id' | 'createdAt' | 'deletedAt'>) => Promise<void>
      }
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      handleBack={handleBack}
      title="Novo Colaborador"
      subtitle="Cadastre um novo colaborador"
      backLabel="Voltar para lista"
      icon={EMPLOYEE_ICONS.form}
      testId="new-employee-form"
    />
  );
};

export default NewEmployee;

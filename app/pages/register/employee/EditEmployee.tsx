import React from 'react';
import { useParams, useLocation } from 'react-router';
import { useEmployeeForm } from './hooks';
import { useEmployeeNavigation } from './utils/navigation';
import { createEmployeeFormFields, createEmployeeFormConfig } from './utils/formConfig';
import { EntityForm } from '../shared/components';
import { EMPLOYEE_MESSAGES, EMPLOYEE_ICONS } from './config/employeeConfig';

const EditEmployee: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const cameFromDetails =
    location.state?.from === 'details' ||
    sessionStorage.getItem('editEmployeeFromDetails') === 'true';

  const { handleBack } = useEmployeeNavigation(cameFromDetails, id);
  const { handleSubmit, handleReset, handleChange, handleValidationChange, fetchEmployee } =
    useEmployeeForm({
      isEdit: true,
      employeeId: id,
      cameFromDetails,
    });

  const formFields = createEmployeeFormFields(true);
  const formConfig = createEmployeeFormConfig(true);

  return (
    <EntityForm
      formFields={formFields}
      formConfig={formConfig}
      initialValues={{} as any}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleChange={handleChange}
      handleValidationChange={handleValidationChange}
      fetchEntity={fetchEmployee}
      handleBack={handleBack}
      title="Editar Colaborador"
      subtitle={`Edite as informações do colaborador`}
      backLabel={cameFromDetails ? 'Voltar para detalhes' : 'Voltar para lista'}
      loadingMessage={EMPLOYEE_MESSAGES.loading}
      errorTitle={EMPLOYEE_MESSAGES.errorTitle}
      notFoundMessage={EMPLOYEE_MESSAGES.notFound}
      icon={EMPLOYEE_ICONS.form}
      isEdit={true}
      testId="edit-employee-form"
    />
  );
};

export default EditEmployee;

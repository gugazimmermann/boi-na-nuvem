import { useCallback } from 'react';
import { useEmployees } from '~/hooks/useEmployees';
import { EMPLOYESS } from '~/mocks/employee-mock';
import { useEntityForm } from '../../shared/hooks';
import { EMPLOYEE_ROUTES } from '../config/employeeConfig';
import type { Employee } from '~/types/employee';

interface UseEmployeeFormProps {
  isEdit?: boolean;
  employeeId?: string;
  cameFromDetails?: boolean;
}

export const useEmployeeForm = ({
  isEdit = false,
  employeeId,
  cameFromDetails,
}: UseEmployeeFormProps) => {
  const { addEmployee, updateEmployee } = useEmployees();

  const entityForm = useEntityForm<Employee, Omit<Employee, 'id' | 'createdAt' | 'deletedAt'>>({
    isEdit,
    entityId: employeeId,
    cameFromDetails,
    createEntity: async (data) => {
      await addEmployee(data);
    },
    updateEntity: async (id, data) => {
      await updateEmployee(id, data);
    },
    entities: EMPLOYESS,
    entityType: 'colaborador',
    listRoute: EMPLOYEE_ROUTES.list,
    detailRoute: EMPLOYEE_ROUTES.detail,
  });

  const fetchEmployee = useCallback(async (id: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const foundEmployee = EMPLOYESS.find((emp) => emp.id === id);

      if (!foundEmployee) {
        throw new Error('Colaborador não encontrado');
      }

      return foundEmployee;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Erro ao carregar colaborador');
    }
  }, []);

  return {
    handleSubmit: entityForm.handleSubmit as (
      values: Omit<Employee, 'id' | 'createdAt' | 'deletedAt'>,
    ) => Promise<void>,
    handleReset: entityForm.handleReset,
    handleChange: entityForm.handleChange,
    handleValidationChange: entityForm.handleValidationChange,
    fetchEmployee,
    isSubmitting: entityForm.isSubmitting,
  };
};

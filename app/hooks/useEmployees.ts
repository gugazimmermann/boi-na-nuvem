import { useState, useEffect, useCallback } from 'react';
import { EMPLOYESS } from '~/mocks/employee-mock';
import type { Employee } from '~/types/employee';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmployees(EMPLOYESS);
    } catch (err) {
      setError('Erro ao carregar colaboradores');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEmployee = useCallback(
    async (employee: Omit<Employee, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const newEmployee: Employee = {
          ...employee,
          id: `emp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          deletedAt: null,
        };

        setEmployees((prev) => [newEmployee, ...prev]);
        return newEmployee;
      } catch (err) {
        setError('Erro ao adicionar colaborador');
        console.error('Error adding employee:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateEmployee = useCallback(async (id: string, updates: Partial<Employee>) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp)));

      return true;
    } catch (err) {
      setError('Erro ao atualizar colaborador');
      console.error('Error updating employee:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmployees((prev) =>
        prev.map((emp) => (emp.id === id ? { ...emp, deletedAt: new Date().toISOString() } : emp)),
      );

      return true;
    } catch (err) {
      setError('Erro ao excluir colaborador');
      console.error('Error deleting employee:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    refetch,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

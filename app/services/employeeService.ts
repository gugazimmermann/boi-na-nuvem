import { EMPLOYESS, PROPERTYHASEMPLOYEE } from '~/mocks/employee-mock';
import type { Employee, PropertyHasEmployee } from '~/types/employee';

export class EmployeeService {
  static async getAll(): Promise<Employee[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return EMPLOYESS;
  }

  static async getById(id: string): Promise<Employee | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return EMPLOYESS.find((emp) => emp.id === id) || null;
  }

  static async create(
    employee: Omit<Employee, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Employee> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newEmployee: Employee = {
      ...employee,
      id: `emp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    return newEmployee;
  }

  static async update(id: string, updates: Partial<Employee>): Promise<Employee> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingEmployee = EMPLOYESS.find((emp) => emp.id === id);
    if (!existingEmployee) {
      throw new Error('Colaborador não encontrado');
    }

    return {
      ...existingEmployee,
      ...updates,
    };
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingEmployee = EMPLOYESS.find((emp) => emp.id === id);
    if (!existingEmployee) {
      throw new Error('Colaborador não encontrado');
    }

    return true;
  }

  static async getEmployeeProperties(employeeId: string): Promise<PropertyHasEmployee[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROPERTYHASEMPLOYEE.filter((emp) => emp.employeeId === employeeId);
  }

  static async getPropertyEmployees(propertyId: string): Promise<PropertyHasEmployee[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROPERTYHASEMPLOYEE.filter((emp) => emp.propertyId === propertyId);
  }
}

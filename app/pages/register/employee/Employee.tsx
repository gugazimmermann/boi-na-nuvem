import { useMemo } from 'react';
import { useEmployees } from '~/hooks/useEmployees';
import type { Employee } from '~/types/employee';
import { useEmployeeFilters, useEmployeePagination } from './hooks';
import { useEmployeeNavigation } from './utils/navigation';
import { createTableConfig } from './config/tableConfig';
import { EntityPage } from '../shared/components';
import { EMPLOYEE_CONFIG, EMPLOYEE_MESSAGES } from './config/employeeConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { useSelectedProperty } from '~/hooks/useSelectedProperty';
import { PROPERTYHASEMPLOYEE } from '~/mocks/employee-mock';

export default function EmployeePage() {
  const { employees, loading, error, refetch, deleteEmployee } = useEmployees();
  const { selectedPropertyId, isAllSelected } = useSelectedProperty();
  const { handleEditEmployee, handleViewEmployee, handleAddEmployee } = useEmployeeNavigation();

  const employeesFilteredByProperty = useMemo(() => {
    if (!employees) return [];
    if (!selectedPropertyId || isAllSelected) return employees;
    return employees.filter((emp) =>
      PROPERTYHASEMPLOYEE.some(
        (rel) => rel.employeeId === emp.id && rel.propertyId === selectedPropertyId,
      ),
    );
  }, [employees, selectedPropertyId, isAllSelected]);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    filteredEmployees,
  } = useEmployeeFilters({ employees: employeesFilteredByProperty });

  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedEmployees,
    handlePageChange,
    hasPagination,
  } = useEmployeePagination({ filteredEmployees: filteredEmployees || [] });

  const tableConfig = createTableConfig({
    filteredEmployees: paginatedEmployees,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSort,
    onEditEmployee: (employee: Employee) => handleEditEmployee(employee.id),
    onDeleteEmployee: (employee: Employee) => deleteEmployee(employee.id),
    onAddEmployee: handleAddEmployee,
    onViewEmployee: (employee: Employee) => handleViewEmployee(employee.id),
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredEmployees.length,
    onPageChange: handlePageChange,
    hasPagination,
  });

  return (
    <EntityPage
      entities={employees}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={async (id: string) => {
        await deleteEmployee(id);
      }}
      filteredEntities={filteredEmployees || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={EMPLOYEE_MESSAGES.loading}
      errorTitle={EMPLOYEE_MESSAGES.errorTitle}
      entityType={EMPLOYEE_CONFIG.entityType}
      entityNameKey="name"
    />
  );
}

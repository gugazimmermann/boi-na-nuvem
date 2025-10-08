import type { Employee } from '~/types/employee';
import { EMPLOYEE_CONFIG } from './employeeConfig';
import { EmployeeStatusBadge } from '../components/EmployeeStatusBadge';
import { EmployeeActions } from '../components/EmployeeActions';

interface CreateTableConfigProps {
  filteredEmployees: Employee[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void;
  handleSort: (key: string) => void;
  onEditEmployee?: (employee: Employee) => void;
  onDeleteEmployee?: (employee: Employee) => void;
  onAddEmployee?: () => void;
  onViewEmployee?: (employee: Employee) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export function createTableConfig({
  filteredEmployees,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  onEditEmployee,
  onDeleteEmployee,
  onAddEmployee,
  onViewEmployee,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigProps) {
  return {
    title: EMPLOYEE_CONFIG.title,
    subtitle: EMPLOYEE_CONFIG.subtitle,
    count: filteredEmployees.length,
    countLabel: EMPLOYEE_CONFIG.countLabel,
    data: filteredEmployees,
    columns: [
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        className: 'w-64',
        onSort: () => handleSort('name'),
        render: (value: any, employee: Employee) => (
          <button
            onClick={() => onViewEmployee?.(employee)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
          >
            {employee.name}
          </button>
        ),
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        className: 'w-48',
        onSort: () => handleSort('email'),
        render: (value: any, employee: Employee) => (
          <a
            href={`mailto:${employee.email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {employee.email}
          </a>
        ),
      },
      {
        key: 'phone',
        label: 'Telefone',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('phone'),
        render: (value: any, employee: Employee) => (
          <a
            href={`tel:${employee.phone}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {employee.phone}
          </a>
        ),
      },
      {
        key: 'location',
        label: 'Localização',
        sortable: false,
        className: 'w-48',
        render: (value: any, employee: Employee) => {
          const cityState = [employee.city, employee.state].filter(Boolean).join(', ');
          const country = employee.country;
          const location =
            cityState && country ? `${cityState} - ${country}` : cityState || country || '-';
          return location;
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-24',
        onSort: () => handleSort('status'),
        render: (value: any, employee: Employee) => (
          <EmployeeStatusBadge status={employee.status} />
        ),
      },
    ],
    filters: EMPLOYEE_CONFIG.filterOptions.map((option) => ({
      label: option.label,
      active: statusFilter === option.key,
      onClick: () => setStatusFilter(option.key as 'all' | 'active' | 'inactive'),
    })),
    search: {
      placeholder: EMPLOYEE_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    rowActions: (employee: Employee) => (
      <EmployeeActions employee={employee} onEdit={onEditEmployee} onDelete={onDeleteEmployee} />
    ),
    ...(hasPagination && onPageChange
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems,
            onPageChange,
          },
        }
      : {}),
    actions: {
      add: {
        label: 'Novo Colaborador',
        onClick: onAddEmployee || (() => console.log('Add new employee')),
      },
    },
  };
}

import type { Supplier } from '~/types/supplier';
import { SUPPLIER_CONFIG } from './supplierConfig';
import { SupplierStatusBadge } from '../components/SupplierStatusBadge';
import { SupplierActions } from '../components/SupplierActions';

interface CreateTableConfigProps {
  filteredSuppliers: Supplier[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void;
  handleSort: (key: string) => void;
  onEditSupplier?: (supplier: Supplier) => void;
  onDeleteSupplier?: (supplier: Supplier) => void;
  onAddSupplier?: () => void;
  onViewSupplier?: (supplier: Supplier) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export function createTableConfig({
  filteredSuppliers,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  onEditSupplier,
  onDeleteSupplier,
  onAddSupplier,
  onViewSupplier,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigProps) {
  return {
    title: SUPPLIER_CONFIG.title,
    subtitle: SUPPLIER_CONFIG.subtitle,
    count: filteredSuppliers.length,
    countLabel: SUPPLIER_CONFIG.countLabel,
    data: filteredSuppliers,
    columns: [
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        className: 'w-64',
        onSort: () => handleSort('name'),
        render: (value: any, supplier: Supplier) => (
          <button
            onClick={() => onViewSupplier?.(supplier)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
          >
            {supplier.name}
          </button>
        ),
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        className: 'w-48',
        onSort: () => handleSort('email'),
        render: (value: any, supplier: Supplier) => (
          <a
            href={`mailto:${supplier.email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {supplier.email}
          </a>
        ),
      },
      {
        key: 'phone',
        label: 'Telefone',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('phone'),
        render: (value: any, supplier: Supplier) => (
          <a
            href={`tel:${supplier.phone}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {supplier.phone}
          </a>
        ),
      },
      {
        key: 'city',
        label: 'Cidade',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('city'),
        render: (value: any, supplier: Supplier) => (
          <div className="text-gray-600">{supplier.city}</div>
        ),
      },
      {
        key: 'state',
        label: 'Estado',
        sortable: true,
        className: 'w-24',
        onSort: () => handleSort('state'),
        render: (value: any, supplier: Supplier) => (
          <div className="text-gray-600">{supplier.state}</div>
        ),
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-24',
        onSort: () => handleSort('status'),
        render: (value: any, supplier: Supplier) => (
          <SupplierStatusBadge status={supplier.status} />
        ),
      },
      {
        key: 'actions',
        label: 'Ações',
        sortable: false,
        render: (value: any, supplier: Supplier) => (
          <SupplierActions
            supplier={supplier}
            onEdit={onEditSupplier}
            onDelete={onDeleteSupplier}
          />
        ),
      },
    ],
    search: {
      placeholder: SUPPLIER_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    filters: SUPPLIER_CONFIG.filterOptions.map((option) => ({
      label: option.label,
      active: statusFilter === option.key,
      onClick: () => setStatusFilter(option.key as 'all' | 'active' | 'inactive'),
    })),
    sort: {
      onSort: handleSort,
    },
    pagination: {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      onPageChange,
    },
    actions: {
      onAdd: onAddSupplier,
    },
  };
}

import type { Buyer } from '~/types/buyer';
import { BUYER_CONFIG } from './buyerConfig';
import { BuyerStatusBadge } from '../components/BuyerStatusBadge';
import { BuyerActions } from '../components/BuyerActions';

interface CreateTableConfigProps {
  filteredBuyers: Buyer[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void;
  handleSort: (key: string) => void;
  onEditBuyer?: (buyer: Buyer) => void;
  onDeleteBuyer?: (buyer: Buyer) => void;
  onAddBuyer?: () => void;
  onViewBuyer?: (buyer: Buyer) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export function createTableConfig({
  filteredBuyers,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  onEditBuyer,
  onDeleteBuyer,
  onAddBuyer,
  onViewBuyer,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigProps) {
  return {
    title: BUYER_CONFIG.title,
    subtitle: BUYER_CONFIG.subtitle,
    count: filteredBuyers.length,
    countLabel: BUYER_CONFIG.countLabel,
    data: filteredBuyers,
    columns: [
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        className: 'w-64',
        onSort: () => handleSort('name'),
        render: (value: any, buyer: Buyer) => (
          <button
            onClick={() => onViewBuyer?.(buyer)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
          >
            {buyer.name}
          </button>
        ),
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        className: 'w-48',
        onSort: () => handleSort('email'),
        render: (value: any, buyer: Buyer) => (
          <a
            href={`mailto:${buyer.email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {buyer.email}
          </a>
        ),
      },
      {
        key: 'phone',
        label: 'Telefone',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('phone'),
        render: (value: any, buyer: Buyer) => (
          <a
            href={`tel:${buyer.phone}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {buyer.phone}
          </a>
        ),
      },
      {
        key: 'city',
        label: 'Cidade',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('city'),
        render: (value: any, buyer: Buyer) => <div className="text-gray-600">{buyer.city}</div>,
      },
      {
        key: 'state',
        label: 'Estado',
        sortable: true,
        className: 'w-24',
        onSort: () => handleSort('state'),
        render: (value: any, buyer: Buyer) => <div className="text-gray-600">{buyer.state}</div>,
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-24',
        onSort: () => handleSort('status'),
        render: (value: any, buyer: Buyer) => <BuyerStatusBadge status={buyer.status} />,
      },
      {
        key: 'actions',
        label: 'Ações',
        sortable: false,
        render: (value: any, buyer: Buyer) => (
          <BuyerActions buyer={buyer} onEdit={onEditBuyer} onDelete={onDeleteBuyer} />
        ),
      },
    ],
    search: {
      placeholder: BUYER_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    filters: BUYER_CONFIG.filterOptions.map((option) => ({
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
      onAdd: onAddBuyer,
    },
  };
}

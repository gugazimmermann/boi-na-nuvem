import type { ServiceProvider } from '~/types/service-provider';
import { SERVICEPROVIDER_CONFIG } from './serviceProviderConfig';
import { ServiceProviderStatusBadge } from '../components/ServiceProviderStatusBadge';
import { ServiceProviderActions } from '../components/ServiceProviderActions';

interface CreateTableConfigProps {
  filteredServiceProviders: ServiceProvider[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (filter: 'all' | 'active' | 'inactive') => void;
  handleSort: (key: string) => void;
  onEditServiceProvider?: (serviceProvider: ServiceProvider) => void;
  onDeleteServiceProvider?: (serviceProvider: ServiceProvider) => void;
  onAddServiceProvider?: () => void;
  onViewServiceProvider?: (serviceProvider: ServiceProvider) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  hasPagination?: boolean;
}

export function createTableConfig({
  filteredServiceProviders,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  onEditServiceProvider,
  onDeleteServiceProvider,
  onAddServiceProvider,
  onViewServiceProvider,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 50,
  totalItems = 0,
  onPageChange,
  hasPagination = false,
}: CreateTableConfigProps) {
  return {
    title: SERVICEPROVIDER_CONFIG.title,
    subtitle: SERVICEPROVIDER_CONFIG.subtitle,
    count: filteredServiceProviders.length,
    countLabel: SERVICEPROVIDER_CONFIG.countLabel,
    data: filteredServiceProviders,
    columns: [
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        className: 'w-64',
        onSort: () => handleSort('name'),
        render: (value: any, serviceProvider: ServiceProvider) => (
          <button
            onClick={() => onViewServiceProvider?.(serviceProvider)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors text-left cursor-pointer"
          >
            {serviceProvider.name}
          </button>
        ),
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        className: 'w-48',
        onSort: () => handleSort('email'),
        render: (value: any, serviceProvider: ServiceProvider) => (
          <a
            href={`mailto:${serviceProvider.email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {serviceProvider.email}
          </a>
        ),
      },
      {
        key: 'phone',
        label: 'Telefone',
        sortable: true,
        className: 'w-32',
        onSort: () => handleSort('phone'),
        render: (value: any, serviceProvider: ServiceProvider) => (
          <a
            href={`tel:${serviceProvider.phone}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {serviceProvider.phone}
          </a>
        ),
      },
      {
        key: 'location',
        label: 'Localização',
        sortable: false,
        className: 'w-48',
        render: (value: any, serviceProvider: ServiceProvider) => {
          const cityState = [serviceProvider.city, serviceProvider.state]
            .filter(Boolean)
            .join(', ');
          const country = serviceProvider.country;
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
        render: (value: any, serviceProvider: ServiceProvider) => (
          <ServiceProviderStatusBadge status={serviceProvider.status} />
        ),
      },
    ],
    filters: SERVICEPROVIDER_CONFIG.filterOptions.map((option) => ({
      label: option.label,
      active: statusFilter === option.key,
      onClick: () => setStatusFilter(option.key as 'all' | 'active' | 'inactive'),
    })),
    search: {
      placeholder: SERVICEPROVIDER_CONFIG.searchPlaceholder,
      value: searchTerm,
      onChange: setSearchTerm,
    },
    rowActions: (serviceProvider: ServiceProvider) => (
      <ServiceProviderActions
        serviceProvider={serviceProvider}
        onEdit={onEditServiceProvider}
        onDelete={onDeleteServiceProvider}
      />
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
        label: 'Novo Prestador de Serviço',
        onClick: onAddServiceProvider || (() => console.log('Add new service provider')),
      },
    },
  };
}

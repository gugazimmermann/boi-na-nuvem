import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import type { TableConfig } from '~/components/table/types';
import { usePropertyTabPagination } from '../../property/tabs/hooks/usePropertyTabPagination';
import { SERVICEPROVIDERHASPROPERTY } from '~/mocks/service-provider-mock';
import { PROPERTIES } from '~/mocks/properties-mock';
import { PropertyStatus } from '~/types/property';
import type { ServiceProvider } from '~/types/service-provider';
import type { Property } from '~/types/property';

interface ServiceProviderPropertiesTabProps {
  serviceProvider: ServiceProvider;
  propertiesSearch: string;
  propertiesSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedPropertiesSearch: string;
  onPropertiesSearchChange: (value: string) => void;
  onPropertiesSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function ServiceProviderPropertiesTab({
  serviceProvider,
  propertiesSearch,
  propertiesSort,
  debouncedPropertiesSearch,
  onPropertiesSearchChange,
  onPropertiesSortChange,
}: ServiceProviderPropertiesTabProps) {
  const navigate = useNavigate();

  // Handle property navigation
  const handlePropertyClick = useCallback(
    (propertyId: string) => {
      // Store the source page information for back navigation
      sessionStorage.setItem(
        'propertyDetailSource',
        JSON.stringify({
          type: 'service-provider',
          id: serviceProvider.id,
          name: serviceProvider.name,
        }),
      );
      navigate(`/cadastros/propriedades/${propertyId}`);
    },
    [navigate, serviceProvider.id, serviceProvider.name],
  );
  // Helper function to get property status info
  const getPropertyStatusInfo = useCallback((status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return {
          label: 'Ativo',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          icon: '🟢',
        };
      case PropertyStatus.INACTIVE:
        return {
          label: 'Inativo',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          icon: '🔴',
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          icon: '⚪',
        };
    }
  }, []);

  // Get properties associated with this service provider
  const baseServiceProviderProperties = useMemo(() => {
    const propertyIds = SERVICEPROVIDERHASPROPERTY.filter(
      (sp) => sp.serviceProvider_id === serviceProvider.id,
    ).map((sp) => sp.property_id);

    return PROPERTIES.filter((property) => propertyIds.includes(property.id));
  }, [serviceProvider.id]);

  // Apply search filter with debounced search
  const searchProperties = useCallback(
    (properties: Property[], searchTerm: string) => {
      if (!searchTerm.trim()) return properties;

      const term = searchTerm.toLowerCase().trim();
      return properties.filter(
        (property) =>
          property.name.toLowerCase().includes(term) ||
          property.code.toLowerCase().includes(term) ||
          (property.city && property.city.toLowerCase().includes(term)) ||
          (property.state && property.state.toLowerCase().includes(term)) ||
          (property.country && property.country.toLowerCase().includes(term)) ||
          getPropertyStatusInfo(property.status).label.toLowerCase().includes(term),
      );
    },
    [getPropertyStatusInfo],
  );

  const filteredProperties = useMemo(
    () => searchProperties(baseServiceProviderProperties, debouncedPropertiesSearch),
    [baseServiceProviderProperties, debouncedPropertiesSearch, searchProperties],
  );

  // Apply sorting with memoization
  const sortedProperties = useMemo(() => {
    if (!propertiesSort) return filteredProperties;

    return [...filteredProperties].sort((a, b) => {
      let aValue: any = a[propertiesSort.key as keyof Property];
      let bValue: any = b[propertiesSort.key as keyof Property];

      // Handle status sorting (by label)
      if (propertiesSort.key === 'status') {
        aValue = getPropertyStatusInfo(aValue).label.toLowerCase();
        bValue = getPropertyStatusInfo(bValue).label.toLowerCase();
      }

      // Handle location sorting (by city, state, country)
      if (propertiesSort.key === 'location') {
        const aLocation = [a.city, a.state, a.country].filter(Boolean).join(', ').toLowerCase();
        const bLocation = [b.city, b.state, b.country].filter(Boolean).join(', ').toLowerCase();
        aValue = aLocation;
        bValue = bLocation;
      }

      // Handle date sorting
      if (propertiesSort.key === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return propertiesSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return propertiesSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProperties, propertiesSort, getPropertyStatusInfo]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedProperties,
    handlePageChange,
    hasPagination,
  } = usePropertyTabPagination({ filteredData: sortedProperties });

  // Table configuration
  const tableConfig: TableConfig<Property> = {
    title: 'Propriedades Atendidas',
    subtitle: `Prestador: ${serviceProvider.name}`,
    count: sortedProperties.length,
    countLabel: 'propriedades',
    columns: [
      {
        key: 'code',
        label: 'Código',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            propertiesSort?.key === 'code' && propertiesSort?.direction === 'asc' ? 'desc' : 'asc';
          onPropertiesSortChange({ key: 'code', direction: newDirection });
        },
        render: (value: string, property: Property) => (
          <button
            onClick={() => handlePropertyClick(property.id)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer font-medium"
          >
            {property.code}
          </button>
        ),
      },
      {
        key: 'name',
        label: 'Nome',
        sortable: true,
        className: 'w-64',
        onSort: () => {
          const newDirection =
            propertiesSort?.key === 'name' && propertiesSort?.direction === 'asc' ? 'desc' : 'asc';
          onPropertiesSortChange({ key: 'name', direction: newDirection });
        },
        render: (value: string, property: Property) => (
          <button
            onClick={() => handlePropertyClick(property.id)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer font-medium text-left"
          >
            {property.name}
          </button>
        ),
      },
      {
        key: 'location',
        label: 'Localização',
        sortable: true,
        className: 'w-48',
        onSort: () => {
          const newDirection =
            propertiesSort?.key === 'location' && propertiesSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onPropertiesSortChange({ key: 'location', direction: newDirection });
        },
        render: (value: any, property: Property) => {
          const cityState = [property.city, property.state].filter(Boolean).join(', ');
          const country = property.country;
          const location =
            cityState && country ? `${cityState} - ${country}` : cityState || country || '-';
          return <div className="text-sm text-gray-900 dark:text-gray-100">{location}</div>;
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-32',
        onSort: () => {
          const newDirection =
            propertiesSort?.key === 'status' && propertiesSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onPropertiesSortChange({ key: 'status', direction: newDirection });
        },
        render: (value: PropertyStatus) => {
          const statusInfo = getPropertyStatusInfo(value);
          return (
            <div className="flex items-center space-x-2">
              <span className="text-sm">{statusInfo.icon}</span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </div>
          );
        },
      },
    ],
    data: paginatedProperties,
    search: {
      placeholder: 'Pesquisar propriedades...',
      value: propertiesSearch,
      onChange: onPropertiesSearchChange,
    },
    ...(hasPagination
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems: sortedProperties.length,
            onPageChange: handlePageChange,
          },
        }
      : {}),
  };

  if (sortedProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-8">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma propriedade encontrada
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Este prestador de serviço ainda não está associado a nenhuma propriedade.
        </p>
      </div>
    );
  }

  return <Table config={tableConfig} />;
}

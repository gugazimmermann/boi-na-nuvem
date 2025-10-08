import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import type { TableConfig } from '~/components/table/types';
import { usePropertyTabPagination } from '../../property/tabs/hooks/usePropertyTabPagination';
import { PROPERTYHASBUYER } from '~/mocks/buyer-mock';
import { PROPERTIES } from '~/mocks/properties-mock';
import { PropertyStatus } from '~/types/property';
import type { Buyer } from '~/types/buyer';
import type { Property } from '~/types/property';

interface BuyerPropertiesTabProps {
  buyer: Buyer;
  propertiesSearch: string;
  propertiesSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedPropertiesSearch: string;
  onPropertiesSearchChange: (value: string) => void;
  onPropertiesSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function BuyerPropertiesTab({
  buyer,
  propertiesSearch,
  propertiesSort,
  debouncedPropertiesSearch,
  onPropertiesSearchChange,
  onPropertiesSortChange,
}: BuyerPropertiesTabProps) {
  const navigate = useNavigate();

  // Handle property navigation
  const handlePropertyClick = useCallback(
    (propertyId: string) => {
      // Store the source page information for back navigation
      sessionStorage.setItem(
        'propertyDetailSource',
        JSON.stringify({
          type: 'buyer',
          id: buyer.id,
          name: buyer.name,
        }),
      );
      navigate(`/cadastros/propriedades/${propertyId}`);
    },
    [navigate, buyer.id, buyer.name],
  );
  // Get properties associated with this buyer
  const buyerProperties = useMemo(() => {
    const propertyIds = PROPERTYHASBUYER.filter((rel) => rel.buyerId === buyer.id).map(
      (rel) => rel.propertyId,
    );

    return PROPERTIES.filter((property) => propertyIds.includes(property.id));
  }, [buyer.id]);

  // Helper function to get property status info
  const getPropertyStatusInfo = useCallback((status: string) => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return { label: 'Ativo', icon: '🟢', color: 'text-green-600' };
      case PropertyStatus.INACTIVE:
        return { label: 'Inativo', icon: '🔴', color: 'text-red-600' };
      case 'maintenance':
        return { label: 'Manutenção', icon: '🟡', color: 'text-yellow-600' };
      default:
        return { label: 'Desconhecido', icon: '⚪', color: 'text-gray-600' };
    }
  }, []);

  // Filter properties based on search term
  const filteredProperties = useMemo(() => {
    if (!debouncedPropertiesSearch.trim()) {
      return buyerProperties;
    }

    const searchTerm = debouncedPropertiesSearch.toLowerCase();
    return buyerProperties.filter((property) => {
      const searchableText = [
        property.name,
        property.code,
        property.city,
        property.state,
        property.country,
        getPropertyStatusInfo(property.status).label,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [buyerProperties, debouncedPropertiesSearch, getPropertyStatusInfo]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    if (!propertiesSort) {
      return filteredProperties;
    }

    return [...filteredProperties].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (propertiesSort.key) {
        case 'code':
          aValue = a.code;
          bValue = b.code;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'location':
          aValue = `${a.city}, ${a.state} - ${a.country}`;
          bValue = `${b.city}, ${b.state} - ${b.country}`;
          break;
        case 'status':
          aValue = getPropertyStatusInfo(a.status).label;
          bValue = getPropertyStatusInfo(b.status).label;
          break;
        case 'createdAt':
          aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, 'pt-BR', {
          sensitivity: 'base',
          numeric: true,
        });
        return propertiesSort.direction === 'asc' ? comparison : -comparison;
      }

      if (aValue < bValue) return propertiesSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return propertiesSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProperties, propertiesSort, getPropertyStatusInfo]);

  // Pagination
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedProperties,
    handlePageChange,
    hasPagination,
  } = usePropertyTabPagination({
    filteredData: sortedProperties,
  });

  // Table configuration
  const tableConfig: TableConfig<Property> = {
    title: 'Propriedades Compradas',
    subtitle: `Comprador: ${buyer.name}`,
    count: sortedProperties.length,
    countLabel: 'propriedades',
    columns: [
      {
        key: 'code',
        label: 'Código',
        sortable: true,
        className: 'w-32',
        onSort: () =>
          onPropertiesSortChange(
            propertiesSort?.key === 'code' && propertiesSort.direction === 'asc'
              ? { key: 'code', direction: 'desc' }
              : { key: 'code', direction: 'asc' },
          ),
        render: (value: any, property: Property) => (
          <button
            onClick={() => handlePropertyClick(property.id)}
            className="font-mono text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer"
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
        onSort: () =>
          onPropertiesSortChange(
            propertiesSort?.key === 'name' && propertiesSort.direction === 'asc'
              ? { key: 'name', direction: 'desc' }
              : { key: 'name', direction: 'asc' },
          ),
        render: (value: any, property: Property) => (
          <button
            onClick={() => handlePropertyClick(property.id)}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer text-left"
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
        onSort: () =>
          onPropertiesSortChange(
            propertiesSort?.key === 'location' && propertiesSort.direction === 'asc'
              ? { key: 'location', direction: 'desc' }
              : { key: 'location', direction: 'asc' },
          ),
        render: (value: any, property: Property) => {
          const cityState = [property.city, property.state].filter(Boolean).join(', ');
          const country = property.country;
          const location =
            cityState && country ? `${cityState} - ${country}` : cityState || country || '-';
          return <span className="text-gray-600 dark:text-gray-400">{location}</span>;
        },
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        className: 'w-32',
        onSort: () =>
          onPropertiesSortChange(
            propertiesSort?.key === 'status' && propertiesSort.direction === 'asc'
              ? { key: 'status', direction: 'desc' }
              : { key: 'status', direction: 'asc' },
          ),
        render: (value: any, property: Property) => {
          const statusInfo = getPropertyStatusInfo(property.status);
          return (
            <span className={`inline-flex items-center gap-1 text-sm ${statusInfo.color}`}>
              <span>{statusInfo.icon}</span>
              <span>{statusInfo.label}</span>
            </span>
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
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
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
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma propriedade encontrada
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {debouncedPropertiesSearch.trim()
            ? 'Nenhuma propriedade corresponde aos critérios de busca.'
            : 'Este comprador ainda não está associado a nenhuma propriedade.'}
        </p>
      </div>
    );
  }

  return <Table config={tableConfig} />;
}

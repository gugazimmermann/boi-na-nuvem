import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import type { TableConfig } from '~/components/table/types';
import { useLocationTabPagination } from '../../location/tabs/hooks/useLocationTabPagination';
import { EMPLOYESS } from '~/mocks/employee-mock';
import { LOCATIONS, LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { PROPERTIES } from '~/mocks/properties-mock';
import {
  ServiceProviderMovimentType,
  type ServiceProviderMoviment,
} from '~/types/service-provider';
import { ResponsibleType, LocationMovimentType, type LocationMoviment } from '~/types/location';
import type { ServiceProvider } from '~/types/service-provider';

interface ServiceProviderMovementsTabProps {
  serviceProvider: ServiceProvider;
  movementsSearch: string;
  movementsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedMovementsSearch: string;
  onMovementsSearchChange: (value: string) => void;
  onMovementsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function ServiceProviderMovementsTab({
  serviceProvider,
  movementsSearch,
  movementsSort,
  debouncedMovementsSearch,
  onMovementsSearchChange,
  onMovementsSortChange,
}: ServiceProviderMovementsTabProps) {
  const navigate = useNavigate();

  // Helper functions for movements
  const getMovementTypeInfo = useCallback((type: ServiceProviderMovimentType) => {
    switch (type) {
      case ServiceProviderMovimentType.SERVICE:
        return {
          label: 'Serviço',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.MAINTENANCE:
        return {
          label: 'Manutenção',
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.CONSULTATION:
        return {
          label: 'Consulta',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.DELIVERY:
        return {
          label: 'Entrega',
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.INSTALLATION:
        return {
          label: 'Instalação',
          color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.REPAIR:
        return {
          label: 'Reparo',
          color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.INSPECTION:
        return {
          label: 'Inspeção',
          color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.TRAINING:
        return {
          label: 'Treinamento',
          color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          ),
        };
      case ServiceProviderMovimentType.OTHER:
        return {
          label: 'Outro',
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      default:
        return {
          label: type,
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
    }
  }, []);

  const getResponsibleInfo = useCallback(
    (movement: ServiceProviderMoviment) => {
      if (movement.responsibleType === ResponsibleType.SERVICE_PROVIDER) {
        return {
          type: 'Prestador de Serviços',
          name: serviceProvider.name,
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        };
      } else if (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) {
        const employee = EMPLOYESS.find((emp) => emp.id === movement.employeeId);
        return {
          type: 'Colaborador',
          name: employee ? employee.name : 'Colaborador não encontrado',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        };
      }
      return {
        type: 'Não informado',
        name: 'Responsável não identificado',
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      };
    },
    [serviceProvider.name],
  );

  const getLocationInfo = useCallback((movement: ServiceProviderMoviment) => {
    if (movement.locationId) {
      const location = LOCATIONS.find((loc) => loc.id === movement.locationId);
      return location ? location.name : 'Localização não encontrada';
    }
    return 'Não especificada';
  }, []);

  const getPropertyInfo = useCallback((movement: ServiceProviderMoviment) => {
    if (movement.propertyId) {
      const property = PROPERTIES.find((prop) => prop.id === movement.propertyId);
      return property ? property.name : 'Propriedade não encontrada';
    }
    return 'Não especificada';
  }, []);

  // Handler to navigate to responsible person details
  const handleResponsibleClick = useCallback(
    (movement: ServiceProviderMoviment) => {
      // Store context that we're coming from service provider movements tab
      sessionStorage.setItem('responsibleFromServiceProvider', 'true');
      sessionStorage.setItem('serviceProviderId', serviceProvider.id);
      sessionStorage.setItem('serviceProviderTab', 'movements');

      if (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) {
        navigate(`/cadastros/colaboradores/${movement.employeeId}`);
      }
    },
    [navigate, serviceProvider.id],
  );

  // Handler to navigate to location details
  const handleLocationClick = useCallback(
    (movement: ServiceProviderMoviment) => {
      if (movement.locationId) {
        // Store context that we're coming from service provider movements tab
        sessionStorage.setItem('locationFromServiceProvider', 'true');
        sessionStorage.setItem('serviceProviderId', serviceProvider.id);
        sessionStorage.setItem('serviceProviderTab', 'movements');

        navigate(`/cadastros/localizacoes/${movement.locationId}`);
      }
    },
    [navigate, serviceProvider.id],
  );

  // Handler to navigate to property details
  const handlePropertyClick = useCallback(
    (movement: ServiceProviderMoviment) => {
      if (movement.propertyId) {
        // Store context that we're coming from service provider movements tab
        sessionStorage.setItem('propertyFromServiceProvider', 'true');
        sessionStorage.setItem('serviceProviderId', serviceProvider.id);
        sessionStorage.setItem('serviceProviderTab', 'movements');

        navigate(`/cadastros/propriedades/${movement.propertyId}`);
      }
    },
    [navigate, serviceProvider.id],
  );

  // Convert LocationMoviment to ServiceProviderMoviment
  const convertLocationMovementToServiceProviderMovement = useCallback(
    (locationMovement: LocationMoviment): ServiceProviderMoviment => {
      // Map LocationMovimentType to ServiceProviderMovimentType
      const typeMapping: Record<string, ServiceProviderMovimentType> = {
        [LocationMovimentType.MAINTENANCE]: ServiceProviderMovimentType.MAINTENANCE,
        [LocationMovimentType.CONSTRUCTION]: ServiceProviderMovimentType.INSTALLATION,
        [LocationMovimentType.EQUIPMENT_INSTALLATION]: ServiceProviderMovimentType.INSTALLATION,
        [LocationMovimentType.SUPPLEMENTATION]: ServiceProviderMovimentType.SERVICE,
        [LocationMovimentType.CLEANING]: ServiceProviderMovimentType.SERVICE,
        [LocationMovimentType.ENTRY]: ServiceProviderMovimentType.DELIVERY,
        [LocationMovimentType.EXIT]: ServiceProviderMovimentType.DELIVERY,
      };

      // Get propertyId from location
      const location = LOCATIONS.find((loc) => loc.id === locationMovement.locationId);
      const propertyId = location?.propertyId;

      return {
        id: locationMovement.id,
        serviceProviderId: locationMovement.serviceProviderId || '',
        type: typeMapping[locationMovement.type] || ServiceProviderMovimentType.OTHER,
        description: locationMovement.description,
        locationId: locationMovement.locationId,
        propertyId: propertyId,
        responsibleType: locationMovement.responsibleType,
        employeeId: locationMovement.employeeId ?? undefined,
        createdAt: locationMovement.createdAt,
        updatedAt: locationMovement.createdAt, // Using createdAt as updatedAt since it's not available
      };
    },
    [],
  );

  // Filter movements for this specific service provider
  const baseServiceProviderMovements = useMemo(() => {
    return LOCATION_MOVEMENTS.filter(
      (movement) => movement.serviceProviderId === serviceProvider.id,
    ).map(convertLocationMovementToServiceProviderMovement);
  }, [serviceProvider.id, convertLocationMovementToServiceProviderMovement]);

  // Memoized search function
  const searchMovements = useCallback(
    (movements: ServiceProviderMoviment[], searchTerm: string) => {
      if (!searchTerm.trim()) return movements;

      const term = searchTerm.toLowerCase().trim();
      return movements.filter((movement) => {
        const movementType = getMovementTypeInfo(movement.type).label.toLowerCase();
        const description = (movement.description || '').toLowerCase();
        const responsibleInfo = getResponsibleInfo(movement);
        const responsibleName = responsibleInfo.name.toLowerCase();
        const locationName = getLocationInfo(movement).toLowerCase();
        const propertyName = getPropertyInfo(movement).toLowerCase();

        return (
          movementType.includes(term) ||
          description.includes(term) ||
          responsibleName.includes(term) ||
          locationName.includes(term) ||
          propertyName.includes(term)
        );
      });
    },
    [getMovementTypeInfo, getResponsibleInfo, getLocationInfo, getPropertyInfo],
  );

  // Apply search filter with debounced search
  const filteredServiceProviderMovements = useMemo(
    () => searchMovements(baseServiceProviderMovements, debouncedMovementsSearch),
    [baseServiceProviderMovements, debouncedMovementsSearch, searchMovements],
  );

  // Apply sorting with memoization
  const sortedServiceProviderMovements = useMemo(() => {
    if (!movementsSort) {
      // Default sort by date (newest first)
      return [...filteredServiceProviderMovements].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return [...filteredServiceProviderMovements].sort((a, b) => {
      let aValue: any = a[movementsSort.key as keyof ServiceProviderMoviment];
      let bValue: any = b[movementsSort.key as keyof ServiceProviderMoviment];

      // Handle date sorting
      if (movementsSort.key === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle responsible sorting (by name)
      if (movementsSort.key === 'responsibleType') {
        const aResponsible = getResponsibleInfo(a);
        const bResponsible = getResponsibleInfo(b);
        aValue = aResponsible.name.toLowerCase();
        bValue = bResponsible.name.toLowerCase();
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return movementsSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return movementsSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredServiceProviderMovements, movementsSort, getResponsibleInfo]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedMovements,
    handlePageChange,
    hasPagination,
  } = useLocationTabPagination({ filteredData: sortedServiceProviderMovements });

  // Table configuration
  const tableConfig: TableConfig<ServiceProviderMoviment> = {
    title: 'Movimentações do Prestador de Serviço',
    subtitle: undefined,
    count: sortedServiceProviderMovements.length,
    countLabel: 'movimentações',
    columns: [
      {
        key: 'createdAt',
        label: 'Data',
        sortable: true,
        className: 'w-40',
        onSort: () => {
          const newDirection =
            movementsSort?.key === 'createdAt' && movementsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onMovementsSortChange({ key: 'createdAt', direction: newDirection });
        },
        render: (value: string) => (
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {new Date(value).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        ),
      },
      {
        key: 'type',
        label: 'Tipo',
        sortable: true,
        className: 'w-40',
        onSort: () => {
          const newDirection =
            movementsSort?.key === 'type' && movementsSort?.direction === 'asc' ? 'desc' : 'asc';
          onMovementsSortChange({ key: 'type', direction: newDirection });
        },
        render: (value: ServiceProviderMovimentType) => {
          const typeInfo = getMovementTypeInfo(value);
          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
          );
        },
      },
      {
        key: 'description',
        label: 'Descrição',
        sortable: false,
        className: 'w-96',
        render: (value: string) => (
          <div className="text-sm text-gray-900 dark:text-gray-100">{value || 'Sem descrição'}</div>
        ),
      },
      {
        key: 'locationId',
        label: 'Localização',
        sortable: false,
        className: 'w-48',
        render: (value: string, movement: ServiceProviderMoviment) => {
          const locationName = getLocationInfo(movement);
          const isClickable = !!movement.locationId;

          return (
            <div
              className={`text-sm ${
                isClickable
                  ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
              onClick={isClickable ? () => handleLocationClick(movement) : undefined}
            >
              {locationName}
            </div>
          );
        },
      },
      {
        key: 'propertyId',
        label: 'Propriedade',
        sortable: false,
        className: 'w-48',
        render: (value: string, movement: ServiceProviderMoviment) => {
          const propertyName = getPropertyInfo(movement);
          const isClickable = !!movement.propertyId;

          return (
            <div
              className={`text-sm ${
                isClickable
                  ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
              onClick={isClickable ? () => handlePropertyClick(movement) : undefined}
            >
              {propertyName}
            </div>
          );
        },
      },
      {
        key: 'responsibleType',
        label: 'Responsável',
        sortable: true,
        className: 'w-64',
        onSort: () => {
          const newDirection =
            movementsSort?.key === 'responsibleType' && movementsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onMovementsSortChange({ key: 'responsibleType', direction: newDirection });
        },
        render: (value: string, movement: ServiceProviderMoviment) => {
          const responsibleInfo = getResponsibleInfo(movement);
          const isClickable =
            movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId;

          return (
            <div className="text-sm">
              <div
                className={`font-medium mb-1 ${
                  isClickable
                    ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer transition-colors'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
                onClick={isClickable ? () => handleResponsibleClick(movement) : undefined}
              >
                {responsibleInfo.name}
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${responsibleInfo.color}`}
                >
                  {responsibleInfo.type}
                </span>
              </div>
            </div>
          );
        },
      },
    ],
    data: paginatedMovements,
    search: {
      placeholder: 'Pesquisar movimentações...',
      value: movementsSearch,
      onChange: onMovementsSearchChange,
    },
    ...(hasPagination
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems: sortedServiceProviderMovements.length,
            onPageChange: handlePageChange,
          },
        }
      : {}),
  };

  if (sortedServiceProviderMovements.length === 0) {
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
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma movimentação encontrada
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este prestador de serviço ainda não possui movimentações registradas.
        </p>
      </div>
    );
  }

  return <Table config={tableConfig} />;
}

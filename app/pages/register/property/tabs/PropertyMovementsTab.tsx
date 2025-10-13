import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import type { TableConfig } from '~/components/table/types';
import { usePropertyTabPagination } from './hooks/usePropertyTabPagination';
// Removed mock imports - now using data from API
import {
  LocationMovimentType,
  ResponsibleType,
  type Location,
  type LocationMoviment,
} from '~/types/location';
import type { Property } from '~/types/property';

interface PropertyMovementsTabProps {
  property: Property;
  movementsSearch: string;
  movementsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedMovementsSearch: string;
  onMovementsSearchChange: (value: string) => void;
  onMovementsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function PropertyMovementsTab({
  property,
  movementsSearch,
  movementsSort,
  debouncedMovementsSearch,
  onMovementsSearchChange,
  onMovementsSortChange,
}: PropertyMovementsTabProps) {
  const navigate = useNavigate();

  // Handler to navigate to location details with movements tab active
  const handleLocationClick = useCallback(
    (locationId: string) => {
      // Store context that we're coming from property movements tab
      sessionStorage.setItem('locationFromProperty', 'true');
      sessionStorage.setItem('propertyId', property.id);
      sessionStorage.setItem('propertyTab', 'movements');
      // Store the active tab in sessionStorage so the location detail page opens with movements tab
      sessionStorage.setItem('locationDetailActiveTab', 'movements');
      navigate(`/sistema/cadastros/localizacoes/${locationId}`);
    },
    [navigate, property.id],
  );

  // ResponsibleType is already normalized in mocks/types; compare directly to enum

  // Handler to navigate to responsible person details
  const handleResponsibleClick = useCallback(
    (movement: LocationMoviment) => {
      // Store context that we're coming from property movements tab
      sessionStorage.setItem('responsibleFromProperty', 'true');
      sessionStorage.setItem('propertyId', property.id);
      sessionStorage.setItem('propertyTab', 'movements');

      if (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) {
        navigate(`/sistema/cadastros/colaboradores/${movement.employeeId}`);
      } else if (
        movement.responsibleType === ResponsibleType.SERVICE_PROVIDER &&
        movement.serviceProviderId
      ) {
        navigate(`/sistema/cadastros/prestadores-servico/${movement.serviceProviderId}`);
      }
    },
    [navigate, property.id],
  );

  // Helper functions for location data
  const getLocationName = useCallback((locationId: string, propertyLocations: Location[]) => {
    const location = propertyLocations.find((loc) => loc.id === locationId);
    return location ? location.name : 'Localização não encontrada';
  }, []);

  const getLocationCode = useCallback((locationId: string, propertyLocations: Location[]) => {
    const location = propertyLocations.find((loc) => loc.id === locationId);
    return location ? location.code : 'N/A';
  }, []);

  // Helper functions for movements
  const getMovementTypeInfo = useCallback((type: LocationMovimentType) => {
    switch (type) {
      case LocationMovimentType.SUPPLEMENTATION:
        return {
          label: 'Suplementação',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        };
      case LocationMovimentType.MAINTENANCE:
        return {
          label: 'Manutenção',
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        };
      case LocationMovimentType.CLEANING:
        return {
          label: 'Limpeza',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        };
      case LocationMovimentType.CONSTRUCTION:
        return {
          label: 'Construção',
          color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        };
      case LocationMovimentType.EQUIPMENT_INSTALLATION:
        return {
          label: 'Instalação',
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        };
      default:
        return {
          label: type,
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
    }
  }, []);

  const getResponsibleInfo = useCallback((movement: LocationMoviment) => {
    if (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) {
      const employee = (property.employees || []).find((emp) => emp.id === movement.employeeId);
      return {
        type: 'Colaborador',
        name: employee ? employee.name : 'Colaborador não encontrado',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      };
    } else if (
      movement.responsibleType === ResponsibleType.SERVICE_PROVIDER &&
      movement.serviceProviderId
    ) {
      // Note: Service providers are not included in property data yet
      // This would need to be added to the backend response
      return {
        type: 'Prestador de Serviços',
        name: 'Prestador não encontrado',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      };
    }
    return {
      type: 'Não informado',
      name: 'Responsável não identificado',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
  }, []);

  // Use locations from API data
  const propertyLocations = useMemo(
    () => property.locations || [],
    [property.locations],
  );
  const propertyLocationIds = useMemo(
    () => propertyLocations.map((loc) => loc.id),
    [propertyLocations],
  );

  // Filter movements for this property's locations, excluding ENTRY and EXIT, and get only the latest movement per location
  const basePropertyMovements = useMemo(() => {
    // First, filter movements for this property's locations, exclude ENTRY/EXIT, and exclude deleted ones
    const propertyMovements = (property.locationMovements || []).filter(
      (movement) =>
        propertyLocationIds.includes(movement.locationId) &&
        movement.type !== LocationMovimentType.ENTRY &&
        movement.type !== LocationMovimentType.EXIT &&
        !movement.deletedAt,
    );

    // Group by locationId and get the latest movement for each location
    const latestMovementsByLocation = new Map<string, LocationMoviment>();

    propertyMovements.forEach((movement) => {
      const existingMovement = latestMovementsByLocation.get(movement.locationId);
      if (
        !existingMovement ||
        new Date(movement.createdAt) > new Date(existingMovement.createdAt)
      ) {
        latestMovementsByLocation.set(movement.locationId, movement);
      }
    });

    return Array.from(latestMovementsByLocation.values());
  }, [propertyLocationIds]);

  // Memoized search function
  const searchMovements = useCallback(
    (movements: LocationMoviment[], searchTerm: string, propertyLocations: Location[]) => {
      if (!searchTerm.trim()) return movements;

      const term = searchTerm.toLowerCase().trim();
      return movements.filter((movement) => {
        const locationName = getLocationName(movement.locationId, propertyLocations).toLowerCase();
        const locationCode = getLocationCode(movement.locationId, propertyLocations).toLowerCase();
        const movementType = getMovementTypeInfo(movement.type).label.toLowerCase();
        const description = (movement.description || '').toLowerCase();
        const responsibleInfo = getResponsibleInfo(movement);
        const responsibleName = responsibleInfo.name.toLowerCase();

        return (
          locationName.includes(term) ||
          locationCode.includes(term) ||
          movementType.includes(term) ||
          description.includes(term) ||
          responsibleName.includes(term)
        );
      });
    },
    [getLocationName, getLocationCode, getMovementTypeInfo, getResponsibleInfo],
  );

  // Apply search filter with debounced search
  const filteredPropertyMovements = useMemo(
    () => searchMovements(basePropertyMovements, debouncedMovementsSearch, propertyLocations),
    [basePropertyMovements, debouncedMovementsSearch, propertyLocations, searchMovements],
  );

  // Apply sorting with memoization
  const sortedPropertyMovements = useMemo(() => {
    if (!movementsSort) {
      // Default sort by date (newest first)
      return [...filteredPropertyMovements].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return [...filteredPropertyMovements].sort((a, b) => {
      let aValue: any = a[movementsSort.key as keyof LocationMoviment];
      let bValue: any = b[movementsSort.key as keyof LocationMoviment];

      // Handle date sorting
      if (movementsSort.key === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle location sorting (by name)
      if (movementsSort.key === 'locationId') {
        aValue = getLocationName(aValue, propertyLocations).toLowerCase();
        bValue = getLocationName(bValue, propertyLocations).toLowerCase();
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
  }, [
    filteredPropertyMovements,
    movementsSort,
    propertyLocations,
    getLocationName,
    getResponsibleInfo,
  ]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedMovements,
    handlePageChange,
    hasPagination,
  } = usePropertyTabPagination({ filteredData: sortedPropertyMovements });

  // Table configuration
  const tableConfig: TableConfig<LocationMoviment> = {
    title: 'Movimentações da Propriedade',
    subtitle: `Propriedade: ${property.name}`,
    count: sortedPropertyMovements.length,
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
        render: (value: LocationMovimentType) => {
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
        key: 'locationId',
        label: 'Localização',
        sortable: true,
        className: 'w-64',
        onSort: () => {
          const newDirection =
            movementsSort?.key === 'locationId' && movementsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onMovementsSortChange({ key: 'locationId', direction: newDirection });
        },
        render: (value: string, movement: LocationMoviment) => (
          <div className="text-sm">
            <button
              onClick={() => handleLocationClick(value)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline transition-colors text-left cursor-pointer"
            >
              {getLocationName(value, propertyLocations)}
            </button>
            <div className="text-gray-500 dark:text-gray-400">
              {getLocationCode(value, propertyLocations)}
            </div>
          </div>
        ),
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
        render: (value: string, movement: LocationMoviment) => {
          const responsibleInfo = getResponsibleInfo(movement);
          const hasValidId =
            (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) ||
            (movement.responsibleType === ResponsibleType.SERVICE_PROVIDER &&
              movement.serviceProviderId);

          return (
            <div className="text-sm">
              <div className="mb-1">
                {hasValidId ? (
                  <button
                    onClick={() => handleResponsibleClick(movement)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline transition-colors text-left cursor-pointer"
                  >
                    {responsibleInfo.name}
                  </button>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {responsibleInfo.name}
                  </span>
                )}
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
          totalItems: sortedPropertyMovements.length,
          onPageChange: handlePageChange,
        },
      }
      : {}),
  };

  if (sortedPropertyMovements.length === 0) {
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
        <p className="text-gray-600 dark:text-gray-400">
          Esta propriedade ainda não possui movimentações registradas (excluindo entradas e saídas).
        </p>
      </div>
    );
  }

  return <Table config={tableConfig} />;
}

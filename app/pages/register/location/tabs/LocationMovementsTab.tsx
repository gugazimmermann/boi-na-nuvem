import { useMemo, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Table } from '~/components/table';
import { Button } from '~/components/button';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '~/components/drawer';
import { ConfirmationModal } from '~/components/modal';
import type { TableConfig } from '~/components/table/types';
import { useLocationTabPagination } from './hooks/useLocationTabPagination';
import { LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { EMPLOYESS } from '~/mocks/employee-mock';
import { SERVICEPROVIDERS } from '~/mocks/service-provider-mock';
import { LocationMovimentType, ResponsibleType, type LocationMoviment } from '~/types/location';
import type { Location } from '~/types/location';
import {
  AddMovementForm,
  type MovementFormData,
  type AddMovementFormRef,
} from '../components/AddMovementForm';
import { MovementActions } from '../components/MovementActions';

interface LocationMovementsTabProps {
  location: Location;
  movementsSearch: string;
  movementsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedMovementsSearch: string;
  onMovementsSearchChange: (value: string) => void;
  onMovementsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function LocationMovementsTab({
  location,
  movementsSearch,
  movementsSort,
  debouncedMovementsSearch,
  onMovementsSearchChange,
  onMovementsSortChange,
}: LocationMovementsTabProps) {
  const navigate = useNavigate();

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMovement, setEditingMovement] = useState<LocationMoviment | null>(null);
  const formRef = useRef<AddMovementFormRef | null>(null);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movementToDelete, setMovementToDelete] = useState<LocationMoviment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ResponsibleType is normalized in mocks/types; compare directly to enum

  // Drawer control functions
  const handleOpenDrawer = useCallback(() => {
    setEditingMovement(null); // Clear editing state when opening for new movement
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setEditingMovement(null);
    // Reset form when drawer closes
    if (formRef.current) {
      formRef.current.resetForm();
    }
  }, []);

  const handleSubmitMovement = useCallback(
    async (formData: MovementFormData) => {
      try {
        setIsSubmitting(true);

        // Here you would typically call an API to create the movement
        // For now, we'll just simulate the API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Creating movement:', {
          ...formData,
          locationId: location.id,
          createdAt: new Date().toISOString(),
        });

        // Close drawer and reset form
        setIsDrawerOpen(false);

        // You might want to refresh the movements list here
        // onRefreshMovements?.();
      } catch (error) {
        console.error('Error creating movement:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [location.id],
  );

  // Movement actions
  const handleEditMovement = useCallback((movement: LocationMoviment) => {
    setEditingMovement(movement);
    setIsDrawerOpen(true);

    // Fill form with movement data after drawer opens
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.fillFormWithMovement(movement);
      }
    }, 100);
  }, []);

  const handleDeleteMovement = useCallback((movement: LocationMoviment) => {
    setMovementToDelete(movement);
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!movementToDelete) return;

    try {
      setIsDeleting(true);

      // Here you would typically call an API to delete the movement
      // For now, we'll just simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Deleting movement:', movementToDelete);

      // Close modal and reset state
      setIsDeleteModalOpen(false);
      setMovementToDelete(null);

      // You might want to refresh the movements list here
      // onRefreshMovements?.();
    } catch (error) {
      console.error('Error deleting movement:', error);
    } finally {
      setIsDeleting(false);
    }
  }, [movementToDelete]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setMovementToDelete(null);
  }, []);

  // Handler to navigate to responsible person details
  const handleResponsibleClick = useCallback(
    (movement: LocationMoviment) => {
      // Store context that we're coming from location movements tab
      sessionStorage.setItem('responsibleFromLocation', 'true');
      sessionStorage.setItem('locationId', location.id);
      sessionStorage.setItem('locationTab', 'movements');

      if (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) {
        navigate(`/cadastros/colaboradores/${movement.employeeId}`);
      } else if (
        movement.responsibleType === ResponsibleType.SERVICE_PROVIDER &&
        movement.serviceProviderId
      ) {
        navigate(`/cadastros/prestadores-servico/${movement.serviceProviderId}`);
      }
    },
    [navigate, location.id],
  );

  // Helper functions for movements
  const getMovementTypeInfo = useCallback((type: LocationMovimentType) => {
    switch (type) {
      case LocationMovimentType.ENTRY:
        return {
          label: 'Entrada',
          color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        };
      case LocationMovimentType.EXIT:
        return {
          label: 'Saída',
          color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
      case LocationMovimentType.SUPPLEMENTATION:
        return {
          label: 'Suplementação',
          color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400',
        };
      case LocationMovimentType.MAINTENANCE:
        return {
          label: 'Manutenção',
          color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
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
          color: 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300',
        };
    }
  }, []);

  const getResponsibleInfo = useCallback((movement: LocationMoviment) => {
    if (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) {
      const employee = EMPLOYESS.find((emp) => emp.id === movement.employeeId);
      return {
        type: 'Colaborador',
        name: employee ? employee.name : 'Colaborador não encontrado',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      };
    } else if (
      movement.responsibleType === ResponsibleType.SERVICE_PROVIDER &&
      movement.serviceProviderId
    ) {
      const serviceProvider = SERVICEPROVIDERS.find((sp) => sp.id === movement.serviceProviderId);
      return {
        type: 'Prestador de Serviços',
        name: serviceProvider ? serviceProvider.name : 'Prestador não encontrado',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      };
    }
    return {
      type: 'Não informado',
      name: 'Responsável não identificado',
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
  }, []);

  // Filter movements for this specific location and exclude ENTRY and EXIT types
  const baseLocationMovements = useMemo(
    () =>
      LOCATION_MOVEMENTS.filter(
        (movement) =>
          movement.locationId === location.id &&
          movement.type !== LocationMovimentType.ENTRY &&
          movement.type !== LocationMovimentType.EXIT,
      ),
    [location.id],
  );

  // Memoized search function
  const searchMovements = useCallback(
    (movements: LocationMoviment[], searchTerm: string) => {
      if (!searchTerm.trim()) return movements;

      const term = searchTerm.toLowerCase().trim();
      return movements.filter((movement) => {
        const movementType = getMovementTypeInfo(movement.type).label.toLowerCase();
        const description = (movement.description || '').toLowerCase();
        const responsibleInfo = getResponsibleInfo(movement);
        const responsibleName = responsibleInfo.name.toLowerCase();

        return (
          movementType.includes(term) ||
          description.includes(term) ||
          responsibleName.includes(term)
        );
      });
    },
    [getMovementTypeInfo, getResponsibleInfo],
  );

  // Apply search filter with debounced search
  const filteredLocationMovements = useMemo(
    () => searchMovements(baseLocationMovements, debouncedMovementsSearch),
    [baseLocationMovements, debouncedMovementsSearch, searchMovements],
  );

  // Apply sorting with memoization
  const sortedLocationMovements = useMemo(() => {
    if (!movementsSort) {
      // Default sort by date (newest first)
      return [...filteredLocationMovements].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return [...filteredLocationMovements].sort((a, b) => {
      let aValue: any = a[movementsSort.key as keyof LocationMoviment];
      let bValue: any = b[movementsSort.key as keyof LocationMoviment];

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
  }, [filteredLocationMovements, movementsSort, getResponsibleInfo]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedMovements,
    handlePageChange,
    hasPagination,
  } = useLocationTabPagination({ filteredData: sortedLocationMovements });

  // Table configuration
  const tableConfig: TableConfig<LocationMoviment> = {
    title: 'Movimentações da Localização',
    subtitle: undefined,
    count: sortedLocationMovements.length,
    countLabel: 'movimentações',
    actions: {
      add: {
        label: 'Adicionar Movimentação',
        onClick: handleOpenDrawer,
      },
    },
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
          const isClickable =
            (movement.responsibleType === ResponsibleType.EMPLOYEE && movement.employeeId) ||
            (movement.responsibleType === ResponsibleType.SERVICE_PROVIDER &&
              movement.serviceProviderId);

          return (
            <div className="text-sm">
              <div
                className={`font-medium mb-1 ${isClickable
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
      {
        key: 'actions',
        label: 'Ações',
        sortable: false,
        className: 'w-48',
        render: (value: any, movement: LocationMoviment) => (
          <MovementActions
            movement={movement}
            onEdit={handleEditMovement}
            onDelete={handleDeleteMovement}
          />
        ),
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
          totalItems: sortedLocationMovements.length,
          onPageChange: handlePageChange,
        },
      }
      : {}),
  };

  if (sortedLocationMovements.length === 0) {
    return (
      <>
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
            Esta localização ainda não possui movimentações registradas.
          </p>
          <Button
            onClick={handleOpenDrawer}
            config={{
              variant: 'primary',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              ),
            }}
          >
            Adicionar Primeira Movimentação
          </Button>
        </div>

        {/* Add Movement Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          config={{ position: 'right', size: 'md' }}
          data-testid="add-movement-drawer"
        >
          <DrawerHeader title="Adicionar Movimentação" onClose={handleCloseDrawer} />
          <DrawerBody>
            <AddMovementForm
              ref={formRef}
              location={location}
              onSubmit={handleSubmitMovement}
              editingMovement={null}
              allowedTypes={[
                LocationMovimentType.SUPPLEMENTATION,
                LocationMovimentType.MAINTENANCE,
                LocationMovimentType.CLEANING,
                LocationMovimentType.CONSTRUCTION,
                LocationMovimentType.EQUIPMENT_INSTALLATION,
              ]}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={handleCloseDrawer}
              config={{
                type: 'button',
                variant: 'secondary',
                disabled: isSubmitting,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => formRef.current?.submitForm()}
              config={{
                type: 'button',
                variant: 'primary',
                loading: isSubmitting,
              }}
            >
              Salvar
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Table config={tableConfig} />

      {/* Add Movement Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        config={{ position: 'right', size: 'md' }}
        data-testid="add-movement-drawer"
      >
        <DrawerHeader
          title={editingMovement ? 'Editar Movimentação' : 'Adicionar Movimentação'}
          onClose={handleCloseDrawer}
        />
        <DrawerBody>
          <AddMovementForm
            ref={formRef}
            location={location}
            onSubmit={handleSubmitMovement}
            editingMovement={editingMovement}
            allowedTypes={[
              LocationMovimentType.SUPPLEMENTATION,
              LocationMovimentType.MAINTENANCE,
              LocationMovimentType.CLEANING,
              LocationMovimentType.CONSTRUCTION,
              LocationMovimentType.EQUIPMENT_INSTALLATION,
            ]}
          />
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={handleCloseDrawer}
            config={{
              type: 'button',
              variant: 'secondary',
              disabled: isSubmitting,
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => formRef.current?.submitForm()}
            config={{
              type: 'button',
              variant: 'primary',
              loading: isSubmitting,
            }}
          >
            {editingMovement ? 'Atualizar' : 'Salvar'}
          </Button>
        </DrawerFooter>
      </Drawer>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Remover Movimentação"
        message={
          movementToDelete
            ? `Tem certeza que deseja remover a movimentação "${getMovementTypeInfo(movementToDelete.type).label}"? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmText="Remover"
        cancelText="Cancelar"
        variant="error"
        loading={isDeleting}
        data-testid="delete-movement-modal"
      />
    </>
  );
}

import { useMemo, useCallback, useState, useRef } from 'react';
import { Table } from '~/components/table';
import { Button } from '~/components/button';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '~/components/drawer';
import { ConfirmationModal } from '~/components/modal';
import type { TableConfig } from '~/components/table/types';
import { useLocationTabPagination } from './hooks/useLocationTabPagination';
import { LOCATION_OBSERVATIONS } from '~/mocks/locations-mock';
import type { LocationObservation } from '~/types/location';
import type { Location } from '~/types/location';
import {
  AddObservationForm,
  type ObservationFormData,
  type AddObservationFormRef,
} from '../components/AddObservationForm';
import { ObservationActions } from '../components/ObservationActions';

interface LocationObservationsTabProps {
  location: Location;
  observationsSearch: string;
  observationsSort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedObservationsSearch: string;
  onObservationsSearchChange: (value: string) => void;
  onObservationsSortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function LocationObservationsTab({
  location,
  observationsSearch,
  observationsSort,
  debouncedObservationsSearch,
  onObservationsSearchChange,
  onObservationsSortChange,
}: LocationObservationsTabProps) {
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingObservation, setEditingObservation] = useState<LocationObservation | null>(null);
  const formRef = useRef<AddObservationFormRef | null>(null);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [observationToDelete, setObservationToDelete] = useState<LocationObservation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Drawer control functions
  const handleOpenDrawer = useCallback(() => {
    setEditingObservation(null); // Clear editing state when opening for new observation
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setEditingObservation(null);
    // Reset form when drawer closes
    if (formRef.current) {
      formRef.current.resetForm();
    }
  }, []);

  const handleSubmitObservation = useCallback(
    async (formData: ObservationFormData) => {
      try {
        setIsSubmitting(true);

        // Here you would typically call an API to create the observation
        // For now, we'll just simulate the API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Creating observation:', {
          ...formData,
          locationId: location.id,
          createdAt: new Date().toISOString(),
        });

        // Close drawer and reset form
        setIsDrawerOpen(false);

        // You might want to refresh the observations list here
        // onRefreshObservations?.();
      } catch (error) {
        console.error('Error creating observation:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [location.id],
  );

  // Observation actions
  const handleEditObservation = useCallback((observation: LocationObservation) => {
    setEditingObservation(observation);
    setIsDrawerOpen(true);

    // Fill form with observation data after drawer opens
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.fillFormWithObservation(observation);
      }
    }, 100);
  }, []);

  const handleDeleteObservation = useCallback((observation: LocationObservation) => {
    setObservationToDelete(observation);
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!observationToDelete) return;

    try {
      setIsDeleting(true);

      // Here you would typically call an API to delete the observation
      // For now, we'll just simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Deleting observation:', observationToDelete);

      // Close modal and reset state
      setIsDeleteModalOpen(false);
      setObservationToDelete(null);

      // You might want to refresh the observations list here
      // onRefreshObservations?.();
    } catch (error) {
      console.error('Error deleting observation:', error);
    } finally {
      setIsDeleting(false);
    }
  }, [observationToDelete]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setObservationToDelete(null);
  }, []);
  // Filter observations for this specific location
  const baseLocationObservations = useMemo(
    () => LOCATION_OBSERVATIONS.filter((observation) => observation.locationId === location.id),
    [location.id],
  );

  // Memoized search function
  const searchObservations = useCallback(
    (observations: LocationObservation[], searchTerm: string) => {
      if (!searchTerm.trim()) return observations;

      const term = searchTerm.toLowerCase().trim();
      return observations.filter((observation) => {
        const observationText = observation.observation.toLowerCase();
        return observationText.includes(term);
      });
    },
    [],
  );

  // Apply search filter with debounced search
  const filteredLocationObservations = useMemo(
    () => searchObservations(baseLocationObservations, debouncedObservationsSearch),
    [baseLocationObservations, debouncedObservationsSearch, searchObservations],
  );

  // Apply sorting with memoization
  const sortedLocationObservations = useMemo(() => {
    if (!observationsSort) {
      // Default sort by date (newest first)
      return [...filteredLocationObservations].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return [...filteredLocationObservations].sort((a, b) => {
      let aValue: any = a[observationsSort.key as keyof LocationObservation];
      let bValue: any = b[observationsSort.key as keyof LocationObservation];

      // Handle date sorting
      if (observationsSort.key === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return observationsSort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return observationsSort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredLocationObservations, observationsSort]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedObservations,
    handlePageChange,
    hasPagination,
  } = useLocationTabPagination({ filteredData: sortedLocationObservations });

  // Table configuration
  const tableConfig: TableConfig<LocationObservation> = {
    title: 'Observações da Localização',
    subtitle: undefined,
    count: sortedLocationObservations.length,
    countLabel: 'observações',
    actions: {
      add: {
        label: 'Adicionar Observação',
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
            observationsSort?.key === 'createdAt' && observationsSort?.direction === 'asc'
              ? 'desc'
              : 'asc';
          onObservationsSortChange({ key: 'createdAt', direction: newDirection });
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
        key: 'observation',
        label: 'Observação',
        sortable: false,
        className: 'w-full',
        render: (value: string) => (
          <div className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {value}
          </div>
        ),
      },
      {
        key: 'actions',
        label: 'Ações',
        sortable: false,
        className: 'w-48',
        render: (value: any, observation: LocationObservation) => (
          <ObservationActions
            observation={observation}
            onEdit={handleEditObservation}
            onDelete={handleDeleteObservation}
          />
        ),
      },
    ],
    data: paginatedObservations,
    search: {
      placeholder: 'Pesquisar observações...',
      value: observationsSearch,
      onChange: onObservationsSearchChange,
    },
    ...(hasPagination
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems: sortedLocationObservations.length,
            onPageChange: handlePageChange,
          },
        }
      : {}),
  };

  if (sortedLocationObservations.length === 0) {
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nenhuma observação encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Esta localização ainda não possui observações registradas.
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
            Adicionar Primeira Observação
          </Button>
        </div>

        {/* Add Observation Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          config={{ position: 'right', size: 'md' }}
          data-testid="add-observation-drawer"
        >
          <DrawerHeader title="Adicionar Observação" onClose={handleCloseDrawer} />
          <DrawerBody>
            <AddObservationForm
              ref={formRef}
              location={location}
              onSubmit={handleSubmitObservation}
              editingObservation={null}
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

      {/* Add Observation Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        config={{ position: 'right', size: 'md' }}
        data-testid="add-observation-drawer"
      >
        <DrawerHeader
          title={editingObservation ? 'Editar Observação' : 'Adicionar Observação'}
          onClose={handleCloseDrawer}
        />
        <DrawerBody>
          <AddObservationForm
            ref={formRef}
            location={location}
            onSubmit={handleSubmitObservation}
            editingObservation={editingObservation}
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
            {editingObservation ? 'Atualizar' : 'Salvar'}
          </Button>
        </DrawerFooter>
      </Drawer>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Remover Observação"
        message={
          observationToDelete
            ? `Tem certeza que deseja remover esta observação? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmText="Remover"
        cancelText="Cancelar"
        variant="error"
        loading={isDeleting}
        data-testid="delete-observation-modal"
      />
    </>
  );
}

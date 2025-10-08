import { useMemo, useCallback, useState, useRef } from 'react';
import { Table } from '~/components/table';
import { Button } from '~/components/button';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '~/components/drawer';
import { ConfirmationModal } from '~/components/modal';
import type { TableConfig } from '~/components/table/types';
import { useLocationTabPagination } from './hooks/useLocationTabPagination';
import { LOCATION_QUALITIES } from '~/mocks/locations-mock';
import { LocationQualityType, type LocationQuality } from '~/types/location';
import type { Location } from '~/types/location';
import { QualityActions } from '../components/QualityActions';
import {
  AddQualityForm,
  type QualityFormData,
  type AddQualityFormRef,
} from '../components/AddQualityForm';

interface LocationQualityTabProps {
  location: Location;
  qualitySearch: string;
  qualitySort: { key: string; direction: 'asc' | 'desc' } | null;
  debouncedQualitySearch: string;
  onQualitySearchChange: (value: string) => void;
  onQualitySortChange: (sort: { key: string; direction: 'asc' | 'desc' } | null) => void;
}

export function LocationQualityTab({
  location,
  qualitySearch,
  qualitySort,
  debouncedQualitySearch,
  onQualitySearchChange,
  onQualitySortChange,
}: LocationQualityTabProps) {
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingQuality, setEditingQuality] = useState<LocationQuality | null>(null);
  const formRef = useRef<AddQualityFormRef | null>(null);

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [qualityToDelete, setQualityToDelete] = useState<LocationQuality | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get quality records for this location
  const qualityRecords = useMemo(() => {
    if (!LOCATION_QUALITIES) return [];
    const filtered = LOCATION_QUALITIES.filter(
      (quality) => quality.locationId === location.id && !quality.deletedAt,
    );
    console.log('Location ID:', location.id);
    console.log('All quality records:', LOCATION_QUALITIES.length);
    console.log('Filtered quality records for location:', filtered.length);
    console.log('Filtered records:', filtered);
    return filtered;
  }, [location.id]);

  // Filter and sort quality records
  const filteredAndSortedQualities = useMemo(() => {
    if (!qualityRecords) return [];
    let filtered = qualityRecords;

    // Apply search filter
    if (debouncedQualitySearch) {
      const searchLower = debouncedQualitySearch.toLowerCase();
      filtered = filtered.filter((quality) => {
        const qualityText = quality.quality.toLowerCase();
        const dateText = new Date(quality.createdAt).toLocaleDateString('pt-BR');
        return qualityText.includes(searchLower) || dateText.includes(searchLower);
      });
    }

    // Apply sorting
    if (qualitySort) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (qualitySort.key) {
          case 'quality':
            aValue = a.quality;
            bValue = b.quality;
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return qualitySort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return qualitySort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    console.log('Final filtered and sorted qualities:', filtered);
    return filtered;
  }, [qualityRecords, debouncedQualitySearch, qualitySort]);

  // Pagination hook
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedData: paginatedQualities,
    handlePageChange,
    hasPagination,
  } = useLocationTabPagination({ filteredData: filteredAndSortedQualities });

  // Drawer control functions
  const handleOpenDrawer = useCallback(() => {
    setEditingQuality(null);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setEditingQuality(null);
    // Reset form when drawer closes
    if (formRef.current) {
      formRef.current.resetForm();
    }
  }, []);

  const handleSubmitQuality = useCallback(
    async (formData: QualityFormData) => {
      try {
        setIsSubmitting(true);

        // Here you would typically call an API to create/update the quality record
        // For now, we'll just simulate the API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Creating/updating quality record:', {
          quality: formData.quality,
          locationId: location.id,
          createdAt: new Date(formData.date).toISOString(),
        });

        // Close drawer and reset form
        setIsDrawerOpen(false);

        // You might want to refresh the quality list here
        // onRefreshQualities?.();
      } catch (error) {
        console.error('Error creating/updating quality record:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [location.id],
  );

  // Quality actions
  const handleEditQuality = useCallback((quality: LocationQuality) => {
    setEditingQuality(quality);
    setIsDrawerOpen(true);

    // Fill form with quality data after drawer opens
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.fillFormWithQuality(quality);
      }
    }, 100);
  }, []);

  const handleDeleteQuality = useCallback((quality: LocationQuality) => {
    setQualityToDelete(quality);
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!qualityToDelete) return;

    try {
      setIsDeleting(true);

      // Here you would typically call an API to delete the quality record
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Deleting quality record:', qualityToDelete.id);

      setIsDeleteModalOpen(false);
      setQualityToDelete(null);
    } catch (error) {
      console.error('Error deleting quality record:', error);
    } finally {
      setIsDeleting(false);
    }
  }, [qualityToDelete]);

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
    setQualityToDelete(null);
  }, []);

  // Get quality type label
  const getQualityLabel = (quality: LocationQualityType) => {
    const qualityOptions = [
      { value: LocationQualityType.GOOD, label: 'Boa' },
      { value: LocationQualityType.REGULAR, label: 'Regular' },
      { value: LocationQualityType.BAD, label: 'Ruim' },
    ];
    const option = qualityOptions.find((opt) => opt.value === quality);
    return option?.label || quality;
  };

  // Get quality badge variant
  const getQualityBadgeVariant = (quality: LocationQualityType) => {
    switch (quality) {
      case LocationQualityType.GOOD:
        return 'success';
      case LocationQualityType.REGULAR:
        return 'warning';
      case LocationQualityType.BAD:
        return 'error';
      default:
        return 'default';
    }
  };

  // Table configuration
  const tableConfig: TableConfig<LocationQuality> = {
    title: 'Registros de Qualidade',
    subtitle: 'Gerencie os registros de qualidade da localização',
    count: filteredAndSortedQualities.length,
    countLabel: 'registros',
    data: paginatedQualities || [],
    actions: {
      add: {
        label: 'Adicionar Qualidade',
        onClick: handleOpenDrawer,
      },
    },
    ...(hasPagination
      ? {
          pagination: {
            currentPage,
            totalPages,
            itemsPerPage,
            totalItems: filteredAndSortedQualities.length,
            onPageChange: handlePageChange,
          },
        }
      : {}),
    columns: [
      {
        key: 'createdAt',
        label: 'Data',
        sortable: true,
        render: (value, quality) => {
          console.log('Rendering date column:', { value, quality });
          const date = new Date(quality.createdAt);
          const formattedDate = date.toLocaleDateString('pt-BR');
          const formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          });
          return `${formattedDate}, ${formattedTime}`;
        },
      },
      {
        key: 'quality',
        label: 'Qualidade',
        sortable: true,
        render: (value, quality) => {
          console.log('Rendering quality column:', { value, quality });
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                quality.quality === LocationQualityType.GOOD
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : quality.quality === LocationQualityType.REGULAR
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {getQualityLabel(quality.quality)}
            </span>
          );
        },
      },
      {
        key: 'actions',
        label: 'Ações',
        sortable: false,
        className: 'w-48',
        render: (value: any, quality: LocationQuality) => (
          <QualityActions
            quality={quality}
            onEdit={handleEditQuality}
            onDelete={handleDeleteQuality}
          />
        ),
      },
    ],
    search: {
      value: qualitySearch,
      onChange: onQualitySearchChange,
      placeholder: 'Buscar por qualidade ou data...',
    },
  };

  console.log(
    'Checking empty state - filteredAndSortedQualities.length:',
    filteredAndSortedQualities.length,
  );

  if (filteredAndSortedQualities.length === 0) {
    console.log('Showing empty state');
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Nenhum registro de qualidade encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Esta localização ainda não possui registros de qualidade.
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
            Adicionar Primeiro Registro
          </Button>
        </div>

        {/* Add Quality Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          config={{ position: 'right', size: 'md' }}
          data-testid="add-quality-drawer"
        >
          <DrawerHeader
            title={
              editingQuality ? 'Editar Registro de Qualidade' : 'Adicionar Registro de Qualidade'
            }
            onClose={handleCloseDrawer}
          />
          <DrawerBody>
            <AddQualityForm
              ref={formRef}
              location={location}
              onSubmit={handleSubmitQuality}
              editingQuality={editingQuality}
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
              {editingQuality ? 'Atualizar' : 'Adicionar'}
            </Button>
          </DrawerFooter>
        </Drawer>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Confirmar Exclusão"
          message={
            qualityToDelete
              ? `Tem certeza que deseja excluir o registro de qualidade "${getQualityLabel(qualityToDelete.quality)}"? Esta ação não pode ser desfeita.`
              : ''
          }
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="error"
          loading={isDeleting}
          data-testid="delete-quality-modal"
        />
      </>
    );
  }

  console.log('Showing table with data:', filteredAndSortedQualities);

  return (
    <div className="space-y-6">
      {/* Table */}
      <Table config={tableConfig} />

      {/* Add/Edit Quality Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        config={{ position: 'right', size: 'md' }}
        data-testid="add-quality-drawer"
      >
        <DrawerHeader
          title={
            editingQuality ? 'Editar Registro de Qualidade' : 'Adicionar Registro de Qualidade'
          }
          onClose={handleCloseDrawer}
        />
        <DrawerBody>
          <AddQualityForm
            ref={formRef}
            location={location}
            onSubmit={handleSubmitQuality}
            editingQuality={editingQuality}
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
            {editingQuality ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DrawerFooter>
      </Drawer>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={
          qualityToDelete
            ? `Tem certeza que deseja excluir o registro de qualidade "${getQualityLabel(qualityToDelete.quality)}"? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="error"
        loading={isDeleting}
        data-testid="delete-quality-modal"
      />
    </div>
  );
}

import { useCallback, useState } from 'react';
import { Table } from '~/components/table';
import { ConfirmationModal } from '~/components/modal';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';

interface EntityPageProps<T> {
  // Data
  entities: T[] | undefined;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  deleteEntity: (id: string) => Promise<void>;

  // Filters and search
  filteredEntities: T[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  handleSort: (field: string) => void;

  // Table configuration
  tableConfig: any;

  // UI
  containerClasses: string;
  loadingMessage: string;
  errorTitle: string;

  // Modal
  entityType: string;
  entityNameKey: keyof T;
}

export function EntityPage<T extends { id: string }>({
  entities,
  loading,
  error,
  refetch,
  deleteEntity,
  filteredEntities,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleSort,
  tableConfig,
  containerClasses,
  loadingMessage,
  errorTitle,
  entityType,
  entityNameKey,
}: EntityPageProps<T>) {
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Event handlers
  const handleDeleteEntity = useCallback((entity: T) => {
    setEntityToDelete(entity);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!entityToDelete) return;

    try {
      setIsDeleting(true);
      await deleteEntity(entityToDelete.id);
      setShowDeleteModal(false);
      setEntityToDelete(null);
    } catch (error) {
      console.error(`Erro ao excluir ${entityType}:`, error);
    } finally {
      setIsDeleting(false);
    }
  }, [entityToDelete, deleteEntity, entityType]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setEntityToDelete(null);
  }, []);

  if (loading) {
    return <LoadingState message={loadingMessage} className={containerClasses} />;
  }

  if (error) {
    return (
      <ErrorState error={error} onRetry={refetch} title={errorTitle} className={containerClasses} />
    );
  }

  return (
    <div className={containerClasses}>
      <div className="max-w-7xl mx-auto p-4">
        <Table config={tableConfig} />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={
          entityToDelete
            ? `Tem certeza que deseja excluir ${entityType} "${entityToDelete[entityNameKey]}"? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="error"
        loading={isDeleting}
        data-testid={`delete-${entityType}-modal`}
      />
    </div>
  );
}

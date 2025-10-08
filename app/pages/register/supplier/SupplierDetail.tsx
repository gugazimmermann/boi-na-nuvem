import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSuppliers } from '~/hooks/useSuppliers';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { Tab } from '~/components/tab';
import { Header } from '~/components/header';
import { Actions } from '~/components/actions';
import { ConfirmationModal } from '~/components/modal';
import { SupplierStatusBadge } from './components/SupplierStatusBadge';
import { useSupplierNavigation } from './utils/navigation';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { SupplierDashboardTab, SupplierDetailsTab, SupplierPropertiesTab } from './tabs';

export default function SupplierDetailPage() {
  const { id } = useParams();
  const { suppliers, loading, error, refetch, deleteSupplier } = useSuppliers();
  const { handleBack, handleEditSupplier } = useSupplierNavigation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sorting state
  const [propertiesSort, setPropertiesSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Search state
  const [propertiesSearch, setPropertiesSearch] = useState('');

  // Debounced search state
  const [debouncedPropertiesSearch, setDebouncedPropertiesSearch] = useState('');

  // Refs for debounce timers
  const propertiesSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the supplier by ID
  const supplier = suppliers?.find((sup) => sup.id === id);

  // Debounce function for properties search
  const debouncePropertiesSearch = useCallback((value: string) => {
    if (propertiesSearchTimeoutRef.current) {
      clearTimeout(propertiesSearchTimeoutRef.current);
    }
    propertiesSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedPropertiesSearch(value);
    }, 300);
  }, []);

  // Handle search input changes
  const handlePropertiesSearchChange = useCallback(
    (value: string) => {
      setPropertiesSearch(value);
      debouncePropertiesSearch(value);
    },
    [debouncePropertiesSearch],
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (propertiesSearchTimeoutRef.current) {
        clearTimeout(propertiesSearchTimeoutRef.current);
      }
    };
  }, []);

  const handleDeleteSupplier = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!supplier) return;

    try {
      setIsDeleting(true);
      await deleteSupplier(supplier.id);
      setShowDeleteModal(false);
      // Navigate back to suppliers list after successful deletion
      handleBack();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
      // O erro já é tratado pelo hook useSuppliers
    } finally {
      setIsDeleting(false);
    }
  }, [supplier, deleteSupplier, handleBack]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleEditSupplierClick = useCallback(() => {
    if (supplier) {
      handleEditSupplier(supplier.id, true);
    }
  }, [supplier, handleEditSupplier]);

  // Tab configuration
  const tabConfig = {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        ),
      },
      {
        id: 'details',
        label: 'Detalhes',
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
      },
      {
        id: 'properties',
        label: 'Propriedades',
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
      },
    ],
    activeTab,
    onTabChange: setActiveTab,
  };

  if (loading) {
    return (
      <LoadingState
        message="Carregando detalhes do fornecedor..."
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={refetch}
        title="Erro ao carregar fornecedor"
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (!supplier) {
    return (
      <div className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}>
        <div className={`${LAYOUT_CONSTANTS.CONTENT_CLASSES} px-4 py-12`}>
          <div className="text-center">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Fornecedor não encontrado
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              O fornecedor solicitado não foi encontrado ou pode ter sido removido.
            </p>
            <button
              onClick={handleBack}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
            >
              Voltar para lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}>
      <div className={`${LAYOUT_CONSTANTS.CONTENT_CLASSES} px-4 py-6`}>
        {/* Header */}
        <Header
          title={supplier.name}
          icon={
            <svg
              className="w-10 h-10 text-white"
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
          }
          backButton={{
            label: 'Voltar para lista',
            onClick: handleBack,
          }}
          info={[
            {
              label: 'Email',
              value: supplier.email,
              className: 'cursor-pointer',
              icon: (
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              label: 'Telefone',
              value: supplier.phone,
              className: 'cursor-pointer',
              icon: (
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              ),
            },
          ]}
          actions={<SupplierStatusBadge status={supplier.status} />}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <Tab config={tabConfig} />
        </div>

        {/* Tab Content */}
        <div className="tab-content mb-8">
          {activeTab === 'dashboard' && supplier && <SupplierDashboardTab supplier={supplier} />}
          {activeTab === 'details' && supplier && <SupplierDetailsTab supplier={supplier} />}
          {activeTab === 'properties' && supplier && (
            <SupplierPropertiesTab
              supplier={supplier}
              propertiesSearch={propertiesSearch}
              propertiesSort={propertiesSort}
              debouncedPropertiesSearch={debouncedPropertiesSearch}
              onPropertiesSearchChange={handlePropertiesSearchChange}
              onPropertiesSortChange={setPropertiesSort}
            />
          )}
        </div>

        {/* Actions */}
        <Actions
          title="Ações do Fornecedor"
          description="Gerencie este fornecedor e suas configurações"
          actions={[
            {
              id: 'edit',
              label: 'Editar Fornecedor',
              onClick: handleEditSupplierClick,
              variant: 'warning',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              ),
            },
            {
              id: 'delete',
              label: 'Excluir Fornecedor',
              onClick: handleDeleteSupplier,
              variant: 'error',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              ),
            },
          ]}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Confirmar Exclusão"
          message={
            supplier
              ? `Tem certeza que deseja excluir o fornecedor "${supplier.name}"? Esta ação não pode ser desfeita.`
              : ''
          }
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="error"
          loading={isDeleting}
          data-testid="delete-supplier-modal"
        />
      </div>
    </div>
  );
}

import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { useServiceProviders } from '~/hooks/useServiceProviders';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { Tab } from '~/components/tab';
import { Header } from '~/components/header';
import { Actions } from '~/components/actions';
import { ConfirmationModal } from '~/components/modal';
import { ServiceProviderStatusBadge } from './components/ServiceProviderStatusBadge';
import { useServiceProviderNavigation } from './utils/navigation';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import {
  ServiceProviderDashboardTab,
  ServiceProviderDetailsTab,
  ServiceProviderPropertiesTab,
  ServiceProviderMovementsTab,
} from './tabs';

export default function ServiceProviderDetailPage() {
  const { id } = useParams();
  const { serviceProviders, loading, error, refetch, deleteServiceProvider } =
    useServiceProviders();
  const { handleBack, handleEditServiceProvider } = useServiceProviderNavigation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sorting state
  const [propertiesSort, setPropertiesSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [movementsSort, setMovementsSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Search state
  const [propertiesSearch, setPropertiesSearch] = useState('');
  const [movementsSearch, setMovementsSearch] = useState('');

  // Debounced search state
  const [debouncedPropertiesSearch, setDebouncedPropertiesSearch] = useState('');
  const [debouncedMovementsSearch, setDebouncedMovementsSearch] = useState('');

  // Refs for debounce timers
  const propertiesSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const movementsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the service provider by ID
  const serviceProvider = serviceProviders?.find((sp) => sp.id === id);

  // Debounce function for properties search
  const debouncePropertiesSearch = useCallback((value: string) => {
    if (propertiesSearchTimeoutRef.current) {
      clearTimeout(propertiesSearchTimeoutRef.current);
    }
    propertiesSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedPropertiesSearch(value);
    }, 300);
  }, []);

  // Debounce function for movements search
  const debounceMovementsSearch = useCallback((value: string) => {
    if (movementsSearchTimeoutRef.current) {
      clearTimeout(movementsSearchTimeoutRef.current);
    }
    movementsSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedMovementsSearch(value);
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

  const handleMovementsSearchChange = useCallback(
    (value: string) => {
      setMovementsSearch(value);
      debounceMovementsSearch(value);
    },
    [debounceMovementsSearch],
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (propertiesSearchTimeoutRef.current) {
        clearTimeout(propertiesSearchTimeoutRef.current);
      }
      if (movementsSearchTimeoutRef.current) {
        clearTimeout(movementsSearchTimeoutRef.current);
      }
    };
  }, []);

  const handleDeleteServiceProvider = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!serviceProvider) return;

    try {
      setIsDeleting(true);
      await deleteServiceProvider(serviceProvider.id);
      setShowDeleteModal(false);
      // Navigate back to service providers list after successful deletion
      handleBack();
    } catch (error) {
      console.error('Erro ao excluir prestador de serviço:', error);
      // O erro já é tratado pelo hook useServiceProviders
    } finally {
      setIsDeleting(false);
    }
  }, [serviceProvider, deleteServiceProvider, handleBack]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleEditServiceProviderClick = useCallback(() => {
    if (serviceProvider) {
      handleEditServiceProvider(serviceProvider.id, true);
    }
  }, [serviceProvider, handleEditServiceProvider]);

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
      {
        id: 'movements',
        label: 'Movimentações',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
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
        message="Carregando detalhes do prestador de serviço..."
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={refetch}
        title="Erro ao carregar prestador de serviço"
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (!serviceProvider) {
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
              Prestador de serviço não encontrado
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              O prestador de serviço solicitado não foi encontrado ou pode ter sido removido.
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
          title={serviceProvider.name}
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
            label: (() => {
              // Check if we came from a property movements tab or location (only on client side)
              if (typeof window !== 'undefined' && window.sessionStorage) {
                const fromProperty = sessionStorage.getItem('responsibleFromProperty');
                const fromLocation = sessionStorage.getItem('responsibleFromLocation');

                if (fromProperty === 'true') {
                  return 'Voltar para propriedade';
                } else if (fromLocation === 'true') {
                  return 'Voltar para localização';
                }
              }
              return 'Voltar para lista';
            })(),
            onClick: handleBack,
          }}
          info={[
            {
              label: 'Email',
              value: serviceProvider.email,
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
              value: serviceProvider.phone,
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
          actions={<ServiceProviderStatusBadge status={serviceProvider.status} />}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <Tab config={tabConfig} />
        </div>

        {/* Tab Content */}
        <div className="tab-content mb-8">
          {activeTab === 'dashboard' && serviceProvider && (
            <ServiceProviderDashboardTab serviceProvider={serviceProvider} />
          )}
          {activeTab === 'details' && serviceProvider && (
            <ServiceProviderDetailsTab serviceProvider={serviceProvider} />
          )}
          {activeTab === 'properties' && serviceProvider && (
            <ServiceProviderPropertiesTab
              serviceProvider={serviceProvider}
              propertiesSearch={propertiesSearch}
              propertiesSort={propertiesSort}
              debouncedPropertiesSearch={debouncedPropertiesSearch}
              onPropertiesSearchChange={handlePropertiesSearchChange}
              onPropertiesSortChange={setPropertiesSort}
            />
          )}
          {activeTab === 'movements' && serviceProvider && (
            <ServiceProviderMovementsTab
              serviceProvider={serviceProvider}
              movementsSearch={movementsSearch}
              movementsSort={movementsSort}
              debouncedMovementsSearch={debouncedMovementsSearch}
              onMovementsSearchChange={handleMovementsSearchChange}
              onMovementsSortChange={setMovementsSort}
            />
          )}
        </div>

        {/* Actions */}
        <Actions
          title="Ações do Prestador de Serviço"
          description="Gerencie este prestador de serviço e suas configurações"
          actions={[
            {
              id: 'edit',
              label: 'Editar Prestador de Serviço',
              onClick: handleEditServiceProviderClick,
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
              label: 'Excluir Prestador de Serviço',
              onClick: handleDeleteServiceProvider,
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
            serviceProvider
              ? `Tem certeza que deseja excluir o prestador de serviço "${serviceProvider.name}"? Esta ação não pode ser desfeita.`
              : ''
          }
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="error"
          loading={isDeleting}
          data-testid="delete-service-provider-modal"
        />
      </div>
    </div>
  );
}

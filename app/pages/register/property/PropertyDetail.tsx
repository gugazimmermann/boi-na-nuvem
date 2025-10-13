import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { usePropertyCrud } from '~/hooks/usePropertyCrud';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { Tab } from '~/components/tab';
import { Header } from '~/components/header';
import { Actions } from '~/components/actions';
import { ConfirmationModal } from '~/components/modal';
import { PropertyStatusBadge } from './components/PropertyStatusBadge';
import { usePropertyNavigation } from './utils/navigation';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import {
  PropertyDashboardTab,
  PropertyDetailsTab,
  PropertyLocationsTab,
  PropertyMovementsTab,
  PropertyObservationsTab,
  PropertyAnimalsTab,
} from './tabs';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { getPropertyById, deleteProperty, loading, error, clearError } = usePropertyCrud();
  const { handleBack, handleEditProperty } = usePropertyNavigation();
  
  // Estado para armazenar a propriedade carregada
  const [property, setProperty] = useState<any>(null);
  const [isLoadingProperty, setIsLoadingProperty] = useState(true);
  const [propertyError, setPropertyError] = useState<string | null>(null);

  // Get the back button label based on navigation source
  const getBackButtonLabel = useCallback(() => {
    const propertyDetailSource = sessionStorage.getItem('propertyDetailSource');

    if (propertyDetailSource) {
      try {
        const source = JSON.parse(propertyDetailSource);
        switch (source.type) {
          case 'supplier':
            return `Voltar para ${source.name}`;
          case 'buyer':
            return `Voltar para ${source.name}`;
          case 'employee':
            return `Voltar para ${source.name}`;
          case 'service-provider':
            return `Voltar para ${source.name}`;
          default:
            return 'Voltar para lista';
        }
      } catch (error) {
        return 'Voltar para lista';
      }
    }
    return 'Voltar para lista';
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    // Check if there's a specific tab to open from URL parameters
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      ['dashboard', 'details', 'locations', 'movements', 'observations', 'animals'].includes(
        tabParam,
      )
    ) {
      return tabParam;
    }
    return 'dashboard';
  });

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sorting state
  const [movementsSort, setMovementsSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [observationsSort, setObservationsSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [locationsSort, setLocationsSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [animalsSort, setAnimalsSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null,
  );

  // Search state
  const [locationsSearch, setLocationsSearch] = useState('');
  const [movementsSearch, setMovementsSearch] = useState('');
  const [observationsSearch, setObservationsSearch] = useState('');
  const [animalsSearch, setAnimalsSearch] = useState('');

  // Debounced search state
  const [debouncedLocationsSearch, setDebouncedLocationsSearch] = useState('');
  const [debouncedMovementsSearch, setDebouncedMovementsSearch] = useState('');
  const [debouncedObservationsSearch, setDebouncedObservationsSearch] = useState('');
  const [debouncedAnimalsSearch, setDebouncedAnimalsSearch] = useState('');

  // Refs for debounce timers
  const locationsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const movementsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observationsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animalsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Carregar propriedade usando a API
  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;
      
      try {
        setIsLoadingProperty(true);
        setPropertyError(null);
        clearError();
        
        const propertyData = await getPropertyById(id);
        setProperty(propertyData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar propriedade';
        setPropertyError(errorMessage);
        console.error('Erro ao carregar propriedade:', err);
      } finally {
        setIsLoadingProperty(false);
      }
    };

    loadProperty();
  }, [id, getPropertyById, clearError]);

  // Update active tab when URL parameters change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      ['dashboard', 'details', 'locations', 'movements', 'observations', 'animals'].includes(
        tabParam,
      )
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Debounce functions
  const debounceLocationsSearch = useCallback((value: string) => {
    if (locationsSearchTimeoutRef.current) {
      clearTimeout(locationsSearchTimeoutRef.current);
    }
    locationsSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedLocationsSearch(value);
    }, 300);
  }, []);

  const debounceMovementsSearch = useCallback((value: string) => {
    if (movementsSearchTimeoutRef.current) {
      clearTimeout(movementsSearchTimeoutRef.current);
    }
    movementsSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedMovementsSearch(value);
    }, 300);
  }, []);

  const debounceObservationsSearch = useCallback((value: string) => {
    if (observationsSearchTimeoutRef.current) {
      clearTimeout(observationsSearchTimeoutRef.current);
    }
    observationsSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedObservationsSearch(value);
    }, 300);
  }, []);

  const debounceAnimalsSearch = useCallback((value: string) => {
    if (animalsSearchTimeoutRef.current) {
      clearTimeout(animalsSearchTimeoutRef.current);
    }
    animalsSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedAnimalsSearch(value);
    }, 300);
  }, []);

  // Handle search input changes
  const handleLocationsSearchChange = useCallback(
    (value: string) => {
      setLocationsSearch(value);
      debounceLocationsSearch(value);
    },
    [debounceLocationsSearch],
  );

  const handleMovementsSearchChange = useCallback(
    (value: string) => {
      setMovementsSearch(value);
      debounceMovementsSearch(value);
    },
    [debounceMovementsSearch],
  );

  const handleObservationsSearchChange = useCallback(
    (value: string) => {
      setObservationsSearch(value);
      debounceObservationsSearch(value);
    },
    [debounceObservationsSearch],
  );

  const handleAnimalsSearchChange = useCallback(
    (value: string) => {
      setAnimalsSearch(value);
      debounceAnimalsSearch(value);
    },
    [debounceAnimalsSearch],
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (locationsSearchTimeoutRef.current) {
        clearTimeout(locationsSearchTimeoutRef.current);
      }
      if (movementsSearchTimeoutRef.current) {
        clearTimeout(movementsSearchTimeoutRef.current);
      }
      if (observationsSearchTimeoutRef.current) {
        clearTimeout(observationsSearchTimeoutRef.current);
      }
      if (animalsSearchTimeoutRef.current) {
        clearTimeout(animalsSearchTimeoutRef.current);
      }
    };
  }, []);

  const handleDeleteProperty = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!property) return;

    try {
      setIsDeleting(true);
      await deleteProperty(property.id);
      setShowDeleteModal(false);
      // Navigate back to properties list after successful deletion
      handleBack();
    } catch (error) {
      console.error('Erro ao excluir propriedade:', error);
      // O erro já é tratado pelo hook usePropertyCrud
    } finally {
      setIsDeleting(false);
    }
  }, [property, deleteProperty, handleBack]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleEditPropertyClick = useCallback(() => {
    if (property) {
      handleEditProperty(property.id, true);
    }
  }, [property, handleEditProperty]);

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
        id: 'locations',
        label: 'Localizações',
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
      {
        id: 'observations',
        label: 'Observações',
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
      },
      {
        id: 'animals',
        label: 'Animais',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        ),
      },
    ],
    activeTab,
    onTabChange: setActiveTab,
  };

  if (isLoadingProperty || loading) {
    return (
      <LoadingState
        message="Carregando detalhes da propriedade..."
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (propertyError || error) {
    return (
      <ErrorState
        error={propertyError || error}
        onRetry={() => {
          if (id) {
            setPropertyError(null);
            clearError();
            getPropertyById(id).then(setProperty).catch((err) => {
              setPropertyError(err instanceof Error ? err.message : 'Erro ao carregar propriedade');
            });
          }
        }}
        title="Erro ao carregar propriedade"
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (!property) {
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Propriedade não encontrada
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              A propriedade solicitada não foi encontrada ou pode ter sido removida.
            </p>
            <button
              onClick={handleBack}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
            >
              {getBackButtonLabel()}
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
          title={property.name}
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
            label: getBackButtonLabel(),
            onClick: handleBack,
          }}
          info={[
            {
              label: 'Código',
              value: property.code,
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
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              ),
            },
          ]}
          actions={<PropertyStatusBadge status={property.status} />}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <Tab config={tabConfig} />
        </div>

        {/* Tab Content */}
        <div className="tab-content mb-8">
          {activeTab === 'dashboard' && property && <PropertyDashboardTab property={property} />}
          {activeTab === 'details' && property && <PropertyDetailsTab property={property} />}
          {activeTab === 'locations' && property && (
            <PropertyLocationsTab
              property={property}
              locationsSearch={locationsSearch}
              locationsSort={locationsSort}
              debouncedLocationsSearch={debouncedLocationsSearch}
              onLocationsSearchChange={handleLocationsSearchChange}
              onLocationsSortChange={setLocationsSort}
            />
          )}
          {activeTab === 'movements' && property && (
            <PropertyMovementsTab
              property={property}
              movementsSearch={movementsSearch}
              movementsSort={movementsSort}
              debouncedMovementsSearch={debouncedMovementsSearch}
              onMovementsSearchChange={handleMovementsSearchChange}
              onMovementsSortChange={setMovementsSort}
            />
          )}
          {activeTab === 'observations' && property && (
            <PropertyObservationsTab
              property={property}
              observationsSearch={observationsSearch}
              observationsSort={observationsSort}
              debouncedObservationsSearch={debouncedObservationsSearch}
              onObservationsSearchChange={handleObservationsSearchChange}
              onObservationsSortChange={setObservationsSort}
            />
          )}
          {activeTab === 'animals' && property && (
            <PropertyAnimalsTab
              property={property}
              animalsSearch={animalsSearch}
              animalsSort={animalsSort}
              debouncedAnimalsSearch={debouncedAnimalsSearch}
              onAnimalsSearchChange={handleAnimalsSearchChange}
              onAnimalsSortChange={setAnimalsSort}
            />
          )}
        </div>

        {/* Actions */}
        <Actions
          title="Ações da Propriedade"
          description="Gerencie esta propriedade e suas configurações"
          actions={[
            {
              id: 'edit',
              label: 'Editar Propriedade',
              onClick: handleEditPropertyClick,
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
              label: 'Excluir Propriedade',
              onClick: handleDeleteProperty,
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
            property
              ? `Tem certeza que deseja excluir a propriedade "${property.name}"? Esta ação não pode ser desfeita.`
              : ''
          }
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="error"
          loading={isDeleting}
          data-testid="delete-property-modal"
        />
      </div>
    </div>
  );
}

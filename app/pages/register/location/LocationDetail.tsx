import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useLocations } from '~/hooks/useLocations';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { Tab } from '~/components/tab';
import { Header } from '~/components/header';
import { Actions } from '~/components/actions';
import { ConfirmationModal } from '~/components/modal';
import { LocationStatusBadge } from './components/LocationStatusBadge';
import { LocationType } from '~/types/location';
import { useLocationNavigation } from './hooks/useLocationNavigation';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import {
  LocationDashboardTab,
  LocationDetailsTab,
  LocationEntryExitTab,
  LocationMovementsTab,
  LocationObservationsTab,
  LocationQualityTab,
  LocationAnimalsTab,
} from './tabs';

export default function LocationDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { locations, loading, error, refetch, deleteLocation } = useLocations();
  const { handleBack, handleEditLocation } = useLocationNavigation();
  const [activeTab, setActiveTab] = useState(() => {
    // Check if there's a specific tab to open from URL parameters
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      [
        'dashboard',
        'details',
        'quality',
        'observations',
        'movements',
        'entry-exit',
        'animals',
      ].includes(tabParam)
    ) {
      return tabParam;
    }

    // Check if there's a specific tab to open from sessionStorage (only on client side)
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedTab = sessionStorage.getItem('locationDetailActiveTab');
      if (storedTab) {
        sessionStorage.removeItem('locationDetailActiveTab'); // Clean up after use
        return storedTab;
      }
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
  const [entryExitSort, setEntryExitSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [observationsSort, setObservationsSort] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [qualitySort, setQualitySort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null,
  );
  const [animalsSort, setAnimalsSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null,
  );

  // Search state
  const [movementsSearch, setMovementsSearch] = useState('');
  const [entryExitSearch, setEntryExitSearch] = useState('');
  const [observationsSearch, setObservationsSearch] = useState('');
  const [qualitySearch, setQualitySearch] = useState('');
  const [animalsSearch, setAnimalsSearch] = useState('');

  // Debounced search state
  const [debouncedMovementsSearch, setDebouncedMovementsSearch] = useState('');
  const [debouncedEntryExitSearch, setDebouncedEntryExitSearch] = useState('');
  const [debouncedObservationsSearch, setDebouncedObservationsSearch] = useState('');
  const [debouncedQualitySearch, setDebouncedQualitySearch] = useState('');
  const [debouncedAnimalsSearch, setDebouncedAnimalsSearch] = useState('');

  // Refs for debounce timers
  const movementsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const entryExitSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observationsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const qualitySearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animalsSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the location by ID
  const location = locations?.find((l) => l.id === id);

  // Helper function to get location type label
  const getLocationTypeLabel = (type: LocationType): string => {
    switch (type) {
      case LocationType.LIVESTOCK:
        return 'Pecuária';
      case LocationType.CULTIVATION:
        return 'Cultivo';
      case LocationType.STORAGE:
        return 'Armazenamento';
      case LocationType.CONFINEMENT:
        return 'Confinamento';
      case LocationType.SEMI_CONFINEMENT:
        return 'Semi-confinamento';
      default:
        return type;
    }
  };

  // Update active tab when URL parameters change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      [
        'dashboard',
        'details',
        'quality',
        'observations',
        'movements',
        'entry-exit',
        'animals',
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Debounce functions
  const debounceMovementsSearch = useCallback((value: string) => {
    if (movementsSearchTimeoutRef.current) {
      clearTimeout(movementsSearchTimeoutRef.current);
    }
    movementsSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedMovementsSearch(value);
    }, 300);
  }, []);

  const debounceEntryExitSearch = useCallback((value: string) => {
    if (entryExitSearchTimeoutRef.current) {
      clearTimeout(entryExitSearchTimeoutRef.current);
    }
    entryExitSearchTimeoutRef.current = setTimeout(() => {
      setDebouncedEntryExitSearch(value);
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

  const debounceQualitySearch = useCallback((value: string) => {
    if (qualitySearchTimeoutRef.current) {
      clearTimeout(qualitySearchTimeoutRef.current);
    }
    qualitySearchTimeoutRef.current = setTimeout(() => {
      setDebouncedQualitySearch(value);
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
  const handleMovementsSearchChange = useCallback(
    (value: string) => {
      setMovementsSearch(value);
      debounceMovementsSearch(value);
    },
    [debounceMovementsSearch],
  );

  const handleEntryExitSearchChange = useCallback(
    (value: string) => {
      setEntryExitSearch(value);
      debounceEntryExitSearch(value);
    },
    [debounceEntryExitSearch],
  );

  const handleObservationsSearchChange = useCallback(
    (value: string) => {
      setObservationsSearch(value);
      debounceObservationsSearch(value);
    },
    [debounceObservationsSearch],
  );

  const handleQualitySearchChange = useCallback(
    (value: string) => {
      setQualitySearch(value);
      debounceQualitySearch(value);
    },
    [debounceQualitySearch],
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
      if (movementsSearchTimeoutRef.current) {
        clearTimeout(movementsSearchTimeoutRef.current);
      }
      if (entryExitSearchTimeoutRef.current) {
        clearTimeout(entryExitSearchTimeoutRef.current);
      }
      if (observationsSearchTimeoutRef.current) {
        clearTimeout(observationsSearchTimeoutRef.current);
      }
      if (qualitySearchTimeoutRef.current) {
        clearTimeout(qualitySearchTimeoutRef.current);
      }
      if (animalsSearchTimeoutRef.current) {
        clearTimeout(animalsSearchTimeoutRef.current);
      }
    };
  }, []);

  const handleDeleteLocation = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!location) return;

    try {
      setIsDeleting(true);
      await deleteLocation(location.id);
      setShowDeleteModal(false);
      // Navigate back to locations list after successful deletion
      handleBack();
    } catch (error) {
      console.error('Erro ao excluir localização:', error);
      // O erro já é tratado pelo hook useLocations
    } finally {
      setIsDeleting(false);
    }
  }, [location, deleteLocation, handleBack]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleEditLocationClick = useCallback(() => {
    if (location) {
      handleEditLocation(location.id, true);
    }
  }, [location, handleEditLocation]);

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
        id: 'quality',
        label: 'Qualidade',
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
        id: 'entry-exit',
        label: 'Entradas e Saídas',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
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
              d="M19 14.828v1.172a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.172m14 0l-7-7m0 0l-7 7m7-7v12"
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
        message="Carregando detalhes da localização..."
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={refetch}
        title="Erro ao carregar localização"
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (!location) {
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
              Localização não encontrada
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              A localização solicitada não foi encontrada ou pode ter sido removida.
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
          title={location.name}
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          backButton={{
            label: (() => {
              // Check if we came from a property locations tab or responsible person (only on client side)
              if (typeof window !== 'undefined' && window.sessionStorage) {
                const fromProperty = sessionStorage.getItem('locationFromProperty');
                const fromResponsible = sessionStorage.getItem('responsibleFromLocation');

                if (fromProperty === 'true') {
                  return 'Voltar para propriedade';
                } else if (fromResponsible === 'true') {
                  return 'Voltar para localização';
                }
              }
              return 'Voltar para lista';
            })(),
            onClick: handleBack,
          }}
          info={[
            {
              label: 'Código',
              value: location.code,
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
            {
              label: 'Tipo',
              value: getLocationTypeLabel(location.type),
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              ),
            },
          ]}
          actions={<LocationStatusBadge status={location.status} />}
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <Tab config={tabConfig} />
        </div>

        {/* Tab Content */}
        <div className="tab-content mb-8">
          {activeTab === 'dashboard' && location && <LocationDashboardTab location={location} />}
          {activeTab === 'details' && location && <LocationDetailsTab location={location} />}
          {activeTab === 'quality' && location && (
            <LocationQualityTab
              location={location}
              qualitySearch={qualitySearch}
              qualitySort={qualitySort}
              debouncedQualitySearch={debouncedQualitySearch}
              onQualitySearchChange={handleQualitySearchChange}
              onQualitySortChange={setQualitySort}
            />
          )}
          {activeTab === 'movements' && location && (
            <LocationMovementsTab
              location={location}
              movementsSearch={movementsSearch}
              movementsSort={movementsSort}
              debouncedMovementsSearch={debouncedMovementsSearch}
              onMovementsSearchChange={handleMovementsSearchChange}
              onMovementsSortChange={setMovementsSort}
            />
          )}
          {activeTab === 'entry-exit' && location && (
            <LocationEntryExitTab
              location={location}
              entryExitSearch={entryExitSearch}
              entryExitSort={entryExitSort}
              debouncedEntryExitSearch={debouncedEntryExitSearch}
              onEntryExitSearchChange={handleEntryExitSearchChange}
              onEntryExitSortChange={setEntryExitSort}
            />
          )}
          {activeTab === 'observations' && location && (
            <LocationObservationsTab
              location={location}
              observationsSearch={observationsSearch}
              observationsSort={observationsSort}
              debouncedObservationsSearch={debouncedObservationsSearch}
              onObservationsSearchChange={handleObservationsSearchChange}
              onObservationsSortChange={setObservationsSort}
            />
          )}
          {activeTab === 'animals' && location && (
            <LocationAnimalsTab
              location={location}
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
          title="Ações da Localização"
          description="Gerencie esta localização e suas configurações"
          actions={[
            {
              id: 'edit',
              label: 'Editar Localização',
              onClick: handleEditLocationClick,
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
              label: 'Excluir Localização',
              onClick: handleDeleteLocation,
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
            location
              ? `Tem certeza que deseja excluir a localização "${location.name}"? Esta ação não pode ser desfeita.`
              : ''
          }
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="error"
          loading={isDeleting}
          data-testid="delete-location-modal"
        />
      </div>
    </div>
  );
}

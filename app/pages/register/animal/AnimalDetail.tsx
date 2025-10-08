import { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useAnimals } from '~/hooks/useAnimals';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';
import { Tab } from '~/components/tab';
import { Header } from '~/components/header';
import { Actions } from '~/components/actions';
import { ConfirmationModal } from '~/components/modal';
import { useAnimalNavigation } from './hooks/useAnimalNavigation';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { AnimalDashboardTab, AnimalDetailsTab, AnimalPedigreeTab } from './tabs';

export default function AnimalDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { animals, loading, error, refetch, deleteAnimal } = useAnimals();
  const { handleBack, handleEditAnimal } = useAnimalNavigation();
  const [activeTab, setActiveTab] = useState(() => {
    // Check if there's a specific tab to open from URL parameters
    const tabParam = searchParams.get('tab');
    if (tabParam && ['dashboard', 'details', 'pedigree'].includes(tabParam)) {
      return tabParam;
    }

    // Check if there's a specific tab to open from sessionStorage (only on client side)
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedTab = sessionStorage.getItem('animalDetailActiveTab');
      if (storedTab) {
        sessionStorage.removeItem('animalDetailActiveTab'); // Clean up after use
        return storedTab;
      }
    }
    return 'dashboard';
  });

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find the animal by ID
  const animal = animals?.find((a) => a.id === id);

  // Update active tab when URL parameters change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['dashboard', 'details', 'pedigree'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleDeleteAnimal = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!animal) return;

    try {
      setIsDeleting(true);
      await deleteAnimal(animal.id);
      setShowDeleteModal(false);
      // Navigate back to animals list after successful deletion
      handleBack();
    } catch (error) {
      console.error('Erro ao excluir animal:', error);
      // O erro já é tratado pelo hook useAnimals
    } finally {
      setIsDeleting(false);
    }
  }, [animal, deleteAnimal, handleBack]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleEditAnimalClick = useCallback(() => {
    if (animal) {
      handleEditAnimal(animal.id, true);
    }
  }, [animal, handleEditAnimal]);

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
        id: 'pedigree',
        label: 'Pedigree',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
        message="Carregando detalhes do animal..."
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={refetch}
        title="Erro ao carregar animal"
        className={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      />
    );
  }

  if (!animal) {
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
                  d="M19 14.828v1.172a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.172m14 0l-7-7m0 0l-7 7m7-7v12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Animal não encontrado
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              O animal solicitado não foi encontrado ou pode ter sido removido.
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
          title={`Animal ${animal.code}`}
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
                d="M19 14.828v1.172a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.172m14 0l-7-7m0 0l-7 7m7-7v12"
              />
            </svg>
          }
          backButton={{
            label: (() => {
              // Check if we came from a specific context (only on client side)
              if (typeof window !== 'undefined' && window.sessionStorage) {
                const fromList = sessionStorage.getItem('animalFromList');
                const fromProperty = sessionStorage.getItem('animalFromProperty');
                const fromParent = sessionStorage.getItem('animalFromParent');

                if (fromParent === 'true') {
                  return 'Voltar para animal';
                } else if (fromList === 'true') {
                  return 'Voltar para lista';
                } else if (fromProperty === 'true') {
                  return 'Voltar para propriedade';
                }
              }
              return 'Voltar para lista';
            })(),
            onClick: handleBack,
          }}
          info={[
            {
              label: 'Código',
              value: animal.code,
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
            {
              label: 'Registro',
              value: animal.registrationNumber,
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
            },
          ]}
          actions={
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {animal.breed}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {animal.bloodDegree}
              </span>
            </div>
          }
        />

        {/* Tab Navigation */}
        <div className="mb-8">
          <Tab config={tabConfig} />
        </div>

        {/* Tab Content */}
        <div className="tab-content mb-8">
          {activeTab === 'dashboard' && animal && <AnimalDashboardTab animal={animal} />}
          {activeTab === 'details' && animal && <AnimalDetailsTab animal={animal} />}
          {activeTab === 'pedigree' && animal && <AnimalPedigreeTab animal={animal} />}
        </div>

        {/* Actions */}
        <Actions
          title="Ações do Animal"
          description="Gerencie este animal e suas configurações"
          actions={[
            {
              id: 'edit',
              label: 'Editar Animal',
              onClick: handleEditAnimalClick,
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
              label: 'Excluir Animal',
              onClick: handleDeleteAnimal,
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
            animal
              ? `Tem certeza que deseja excluir o animal "${animal.code}"? Esta ação não pode ser desfeita.`
              : ''
          }
          confirmText="Excluir"
          cancelText="Cancelar"
          variant="error"
          loading={isDeleting}
          data-testid="delete-animal-modal"
        />
      </div>
    </div>
  );
}

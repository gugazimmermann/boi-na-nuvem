import { useParams } from 'react-router';
import { useAnimals } from '~/hooks/useAnimals';
import { useAnimalNavigation, useAnimalForm } from './hooks';
import { EntityFormLayout } from '../shared/components';
import { ANIMAL_BREED_OPTIONS, BLOOD_DEGREE_OPTIONS } from './config/animalConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { AnimalBreed, BloodDegree } from '~/types/animal';
import { LoadingState } from '~/components/loading';
import { ErrorState } from '~/components/error';

export default function EditAnimalPage() {
  const { id } = useParams();
  const { animals, loading, error, refetch, updateAnimal } = useAnimals();
  const { handleBack } = useAnimalNavigation();

  const animal = animals?.find((a) => a.id === id);

  const {
    formData,
    handleInputChange,
    handleSubmit,
    loading: formLoading,
    error: formError,
    resetForm,
  } = useAnimalForm({
    initialData: animal,
    onSubmit: async (data) => {
      if (!id) throw new Error('ID do animal não encontrado');
      await updateAnimal(id, data);
      handleBack();
    },
  });

  const formConfig = {
    title: `Editar Animal - ${animal?.code || ''}`,
    description: 'Edite as informações do animal',
    fields: [
      {
        key: 'code',
        label: 'Código',
        type: 'text',
        value: formData.code,
        onChange: (value: string) => handleInputChange('code', value),
        required: true,
        placeholder: 'Ex: 001',
      },
      {
        key: 'registrationNumber',
        label: 'Número de Registro',
        type: 'text',
        value: formData.registrationNumber,
        onChange: (value: string) => handleInputChange('registrationNumber', value),
        required: true,
        placeholder: 'Ex: ANG000001',
      },
      {
        key: 'breed',
        label: 'Raça',
        type: 'select',
        value: formData.breed,
        onChange: (value: AnimalBreed) => handleInputChange('breed', value),
        required: true,
        options: ANIMAL_BREED_OPTIONS,
      },
      {
        key: 'bloodDegree',
        label: 'Grau de Sangue',
        type: 'select',
        value: formData.bloodDegree,
        onChange: (value: BloodDegree) => handleInputChange('bloodDegree', value),
        required: true,
        options: BLOOD_DEGREE_OPTIONS,
      },
      {
        key: 'bloodPercentage',
        label: 'Percentual de Sangue (%)',
        type: 'number',
        value: formData.bloodPercentage,
        onChange: (value: number) => handleInputChange('bloodPercentage', value),
        required: true,
        min: 0,
        max: 100,
        step: 0.1,
      },
      {
        key: 'birthDate',
        label: 'Data de Nascimento',
        type: 'date',
        value: formData.birthDate,
        onChange: (value: string) => handleInputChange('birthDate', value),
        required: true,
      },
      {
        key: 'acquisitionDate',
        label: 'Data de Aquisição',
        type: 'date',
        value: formData.acquisitionDate,
        onChange: (value: string) => handleInputChange('acquisitionDate', value),
        required: true,
      },
      {
        key: 'fatherId',
        label: 'ID do Pai (opcional)',
        type: 'text',
        value: formData.fatherId || '',
        onChange: (value: string) => handleInputChange('fatherId', value || null),
        placeholder: 'ID do animal pai',
      },
      {
        key: 'motherId',
        label: 'ID da Mãe (opcional)',
        type: 'text',
        value: formData.motherId || '',
        onChange: (value: string) => handleInputChange('motherId', value || null),
        placeholder: 'ID do animal mãe',
      },
    ],
    actions: [
      {
        key: 'cancel',
        label: 'Cancelar',
        onClick: handleBack,
        variant: 'secondary',
      },
      {
        key: 'reset',
        label: 'Restaurar',
        onClick: resetForm,
        variant: 'secondary',
      },
      {
        key: 'submit',
        label: 'Salvar Alterações',
        type: 'submit',
        variant: 'primary',
        loading: formLoading,
      },
    ],
  };

  if (loading) {
    return (
      <LoadingState message="Carregando animal..." className={LAYOUT_CONSTANTS.CONTAINER_CLASSES} />
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
    <EntityFormLayout
      config={formConfig}
      onSubmit={handleSubmit}
      loading={formLoading}
      error={formError}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      contentClasses={LAYOUT_CONSTANTS.CONTENT_CLASSES}
      backButton={{
        label: 'Voltar para animal',
        onClick: handleBack,
      }}
    />
  );
}

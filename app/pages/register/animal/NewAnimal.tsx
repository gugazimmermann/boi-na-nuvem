import { useAnimals } from '~/hooks/useAnimals';
import { useAnimalNavigation, useAnimalForm } from './hooks';
import { EntityFormLayout } from '../shared/components';
import { ANIMAL_BREED_OPTIONS, BLOOD_DEGREE_OPTIONS } from './config/animalConfig';
import { LAYOUT_CONSTANTS } from '../shared/constants';
import { AnimalBreed, BloodDegree } from '~/types/animal';

export default function NewAnimalPage() {
  const { createAnimal } = useAnimals();
  const { handleBack } = useAnimalNavigation();

  const { formData, handleInputChange, handleSubmit, loading, error, resetForm } = useAnimalForm({
    onSubmit: async (data) => {
      await createAnimal(data);
      handleBack();
    },
  });

  const formConfig = {
    title: 'Novo Animal',
    description: 'Cadastre um novo animal no sistema',
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
        label: 'Limpar',
        onClick: resetForm,
        variant: 'secondary',
      },
      {
        key: 'submit',
        label: 'Salvar Animal',
        type: 'submit',
        variant: 'primary',
        loading,
      },
    ],
  };

  return (
    <EntityFormLayout
      config={formConfig}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      contentClasses={LAYOUT_CONSTANTS.CONTENT_CLASSES}
      backButton={{
        label: 'Voltar para lista',
        onClick: handleBack,
      }}
    />
  );
}

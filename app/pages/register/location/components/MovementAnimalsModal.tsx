import { useMemo } from 'react';
import { Modal, ModalBody, ModalFooter } from '~/components/modal';
import { Button } from '~/components/button';
import { Table } from '~/components/table';
import { Tooltip } from '~/components/tooltip';
import type { TableConfig } from '~/components/table/types';
import type { LocationMoviment } from '~/types/location';
import { LocationMovimentType } from '~/types/location';
import { ANIMALS } from '~/mocks/animals-mock';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { AnimalBreed } from '~/types/animal';
import { formatAgeFromBirthDate } from '~/utils/ageFormatter';

interface MovementAnimalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  movement: LocationMoviment | null;
}

// Function to get breed badge colors (same as LocationAnimalsTab)
const getBreedBadgeColors = (breed: AnimalBreed) => {
  switch (breed) {
    case AnimalBreed.ANGUS:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case AnimalBreed.NELORE:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case AnimalBreed.SRD:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
};

export function MovementAnimalsModal({ isOpen, onClose, movement }: MovementAnimalsModalProps) {
  // Get animals associated with this movement with calculated data
  const movementAnimals = useMemo(() => {
    if (!movement) return [];

    // Find animal locations that reference this movement
    const animalLocationIds = ANIMAL_LOCATIONS.filter(
      (al) => al.locationMovimentId === movement.id,
    ).map((al) => al.animalId);

    // Get the actual animal objects
    const animals = ANIMALS.filter((animal) => animalLocationIds.includes(animal.id));

    // Calculate age in months for each animal
    return animals.map((animal) => {
      const birthDate = new Date(animal.birthDate);
      const now = new Date();
      const ageInMonths = Math.floor(
        (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
      ); // Average days per month

      return {
        ...animal,
        ageInMonths,
      };
    });
  }, [movement]);

  // Table configuration (same format as LocationAnimalsTab)
  const tableConfig: TableConfig<any> = {
    title: 'Animais da Movimentação',
    count: movementAnimals.length,
    countLabel: 'animais',
    columns: [
      {
        key: 'code',
        label: 'Código',
        sortable: true,
        render: (value, animal) => (
          <span className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">
            {animal.code}
          </span>
        ),
      },
      {
        key: 'registrationNumber',
        label: 'Número de Registro',
        sortable: true,
        render: (value, animal) => (
          <span className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100">
            {animal.registrationNumber}
          </span>
        ),
      },
      {
        key: 'breed',
        label: 'Raça',
        sortable: true,
        render: (value, animal) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBreedBadgeColors(animal.breed)}`}
          >
            {animal.breed}
          </span>
        ),
      },
      {
        key: 'ageInMonths',
        label: 'Idade',
        sortable: true,
        render: (value, animal) => (
          <Tooltip
            config={{
              content: formatAgeFromBirthDate(animal.birthDate),
              position: 'top',
              variant: 'default',
              trigger: 'hover',
              delay: 500,
            }}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400 cursor-help underline decoration-dotted">
              {animal.ageInMonths} meses
            </span>
          </Tooltip>
        ),
      },
    ],
    data: movementAnimals,
  };

  if (!movement) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      config={{
        size: 'xl',
        closable: true,
        closeOnOverlayClick: true,
        closeOnEscape: true,
      }}
      data-testid="movement-animals-modal"
    >
      <ModalBody>
        {movementAnimals.length === 0 ? (
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
                  d="M19 14.828v1.172a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.172m14 0l-7-7m0 0l-7 7m7-7v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Nenhum animal encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {movement?.type === LocationMovimentType.ENTRY
                ? 'Esta entrada não possui animais registrados no sistema.'
                : 'Esta saída não possui animais registrados no sistema.'}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Isso pode acontecer quando:</p>
              <ul className="mt-2 text-left max-w-md mx-auto">
                <li>• A movimentação foi registrada sem detalhamento dos animais</li>
                <li>• Os animais ainda não foram associados a esta movimentação</li>
                <li>• É uma movimentação de outro tipo (manutenção, limpeza, etc.)</li>
              </ul>
            </div>
          </div>
        ) : (
          <Table config={tableConfig} />
        )}
      </ModalBody>

      <ModalFooter>
        <Button
          onClick={onClose}
          config={{
            variant: 'secondary',
          }}
        >
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

import type { Animal } from '~/types/animal';
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { InfoItem, INFO_ITEM_CONSTANTS } from '~/components/info-item';
import { ANIMALS } from '~/mocks/animals-mock';
import { useNavigate } from 'react-router';

interface AnimalDetailsTabProps {
  animal: Animal;
}

export function AnimalDetailsTab({ animal }: AnimalDetailsTabProps) {
  const navigate = useNavigate();

  // Find parent information
  const findParent = (parentId: string | null) => {
    if (!parentId) return null;
    return ANIMALS.find((a) => a.id === parentId);
  };

  // Navigate to parent details
  const handleParentClick = (parentId: string) => {
    // Store the current animal context for navigation back
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('animalFromParent', 'true');
      sessionStorage.setItem('parentAnimalId', animal.id);
      sessionStorage.setItem('parentAnimalTab', 'details');
    }
    navigate(`/cadastros/animais/${parentId}?tab=dashboard`);
  };

  const father = findParent(animal.fatherId);
  const mother = findParent(animal.motherId);

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <InfoCard
        title="Informações Básicas"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.to}
      >
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Identificação */}
          <div className="space-y-3">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              }
              label="Código"
              value={<span className="text-lg font-semibold cursor-pointer">{animal.code}</span>}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.BLUE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.BLUE}
            />

            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
              label="Número de Registro"
              value={
                <span className="text-lg font-semibold cursor-pointer">
                  {animal.registrationNumber}
                </span>
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.GREEN}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.GREEN}
            />
          </div>

          {/* Características Físicas */}
          <div className="space-y-3">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              label="Sexo"
              value={<span className="text-lg font-semibold">{animal.sex}</span>}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.PURPLE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.PURPLE}
            />

            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              }
              label="Finalidade"
              value={<span className="text-lg font-semibold">{animal.purpose}</span>}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.ORANGE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.ORANGE}
            />
          </div>

          {/* Datas */}
          <div className="space-y-3">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              label="Data de Nascimento"
              value={new Date(animal.birthDate).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.INDIGO}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.INDIGO}
            />

            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              label="Data de Aquisição"
              value={new Date(animal.acquisitionDate).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.ORANGE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.ORANGE}
            />
          </div>
        </dl>
      </InfoCard>

      {/* Genetic Characteristics */}
      <InfoCard
        title="Características Genéticas"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        }
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.to}
      >
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoItem
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14.828v1.172a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.172m14 0l-7-7m0 0l-7 7m7-7v12"
                />
              </svg>
            }
            label="Raça"
            value={<span className="text-lg font-semibold">{animal.breed}</span>}
            iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.EMERALD}
            iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.EMERALD}
          />

          <InfoItem
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            }
            label="Grau de Sangue"
            value={<span className="text-lg font-semibold">{animal.bloodDegree}</span>}
            iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.PURPLE}
            iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.PURPLE}
          />

          <InfoItem
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            label="Percentual de Sangue"
            value={<span className="text-lg font-semibold">{animal.bloodPercentage}%</span>}
            iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.TEAL}
            iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.TEAL}
          />
        </dl>
      </InfoCard>

      {/* Parentage Information */}
      <InfoCard
        title="Parentesco"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.VIOLET.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.VIOLET.to}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              label="Pai"
              value={
                father ? (
                  <button
                    onClick={() => handleParentClick(father.id)}
                    className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer transition-colors"
                  >
                    <span className="font-bold">{father.code}</span> -{' '}
                    <span className="font-bold">{father.registrationNumber}</span>
                  </button>
                ) : (
                  <span className="text-gray-500">Não informado</span>
                )
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.PURPLE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.PURPLE}
            />
          </div>

          <div className="space-y-3">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              label="Mãe"
              value={
                mother ? (
                  <button
                    onClick={() => handleParentClick(mother.id)}
                    className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer transition-colors"
                  >
                    <span className="font-bold">{mother.code}</span> -{' '}
                    <span className="font-bold">{mother.registrationNumber}</span>
                  </button>
                ) : (
                  <span className="text-gray-500">Não informada</span>
                )
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.PURPLE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.PURPLE}
            />
          </div>
        </dl>
      </InfoCard>
    </div>
  );
}

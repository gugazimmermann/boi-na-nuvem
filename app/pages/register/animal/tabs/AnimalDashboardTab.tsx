import type { Animal } from '~/types/animal';
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { ANIMALS } from '~/mocks/animals-mock';
import { useNavigate } from 'react-router';

interface AnimalDashboardTabProps {
  animal: Animal;
}

export function AnimalDashboardTab({ animal }: AnimalDashboardTabProps) {
  const navigate = useNavigate();

  // Calculate age with years, months and days
  const calculateDetailedAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

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
      sessionStorage.setItem('parentAnimalTab', 'dashboard');
      console.log('Storing navigation context:', {
        fromParent: 'true',
        parentAnimalId: animal.id,
        parentAnimalTab: 'dashboard',
        navigatingTo: parentId,
      });
    }
    navigate(`/cadastros/animais/${parentId}?tab=dashboard`);
  };

  const father = findParent(animal.fatherId);
  const mother = findParent(animal.motherId);

  const age = calculateDetailedAge(animal.birthDate);

  return (
    <div className="space-y-2">
      {/* Overview Cards */}
      <div className="space-y-3">
        {/* First Row - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Birth */}
          <InfoCard
            title="Nascimento"
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
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.to}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                {new Date(animal.birthDate).toLocaleDateString('pt-BR')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {age.years} anos, {age.months} meses e {age.days} dias
              </div>
            </div>
          </InfoCard>

          {/* Time on Farm */}
          <InfoCard
            title="Tempo na Fazenda"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            }
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.AMBER.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.AMBER.to}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {Math.floor(
                  (new Date().getTime() - new Date(animal.acquisitionDate).getTime()) /
                    (1000 * 60 * 60 * 24 * 30),
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">meses</div>
            </div>
          </InfoCard>

          {/* Sex */}
          <InfoCard
            title="Sexo"
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
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.RED.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.RED.to}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                {animal.sex}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {animal.sex === 'Macho' ? 'Macho' : 'Fêmea'}
              </div>
            </div>
          </InfoCard>

          {/* Purpose */}
          <InfoCard
            title="Finalidade"
            icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.GREEN.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.GREEN.to}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {animal.purpose}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">finalidade</div>
            </div>
          </InfoCard>
        </div>

        {/* Second Row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Breed */}
          <InfoCard
            title="Raça"
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
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.to}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {animal.breed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">raça</div>
            </div>
          </InfoCard>

          {/* Blood Degree */}
          <InfoCard
            title="Grau de Sangue"
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
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.VIOLET.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.VIOLET.to}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {animal.bloodDegree}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">grau</div>
            </div>
          </InfoCard>

          {/* Blood Percentage */}
          <InfoCard
            title="Percentual de Sangue"
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
            gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.CYAN.from}
            gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.CYAN.to}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                {animal.bloodPercentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">sangue</div>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

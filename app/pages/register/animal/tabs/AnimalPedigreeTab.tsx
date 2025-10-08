import type { Animal } from '~/types/animal';
import { ANIMALS } from '~/mocks/animals-mock';
import { useNavigate } from 'react-router';

interface AnimalPedigreeTabProps {
  animal: Animal;
}

export function AnimalPedigreeTab({ animal }: AnimalPedigreeTabProps) {
  const navigate = useNavigate();

  // Helper function to find animal by ID
  const findAnimal = (animalId: string | null) => {
    if (!animalId) return null;
    return ANIMALS.find((a) => a.id === animalId);
  };

  // Helper function to handle navigation to animal details
  const handleAnimalClick = (animalId: string) => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('animalFromParent', 'true');
      sessionStorage.setItem('parentAnimalId', animal.id);
      sessionStorage.setItem('parentAnimalTab', 'pedigree');
    }
    navigate(`/cadastros/animais/${animalId}?tab=dashboard`);
  };

  // Get parents
  const father = findAnimal(animal.fatherId);
  const mother = findAnimal(animal.motherId);

  // Get grandparents
  const paternalGrandfather = father ? findAnimal(father.fatherId) : null;
  const paternalGrandmother = father ? findAnimal(father.motherId) : null;
  const maternalGrandfather = mother ? findAnimal(mother.fatherId) : null;
  const maternalGrandmother = mother ? findAnimal(mother.motherId) : null;

  return (
    <div className="space-y-4">
      {/* Current Animal */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <div>
            <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100">
              {animal.code} - {animal.registrationNumber}
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {animal.breed} {animal.bloodDegree} - {animal.bloodPercentage}% de sangue
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Nascido em {new Date(animal.birthDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Parents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Father */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Pai
                </span>
              </div>
              {father ? (
                <button
                  onClick={() => handleAnimalClick(father.id)}
                  className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded p-2 -m-2 transition-colors cursor-pointer w-full"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {father.code} - {father.registrationNumber}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {father.breed} {father.bloodDegree} - {father.bloodPercentage}% de sangue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Nascido em {new Date(father.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </button>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">
                    Pai não informado
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mother */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Mãe
                </span>
              </div>
              {mother ? (
                <button
                  onClick={() => handleAnimalClick(mother.id)}
                  className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded p-2 -m-2 transition-colors cursor-pointer w-full"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {mother.code} - {mother.registrationNumber}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mother.breed} {mother.bloodDegree} - {mother.bloodPercentage}% de sangue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Nascido em {new Date(mother.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </button>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-500 dark:text-gray-400">
                    Mãe não informada
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grandparents */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Paternal Grandfather */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Avô Paterno
                </span>
              </div>
              {paternalGrandfather ? (
                <button
                  onClick={() => handleAnimalClick(paternalGrandfather.id)}
                  className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded p-1 -m-1 transition-colors cursor-pointer w-full"
                >
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {paternalGrandfather.code} - {paternalGrandfather.registrationNumber}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {paternalGrandfather.breed} {paternalGrandfather.bloodDegree} -{' '}
                    {paternalGrandfather.bloodPercentage}% de sangue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Nascido em {new Date(paternalGrandfather.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </button>
              ) : (
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Não informado
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Paternal Grandmother */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Avó Paterna
                </span>
              </div>
              {paternalGrandmother ? (
                <button
                  onClick={() => handleAnimalClick(paternalGrandmother.id)}
                  className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded p-1 -m-1 transition-colors cursor-pointer w-full"
                >
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {paternalGrandmother.code} - {paternalGrandmother.registrationNumber}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {paternalGrandmother.breed} {paternalGrandmother.bloodDegree} -{' '}
                    {paternalGrandmother.bloodPercentage}% de sangue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Nascido em {new Date(paternalGrandmother.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </button>
              ) : (
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Não informada
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Maternal Grandfather */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Avô Materno
                </span>
              </div>
              {maternalGrandfather ? (
                <button
                  onClick={() => handleAnimalClick(maternalGrandfather.id)}
                  className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded p-1 -m-1 transition-colors cursor-pointer w-full"
                >
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {maternalGrandfather.code} - {maternalGrandfather.registrationNumber}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {maternalGrandfather.breed} {maternalGrandfather.bloodDegree} -{' '}
                    {maternalGrandfather.bloodPercentage}% de sangue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Nascido em {new Date(maternalGrandfather.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </button>
              ) : (
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Não informado
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Maternal Grandmother */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Avó Materna
                </span>
              </div>
              {maternalGrandmother ? (
                <button
                  onClick={() => handleAnimalClick(maternalGrandmother.id)}
                  className="text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded p-1 -m-1 transition-colors cursor-pointer w-full"
                >
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {maternalGrandmother.code} - {maternalGrandmother.registrationNumber}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {maternalGrandmother.breed} {maternalGrandmother.bloodDegree} -{' '}
                    {maternalGrandmother.bloodPercentage}% de sangue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Nascido em {new Date(maternalGrandmother.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </button>
              ) : (
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Não informada
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

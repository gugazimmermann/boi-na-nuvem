import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export function useAnimalNavigation() {
  const navigate = useNavigate();

  const handleAddAnimal = useCallback(() => {
    navigate('/sistema/cadastros/animais/novo');
  }, [navigate]);

  const handleEditAnimal = useCallback(
    (id: string, fromDetail = false) => {
      if (fromDetail) {
        navigate(`/sistema/cadastros/animais/editar/${id}`);
      } else {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('animalFromList', 'true');
        }
        navigate(`/sistema/cadastros/animais/editar/${id}`);
      }
    },
    [navigate],
  );

  const handleViewAnimal = useCallback(
    (id: string) => {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('animalFromList', 'true');
      }
      navigate(`/sistema/cadastros/animais/${id}`);
    },
    [navigate],
  );

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const fromList = sessionStorage.getItem('animalFromList');
      const fromProperty = sessionStorage.getItem('animalFromProperty');
      const fromLocation = sessionStorage.getItem('animalFromLocation');
      const fromParent = sessionStorage.getItem('animalFromParent');

      console.log('Navigation context:', { fromList, fromProperty, fromLocation, fromParent });

      if (fromParent === 'true') {
        sessionStorage.removeItem('animalFromParent');
        const parentAnimalId = sessionStorage.getItem('parentAnimalId');
        const parentAnimalTab = sessionStorage.getItem('parentAnimalTab');
        console.log('Navigating back to parent animal:', parentAnimalId, 'tab:', parentAnimalTab);
        if (parentAnimalId) {
          sessionStorage.removeItem('parentAnimalId');
          sessionStorage.removeItem('parentAnimalTab');
          const tabParam = parentAnimalTab ? `?tab=${parentAnimalTab}` : '';
          navigate(`/sistema/cadastros/animais/${parentAnimalId}${tabParam}`);
        } else {
          navigate('/sistema/cadastros/animais');
        }
        return;
      } else if (fromLocation === 'true') {
        sessionStorage.removeItem('animalFromLocation');
        const locationId = sessionStorage.getItem('animalLocationId');
        if (locationId) {
          sessionStorage.removeItem('animalLocationId');
          navigate(`/sistema/cadastros/localizacoes/${locationId}?tab=animals`);
        } else {
          navigate('/sistema/cadastros/localizacoes');
        }
        return;
      } else if (fromProperty === 'true') {
        sessionStorage.removeItem('animalFromProperty');
        const propertyId = sessionStorage.getItem('animalPropertyId');
        if (propertyId) {
          sessionStorage.removeItem('animalPropertyId');
          navigate(`/sistema/cadastros/propriedades/${propertyId}?tab=animals`);
        } else {
          navigate('/sistema/cadastros/propriedades');
        }
        return;
      } else if (fromList === 'true') {
        sessionStorage.removeItem('animalFromList');
        navigate('/sistema/cadastros/animais');
        return;
      }
    }

    navigate('/sistema/cadastros/animais');
  }, [navigate]);

  return {
    handleAddAnimal,
    handleEditAnimal,
    handleViewAnimal,
    handleBack,
  };
}

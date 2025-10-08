import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useEntityNavigation } from '../../shared/hooks';

export const useLocationNavigation = (cameFromDetails?: boolean, locationId?: string) => {
  const navigate = useNavigate();
  const navigation = useEntityNavigation({
    entityType: 'localização',
    listRoute: '/cadastros/localizacoes',
    newRoute: '/cadastros/localizacoes/novo',
    detailRoute: (id: string) => `/cadastros/localizacoes/${id}`,
    editRoute: (id: string) => `/cadastros/localizacoes/${id}/editar`,
  });

  const handleEditLocation = (id: string, fromDetails = false) => {
    navigation.handleEditEntity(id);
    if (fromDetails) {
      sessionStorage.setItem('editLocationFromDetails', 'true');
      sessionStorage.setItem('editLocationId', id);
    } else {
      sessionStorage.removeItem('editLocationFromDetails');
      sessionStorage.removeItem('editLocationId');
    }
  };

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const fromProperty = sessionStorage.getItem('locationFromProperty');
      const propertyId = sessionStorage.getItem('propertyId');
      const propertyTab = sessionStorage.getItem('propertyTab');

      if (fromProperty === 'true' && propertyId && propertyTab) {
        sessionStorage.removeItem('locationFromProperty');
        sessionStorage.removeItem('propertyId');
        sessionStorage.removeItem('propertyTab');

        navigate(`/cadastros/propriedades/${propertyId}?tab=${propertyTab}`);
        return;
      }
    }

    navigation.handleBack(cameFromDetails, locationId);
  }, [navigate, navigation, cameFromDetails, locationId]);

  return {
    handleAddLocation: navigation.handleAddEntity,
    handleEditLocation,
    handleViewLocation: navigation.handleViewEntity,
    handleBack,
  };
};

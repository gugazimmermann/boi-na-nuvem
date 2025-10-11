import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useEntityNavigation } from '../../shared/hooks';
import { SERVICEPROVIDER_ROUTES } from '../config/serviceProviderConfig';

export const useServiceProviderNavigation = (
  cameFromDetails?: boolean,
  serviceProviderId?: string,
) => {
  const navigate = useNavigate();
  const navigation = useEntityNavigation({
    entityType: 'prestador de serviço',
    listRoute: SERVICEPROVIDER_ROUTES.list,
    newRoute: SERVICEPROVIDER_ROUTES.new,
    detailRoute: SERVICEPROVIDER_ROUTES.detail,
    editRoute: SERVICEPROVIDER_ROUTES.edit,
  });

  const handleEditServiceProvider = (id: string, fromDetails = false) => {
    navigation.handleEditEntity(id);
    if (fromDetails) {
      sessionStorage.setItem('editServiceProviderFromDetails', 'true');
      sessionStorage.setItem('editServiceProviderId', id);
    } else {
      sessionStorage.removeItem('editServiceProviderFromDetails');
      sessionStorage.removeItem('editServiceProviderId');
    }
  };

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const fromProperty = sessionStorage.getItem('responsibleFromProperty');
      const propertyId = sessionStorage.getItem('propertyId');
      const propertyTab = sessionStorage.getItem('propertyTab');

      if (fromProperty === 'true' && propertyId && propertyTab) {
        sessionStorage.removeItem('responsibleFromProperty');
        sessionStorage.removeItem('propertyId');
        sessionStorage.removeItem('propertyTab');

        navigate(`/sistema/cadastros/propriedades/${propertyId}?tab=${propertyTab}`);
        return;
      }

      const fromLocation = sessionStorage.getItem('responsibleFromLocation');
      const locationId = sessionStorage.getItem('locationId');
      const locationTab = sessionStorage.getItem('locationTab');

      if (fromLocation === 'true' && locationId && locationTab) {
        sessionStorage.removeItem('responsibleFromLocation');
        sessionStorage.removeItem('locationId');
        sessionStorage.removeItem('locationTab');

        navigate(`/sistema/cadastros/localizacoes/${locationId}?tab=${locationTab}`);
        return;
      }
    }

    navigation.handleBack(cameFromDetails, serviceProviderId);
  }, [navigate, navigation, cameFromDetails, serviceProviderId]);

  return {
    handleAddServiceProvider: navigation.handleAddEntity,
    handleEditServiceProvider,
    handleViewServiceProvider: navigation.handleViewEntity,
    handleBack,
  };
};

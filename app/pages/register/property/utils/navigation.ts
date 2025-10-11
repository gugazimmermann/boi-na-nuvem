import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useEntityNavigation } from '../../shared/hooks';
import { PROPERTY_ROUTES } from '../config/propertyConfig';

export const usePropertyNavigation = (cameFromDetails?: boolean, propertyId?: string) => {
  const navigate = useNavigate();
  const navigation = useEntityNavigation({
    entityType: 'propriedade',
    listRoute: PROPERTY_ROUTES.list,
    newRoute: PROPERTY_ROUTES.new,
    detailRoute: PROPERTY_ROUTES.detail,
    editRoute: PROPERTY_ROUTES.edit,
  });

  const handleEditProperty = (id: string, fromDetails = false) => {
    navigation.handleEditEntity(id);
    if (fromDetails) {
      sessionStorage.setItem('editPropertyFromDetails', 'true');
      sessionStorage.setItem('editPropertyId', id);
    } else {
      sessionStorage.removeItem('editPropertyFromDetails');
      sessionStorage.removeItem('editPropertyId');
    }
  };

  const handleBack = useCallback(() => {
    const propertyDetailSource = sessionStorage.getItem('propertyDetailSource');

    if (propertyDetailSource) {
      try {
        const source = JSON.parse(propertyDetailSource);
        switch (source.type) {
          case 'supplier':
            navigate(`/sistema/cadastros/fornecedores/${source.id}`);
            break;
          case 'buyer':
            navigate(`/sistema/cadastros/compradores/${source.id}`);
            break;
          case 'employee':
            navigate(`/sistema/cadastros/colaboradores/${source.id}`);
            break;
          case 'service-provider':
            navigate(`/sistema/cadastros/prestadores-servico/${source.id}`);
            break;
          default:
            navigation.handleBack(cameFromDetails, propertyId);
        }
        sessionStorage.removeItem('propertyDetailSource');
      } catch (error) {
        navigation.handleBack(cameFromDetails, propertyId);
      }
    } else {
      navigation.handleBack(cameFromDetails, propertyId);
    }
  }, [navigate, navigation, cameFromDetails, propertyId]);

  return {
    handleAddProperty: navigation.handleAddEntity,
    handleEditProperty,
    handleViewProperty: navigation.handleViewEntity,
    handleBack,
  };
};

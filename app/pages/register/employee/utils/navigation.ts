import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useEntityNavigation } from '../../shared/hooks';
import { EMPLOYEE_ROUTES } from '../config/employeeConfig';

export const useEmployeeNavigation = (cameFromDetails?: boolean, employeeId?: string) => {
  const navigate = useNavigate();
  const navigation = useEntityNavigation({
    entityType: 'colaborador',
    listRoute: EMPLOYEE_ROUTES.list,
    newRoute: EMPLOYEE_ROUTES.new,
    detailRoute: EMPLOYEE_ROUTES.detail,
    editRoute: EMPLOYEE_ROUTES.edit,
  });

  const handleEditEmployee = (id: string, fromDetails = false) => {
    navigation.handleEditEntity(id);
    if (fromDetails) {
      sessionStorage.setItem('editEmployeeFromDetails', 'true');
      sessionStorage.setItem('editEmployeeId', id);
    } else {
      sessionStorage.removeItem('editEmployeeFromDetails');
      sessionStorage.removeItem('editEmployeeId');
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

    navigation.handleBack(cameFromDetails, employeeId);
  }, [navigate, navigation, cameFromDetails, employeeId]);

  return {
    handleAddEmployee: navigation.handleAddEntity,
    handleEditEmployee,
    handleViewEmployee: navigation.handleViewEntity,
    handleBack,
  };
};

import { useEntityNavigation } from '../../shared/hooks';
import { SUPPLIER_ROUTES } from '../config/supplierConfig';

export const useSupplierNavigation = (cameFromDetails?: boolean, supplierId?: string) => {
  const navigation = useEntityNavigation({
    entityType: 'fornecedor',
    listRoute: SUPPLIER_ROUTES.list,
    newRoute: SUPPLIER_ROUTES.new,
    detailRoute: SUPPLIER_ROUTES.detail,
    editRoute: SUPPLIER_ROUTES.edit,
  });

  const handleEditSupplier = (id: string, fromDetails = false) => {
    navigation.handleEditEntity(id);
    if (fromDetails) {
      sessionStorage.setItem('editSupplierFromDetails', 'true');
      sessionStorage.setItem('editSupplierId', id);
    } else {
      sessionStorage.removeItem('editSupplierFromDetails');
      sessionStorage.removeItem('editSupplierId');
    }
  };

  return {
    handleAddSupplier: navigation.handleAddEntity,
    handleEditSupplier,
    handleViewSupplier: navigation.handleViewEntity,
    handleBack: () => navigation.handleBack(cameFromDetails, supplierId),
  };
};

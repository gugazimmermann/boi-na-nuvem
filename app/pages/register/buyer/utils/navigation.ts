import { useEntityNavigation } from '../../shared/hooks';
import { BUYER_ROUTES } from '../config/buyerConfig';

export const useBuyerNavigation = (cameFromDetails?: boolean, buyerId?: string) => {
  const navigation = useEntityNavigation({
    entityType: 'comprador',
    listRoute: BUYER_ROUTES.list,
    newRoute: BUYER_ROUTES.new,
    detailRoute: BUYER_ROUTES.detail,
    editRoute: BUYER_ROUTES.edit,
  });

  const handleEditBuyer = (id: string, fromDetails = false) => {
    navigation.handleEditEntity(id);
    if (fromDetails) {
      sessionStorage.setItem('editBuyerFromDetails', 'true');
      sessionStorage.setItem('editBuyerId', id);
    } else {
      sessionStorage.removeItem('editBuyerFromDetails');
      sessionStorage.removeItem('editBuyerId');
    }
  };

  return {
    handleAddBuyer: navigation.handleAddEntity,
    handleEditBuyer,
    handleViewBuyer: navigation.handleViewEntity,
    handleBack: () => navigation.handleBack(cameFromDetails, buyerId),
  };
};

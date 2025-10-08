import { useNavigate } from 'react-router';

interface UseGenericEntityNavigationProps {
  routes: {
    list: string;
    new: string;
    details: (id: string) => string;
    edit: (id: string) => string;
  };
}

export const useGenericEntityNavigation = ({ routes }: UseGenericEntityNavigationProps) => {
  const navigate = useNavigate();

  const handleBack = (cameFromDetails?: boolean, entityId?: string) => {
    if (cameFromDetails && entityId) {
      navigate(routes.details(entityId));
    } else {
      navigate(routes.list);
    }
  };

  const handleEditEntity = (id: string) => {
    navigate(routes.edit(id));
  };

  const handleViewEntity = (id: string) => {
    navigate(routes.details(id));
  };

  const handleAddEntity = () => {
    navigate(routes.new);
  };

  return {
    handleBack,
    handleEditEntity,
    handleViewEntity,
    handleAddEntity,
  };
};

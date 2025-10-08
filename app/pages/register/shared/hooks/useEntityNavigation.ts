import { useCallback } from 'react';
import { useNavigate } from 'react-router';

interface UseEntityNavigationProps {
  entityType: string;
  listRoute: string;
  newRoute: string;
  detailRoute: (id: string) => string;
  editRoute: (id: string) => string;
}

export function useEntityNavigation({
  entityType,
  listRoute,
  newRoute,
  detailRoute,
  editRoute,
}: UseEntityNavigationProps) {
  const navigate = useNavigate();

  const handleAddEntity = useCallback(() => {
    navigate(newRoute);
  }, [navigate, newRoute]);

  const handleEditEntity = useCallback(
    (id: string) => {
      navigate(editRoute(id));
    },
    [navigate, editRoute],
  );

  const handleViewEntity = useCallback(
    (id: string) => {
      navigate(detailRoute(id));
    },
    [navigate, detailRoute],
  );

  const handleBack = useCallback(
    (cameFromDetails?: boolean, entityId?: string) => {
      if (cameFromDetails && entityId) {
        navigate(detailRoute(entityId));
      } else {
        navigate(listRoute);
      }
    },
    [navigate, listRoute, detailRoute],
  );

  return {
    handleAddEntity,
    handleEditEntity,
    handleViewEntity,
    handleBack,
  };
}

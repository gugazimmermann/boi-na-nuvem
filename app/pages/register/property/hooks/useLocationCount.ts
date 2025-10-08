import { useMemo, useCallback } from 'react';
import { LOCATIONS } from '~/mocks/locations-mock';

export function useLocationCount() {
  const locationCountMap = useMemo(() => {
    const map = new Map<string, number>();

    LOCATIONS.forEach((location) => {
      const currentCount = map.get(location.propertyId) || 0;
      map.set(location.propertyId, currentCount + 1);
    });

    return map;
  }, []);

  const getLocationCount = useCallback(
    (propertyId: string) => {
      return locationCountMap.get(propertyId) || 0;
    },
    [locationCountMap],
  );

  const getLocationCounts = useCallback(
    (propertyIds: string[]) => {
      return propertyIds.map((id) => ({
        propertyId: id,
        count: getLocationCount(id),
      }));
    },
    [getLocationCount],
  );

  return {
    getLocationCount,
    getLocationCounts,
    totalLocations: LOCATIONS.length,
  };
}

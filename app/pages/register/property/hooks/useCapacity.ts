import { useMemo, useCallback } from 'react';
import { LOCATIONS } from '~/mocks/locations-mock';
import { LocationStatus } from '~/types/location';

export function useCapacity() {
  const capacityMap = useMemo(() => {
    const map = new Map<string, number>();

    LOCATIONS.forEach((location) => {
      if (location.status === LocationStatus.ACTIVE) {
        const currentCapacity = map.get(location.propertyId) || 0;
        map.set(location.propertyId, currentCapacity + location.capacity);
      }
    });

    return map;
  }, []);

  const getCapacity = useCallback(
    (propertyId: string) => {
      return capacityMap.get(propertyId) || 0;
    },
    [capacityMap],
  );

  const getCapacities = useCallback(
    (propertyIds: string[]) => {
      return propertyIds.map((id) => ({
        propertyId: id,
        capacity: getCapacity(id),
      }));
    },
    [getCapacity],
  );

  return {
    getCapacity,
    getCapacities,
    totalCapacity: Array.from(capacityMap.values()).reduce((sum, capacity) => sum + capacity, 0),
  };
}

import { useMemo, useCallback } from 'react';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { LOCATIONS, LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { LocationMovimentType } from '~/types/location';

export function useAnimalCount() {
  const animalCountMap = useMemo(() => {
    const map = new Map<string, number>();

    const locationToPropertyMap = new Map<string, string>();
    LOCATIONS.forEach((location) => {
      locationToPropertyMap.set(location.id, location.propertyId);
    });

    const entryExitMovements = LOCATION_MOVEMENTS.filter(
      (movement) =>
        movement.type === LocationMovimentType.ENTRY || movement.type === LocationMovimentType.EXIT,
    );

    const animalLocationMap = new Map<string, Map<string, string[]>>();

    ANIMAL_LOCATIONS.forEach((animalLocation) => {
      const movement = entryExitMovements.find((m) => m.id === animalLocation.locationMovimentId);
      if (movement) {
        if (!animalLocationMap.has(animalLocation.animalId)) {
          animalLocationMap.set(animalLocation.animalId, new Map());
        }
        const locationMap = animalLocationMap.get(animalLocation.animalId)!;
        if (!locationMap.has(movement.locationId)) {
          locationMap.set(movement.locationId, []);
        }
        locationMap.get(movement.locationId)!.push(movement.id);
      }
    });

    animalLocationMap.forEach((locationMap, animalId) => {
      locationMap.forEach((movementIds, locationId) => {
        const movements = movementIds
          .map((id) => entryExitMovements.find((m) => m.id === id))
          .filter(Boolean);

        movements.sort(
          (a, b) => new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime(),
        );

        const lastMovement = movements[movements.length - 1];
        if (lastMovement && lastMovement.type === LocationMovimentType.ENTRY) {
          const propertyId = locationToPropertyMap.get(locationId);
          if (propertyId) {
            const currentCount = map.get(propertyId) || 0;
            map.set(propertyId, currentCount + 1);
          }
        }
      });
    });

    return map;
  }, []);

  const getAnimalCount = useCallback(
    (propertyId: string) => {
      return animalCountMap.get(propertyId) || 0;
    },
    [animalCountMap],
  );

  const getAnimalCounts = useCallback(
    (propertyIds: string[]) => {
      return propertyIds.map((id) => ({
        propertyId: id,
        count: getAnimalCount(id),
      }));
    },
    [getAnimalCount],
  );

  const totalAnimals = useMemo(() => {
    let total = 0;
    animalCountMap.forEach((count) => {
      total += count;
    });
    return total;
  }, [animalCountMap]);

  return {
    getAnimalCount,
    getAnimalCounts,
    totalAnimals,
  };
}

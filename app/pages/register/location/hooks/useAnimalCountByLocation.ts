import { useCallback } from 'react';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { LocationMovimentType } from '~/types/location';

interface UseAnimalCountByLocationReturn {
  getAnimalCountByLocation: (locationId: string) => number;
}

export function useAnimalCountByLocation(): UseAnimalCountByLocationReturn {
  const getAnimalCountByLocation = useCallback((locationId: string) => {
    const locationMovements = LOCATION_MOVEMENTS.filter(
      (movement) =>
        movement.locationId === locationId &&
        (movement.type === LocationMovimentType.ENTRY ||
          movement.type === LocationMovimentType.EXIT),
    );

    const animalLocations = ANIMAL_LOCATIONS.filter((al) =>
      locationMovements.some((movement) => movement.id === al.locationMovimentId),
    );

    let currentCount = 0;
    const animalMovementMap = new Map<string, string[]>();

    animalLocations.forEach((al) => {
      if (!animalMovementMap.has(al.animalId)) {
        animalMovementMap.set(al.animalId, []);
      }
      animalMovementMap.get(al.animalId)!.push(al.locationMovimentId);
    });

    animalMovementMap.forEach((movementIds, animalId) => {
      const movements = movementIds
        .map((id) => locationMovements.find((m) => m.id === id))
        .filter(Boolean);

      movements.sort((a, b) => new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime());

      const lastMovement = movements[movements.length - 1];
      if (lastMovement && lastMovement.type === LocationMovimentType.ENTRY) {
        currentCount++;
      }
    });

    return currentCount;
  }, []);

  return {
    getAnimalCountByLocation,
  };
}

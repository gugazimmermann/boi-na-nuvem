import { useMemo } from 'react';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { LOCATIONS } from '~/mocks/locations-mock';
import { PROPERTIES } from '~/mocks/properties-mock';
import { LocationMovimentType } from '~/types/location';

export function useAnimalLocation() {
  const getAnimalCurrentLocation = useMemo(() => {
    return (animalId: string) => {
      const animalLocations = ANIMAL_LOCATIONS.filter((al) => al.animalId === animalId);

      if (animalLocations.length === 0) {
        return { location: null, property: null, entryDate: null };
      }

      const movements = animalLocations
        .map((al) => LOCATION_MOVEMENTS.find((movement) => movement.id === al.locationMovimentId))
        .filter(Boolean);

      movements.sort((a, b) => new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime());

      let currentLocationId = null;
      let entryDate = null;

      for (let i = movements.length - 1; i >= 0; i--) {
        const movement = movements[i]!;
        if (movement.type === LocationMovimentType.ENTRY) {
          currentLocationId = movement.locationId;
          entryDate = new Date(movement.createdAt);
          break;
        }
      }

      const location = currentLocationId ? LOCATIONS.find((l) => l.id === currentLocationId) : null;

      const property = location ? PROPERTIES.find((p) => p.id === location.propertyId) : null;

      return {
        location: location ? { id: location.id, name: location.name, code: location.code } : null,
        property: property ? { id: property.id, name: property.name, code: property.code } : null,
        entryDate,
      };
    };
  }, []);

  return { getAnimalCurrentLocation };
}

import { useMemo } from 'react';
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { LOCATIONS, LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { LocationStatus, LocationMovimentType } from '~/types/location';
import type { Property } from '~/types/property';

interface PropertyDashboardTabProps {
  property: Property;
}

export function PropertyDashboardTab({ property }: PropertyDashboardTabProps) {
  // Get property statistics
  const propertyLocations = useMemo(
    () => LOCATIONS.filter((location) => location.propertyId === property.id),
    [property.id],
  );

  const totalAnimals = useMemo(() => {
    // Get all ENTRY and EXIT movements for property locations
    const propertyLocationIds = propertyLocations.map((loc) => loc.id);
    const entryExitMovements = LOCATION_MOVEMENTS.filter(
      (movement) =>
        propertyLocationIds.includes(movement.locationId) &&
        (movement.type === LocationMovimentType.ENTRY ||
          movement.type === LocationMovimentType.EXIT),
    );

    // Group animal movements by animal ID and location
    const animalLocationMap = new Map<string, Map<string, string[]>>(); // animalId -> locationId -> movementIds

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

    // Count animals currently in any property location
    let totalCount = 0;
    animalLocationMap.forEach((locationMap, animalId) => {
      locationMap.forEach((movementIds, locationId) => {
        const movements = movementIds
          .map((id) => entryExitMovements.find((m) => m.id === id))
          .filter(Boolean);

        // Sort by creation date to get chronological order
        movements.sort(
          (a, b) => new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime(),
        );

        // Check if the last movement is an ENTRY (animal is currently in location)
        const lastMovement = movements[movements.length - 1];
        if (lastMovement && lastMovement.type === LocationMovimentType.ENTRY) {
          totalCount++;
        }
      });
    });

    return totalCount;
  }, [propertyLocations]);

  const activeLocations = useMemo(
    () => propertyLocations.filter((loc) => loc.status === LocationStatus.ACTIVE).length,
    [propertyLocations],
  );

  const totalArea = useMemo(
    () =>
      propertyLocations.reduce((sum, loc) => {
        const areaInHectares = loc.areaType === 'm²' ? loc.area / 10000 : loc.area;
        return sum + areaInHectares;
      }, 0),
    [propertyLocations],
  );

  // Calculate capacity utilization
  const totalCapacity = useMemo(
    () => propertyLocations.reduce((sum, loc) => sum + loc.capacity, 0),
    [propertyLocations],
  );

  const capacityUtilization = useMemo(
    () => (totalCapacity > 0 ? Math.round((totalAnimals / totalCapacity) * 100) : 0),
    [totalCapacity, totalAnimals],
  );

  return (
    <div className="space-y-4">
      {/* First Row: Area Total and Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Total Area */}
        <InfoCard
          title="Área Total"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          }
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.ORANGE.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.ORANGE.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
              {totalArea.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">hectares</div>
          </div>
        </InfoCard>

        {/* Locations */}
        <InfoCard
          title="Localizações"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.TEAL.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.TEAL.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">
              {propertyLocations.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{activeLocations} ativas</div>
          </div>
        </InfoCard>
      </div>

      {/* Second Row: Capacity Total, Total Animals and Occupancy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Total Capacity */}
        <InfoCard
          title="Capacidade Total"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.SKY.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.SKY.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-1">
              {totalCapacity.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">animais</div>
          </div>
        </InfoCard>

        {/* Total Animals */}
        <InfoCard
          title="Total de Animais"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          }
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.INDIGO.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.INDIGO.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              {totalAnimals}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">animais ativos</div>
          </div>
        </InfoCard>

        {/* Capacity Utilization */}
        <InfoCard
          title="Ocupação"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.ROSE.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.ROSE.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-1">
              {capacityUtilization}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">da capacidade</div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

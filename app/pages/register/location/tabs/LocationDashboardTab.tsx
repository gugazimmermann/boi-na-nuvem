import { useMemo } from 'react';
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { PropertyStatusBadge } from '../../property/components/PropertyStatusBadge';
import { ANIMAL_LOCATIONS } from '~/mocks/animals-mock';
import { LOCATION_MOVEMENTS } from '~/mocks/locations-mock';
import { PROPERTIES } from '~/mocks/properties-mock';
import { LocationMovimentType } from '~/types/location';
import type { Location } from '~/types/location';

interface LocationDashboardTabProps {
  location: Location;
}

export function LocationDashboardTab({ location }: LocationDashboardTabProps) {
  // Get property information
  const property = useMemo(
    () => PROPERTIES.find((p) => p.id === location.propertyId),
    [location.propertyId],
  );

  // Get animal count for this location
  const totalAnimals = useMemo(() => {
    // Get all movements for this location
    const locationMovements = LOCATION_MOVEMENTS.filter(
      (movement) =>
        movement.locationId === location.id &&
        (movement.type === LocationMovimentType.ENTRY ||
          movement.type === LocationMovimentType.EXIT),
    );

    // Get all animal locations that reference these movements
    const animalLocations = ANIMAL_LOCATIONS.filter((al) =>
      locationMovements.some((movement) => movement.id === al.locationMovimentId),
    );

    // Count animals currently in location (ENTRY movements without corresponding EXIT)
    let currentCount = 0;
    const animalMovementMap = new Map<string, string[]>(); // animalId -> movementIds

    // Group animal movements by animal ID
    animalLocations.forEach((al) => {
      if (!animalMovementMap.has(al.animalId)) {
        animalMovementMap.set(al.animalId, []);
      }
      animalMovementMap.get(al.animalId)!.push(al.locationMovimentId);
    });

    // For each animal, check if they're currently in the location
    animalMovementMap.forEach((movementIds, animalId) => {
      const movements = movementIds
        .map((id) => locationMovements.find((m) => m.id === id))
        .filter(Boolean);

      // Sort by creation date to get chronological order
      movements.sort((a, b) => new Date(a!.createdAt).getTime() - new Date(b!.createdAt).getTime());

      // Check if the last movement is an ENTRY (animal is currently in location)
      const lastMovement = movements[movements.length - 1];
      if (lastMovement && lastMovement.type === LocationMovimentType.ENTRY) {
        currentCount++;
      }
    });

    return currentCount;
  }, [location.id]);

  // Calculate capacity utilization
  const capacityUtilization = useMemo(
    () => (location.capacity > 0 ? Math.round((totalAnimals / location.capacity) * 100) : 0),
    [location.capacity, totalAnimals],
  );

  return (
    <div className="space-y-2">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Area */}
        <InfoCard
          title="Área"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.LIME.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.LIME.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-lime-600 dark:text-lime-400 mb-1">
              {location.area.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{location.areaType}</div>
          </div>
        </InfoCard>

        {/* Capacity */}
        <InfoCard
          title="Capacidade"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.CYAN.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.CYAN.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
              {location.capacity.toLocaleString('pt-BR')}
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.PINK.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.PINK.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.SLATE.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.SLATE.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-1">
              {capacityUtilization}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">da capacidade</div>
          </div>
        </InfoCard>
      </div>

      {/* Property Information */}
      <div className="grid grid-cols-1 gap-4">
        <InfoCard
          title="Informações da Propriedade"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.to}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Propriedade:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {property?.name || 'Não informado'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Código:</span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {property?.code || 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
              {property?.status ? (
                <PropertyStatusBadge status={property.status} />
              ) : (
                <span className="text-sm text-gray-900 dark:text-gray-100">N/A</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Localização:
              </span>
              <span className="text-sm text-gray-900 dark:text-gray-100">
                {property?.city && property?.state
                  ? `${property.city}, ${property.state} - ${property.country}`
                  : 'Não informado'}
              </span>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}

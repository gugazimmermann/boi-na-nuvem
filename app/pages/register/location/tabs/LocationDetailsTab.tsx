import { useMemo } from 'react';
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { InfoItem, INFO_ITEM_CONSTANTS } from '~/components/info-item';
import { LocationStatusBadge } from '../components/LocationStatusBadge';
import { PropertyStatusBadge } from '../../property/components/PropertyStatusBadge';
import { PROPERTIES } from '~/mocks/properties-mock';
import type { Location } from '~/types/location';
import { LocationType } from '~/types/location';

// Função para traduzir o tipo da localização
const translateLocationType = (type: LocationType): string => {
  const typeLabels = {
    [LocationType.LIVESTOCK]: 'Pecuária',
    [LocationType.CULTIVATION]: 'Cultivo',
    [LocationType.STORAGE]: 'Armazenamento',
    [LocationType.CONFINEMENT]: 'Confinamento',
    [LocationType.SEMI_CONFINEMENT]: 'Semi-confinamento',
  };
  return typeLabels[type] || type;
};

interface LocationDetailsTabProps {
  location: Location;
}

export function LocationDetailsTab({ location }: LocationDetailsTabProps) {
  // Get property information
  const property = useMemo(
    () => PROPERTIES.find((p) => p.id === location.propertyId),
    [location.propertyId],
  );

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <InfoCard
        title="Informações Básicas"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.to}
      >
        <dl className="space-y-6">
          {/* First row: Código and Nome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              }
              label="Código"
              value={<span className="text-lg font-semibold cursor-pointer">{location.code}</span>}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.BLUE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.BLUE}
            />

            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              label="Nome"
              value={<span className="text-lg font-semibold cursor-pointer">{location.name}</span>}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.GREEN}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.GREEN}
            />
          </div>

          {/* Second row: Tipo and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              }
              label="Tipo"
              value={
                <span className="text-lg font-semibold">
                  {translateLocationType(location.type)}
                </span>
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.ORANGE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.ORANGE}
            />

            <InfoItem
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              label="Status"
              value={<LocationStatusBadge status={location.status} />}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.PURPLE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.PURPLE}
            />
          </div>
        </dl>
      </InfoCard>

      {/* Characteristics */}
      <InfoCard
        title="Características"
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
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.to}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <InfoItem
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
              label="Área"
              value={
                <span className="text-lg font-semibold">
                  {location.area.toLocaleString('pt-BR')} {location.areaType}
                </span>
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.EMERALD}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.EMERALD}
            />

            <InfoItem
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
              label="Capacidade"
              value={
                <span className="text-lg font-semibold">
                  {location.capacity.toLocaleString('pt-BR')} animais
                </span>
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.TEAL}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.TEAL}
            />
          </div>

          <div className="space-y-3">
            {location.description && (
              <InfoItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                label="Descrição"
                value={location.description}
                iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.CYAN}
                iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.CYAN}
              />
            )}
          </div>
        </dl>
      </InfoCard>

      {/* Property Information */}
      {property && (
        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg border border-violet-200 dark:border-violet-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{property.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Código: {property.code}</p>
              </div>
            </div>
            <PropertyStatusBadge status={property.status} />
          </div>
        </div>
      )}
    </div>
  );
}

import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { InfoItem, INFO_ITEM_CONSTANTS } from '~/components/info-item';
import { MapWithFallback } from '~/components/map';
import { PropertyStatusBadge } from '../components/PropertyStatusBadge';
import type { Property } from '~/types/property';

interface PropertyDetailsTabProps {
  property: Property;
}

export function PropertyDetailsTab({ property }: PropertyDetailsTabProps) {
  return (
    <div className="space-y-4">
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
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
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
              value={<span className="text-lg font-semibold cursor-pointer">{property.code}</span>}
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              label="Nome"
              value={<span className="text-lg font-semibold cursor-pointer">{property.name}</span>}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.GREEN}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.GREEN}
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
              value={<PropertyStatusBadge status={property.status} />}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.PURPLE}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.PURPLE}
            />
          </div>

          <div className="space-y-3">
            {property.description && (
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
                value={property.description}
                iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.ORANGE}
                iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.ORANGE}
              />
            )}
          </div>
        </dl>
      </InfoCard>

      {/* Location Information */}
      <InfoCard
        title="Localização"
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
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.to}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <InfoItem
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
              label="Endereço"
              value={
                [property.street, property.number, property.neighborhood]
                  .filter(Boolean)
                  .join(', ') || 'Não informado'
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              label="Cidade/Estado/País"
              value={(() => {
                const parts = [];
                if (property.city) parts.push(property.city);
                if (property.state) parts.push(property.state);
                if (property.country) parts.push(property.country);

                if (parts.length === 0) return 'Não informado';

                // Formato: Cidade, Estado - País
                if (parts.length === 1) return parts[0];
                if (parts.length === 2) return `${parts[0]}, ${parts[1]}`;
                if (parts.length === 3) return `${parts[0]}, ${parts[1]} - ${parts[2]}`;

                return parts.join(', ');
              })()}
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.TEAL}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.TEAL}
            />

            {property.zipCode && (
              <InfoItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                label="CEP"
                value={
                  <span className="font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    {property.zipCode}
                  </span>
                }
                iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.INDIGO}
                iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.INDIGO}
              />
            )}

            {property.latitude && property.longitude && (
              <InfoItem
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                }
                label="Coordenadas"
                value={
                  <span className="font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    {property.latitude.toFixed(6)}, {property.longitude.toFixed(6)}
                  </span>
                }
                iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.CYAN}
                iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.CYAN}
              />
            )}
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <dt className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Mapa
                </dt>
              </div>
              <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-md">
                <MapWithFallback
                  latitude={property.latitude}
                  longitude={property.longitude}
                  address={(() => {
                    const addressParts = [];
                    if (property.street) addressParts.push(property.street);
                    if (property.number) addressParts.push(property.number);
                    if (property.neighborhood) addressParts.push(property.neighborhood);
                    if (property.city) addressParts.push(property.city);
                    if (property.state) addressParts.push(property.state);
                    if (property.country) addressParts.push(property.country);
                    return addressParts.join(', ') || undefined;
                  })()}
                  height="250px"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </dl>
      </InfoCard>
    </div>
  );
}

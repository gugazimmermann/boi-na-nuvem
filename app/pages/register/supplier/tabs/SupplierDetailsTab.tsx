import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { InfoItem, INFO_ITEM_CONSTANTS } from '~/components/info-item';
import { MapWithFallback } from '~/components/map';
import type { Supplier } from '~/types/supplier';

interface SupplierDetailsTabProps {
  supplier: Supplier;
}

export function SupplierDetailsTab({ supplier }: SupplierDetailsTabProps) {
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
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              label="Nome da Empresa"
              value={<span className="text-lg font-semibold cursor-pointer">{supplier.name}</span>}
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              label="CNPJ"
              value={
                supplier.cnpj ? (
                  <span className="font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm">
                    {supplier.cnpj}
                  </span>
                ) : (
                  <span className="text-gray-500 italic">Não informado</span>
                )
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.INDIGO}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.INDIGO}
            />
          </div>

          <div className="space-y-3">
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
              label="Email"
              value={
                <a
                  href={`mailto:${supplier.email}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {supplier.email}
                </a>
              }
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              label="Telefone"
              value={
                <a
                  href={`tel:${supplier.phone}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {supplier.phone}
                </a>
              }
              iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.EMERALD}
              iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.EMERALD}
            />
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
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                [supplier.street, supplier.number, supplier.neighborhood]
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
                if (supplier.city) parts.push(supplier.city);
                if (supplier.state) parts.push(supplier.state);
                if (supplier.country) parts.push(supplier.country);

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

            {supplier.zipCode && (
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
                label="CEP"
                value={supplier.zipCode}
                iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.ORANGE}
                iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.ORANGE}
              />
            )}

            {supplier.latitude && supplier.longitude && (
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
                    {supplier.latitude.toFixed(6)}, {supplier.longitude.toFixed(6)}
                  </span>
                }
                iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.CYAN}
                iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.CYAN}
              />
            )}
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-3 mb-4">
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
              <div className="rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-lg">
                <MapWithFallback
                  latitude={supplier.latitude}
                  longitude={supplier.longitude}
                  address={(() => {
                    const addressParts = [];
                    if (supplier.street) addressParts.push(supplier.street);
                    if (supplier.number) addressParts.push(supplier.number);
                    if (supplier.neighborhood) addressParts.push(supplier.neighborhood);
                    if (supplier.city) addressParts.push(supplier.city);
                    if (supplier.state) addressParts.push(supplier.state);
                    if (supplier.country) addressParts.push(supplier.country);
                    return addressParts.join(', ') || undefined;
                  })()}
                  height="300px"
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

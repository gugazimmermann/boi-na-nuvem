import { useMemo } from 'react';
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';
import { PROPERTYHASSUPPLIER } from '~/mocks/supplier-mock';
import { PROPERTIES } from '~/mocks/properties-mock';
import type { Supplier } from '~/types/supplier';

interface SupplierDashboardTabProps {
  supplier: Supplier;
}

export function SupplierDashboardTab({ supplier }: SupplierDashboardTabProps) {
  // Get supplier statistics
  const supplierProperties = useMemo(
    () => PROPERTYHASSUPPLIER.filter((sup) => sup.supplierId === supplier.id),
    [supplier.id],
  );

  const totalProperties = useMemo(() => {
    return supplierProperties.length;
  }, [supplierProperties]);

  const activeProperties = useMemo(() => {
    const propertyIds = supplierProperties.map((sup) => sup.propertyId);
    return PROPERTIES.filter((prop) => propertyIds.includes(prop.id) && prop.status === 'active')
      .length;
  }, [supplierProperties]);

  const totalLocations = useMemo(() => {
    const propertyIds = supplierProperties.map((sup) => sup.propertyId);
    // This would need to be calculated based on actual location data
    // For now, we'll use a simple calculation
    return propertyIds.length * 3; // Assuming 3 locations per property on average
  }, [supplierProperties]);

  const totalAnimals = useMemo(() => {
    const propertyIds = supplierProperties.map((sup) => sup.propertyId);
    // This would need to be calculated based on actual animal data
    // For now, we'll use a simple calculation
    return propertyIds.length * 50; // Assuming 50 animals per property on average
  }, [supplierProperties]);

  return (
    <div className="space-y-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Properties */}
        <InfoCard
          title="Propriedades Atendidas"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.GREEN.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.GREEN.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {totalProperties}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">propriedades</div>
          </div>
        </InfoCard>

        {/* Active Properties */}
        <InfoCard
          title="Propriedades Ativas"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.VIOLET.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.VIOLET.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-1">
              {activeProperties}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">propriedades ativas</div>
          </div>
        </InfoCard>

        {/* Total Locations */}
        <InfoCard
          title="Localizações Atendidas"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.AMBER.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.AMBER.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
              {totalLocations}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">localizações</div>
          </div>
        </InfoCard>

        {/* Total Animals */}
        <InfoCard
          title="Animais Atendidos"
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
          gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.RED.from}
          gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.RED.to}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
              {totalAnimals}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">animais</div>
          </div>
        </InfoCard>
      </div>

      {/* Contact Information */}
      <InfoCard
        title="Contato"
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
        gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.from}
        gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.EMERALD.to}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email:</span>
            <a
              href={`mailto:${supplier.email}`}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              {supplier.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Telefone:</span>
            <a
              href={`tel:${supplier.phone}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              {supplier.phone}
            </a>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}

import type { Route } from '../routes/+types/home';
import { StatsCard } from '../components/stats-card';
import { InfoCard } from '../components/info-card';
import { Button } from '../components/button';
import { useAuth } from '../contexts/AuthContext';
import { useAnimals } from '../hooks/useAnimals';
import { useProperties } from '../hooks/useProperties';
import { useEmployees } from '../hooks/useEmployees';
import { useLocations } from '../hooks/useLocations';
import { useBuyers } from '../hooks/useBuyers';
import { useSuppliers } from '../hooks/useSuppliers';
import { useServiceProviders } from '../hooks/useServiceProviders';

// Icons
const AnimalIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

const PropertyIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);

const EmployeeIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5 12.01 8.99A2.5 2.5 0 0 0 10 8H8.46c-.8 0-1.54.37-2.01.99L4 10.5V22h2v-6h2.5l2.5-7.5h2l2.5 7.5H16v6h4z" />
    </svg>
);

const LocationIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);

const BuyerIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
);

const SupplierIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
);

const ServiceIcon = () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Dashboard` },
        {
            name: 'description',
            content:
                'Dashboard principal do Boi na Nuvem - Sistema de gestão de propriedades rurais e localizações',
        },
        { name: 'keywords', content: 'boi na nuvem, gestão rural, propriedades, dashboard, fazenda' },
        { property: 'og:title', content: 'Boi na Nuvem - Dashboard' },
        {
            property: 'og:description',
            content: 'Dashboard principal do Boi na Nuvem - Sistema de gestão de propriedades rurais',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Boi na Nuvem - Dashboard' },
        {
            name: 'twitter:description',
            content: 'Dashboard principal do Boi na Nuvem - Sistema de gestão de propriedades rurais',
        },
    ];
}

export default function Home() {
    const { user, logout } = useAuth();
    const { animals, loading: animalsLoading } = useAnimals();
    const { properties, loading: propertiesLoading } = useProperties();
    const { employees, loading: employeesLoading } = useEmployees();
    const { locations, loading: locationsLoading } = useLocations();
    const { buyers, loading: buyersLoading } = useBuyers();
    const { suppliers, loading: suppliersLoading } = useSuppliers();
    const { serviceProviders, loading: serviceProvidersLoading } = useServiceProviders();

    const isLoading =
        animalsLoading ||
        propertiesLoading ||
        employeesLoading ||
        locationsLoading ||
        buyersLoading ||
        suppliersLoading ||
        serviceProvidersLoading;

    // Calculate statistics
    const totalAnimals = animals?.length || 0;
    const totalProperties = properties?.length || 0;
    const totalEmployees = employees?.length || 0;
    const totalLocations = locations?.length || 0;
    const totalBuyers = buyers?.length || 0;
    const totalSuppliers = suppliers?.length || 0;
    const totalServiceProviders = serviceProviders?.length || 0;

    // Calculate active entities (not deleted)
    const activeAnimals = animals?.filter((animal) => !animal.deletedAt).length || 0;
    const activeProperties = properties?.filter((property) => !property.deletedAt).length || 0;
    const activeEmployees = employees?.filter((employee) => !employee.deletedAt).length || 0;
    const activeLocations = locations?.filter((location) => !location.deletedAt).length || 0;
    const activeBuyers = buyers?.filter((buyer) => !buyer.deletedAt).length || 0;
    const activeSuppliers = suppliers?.filter((supplier) => !supplier.deletedAt).length || 0;
    const activeServiceProviders = serviceProviders?.filter((sp) => !sp.deletedAt).length || 0;

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Geral</h1>
                    <p className="text-gray-600 dark:text-gray-400">Visão geral do sistema de gestão rural</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.email}
                        </p>
                    </div>
                    <Button
                        onClick={logout}
                        config={{
                            variant: 'error',
                            size: 'md',
                        }}
                    >
                        Sair
                    </Button>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatsCard
                    title="Animais"
                    icon={<AnimalIcon />}
                    value={totalAnimals}
                    description={`${activeAnimals} ativos`}
                    progressPercentage={(activeAnimals / Math.max(totalAnimals, 1)) * 100}
                    gradientFrom="from-green-500"
                    gradientTo="to-green-600"
                    iconBgFrom="from-green-100"
                    iconBgTo="to-green-200"
                    iconTextColor="text-green-600"
                />

                <StatsCard
                    title="Propriedades"
                    icon={<PropertyIcon />}
                    value={totalProperties}
                    description={`${activeProperties} ativas`}
                    progressPercentage={(activeProperties / Math.max(totalProperties, 1)) * 100}
                    gradientFrom="from-sky-600"
                    gradientTo="to-sky-600"
                    iconBgFrom="from-sky-100"
                    iconBgTo="to-sky-200"
                    iconTextColor="text-sky-600"
                />

                <StatsCard
                    title="Colaboradores"
                    icon={<EmployeeIcon />}
                    value={totalEmployees}
                    description={`${activeEmployees} ativos`}
                    progressPercentage={(activeEmployees / Math.max(totalEmployees, 1)) * 100}
                    gradientFrom="from-sky-600"
                    gradientTo="to-sky-600"
                    iconBgFrom="from-sky-100"
                    iconBgTo="to-sky-200"
                    iconTextColor="text-sky-600"
                />

                <StatsCard
                    title="Localizações"
                    icon={<LocationIcon />}
                    value={totalLocations}
                    description={`${activeLocations} ativas`}
                    progressPercentage={(activeLocations / Math.max(totalLocations, 1)) * 100}
                    gradientFrom="from-orange-500"
                    gradientTo="to-orange-600"
                    iconBgFrom="from-orange-100"
                    iconBgTo="to-orange-200"
                    iconTextColor="text-orange-600"
                />

                <StatsCard
                    title="Compradores"
                    icon={<BuyerIcon />}
                    value={totalBuyers}
                    description={`${activeBuyers} ativos`}
                    progressPercentage={(activeBuyers / Math.max(totalBuyers, 1)) * 100}
                    gradientFrom="from-teal-500"
                    gradientTo="to-teal-600"
                    iconBgFrom="from-teal-100"
                    iconBgTo="to-teal-200"
                    iconTextColor="text-teal-600"
                />

                <StatsCard
                    title="Fornecedores"
                    icon={<SupplierIcon />}
                    value={totalSuppliers}
                    description={`${activeSuppliers} ativos`}
                    progressPercentage={(activeSuppliers / Math.max(totalSuppliers, 1)) * 100}
                    gradientFrom="from-indigo-500"
                    gradientTo="to-indigo-600"
                    iconBgFrom="from-indigo-100"
                    iconBgTo="to-indigo-200"
                    iconTextColor="text-indigo-600"
                />

                <StatsCard
                    title="Prestadores"
                    icon={<ServiceIcon />}
                    value={totalServiceProviders}
                    description={`${activeServiceProviders} ativos`}
                    progressPercentage={(activeServiceProviders / Math.max(totalServiceProviders, 1)) * 100}
                    gradientFrom="from-pink-500"
                    gradientTo="to-pink-600"
                    iconBgFrom="from-pink-100"
                    iconBgTo="to-pink-200"
                    iconTextColor="text-pink-600"
                />
            </div>

            {/* Info Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InfoCard
                    title="Resumo Geral"
                    icon={<AnimalIcon />}
                    gradientFrom="from-stone-800"
                    gradientTo="to-stone-600"
                >
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total de Entidades:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {totalAnimals +
                                    totalProperties +
                                    totalEmployees +
                                    totalLocations +
                                    totalBuyers +
                                    totalSuppliers +
                                    totalServiceProviders}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Entidades Ativas:</span>
                            <span className="font-semibold text-green-600">
                                {activeAnimals +
                                    activeProperties +
                                    activeEmployees +
                                    activeLocations +
                                    activeBuyers +
                                    activeSuppliers +
                                    activeServiceProviders}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Taxa de Atividade:</span>
                            <span className="font-semibold text-sky-600">
                                {Math.round(
                                    ((activeAnimals +
                                        activeProperties +
                                        activeEmployees +
                                        activeLocations +
                                        activeBuyers +
                                        activeSuppliers +
                                        activeServiceProviders) /
                                        Math.max(
                                            totalAnimals +
                                            totalProperties +
                                            totalEmployees +
                                            totalLocations +
                                            totalBuyers +
                                            totalSuppliers +
                                            totalServiceProviders,
                                            1,
                                        )) *
                                    100,
                                )}
                                %
                            </span>
                        </div>
                    </div>
                </InfoCard>

                <InfoCard
                    title="Sistema"
                    icon={<PropertyIcon />}
                    gradientFrom="from-sky-600"
                    gradientTo="to-sky-600"
                >
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Online
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Versão:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">1.0.1</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Última Atualização:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                06/10/2025
                            </span>
                        </div>
                    </div>
                </InfoCard>
            </div>
        </div>
    );
}

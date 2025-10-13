import type { Route } from './+types/property-management';
import PropertyManagement from '~/pages/PropertyManagement';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Gestão de Propriedades - Boi na Nuvem' },
    { name: 'description', content: 'Gerencie suas propriedades e visualize informações detalhadas' },
  ];
}

export default function PropertyManagementRoute() {
  return <PropertyManagement />;
}

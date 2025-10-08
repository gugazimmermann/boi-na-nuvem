import type { Route } from './+types/$id';
import LocationDetailPage from '~/pages/register/location/LocationDetail';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Localização ${params.id}` },
    {
      name: 'description',
      content: `Visualize os detalhes da localização ${params.id} no Boi na Nuvem. Informações completas sobre coordenadas, endereço e dados geográficos`,
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, localização rural, detalhes geográficos, coordenadas, endereço rural, mapas',
    },
    { property: 'og:title', content: `Boi na Nuvem - Localização ${params.id}` },
    {
      property: 'og:description',
      content: `Visualize os detalhes da localização ${params.id} no Boi na Nuvem`,
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: `Boi na Nuvem - Localização ${params.id}` },
    {
      name: 'twitter:description',
      content: `Visualize os detalhes da localização ${params.id} no Boi na Nuvem`,
    },
  ];
}

export default function LocationDetailRoute() {
  return <LocationDetailPage />;
}

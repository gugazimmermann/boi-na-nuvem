import type { Route } from './+types/Location';
import LocationPage from '~/pages/register/location/Location';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Localizações` },
    {
      name: 'description',
      content:
        'Gerencie as localizações das suas propriedades no Boi na Nuvem. Visualize, adicione e edite informações de localização das suas fazendas',
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, localizações, gestão de localização, coordenadas, endereços rurais, mapas',
    },
    { property: 'og:title', content: 'Boi na Nuvem - Localizações' },
    {
      property: 'og:description',
      content: 'Gerencie as localizações das suas propriedades no Boi na Nuvem',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Localizações' },
    {
      name: 'twitter:description',
      content: 'Gerencie as localizações das suas propriedades no Boi na Nuvem',
    },
  ];
}

export default function LocationRoute() {
  return <LocationPage />;
}

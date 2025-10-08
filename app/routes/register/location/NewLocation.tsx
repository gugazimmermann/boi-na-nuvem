import type { Route } from './+types/NewLocation';
import NewLocationPage from '~/pages/register/location/NewLocation';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Nova Localização` },
    {
      name: 'description',
      content:
        'Cadastre uma nova localização no Boi na Nuvem. Adicione informações detalhadas sobre coordenadas, endereço e dados geográficos',
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, nova localização, cadastro de coordenadas, adicionar endereço, registro geográfico',
    },
    { property: 'og:title', content: 'Boi na Nuvem - Nova Localização' },
    { property: 'og:description', content: 'Cadastre uma nova localização no Boi na Nuvem' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Nova Localização' },
    { name: 'twitter:description', content: 'Cadastre uma nova localização no Boi na Nuvem' },
  ];
}

export default function NewLocationRoute() {
  return <NewLocationPage />;
}

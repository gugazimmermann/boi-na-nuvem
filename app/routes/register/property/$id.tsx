import type { Route } from './+types/$id';
import PropertyDetailPage from '~/pages/register/property/PropertyDetail';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Propriedade ${params.id}` },
    {
      name: 'description',
      content: `Visualize os detalhes da propriedade ${params.id} no Boi na Nuvem. Informações completas sobre a fazenda, localização e dados da propriedade`,
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, propriedade rural, detalhes da fazenda, informações da propriedade, gestão rural',
    },
    { property: 'og:title', content: `Boi na Nuvem - Propriedade ${params.id}` },
    {
      property: 'og:description',
      content: `Visualize os detalhes da propriedade ${params.id} no Boi na Nuvem`,
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: `Boi na Nuvem - Propriedade ${params.id}` },
    {
      name: 'twitter:description',
      content: `Visualize os detalhes da propriedade ${params.id} no Boi na Nuvem`,
    },
  ];
}

export default function PropertyDetail() {
  return <PropertyDetailPage />;
}

import type { Route } from './+types/$id';
import AnimalDetailPage from '~/pages/register/animal/AnimalDetail';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Animal ${params.id}` },
    {
      name: 'description',
      content: `Visualize os detalhes do animal ${params.id} no Boi na Nuvem. Informações completas sobre pedigree, saúde, histórico e dados do animal`,
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, animal rural, detalhes do animal, pedigree, saúde animal, histórico animal, gado',
    },
    { property: 'og:title', content: `Boi na Nuvem - Animal ${params.id}` },
    {
      property: 'og:description',
      content: `Visualize os detalhes do animal ${params.id} no Boi na Nuvem`,
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: `Boi na Nuvem - Animal ${params.id}` },
    {
      name: 'twitter:description',
      content: `Visualize os detalhes do animal ${params.id} no Boi na Nuvem`,
    },
  ];
}

export default function AnimalDetailRoute() {
  return <AnimalDetailPage />;
}

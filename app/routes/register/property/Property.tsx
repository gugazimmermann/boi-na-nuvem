import type { Route } from './+types/Property';
import PropertyPage from '~/pages/register/property/Property';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Propriedades` },
    {
      name: 'description',
      content:
        'Gerencie suas propriedades rurais no Boi na Nuvem. Visualize, adicione e edite informações das suas fazendas e propriedades',
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, propriedades rurais, gestão de fazendas, cadastro de propriedades, administração rural',
    },
    { property: 'og:title', content: 'Boi na Nuvem - Propriedades' },
    { property: 'og:description', content: 'Gerencie suas propriedades rurais no Boi na Nuvem' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Propriedades' },
    { name: 'twitter:description', content: 'Gerencie suas propriedades rurais no Boi na Nuvem' },
  ];
}

export default function Property() {
  return <PropertyPage />;
}

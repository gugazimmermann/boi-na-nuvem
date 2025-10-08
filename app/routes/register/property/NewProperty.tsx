import type { Route } from './+types/NewProperty';
import NewPropertyPage from '~/pages/register/property/NewProperty';

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Nova Propriedade` },
    {
      name: 'description',
      content:
        'Cadastre uma nova propriedade rural no Boi na Nuvem. Adicione informações detalhadas sobre sua fazenda ou propriedade',
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, nova propriedade, cadastro rural, adicionar fazenda, registro de propriedade',
    },
    { property: 'og:title', content: 'Boi na Nuvem - Nova Propriedade' },
    { property: 'og:description', content: 'Cadastre uma nova propriedade rural no Boi na Nuvem' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Nova Propriedade' },
    { name: 'twitter:description', content: 'Cadastre uma nova propriedade rural no Boi na Nuvem' },
  ];
}

export default function NewProperty() {
  return <NewPropertyPage />;
}

import type { Route } from './+types/editar.$id';
import EditLocationPage from '~/pages/register/location/EditLocation';

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Editar Localização ${params.id}`,
    },
    {
      name: 'description',
      content: `Edite as informações da localização ${params.id} no Boi na Nuvem. Atualize coordenadas, endereço e outros dados geográficos`,
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, editar localização, atualizar coordenadas, modificar endereço, gestão geográfica',
    },
    { property: 'og:title', content: `Boi na Nuvem - Editar Localização ${params.id}` },
    {
      property: 'og:description',
      content: `Edite as informações da localização ${params.id} no Boi na Nuvem`,
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: `Boi na Nuvem - Editar Localização ${params.id}` },
    {
      name: 'twitter:description',
      content: `Edite as informações da localização ${params.id} no Boi na Nuvem`,
    },
  ];
}

export default function EditLocationRoute() {
  return <EditLocationPage />;
}

import type { Route } from './+types/editar.$id';
import EditPropertyPage from '~/pages/register/property/EditProperty';

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Editar Propriedade ${params.id}`,
    },
    {
      name: 'description',
      content: `Edite as informações da propriedade ${params.id} no Boi na Nuvem. Atualize dados da fazenda, localização e outras informações da propriedade`,
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, editar propriedade, atualizar fazenda, modificar propriedade rural, gestão rural',
    },
    { property: 'og:title', content: `Boi na Nuvem - Editar Propriedade ${params.id}` },
    {
      property: 'og:description',
      content: `Edite as informações da propriedade ${params.id} no Boi na Nuvem`,
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: `Boi na Nuvem - Editar Propriedade ${params.id}` },
    {
      name: 'twitter:description',
      content: `Edite as informações da propriedade ${params.id} no Boi na Nuvem`,
    },
  ];
}

export default function EditProperty() {
  return <EditPropertyPage />;
}

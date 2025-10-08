import React from 'react';
import PropertyDetailPage from '../../../pages/register/property/PropertyDetail';

export function meta() {
  return [
    { title: `Boi na Nuvem - Detalhes da Propriedade` },
    {
      name: 'description',
      content:
        'Visualize os detalhes completos da propriedade no Boi na Nuvem. Informações sobre a fazenda, localização e dados da propriedade',
    },
    {
      name: 'keywords',
      content:
        'boi na nuvem, detalhes da propriedade, informações da fazenda, dados rurais, gestão de propriedade',
    },
    { property: 'og:title', content: 'Boi na Nuvem - Detalhes da Propriedade' },
    {
      property: 'og:description',
      content: 'Visualize os detalhes completos da propriedade no Boi na Nuvem',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Detalhes da Propriedade' },
    {
      name: 'twitter:description',
      content: 'Visualize os detalhes completos da propriedade no Boi na Nuvem',
    },
  ];
}

export default function PropertyDetail() {
  return <PropertyDetailPage />;
}

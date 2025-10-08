import { useLocation } from 'react-router';
import type { Route } from './+types/catch-all';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Página não encontrada` },
    {
      name: 'description',
      content:
        'A página solicitada não foi encontrada no Boi na Nuvem. Verifique o endereço ou retorne à página inicial',
    },
    { name: 'keywords', content: 'boi na nuvem, 404, página não encontrada, erro, navegação' },
    { property: 'og:title', content: 'Boi na Nuvem - Página não encontrada' },
    {
      property: 'og:description',
      content: 'A página solicitada não foi encontrada no Boi na Nuvem',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Página não encontrada' },
    {
      name: 'twitter:description',
      content: 'A página solicitada não foi encontrada no Boi na Nuvem',
    },
  ];
}

export default function CatchAll() {
  const location = useLocation();

  // Handle Chrome DevTools requests silently
  if (location.pathname.startsWith('/.well-known/')) {
    return null;
  }

  // Handle static assets and API routes
  if (location.pathname.startsWith('/api/') ||
    location.pathname.startsWith('/assets/') ||
    location.pathname.includes('.')) {
    return null;
  }

  // For other unmatched routes, show a 404 page
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        A página solicitada não foi encontrada.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Caminho: {location.pathname}</p>
    </div>
  );
}

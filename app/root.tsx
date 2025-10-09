import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import { useState } from 'react';

import type { Route } from './+types/root';
import './app.css';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard, PublicRoute } from './components/AuthGuard';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isSystemRoute = location.pathname.startsWith('/sistema');
  const isAuthRoute = ['/login', '/esqueci-senha', '/redefinir-senha'].includes(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isSystemRoute) {
    return (
      <html lang="pt-BR">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <AuthProvider>
            <AuthGuard>
              <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar onToggleSidebar={toggleSidebar} />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    {children}
                  </main>
                </div>
              </div>
            </AuthGuard>
          </AuthProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }

  if (isAuthRoute) {
    return (
      <html lang="pt-BR">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <AuthProvider>
            <PublicRoute>
              {children}
            </PublicRoute>
          </AuthProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Ops!';
  let details = 'Ocorreu um erro inesperado.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Erro';
    details =
      error.status === 404
        ? 'A página solicitada não foi encontrada.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{message}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-lg">
          <code className="text-sm text-gray-800 dark:text-gray-200">{stack}</code>
        </pre>
      )}
    </div>
  );
}

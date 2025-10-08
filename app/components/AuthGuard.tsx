import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    // Se não estiver autenticado, redirecionar para login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se estiver autenticado, renderizar children
    return <>{children}</>;
}

interface PublicRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/sistema' }: PublicRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    // Mostrar loading enquanto verifica autenticação
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
                </div>
            </div>
        );
    }

    // Se estiver autenticado, redirecionar para a rota protegida
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Se não estiver autenticado, renderizar children (páginas públicas)
    return <>{children}</>;
}

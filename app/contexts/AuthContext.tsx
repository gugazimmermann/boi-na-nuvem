import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import type { User, LoginCredentials, ForgotPasswordResponse, ResetPasswordData, ResetPasswordResponse } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<ForgotPasswordResponse>;
    resetPassword: (data: ResetPasswordData) => Promise<ResetPasswordResponse>;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Verificar autenticação ao carregar
    useEffect(() => {
        const checkAuth = () => {
            try {
                const isAuth = authService.isAuthenticated();
                const currentUser = authService.getCurrentUser();

                setUser(isAuth ? currentUser : null);
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            const response = await authService.login(credentials);

            if (response.success && response.user) {
                setUser(response.user);
                return { success: true };
            } else {
                return { success: false, message: response.message };
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro interno do servidor' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const forgotPassword = async (email: string) => {
        try {
            return await authService.forgotPassword(email);
        } catch (error) {
            console.error('Erro ao solicitar reset de senha:', error);
            return {
                success: false,
                message: 'Erro interno do servidor',
            };
        }
    };

    const resetPassword = async (data: ResetPasswordData) => {
        try {
            return await authService.resetPassword(data);
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            return {
                success: false,
                message: 'Erro interno do servidor',
            };
        }
    };

    const refreshUser = () => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        forgotPassword,
        resetPassword,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

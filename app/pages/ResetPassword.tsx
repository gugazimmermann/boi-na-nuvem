import type { Route } from '../routes/+types/reset-password';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Redefinir senha` },
        {
            name: 'description',
            content: 'Redefina sua senha do Boi na Nuvem - Sistema de gestão rural inteligente',
        },
        { name: 'keywords', content: 'boi na nuvem, redefinir senha, gestão rural, fazenda' },
        { property: 'og:title', content: 'Boi na Nuvem - Redefinir senha' },
        {
            property: 'og:description',
            content: 'Redefina sua senha do Boi na Nuvem - Sistema de gestão rural inteligente',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Boi na Nuvem - Redefinir senha' },
        {
            name: 'twitter:description',
            content: 'Redefina sua senha do Boi na Nuvem - Sistema de gestão rural inteligente',
        },
    ];
}

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const { resetPassword } = useAuth();

    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setMessage('Token de redefinição não encontrado');
            return;
        }

        const valid = authService.isResetTokenValid(token);
        const email = authService.getEmailFromResetToken(token);

        setIsValidToken(valid);
        setUserEmail(email || '');

        if (!valid) {
            setMessage('Token inválido ou expirado');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setMessage('Token de redefinição não encontrado');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await resetPassword({
                token,
                newPassword,
                confirmPassword,
            });

            setMessage(response.message);
            setIsSuccess(response.success);

            if (response.success) {
                setNewPassword('');
                setConfirmPassword('');
                // Redirecionar para login após 3 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setMessage('Erro ao processar solicitação. Tente novamente.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="max-w-md w-full space-y-8 relative z-10">
                    <div className="text-center">
                        <div className="flex justify-center items-center space-x-3 mb-6">
                            <div className="relative">
                                <img
                                    src="/assets/logo.png"
                                    alt="Boi na Nuvem Logo"
                                    className="w-16 h-16 rounded-xl object-contain shadow-lg"
                                />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Boi na Nuvem</h1>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            Token de redefinição não encontrado
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300"
                            >
                                Solicitar novo link de redefinição
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isValidToken) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="max-w-md w-full space-y-8 relative z-10">
                    <div className="text-center">
                        <div className="flex justify-center items-center space-x-3 mb-6">
                            <div className="relative">
                                <img
                                    src="/assets/logo.png"
                                    alt="Boi na Nuvem Logo"
                                    className="w-16 h-16 rounded-xl object-contain shadow-lg"
                                />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Boi na Nuvem</h1>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {message}
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/forgot-password"
                                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300"
                            >
                                Solicitar novo link de redefinição
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center space-x-3 mb-6">
                        <div className="relative">
                            <img
                                src="/assets/logo.png"
                                alt="Boi na Nuvem Logo"
                                className="w-16 h-16 rounded-xl object-contain shadow-lg"
                            />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Boi na Nuvem</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Redefinir{' '}
                        <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            senha
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Digite sua nova senha para {userEmail}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-8 px-6 shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    {!isSuccess ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {message && (
                                <div className={`px-4 py-3 rounded-lg text-sm ${isSuccess
                                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                                    }`}>
                                    {message}
                                </div>
                            )}

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nova senha
                                </label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Digite sua nova senha"
                                    config={{
                                        variant: 'default',
                                        size: 'lg',
                                    }}
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Mínimo de 6 caracteres
                                </p>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Confirmar nova senha
                                </label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirme sua nova senha"
                                    config={{
                                        variant: 'default',
                                        size: 'lg',
                                    }}
                                />
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    disabled={isLoading || newPassword.length < 6 || newPassword !== confirmPassword}
                                    config={{
                                        variant: 'primary',
                                        size: 'lg',
                                    }}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Redefinindo...
                                        </div>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                            Redefinir senha
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Senha redefinida!
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Você será redirecionado para o login em alguns segundos...
                                </p>
                            </div>

                            <div>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Ir para o login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isSuccess && (
                    <div className="text-center">
                        <p>
                            <Link
                                to="/login"
                                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Voltar ao login
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

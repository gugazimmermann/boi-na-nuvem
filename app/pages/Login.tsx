import type { Route } from '../routes/+types/login';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { useAuth } from '../contexts/AuthContext';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Login` },
        {
            name: 'description',
            content: 'Faça login no Boi na Nuvem - Sistema de gestão rural inteligente',
        },
        { name: 'keywords', content: 'boi na nuvem, login, gestão rural, fazenda, autenticação' },
        { property: 'og:title', content: 'Boi na Nuvem - Login' },
        {
            property: 'og:description',
            content: 'Faça login no Boi na Nuvem - Sistema de gestão rural inteligente',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Boi na Nuvem - Login' },
        {
            name: 'twitter:description',
            content: 'Faça login no Boi na Nuvem - Sistema de gestão rural inteligente',
        },
    ];
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate('/sistema');
        }
    }, [isAuthenticated, isLoading, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError('');
        setIsSubmitting(true);

        try {
            const result = await login({
                email,
                password,
                rememberMe,
            });

            if (result.success) {
                navigate('/sistema');
            } else {
                const errorMessage = result.message || 'Erro ao fazer login. Tente novamente.';
                setApiError(errorMessage);
            }
        } catch (err) {
            const errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
            setApiError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };


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
                                className="w-16 h-16 rounded-xl object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Boi na Nuvem</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Acesse sua{' '}
                        <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            conta
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Entre com suas credenciais para acessar o sistema
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-8 px-6 shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* API Error Message */}
                        {apiError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-start space-x-2">
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <span className="font-medium block">{apiError}</span>
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <Input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                config={{
                                    type: 'email',
                                    variant: 'default',
                                    size: 'lg',
                                    required: true,
                                    placeholder: 'seu@email.com',
                                    autoComplete: 'email',
                                    value: email,
                                }}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Senha
                            </label>
                            <Input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                config={{
                                    type: 'password',
                                    variant: 'default',
                                    size: 'lg',
                                    required: true,
                                    placeholder: 'Sua senha',
                                    autoComplete: 'current-password',
                                    value: password,
                                }}
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                    Lembrar de mim
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="/esqueci-senha"
                                    className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button
                                config={{
                                    type: 'submit',
                                    variant: 'primary',
                                    size: 'lg',
                                    disabled: isSubmitting,
                                }}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Entrando...
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Entrar
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>

                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Não tem uma conta?{' '}
                        <Link
                            to="/cadastro"
                            className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300"
                        >
                            Cadastre-se aqui
                        </Link>
                    </p>
                    <p className="mt-2">
                        <Link
                            to="/"
                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300 flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar para a página inicial
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
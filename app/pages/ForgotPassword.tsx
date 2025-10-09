import type { Route } from '../routes/+types/forgot-password';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { useAuth } from '../contexts/AuthContext';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Esqueci minha senha` },
        {
            name: 'description',
            content: 'Recupere sua senha do Boi na Nuvem - Sistema de gestão rural inteligente',
        },
        { name: 'keywords', content: 'boi na nuvem, recuperar senha, gestão rural, fazenda' },
        { property: 'og:title', content: 'Boi na Nuvem - Esqueci minha senha' },
        {
            property: 'og:description',
            content: 'Recupere sua senha do Boi na Nuvem - Sistema de gestão rural inteligente',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Boi na Nuvem - Esqueci minha senha' },
        {
            name: 'twitter:description',
            content: 'Recupere sua senha do Boi na Nuvem - Sistema de gestão rural inteligente',
        },
    ];
}

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await forgotPassword(email);
            setMessage(response.message);
            setIsSuccess(response.success);

            if (response.success) {
                setEmail('');
                // Redirecionar para a página de redefinir senha após 2 segundos
                setTimeout(() => {
                    navigate('/redefinir-senha');
                }, 2000);
            }
        } catch (error) {
            setMessage('Erro ao processar solicitação. Tente novamente.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
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
                                className="w-16 h-16 rounded-xl object-contain shadow-lg"
                            />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Boi na Nuvem</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Esqueci minha{' '}
                        <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            senha
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Digite seu email para receber instruções de redefinição de senha
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
                                <Input
                                    label="E-mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    config={{
                                        type: 'email',
                                        variant: 'default',
                                        size: 'lg',
                                        placeholder: 'Digite seu email',
                                        autoComplete: 'email',
                                        required: true,
                                        value: email,
                                    }}
                                />
                            </div>

                            <div>
                                <Button
                                    config={{
                                        type: 'submit',
                                        variant: 'primary',
                                        size: 'lg',
                                        disabled: isLoading,
                                    }}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Enviando...
                                        </div>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Enviar instruções
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
                                    Email enviado!
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                    Você será redirecionado para a página de redefinição de senha em alguns segundos...
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setMessage('');
                                    }}
                                    config={{
                                        variant: 'primary',
                                        size: 'lg',
                                    }}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <span className="flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Enviar para outro email
                                    </span>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lembrou da senha?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300"
                        >
                            Voltar ao login
                        </Link>
                    </p>
                    <p>
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

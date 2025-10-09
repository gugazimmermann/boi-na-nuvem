import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/button';
import { useAuth } from '~/contexts/AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        document: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        country: 'Brasil',
        zipCode: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loadingCEP, setLoadingCEP] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchCache, setSearchCache] = useState<Map<string, any[]>>(new Map());
    const [isFromCache, setIsFromCache] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    // Hook para debounce
    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    // Fechar sugestões quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.address-suggestions-container')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Função para aplicar máscara de CPF/CNPJ
    const applyDocumentMask = (value: string) => {
        // Remove tudo que não é dígito
        const numbers = value.replace(/\D/g, '');

        // Se tem 11 dígitos ou menos, aplica máscara de CPF
        if (numbers.length <= 11) {
            return numbers
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2');
        }

        // Se tem mais de 11 dígitos, aplica máscara de CNPJ
        return numbers
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})/, '$1-$2');
    };

    // Função para aplicar máscara de telefone
    const applyPhoneMask = (value: string) => {
        // Remove tudo que não é dígito
        const numbers = value.replace(/\D/g, '');

        // Se começa com 55 (código do Brasil), remove para aplicar máscara
        let cleanNumbers = numbers;
        if (numbers.startsWith('55')) {
            cleanNumbers = numbers.substring(2);
        }

        // Se tem 10 dígitos (telefone fixo)
        if (cleanNumbers.length <= 10) {
            return cleanNumbers
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        }

        // Se tem 11 dígitos (celular)
        return cleanNumbers
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2');
    };

    // Função para aplicar máscara de CEP
    const applyZipCodeMask = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{5})(\d)/, '$1-$2');
    };

    // Função otimizada para buscar endereços
    const searchAddresses = async (query: string) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();

        // Verificar cache primeiro
        if (searchCache.has(normalizedQuery)) {
            const cachedResults = searchCache.get(normalizedQuery);
            setAddressSuggestions(cachedResults || []);
            setShowSuggestions(true);
            setIsFromCache(true);
            return;
        }

        setLoadingCEP(true);
        try {
            // URL otimizada do Nominatim
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Brasil')}&countrycodes=br&limit=5&addressdetails=1&dedupe=1`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5s

            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'BoiNaNuvem/1.0',
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();

                // Filtrar e otimizar resultados
                const optimizedResults = data
                    .filter((item: any) => item.display_name && item.address)
                    .slice(0, 5)
                    .map((item: any) => ({
                        ...item,
                        display_name: item.display_name.split(',')[0] + ', ' +
                            (item.address.city || item.address.town || item.address.village || '') +
                            ' - ' + (item.address.state || '')
                    }));

                // Salvar no cache
                setSearchCache(prev => {
                    const newCache = new Map(prev);
                    newCache.set(normalizedQuery, optimizedResults);
                    // Limitar cache a 50 entradas
                    if (newCache.size > 50) {
                        const firstKey = newCache.keys().next().value;
                        if (firstKey) {
                            newCache.delete(firstKey);
                        }
                    }
                    return newCache;
                });

                setAddressSuggestions(optimizedResults);
                setShowSuggestions(true);
                setIsFromCache(false);
            }
        } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
                console.log('Erro ao buscar endereços:', error);
            }
            setAddressSuggestions([]);
        } finally {
            setLoadingCEP(false);
        }
    };

    // Função para selecionar um endereço das sugestões
    const selectAddress = (address: any) => {
        const addressDetails = address.address || {};

        setFormData(prev => ({
            ...prev,
            street: address.display_name.split(',')[0] || '',
            city: addressDetails.city || addressDetails.town || addressDetails.village || '',
            state: addressDetails.state || '',
            neighborhood: addressDetails.suburb || addressDetails.neighbourhood || '',
            zipCode: addressDetails.postcode || '',
            country: 'Brasil'
        }));

        setShowSuggestions(false);
        setAddressSuggestions([]);
    };

    // Debounce para o campo de rua
    const debouncedStreetValue = useDebounce(formData.street, 300);

    // Efeito para buscar endereços com debounce
    useEffect(() => {
        if (debouncedStreetValue.length >= 3) {
            searchAddresses(debouncedStreetValue);
        } else if (debouncedStreetValue.length < 3) {
            setShowSuggestions(false);
            setAddressSuggestions([]);
        }
    }, [debouncedStreetValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let maskedValue = value;

        // Aplicar máscaras específicas
        if (name === 'document') {
            maskedValue = applyDocumentMask(value);
        } else if (name === 'phone') {
            maskedValue = applyPhoneMask(value);
        } else if (name === 'zipCode') {
            maskedValue = applyZipCodeMask(value);
        }

        setFormData(prev => ({
            ...prev,
            [name]: maskedValue
        }));
    };

    const validateForm = () => {
        // Campos obrigatórios
        if (!formData.name.trim()) {
            setError('Nome é obrigatório');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email é obrigatório');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Email inválido');
            return false;
        }
        if (!formData.phone.trim()) {
            setError('Telefone é obrigatório');
            return false;
        }
        if (!formData.document.trim()) {
            setError('CPF/CNPJ é obrigatório');
            return false;
        }
        if (!formData.street.trim()) {
            setError('Rua é obrigatória');
            return false;
        }
        if (!formData.city.trim()) {
            setError('Cidade é obrigatória');
            return false;
        }
        if (!formData.state.trim()) {
            setError('Estado é obrigatório');
            return false;
        }
        if (!formData.country.trim()) {
            setError('País é obrigatório');
            return false;
        }
        if (!formData.zipCode.trim()) {
            setError('CEP é obrigatório');
            return false;
        }
        if (!formData.password) {
            setError('Senha é obrigatória');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Senha deve ter pelo menos 8 caracteres');
            return false;
        }
        if (!/(?=.*[a-z])/.test(formData.password)) {
            setError('Senha deve ter pelo menos 1 letra minúscula');
            return false;
        }
        if (!/(?=.*[A-Z])/.test(formData.password)) {
            setError('Senha deve ter pelo menos 1 letra maiúscula');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Senhas não coincidem');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Criar novo usuário com trial do plano Enterprise
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                document: formData.document,
                street: formData.street,
                number: formData.number,
                complement: formData.complement,
                neighborhood: formData.neighborhood,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                zipCode: formData.zipCode,
            });

            if (result.success) {
                setSuccess(true);
                // Redirecionar para login após 2 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(result.message || 'Erro ao criar conta');
            }
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Conta criada com sucesso!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Você recebeu 14 dias grátis do plano Enterprise.
                            Redirecionando para o login...
                        </p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src="/assets/logo.png"
                                    alt="Boi na Nuvem Logo"
                                    className="w-14 h-14 rounded-xl object-contain shadow-lg"
                                />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                Boi na Nuvem
                            </h1>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <Link to="/planos">
                                <Button
                                    config={{
                                        variant: 'secondary',
                                        size: 'lg',
                                    }}
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Ver Planos
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                    config={{
                                        variant: 'primary',
                                        size: 'lg',
                                    }}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Fazer Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full text-green-800 dark:text-green-200 text-sm font-medium shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                14 dias grátis - Plano Enterprise
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Crie sua Conta
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Comece a gerenciar sua propriedade rural hoje mesmo
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-4">
                                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Layout em duas colunas para telas grandes */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Coluna Esquerda - Informações Pessoais */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Informações Pessoais
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Nome Completo *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="João Silva"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="joao.silva@email.com"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Telefone *
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="(11) 99999-9999"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="document" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    CPF/CNPJ *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="document"
                                                    name="document"
                                                    value={formData.document}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="123.456.789-00 ou 12.345.678/0001-90"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Coluna Direita - Endereço */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-700">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Endereço
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="relative address-suggestions-container">
                                                <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Rua *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="street"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleInputChange}
                                                    onFocus={() => {
                                                        if (addressSuggestions.length > 0) {
                                                            setShowSuggestions(true);
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        // Delay para permitir clique nas sugestões
                                                        setTimeout(() => setShowSuggestions(false), 200);
                                                    }}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="Digite o nome da rua..."
                                                    autoComplete="off"
                                                />

                                                {/* Loading indicator otimizado */}
                                                {loadingCEP && !isFromCache && (
                                                    <div className="absolute right-3 top-9">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                                                    </div>
                                                )}
                                                {isFromCache && addressSuggestions.length > 0 && (
                                                    <div className="absolute right-3 top-9">
                                                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Sugestões de endereço otimizadas */}
                                                {showSuggestions && addressSuggestions.length > 0 && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                        {addressSuggestions.map((address, index) => (
                                                            <div
                                                                key={`${address.place_id || index}-${address.display_name}`}
                                                                onClick={() => selectAddress(address)}
                                                                className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-colors duration-150"
                                                            >
                                                                <div className="text-sm text-gray-900 dark:text-white font-medium">
                                                                    {address.display_name}
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                    {address.address?.city || address.address?.town || ''} - {address.address?.state || ''}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Número
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="number"
                                                        name="number"
                                                        value={formData.number}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="123"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="complement" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Complemento
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="complement"
                                                        name="complement"
                                                        value={formData.complement}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="Apto 45"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Bairro
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="neighborhood"
                                                        name="neighborhood"
                                                        value={formData.neighborhood}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="Centro"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Cidade *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="São Paulo"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Estado *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="SP"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        CEP *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="zipCode"
                                                        name="zipCode"
                                                        value={formData.zipCode}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="01234-567"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        País *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                        placeholder="Brasil"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Senha - Seção centralizada */}
                            <div className="max-w-2xl mx-auto">
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Senha de Acesso
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Senha *
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                placeholder="Mínimo 8 caracteres"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Confirmar Senha *
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                                placeholder="Digite a senha novamente"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                                        <p className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
                                            <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula e 1 minúscula
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Botão de Submit */}
                            <div className="max-w-md mx-auto">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                            Criando conta...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Criar Conta - 14 dias grátis
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="mt-12 text-center">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Já tem uma conta?{' '}
                                    <Link to="/login" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors">
                                        Fazer login
                                    </Link>
                                </p>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Ao criar uma conta, você concorda com nossos{' '}
                                        <a href="#" className="text-green-600 dark:text-green-400 hover:underline transition-colors">
                                            Termos de Uso
                                        </a>{' '}
                                        e{' '}
                                        <a href="#" className="text-green-600 dark:text-green-400 hover:underline transition-colors">
                                            Política de Privacidade
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

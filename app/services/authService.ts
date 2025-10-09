

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
    lastLogin?: Date;
    isActive: boolean;
    phone?: string;
    document?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    plan?: string;
    subscription?: {
        type: string;
        status: string;
        createdAt: string;
    };
    trialEndsAt?: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        refreshToken: string;
        expiresAt: string;
        refreshExpiresAt: string;
        rememberMe: boolean;
    };
    message?: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    data?: {
        message: string;
        email: string;
    };
    message: string;
}

export interface ResetPasswordData {
    code: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
    document: string;
    street: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface RegisterResponse {
    success: boolean;
    data?: {
        userId: string;
        subscriptionId: string;
        name: string;
        email: string;
        planName: string;
        subscriptionType: string;
        subscriptionValue: number;
        subscriptionStatus: string;
        createdAt: string;
    };
    message: string;
}

class AuthService {
    private readonly TOKEN_KEY = 'boi_na_nuvem_token';
    private readonly REFRESH_TOKEN_KEY = 'boi_na_nuvem_refresh_token';
    private readonly USER_KEY = 'boi_na_nuvem_user';
    private readonly REMEMBER_KEY = 'boi_na_nuvem_remember';


    // Validar token JWT
    private validateToken(token: string): { valid: boolean; payload?: any } {
        try {
            // Para tokens JWT reais, precisaríamos decodificar o payload (sem verificar assinatura)
            // Por enquanto, assumimos que se o token existe e não está vazio, é válido
            // Em produção, você deveria verificar a assinatura e expiração adequadamente
            if (!token || token.trim() === '') {
                return { valid: false };
            }

            // Tentar decodificar o payload (assumindo que é um JWT simples)
            const parts = token.split('.');
            if (parts.length === 3) {
                // JWT real - decodificar payload
                const payload = JSON.parse(atob(parts[1]));
                if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
                    return { valid: false };
                }
                return { valid: true, payload };
            } else {
                // Token simples (fallback para compatibilidade)
                const payload = JSON.parse(atob(token));
                if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
                    return { valid: false };
                }
                return { valid: true, payload };
            }
        } catch {
            return { valid: false };
        }
    }

    // Decodificar token JWT
    private decodeToken(token: string): any | null {
        try {
            // Tentar decodificar como JWT real primeiro
            const parts = token.split('.');
            if (parts.length === 3) {
                // JWT real - decodificar payload
                return JSON.parse(atob(parts[1]));
            } else {
                // Token simples (fallback para compatibilidade)
                return JSON.parse(atob(token));
            }
        } catch {
            return null;
        }
    }


    // Login
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const { email, password, rememberMe = false } = credentials;

        try {
            // Usar a URL base da API
            const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            const result = await response.json();

            // Tratar diferentes códigos de status HTTP
            if (response.status === 200) {
                // Sucesso - login realizado
                if (result.success && result.data && result.data.token) {
                    const { token, refreshToken, expiresAt, refreshExpiresAt, rememberMe: apiRememberMe } = result.data;

                    // Decodificar token para obter dados do usuário
                    const tokenPayload = this.decodeToken(token);

                    if (tokenPayload) {
                        // Salvar dados no localStorage/sessionStorage
                        const userData = {
                            id: tokenPayload.sub,
                            email: tokenPayload.email,
                            name: tokenPayload.name,
                            role: 'user', // Default role, pode ser ajustado conforme necessário
                            avatar: undefined,
                            lastLogin: new Date(),
                            isActive: true,
                            plan: tokenPayload.planName,
                            subscription: {
                                type: tokenPayload.subscriptionType,
                                status: tokenPayload.subscriptionStatus,
                                createdAt: tokenPayload.subscriptionCreatedAt
                            }
                        };

                        // Usar o rememberMe da API ou do cliente
                        const shouldRemember = apiRememberMe !== undefined ? apiRememberMe : rememberMe;

                        if (shouldRemember) {
                            localStorage.setItem(this.REMEMBER_KEY, 'true');
                            localStorage.setItem(this.TOKEN_KEY, token);
                            localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
                            localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
                        } else {
                            sessionStorage.setItem(this.TOKEN_KEY, token);
                            sessionStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
                            sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));
                        }

                        return {
                            success: true,
                            data: {
                                token,
                                refreshToken,
                                expiresAt,
                                refreshExpiresAt,
                                rememberMe: shouldRemember
                            },
                            message: result.message || 'Login successful'
                        };
                    } else {
                        return {
                            success: false,
                            message: 'Token inválido recebido do servidor'
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: result.message || 'Erro no login'
                    };
                }
            } else if (response.status === 400) {
                // Dados inválidos
                return {
                    success: false,
                    message: result.message || 'Invalid data provided'
                };
            } else if (response.status === 401) {
                // Email ou senha incorretos
                return {
                    success: false,
                    message: result.message || result.error || 'Invalid email or password'
                };
            } else if (response.status === 500) {
                // Erro interno do servidor
                return {
                    success: false,
                    message: result.message || 'Internal server error'
                };
            } else {
                // Outros erros
                return {
                    success: false,
                    message: result.message || 'Erro ao fazer login'
                };
            }
        } catch (error) {
            console.error('Erro na requisição de login:', error);

            // Verificar se é erro de rede
            if (error instanceof TypeError && error.message.includes('fetch')) {
                return {
                    success: false,
                    message: 'Erro de conexão. Verifique sua internet e tente novamente.'
                };
            }

            return {
                success: false,
                message: 'Erro de conexão. Tente novamente.'
            };
        }
    }


    // Logout
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.REMEMBER_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(this.USER_KEY);
    }

    // Verificar se está autenticado
    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
        if (!token) return false;

        const { valid } = this.validateToken(token);
        return valid;
    }

    // Obter usuário atual
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    // Obter token atual
    getCurrentToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
    }

    // Obter refresh token atual
    getCurrentRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY) || sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    // Verificar se deve lembrar do usuário
    shouldRemember(): boolean {
        return localStorage.getItem(this.REMEMBER_KEY) === 'true';
    }

    // Esqueci minha senha
    async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
        try {
            // Usar a URL base da API
            const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

            const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            // Tratar diferentes códigos de status HTTP
            if (response.status === 200) {
                return {
                    success: true,
                    data: result.data || {
                        message: 'Password reset instructions have been sent to your email',
                        email: email
                    },
                    message: result.message || 'Password reset instructions sent',
                };
            } else if (response.status === 400) {
                return {
                    success: false,
                    message: result.message || 'Invalid email format',
                };
            } else if (response.status === 500) {
                return {
                    success: false,
                    message: result.message || 'Internal server error',
                };
            } else {
                return {
                    success: false,
                    message: result.message || 'Erro ao processar solicitação',
                };
            }
        } catch (error) {
            console.error('Erro na requisição de forgot password:', error);
            return {
                success: false,
                message: 'Erro de conexão. Tente novamente.',
            };
        }
    }

    // Redefinir senha
    async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
        const { code, newPassword, confirmPassword } = data;

        // Validar senhas no frontend (a API também validará)
        if (newPassword !== confirmPassword) {
            return {
                success: false,
                message: 'As senhas não coincidem',
            };
        }

        if (newPassword.length < 8) {
            return {
                success: false,
                message: 'A senha deve ter pelo menos 8 caracteres',
            };
        }

        if (!/(?=.*[a-z])/.test(newPassword)) {
            return {
                success: false,
                message: 'A senha deve ter pelo menos 1 letra minúscula',
            };
        }

        if (!/(?=.*[A-Z])/.test(newPassword)) {
            return {
                success: false,
                message: 'A senha deve ter pelo menos 1 letra maiúscula',
            };
        }

        try {
            // Usar a URL base da API
            const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

            const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, newPassword }),
            });

            const result = await response.json();

            // Tratar diferentes códigos de status HTTP conforme especificação da API
            if (response.status === 200) {
                return {
                    success: true,
                    message: result.message || 'Password reset successfully',
                };
            } else if (response.status === 400) {
                return {
                    success: false,
                    message: result.message || 'Invalid or expired reset code, or invalid password format',
                };
            } else if (response.status === 500) {
                return {
                    success: false,
                    message: result.message || 'Internal server error',
                };
            } else {
                return {
                    success: false,
                    message: result.message || 'Erro ao redefinir senha',
                };
            }
        } catch (error) {
            console.error('Erro na requisição de reset password:', error);
            return {
                success: false,
                message: 'Erro de conexão. Tente novamente.',
            };
        }
    }

    // Verificar se token de reset é válido
    async isResetTokenValid(token: string): Promise<boolean> {
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';
            const response = await fetch(`${API_BASE_URL}/user/validate-reset-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            return response.status === 200;
        } catch {
            return false;
        }
    }

    // Obter email do token de reset
    async getEmailFromResetToken(token: string): Promise<string | null> {
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';
            const response = await fetch(`${API_BASE_URL}/user/reset-token-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            if (response.status === 200) {
                const result = await response.json();
                return result.email || null;
            }
            return null;
        } catch {
            return null;
        }
    }

    // Registrar novo usuário
    async register(data: RegisterData): Promise<RegisterResponse> {
        const {
            name,
            email,
            password,
            phone,
            document,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            country,
            zipCode
        } = data;

        // Validações do cliente (opcional, pois o servidor também validará)
        if (!name.trim()) {
            return {
                success: false,
                message: 'Nome é obrigatório',
            };
        }

        if (!email.trim()) {
            return {
                success: false,
                message: 'Email é obrigatório',
            };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return {
                success: false,
                message: 'Email inválido',
            };
        }

        if (!phone.trim()) {
            return {
                success: false,
                message: 'Telefone é obrigatório',
            };
        }

        if (!document.trim()) {
            return {
                success: false,
                message: 'CPF/CNPJ é obrigatório',
            };
        }

        if (!street.trim()) {
            return {
                success: false,
                message: 'Rua é obrigatória',
            };
        }

        if (!city.trim()) {
            return {
                success: false,
                message: 'Cidade é obrigatória',
            };
        }

        if (!state.trim()) {
            return {
                success: false,
                message: 'Estado é obrigatório',
            };
        }

        if (!country.trim()) {
            return {
                success: false,
                message: 'País é obrigatório',
            };
        }

        if (!zipCode.trim()) {
            return {
                success: false,
                message: 'CEP é obrigatório',
            };
        }

        if (!password || password.length < 8) {
            return {
                success: false,
                message: 'Senha deve ter pelo menos 8 caracteres',
            };
        }

        if (!/(?=.*[a-z])/.test(password)) {
            return {
                success: false,
                message: 'Senha deve ter pelo menos 1 letra minúscula',
            };
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            return {
                success: false,
                message: 'Senha deve ter pelo menos 1 letra maiúscula',
            };
        }

        try {
            // Preparar dados para envio à API
            const requestData = {
                name,
                email,
                phone,
                document,
                street,
                number,
                complement,
                neighborhood,
                city,
                state,
                country,
                zipCode,
                password
            };

            // Usar a URL base da API
            const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            // Tratar diferentes códigos de status HTTP
            if (response.status === 201) {
                // Sucesso - usuário criado
                if (result.success && result.data) {
                    const apiData = result.data;

                    // Criar usuário local para compatibilidade
                    const newUser = {
                        id: apiData.userId,
                        email: apiData.email,
                        password,
                        name: apiData.name,
                        role: 'user',
                        avatar: null,
                        lastLogin: undefined,
                        isActive: true,
                        phone,
                        document,
                        street,
                        number: number || '',
                        complement: complement || '',
                        neighborhood: neighborhood || '',
                        city,
                        state,
                        country,
                        zipCode,
                        plan: apiData.planName.toLowerCase(),
                        subscription: {
                            type: apiData.subscriptionType,
                            status: apiData.subscriptionStatus,
                            createdAt: apiData.createdAt
                        },
                        trialEndsAt: new Date(apiData.createdAt), // Será ajustado baseado no tipo de subscription
                    };

                    // Usuário criado com sucesso na API

                    return {
                        success: true,
                        data: apiData,
                        message: result.message || 'Usuário criado com sucesso',
                    };
                } else {
                    return {
                        success: false,
                        message: result.message || 'Erro ao criar conta',
                    };
                }
            } else if (response.status === 400) {
                // Dados inválidos
                return {
                    success: false,
                    message: result.message || 'Dados inválidos fornecidos',
                };
            } else if (response.status === 409) {
                // Email ou documento já em uso
                return {
                    success: false,
                    message: result.message || 'Email ou documento já está em uso',
                };
            } else if (response.status === 500) {
                // Erro interno do servidor
                return {
                    success: false,
                    message: result.message || 'Erro interno do servidor',
                };
            } else {
                // Outros erros
                return {
                    success: false,
                    message: result.message || 'Erro ao criar conta',
                };
            }
        } catch (error) {
            console.error('Erro na requisição de registro:', error);
            return {
                success: false,
                message: 'Erro de conexão. Tente novamente.',
            };
        }
    }
}

export const authService = new AuthService();

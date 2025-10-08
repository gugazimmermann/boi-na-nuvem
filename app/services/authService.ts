// Mock de usuários para demonstração
const MOCK_USERS = [
    {
        id: '1',
        email: 'admin@boinanuvem.com.br',
        password: 'admin123',
        name: 'Administrador',
        role: 'admin',
        avatar: '/assets/angus.png',
        lastLogin: null,
        isActive: true,
    },
    {
        id: '2',
        email: 'fazendeiro@boinanuvem.com.br',
        password: 'fazenda123',
        name: 'João Fazendeiro',
        role: 'user',
        avatar: null,
        lastLogin: null,
        isActive: true,
    },
    {
        id: '3',
        email: 'gerente@boinanuvem.com.br',
        password: 'gerente123',
        name: 'Maria Gerente',
        role: 'manager',
        avatar: null,
        lastLogin: null,
        isActive: true,
    },
];

// Mock de tokens de reset de senha
const RESET_TOKENS = new Map<string, { email: string; expiresAt: Date }>();

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
    lastLogin?: Date | null;
    isActive: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    success: boolean;
    user?: User;
    token?: string;
    message?: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
}

export interface ResetPasswordData {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}

class AuthService {
    private readonly TOKEN_KEY = 'boi_na_nuvem_token';
    private readonly USER_KEY = 'boi_na_nuvem_user';
    private readonly REMEMBER_KEY = 'boi_na_nuvem_remember';

    // Gerar token JWT mock
    private generateToken(user: User): string {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000), // 24 horas
        };
        return btoa(JSON.stringify(payload));
    }

    // Validar token JWT mock
    private validateToken(token: string): { valid: boolean; payload?: any } {
        try {
            const payload = JSON.parse(atob(token));
            if (payload.exp < Date.now()) {
                return { valid: false };
            }
            return { valid: true, payload };
        } catch {
            return { valid: false };
        }
    }

    // Login
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        await delay(1000); // Simular delay de rede

        const { email, password, rememberMe = false } = credentials;

        // Validar credenciais
        const user = MOCK_USERS.find(
            u => u.email === email && u.password === password && u.isActive
        );

        if (!user) {
            return {
                success: false,
                message: 'Email ou senha incorretos',
            };
        }

        // Atualizar último login
        user.lastLogin = new Date();

        // Gerar token
        const token = this.generateToken(user);

        // Salvar dados no localStorage
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            lastLogin: user.lastLogin,
            isActive: user.isActive,
        };

        if (rememberMe) {
            localStorage.setItem(this.REMEMBER_KEY, 'true');
            localStorage.setItem(this.TOKEN_KEY, token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        } else {
            sessionStorage.setItem(this.TOKEN_KEY, token);
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        }

        return {
            success: true,
            user: userData,
            token,
        };
    }

    // Logout
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.REMEMBER_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
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

    // Verificar se deve lembrar do usuário
    shouldRemember(): boolean {
        return localStorage.getItem(this.REMEMBER_KEY) === 'true';
    }

    // Esqueci minha senha
    async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
        await delay(1500); // Simular delay de rede

        const user = MOCK_USERS.find(u => u.email === email && u.isActive);

        if (!user) {
            return {
                success: false,
                message: 'Email não encontrado em nossa base de dados',
            };
        }

        // Gerar token de reset (válido por 1 hora)
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        RESET_TOKENS.set(resetToken, { email, expiresAt });

        // Em um sistema real, aqui seria enviado um email
        console.log(`Token de reset para ${email}: ${resetToken}`);
        console.log(`Link de reset: http://localhost:5177/reset-password?token=${resetToken}`);

        return {
            success: true,
            message: 'Instruções para redefinir sua senha foram enviadas para seu email',
        };
    }

    // Redefinir senha
    async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
        await delay(1000); // Simular delay de rede

        const { token, newPassword, confirmPassword } = data;

        // Validar senhas
        if (newPassword !== confirmPassword) {
            return {
                success: false,
                message: 'As senhas não coincidem',
            };
        }

        if (newPassword.length < 6) {
            return {
                success: false,
                message: 'A senha deve ter pelo menos 6 caracteres',
            };
        }

        // Verificar token
        const tokenData = RESET_TOKENS.get(token);
        if (!tokenData) {
            return {
                success: false,
                message: 'Token inválido ou expirado',
            };
        }

        if (tokenData.expiresAt < new Date()) {
            RESET_TOKENS.delete(token);
            return {
                success: false,
                message: 'Token expirado. Solicite um novo link de redefinição',
            };
        }

        // Atualizar senha do usuário
        const user = MOCK_USERS.find(u => u.email === tokenData.email);
        if (user) {
            user.password = newPassword;
        }

        // Remover token usado
        RESET_TOKENS.delete(token);

        return {
            success: true,
            message: 'Senha redefinida com sucesso! Você já pode fazer login com sua nova senha',
        };
    }

    // Verificar se token de reset é válido
    isResetTokenValid(token: string): boolean {
        const tokenData = RESET_TOKENS.get(token);
        if (!tokenData) return false;
        return tokenData.expiresAt > new Date();
    }

    // Obter email do token de reset
    getEmailFromResetToken(token: string): string | null {
        const tokenData = RESET_TOKENS.get(token);
        return tokenData ? tokenData.email : null;
    }
}

export const authService = new AuthService();

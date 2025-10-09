import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { authService } from './authService';

// Mock do fetch global
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock do localStorage e sessionStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

const mockSessionStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
});

// Mock do atob para decodificar tokens
global.atob = vi.fn((str: string) => {
    if (str === 'eyJzdWIiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwicGxhbl9uYW1lIjoiRW50ZXJwcmlzZSIsInN1YnNjcmlwdGlvbl90eXBlIjoiVHJpYWwiLCJzdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwic3Vic2NyaXB0aW9uX2NyZWF0ZWRfYXQiOiIyMDI0LTAxLTAxVDAwOjAwOjAwWiIsImV4cCI6MTcwNDA2NzIwMH0=') {
        return JSON.stringify({
            sub: '123',
            email: 'test@example.com',
            name: 'Test User',
            plan_name: 'Enterprise',
            subscription_type: 'Trial',
            subscription_status: 'Active',
            subscription_created_at: '2024-01-01T00:00:00Z',
            exp: 1704067200
        });
    }
    return JSON.stringify({});
});

describe('AuthService', () => {
    let originalConsoleError: typeof console.error;

    beforeEach(() => {
        vi.clearAllMocks();
        mockLocalStorage.getItem.mockReturnValue(null);
        mockSessionStorage.getItem.mockReturnValue(null);

        // Silenciar console.error durante os testes
        originalConsoleError = console.error;
        console.error = vi.fn();
    });

    afterEach(() => {
        // Restaurar console.error
        console.error = originalConsoleError;
        vi.clearAllMocks();
    });

    describe('login', () => {
        it('should login successfully with valid credentials', async () => {
            const mockResponse = {
                success: true,
                data: {
                    token: 'eyJzdWIiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwicGxhbl9uYW1lIjoiRW50ZXJwcmlzZSIsInN1YnNjcmlwdGlvbl90eXBlIjoiVHJpYWwiLCJzdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwic3Vic2NyaXB0aW9uX2NyZWF0ZWRfYXQiOiIyMDI0LTAxLTAxVDAwOjAwOjAwWiIsImV4cCI6MTcwNDA2NzIwMH0=',
                    refreshToken: 'refresh-token',
                    expiresAt: '2024-01-01T00:00:00Z',
                    refreshExpiresAt: '2024-01-01T00:00:00Z',
                    rememberMe: true
                },
                message: 'Login successful'
            };

            mockFetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse,
            });

            const result = await authService.login({
                email: 'test@example.com',
                password: 'password123',
                rememberMe: true
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockResponse.data);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/login'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: 'test@example.com',
                        password: 'password123',
                        rememberMe: true
                    })
                })
            );
        });

        it('should handle login failure with invalid credentials', async () => {
            const mockResponse = {
                success: false,
                message: 'Invalid email or password'
            };

            mockFetch.mockResolvedValueOnce({
                status: 401,
                json: async () => mockResponse,
            });

            const result = await authService.login({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid email or password');
        });

        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

            const result = await authService.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Erro de conexão. Verifique sua internet e tente novamente.');
        });

        it('should handle server errors', async () => {
            const mockResponse = {
                success: false,
                message: 'Internal server error'
            };

            mockFetch.mockResolvedValueOnce({
                status: 500,
                json: async () => mockResponse,
            });

            const result = await authService.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Internal server error');
        });

        it('should save tokens to localStorage when rememberMe is true', async () => {
            const mockResponse = {
                success: true,
                data: {
                    token: 'eyJzdWIiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwicGxhbl9uYW1lIjoiRW50ZXJwcmlzZSIsInN1YnNjcmlwdGlvbl90eXBlIjoiVHJpYWwiLCJzdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwic3Vic2NyaXB0aW9uX2NyZWF0ZWRfYXQiOiIyMDI0LTAxLTAxVDAwOjAwOjAwWiIsImV4cCI6MTcwNDA2NzIwMH0=',
                    refreshToken: 'refresh-token',
                    expiresAt: '2024-01-01T00:00:00Z',
                    refreshExpiresAt: '2024-01-01T00:00:00Z',
                    rememberMe: true
                }
            };

            mockFetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse,
            });

            await authService.login({
                email: 'test@example.com',
                password: 'password123',
                rememberMe: true
            });

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('boi_na_nuvem_remember', 'true');
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('boi_na_nuvem_token', mockResponse.data.token);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('boi_na_nuvem_refresh_token', mockResponse.data.refreshToken);
        });

        it('should save tokens to sessionStorage when rememberMe is false', async () => {
            const mockResponse = {
                success: true,
                data: {
                    token: 'eyJzdWIiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwicGxhbl9uYW1lIjoiRW50ZXJwcmlzZSIsInN1YnNjcmlwdGlvbl90eXBlIjoiVHJpYWwiLCJzdWJzY3JpcHRpb25fc3RhdHVzIjoiQWN0aXZlIiwic3Vic2NyaXB0aW9uX2NyZWF0ZWRfYXQiOiIyMDI0LTAxLTAxVDAwOjAwOjAwWiIsImV4cCI6MTcwNDA2NzIwMH0=',
                    refreshToken: 'refresh-token',
                    expiresAt: '2024-01-01T00:00:00Z',
                    refreshExpiresAt: '2024-01-01T00:00:00Z',
                    rememberMe: false
                }
            };

            mockFetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse,
            });

            await authService.login({
                email: 'test@example.com',
                password: 'password123',
                rememberMe: false
            });

            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('boi_na_nuvem_token', mockResponse.data.token);
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('boi_na_nuvem_refresh_token', mockResponse.data.refreshToken);
        });
    });

    describe('register', () => {
        it('should register successfully with valid data', async () => {
            const mockResponse = {
                success: true,
                data: {
                    userId: '123',
                    subscriptionId: 'sub-123',
                    name: 'Test User',
                    email: 'test@example.com',
                    planName: 'Enterprise',
                    subscriptionType: 'Trial',
                    subscriptionValue: 0,
                    subscriptionStatus: 'Active',
                    createdAt: '2024-01-01T00:00:00Z'
                },
                message: 'User created successfully'
            };

            mockFetch.mockResolvedValueOnce({
                status: 201,
                json: async () => mockResponse,
            });

            const result = await authService.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password123',
                phone: '(11) 99999-9999',
                document: '123.456.789-00',
                street: 'Rua das Flores',
                number: '123',
                complement: '',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
                zipCode: '01234-567'
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockResponse.data);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/register'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: 'Test User',
                        email: 'test@example.com',
                        phone: '(11) 99999-9999',
                        document: '123.456.789-00',
                        street: 'Rua das Flores',
                        number: '123',
                        complement: '',
                        neighborhood: 'Centro',
                        city: 'São Paulo',
                        state: 'SP',
                        country: 'Brasil',
                        zipCode: '01234-567',
                        password: 'Password123'
                    })
                })
            );
        });

        it('should validate required fields', async () => {
            const result = await authService.register({
                name: '',
                email: 'test@example.com',
                password: 'Password123',
                phone: '(11) 99999-9999',
                document: '123.456.789-00',
                street: 'Rua das Flores',
                number: '123',
                complement: '',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
                zipCode: '01234-567'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Nome é obrigatório');
        });

        it('should validate email format', async () => {
            const result = await authService.register({
                name: 'Test User',
                email: 'invalid-email',
                password: 'Password123',
                phone: '(11) 99999-9999',
                document: '123.456.789-00',
                street: 'Rua das Flores',
                number: '123',
                complement: '',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
                zipCode: '01234-567'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Email inválido');
        });

        it('should validate password requirements', async () => {
            const result = await authService.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'weak',
                phone: '(11) 99999-9999',
                document: '123.456.789-00',
                street: 'Rua das Flores',
                number: '123',
                complement: '',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
                zipCode: '01234-567'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Senha deve ter pelo menos 8 caracteres');
        });

        it('should handle registration failure with existing email', async () => {
            const mockResponse = {
                success: false,
                message: 'Email já está em uso'
            };

            mockFetch.mockResolvedValueOnce({
                status: 409,
                json: async () => mockResponse,
            });

            const result = await authService.register({
                name: 'Test User',
                email: 'existing@example.com',
                password: 'Password123',
                phone: '(11) 99999-9999',
                document: '123.456.789-00',
                street: 'Rua das Flores',
                number: '123',
                complement: '',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
                zipCode: '01234-567'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Email já está em uso');
        });
    });

    describe('forgotPassword', () => {
        it('should send forgot password request successfully', async () => {
            const mockResponse = {
                success: true,
                data: {
                    message: 'Password reset instructions sent',
                    email: 'test@example.com'
                },
                message: 'Password reset instructions sent'
            };

            mockFetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse,
            });

            const result = await authService.forgotPassword('test@example.com');

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockResponse.data);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/forgot-password'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: 'test@example.com' })
                })
            );
        });

        it('should handle invalid email format', async () => {
            const mockResponse = {
                success: false,
                message: 'Invalid email format'
            };

            mockFetch.mockResolvedValueOnce({
                status: 400,
                json: async () => mockResponse,
            });

            const result = await authService.forgotPassword('invalid-email');

            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid email format');
        });

        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await authService.forgotPassword('test@example.com');

            expect(result.success).toBe(false);
            expect(result.message).toBe('Erro de conexão. Tente novamente.');
        });
    });

    describe('resetPassword', () => {
        it('should reset password successfully', async () => {
            const mockResponse = {
                success: true,
                message: 'Password reset successfully'
            };

            mockFetch.mockResolvedValueOnce({
                status: 200,
                json: async () => mockResponse,
            });

            const result = await authService.resetPassword({
                code: '123456',
                newPassword: 'NewPassword123',
                confirmPassword: 'NewPassword123'
            });

            expect(result.success).toBe(true);
            expect(result.message).toBe('Password reset successfully');
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/reset-password'),
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: '123456',
                        newPassword: 'NewPassword123'
                    })
                })
            );
        });

        it('should validate password confirmation match', async () => {
            const result = await authService.resetPassword({
                code: '123456',
                newPassword: 'NewPassword123',
                confirmPassword: 'DifferentPassword123'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('As senhas não coincidem');
        });

        it('should validate password requirements', async () => {
            const result = await authService.resetPassword({
                code: '123456',
                newPassword: 'weak',
                confirmPassword: 'weak'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('A senha deve ter pelo menos 8 caracteres');
        });

        it('should handle invalid reset code', async () => {
            const mockResponse = {
                success: false,
                message: 'Invalid or expired reset code'
            };

            mockFetch.mockResolvedValueOnce({
                status: 400,
                json: async () => mockResponse,
            });

            const result = await authService.resetPassword({
                code: 'invalid',
                newPassword: 'NewPassword123',
                confirmPassword: 'NewPassword123'
            });

            expect(result.success).toBe(false);
            expect(result.message).toBe('Invalid or expired reset code');
        });
    });

    describe('isAuthenticated', () => {
        it('should return true when valid token exists in localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('valid-token');

            const result = authService.isAuthenticated();

            expect(result).toBe(true);
        });

        it('should return true when valid token exists in sessionStorage', () => {
            mockSessionStorage.getItem.mockReturnValue('valid-token');

            const result = authService.isAuthenticated();

            expect(result).toBe(true);
        });

        it('should return false when no token exists', () => {
            const result = authService.isAuthenticated();

            expect(result).toBe(false);
        });

        it('should return false when token is invalid', () => {
            mockLocalStorage.getItem.mockReturnValue('invalid-token');

            // Mock atob to throw error for invalid token
            global.atob = vi.fn(() => {
                throw new Error('Invalid token');
            });

            const result = authService.isAuthenticated();

            expect(result).toBe(false);
        });
    });

    describe('getCurrentUser', () => {
        it('should return user data from localStorage', () => {
            const userData = { id: '123', email: 'test@example.com', name: 'Test User' };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(userData));

            const result = authService.getCurrentUser();

            expect(result).toEqual(userData);
        });

        it('should return user data from sessionStorage', () => {
            const userData = { id: '123', email: 'test@example.com', name: 'Test User' };
            mockSessionStorage.getItem.mockReturnValue(JSON.stringify(userData));

            const result = authService.getCurrentUser();

            expect(result).toEqual(userData);
        });

        it('should return null when no user data exists', () => {
            const result = authService.getCurrentUser();

            expect(result).toBeNull();
        });

        it('should return null when user data is invalid JSON', () => {
            mockLocalStorage.getItem.mockReturnValue('invalid-json');

            const result = authService.getCurrentUser();

            expect(result).toBeNull();
        });
    });

    describe('logout', () => {
        it('should clear all stored data', () => {
            authService.logout();

            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_token');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_refresh_token');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_user');
            expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_remember');
            expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_token');
            expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_refresh_token');
            expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('boi_na_nuvem_user');
        });
    });

    describe('getCurrentToken', () => {
        it('should return token from localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('token-from-local');

            const result = authService.getCurrentToken();

            expect(result).toBe('token-from-local');
        });

        it('should return token from sessionStorage when localStorage is empty', () => {
            mockSessionStorage.getItem.mockReturnValue('token-from-session');

            const result = authService.getCurrentToken();

            expect(result).toBe('token-from-session');
        });

        it('should return null when no token exists', () => {
            const result = authService.getCurrentToken();

            expect(result).toBeNull();
        });
    });

    describe('shouldRemember', () => {
        it('should return true when remember flag is set', () => {
            mockLocalStorage.getItem.mockReturnValue('true');

            const result = authService.shouldRemember();

            expect(result).toBe(true);
        });

        it('should return false when remember flag is not set', () => {
            const result = authService.shouldRemember();

            expect(result).toBe(false);
        });
    });
});

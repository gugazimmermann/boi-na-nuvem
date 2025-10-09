import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock do AuthContext
const mockLogin = vi.fn();
const mockAuthContext = {
    login: mockLogin,
    logout: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    register: vi.fn(),
};

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => mockAuthContext,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock do fetch global
global.fetch = vi.fn();

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                {component}
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Login Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAuthContext.isAuthenticated = false;
        mockAuthContext.isLoading = false;
    });

    it('renders login form correctly', () => {
        renderWithRouter(<Login />);

        expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
        expect(screen.getByText(/Acesse sua/)).toBeInTheDocument();
        expect(screen.getByText('Entre com suas credenciais para acessar o sistema')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sua senha')).toBeInTheDocument();
        expect(screen.getByText('Lembrar de mim')).toBeInTheDocument();
        expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderWithRouter(<Login />);

        expect(screen.getByText('Não tem uma conta?')).toBeInTheDocument();
        expect(screen.getByText('Cadastre-se aqui')).toBeInTheDocument();
        expect(screen.getByText('Voltar para a página inicial')).toBeInTheDocument();
    });

    it('allows user to input email and password', () => {
        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('allows user to toggle remember me checkbox', () => {
        renderWithRouter(<Login />);

        const rememberMeCheckbox = screen.getByLabelText('Lembrar de mim');

        expect(rememberMeCheckbox).not.toBeChecked();

        fireEvent.click(rememberMeCheckbox);
        expect(rememberMeCheckbox).toBeChecked();
    });

    it('submits form with correct data', async () => {
        mockLogin.mockResolvedValue({ success: true });

        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');
        const rememberMeCheckbox = screen.getByLabelText('Lembrar de mim');
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(rememberMeCheckbox);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                rememberMe: true,
            });
        });
    });

    it('shows loading state during login', async () => {
        mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Entrando...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        await waitFor(() => {
            expect(screen.queryByText('Entrando...')).not.toBeInTheDocument();
        });
    });

    it('displays error message on login failure', async () => {
        mockLogin.mockResolvedValue({
            success: false,
            message: 'Email ou senha incorretos'
        });

        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email ou senha incorretos')).toBeInTheDocument();
        });
    });

    it('displays connection error message on network failure', async () => {
        mockLogin.mockRejectedValue(new Error('Network error'));

        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Erro de conexão. Verifique sua internet e tente novamente.')).toBeInTheDocument();
        });
    });

    it('navigates to system page on successful login', async () => {
        mockLogin.mockResolvedValue({ success: true });

        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/sistema');
        });
    });

    it('navigates to system page when already authenticated', () => {
        mockAuthContext.isAuthenticated = true;
        mockAuthContext.isLoading = false;

        renderWithRouter(<Login />);

        expect(mockNavigate).toHaveBeenCalledWith('/sistema');
    });

    it('does not navigate when still loading', () => {
        mockAuthContext.isAuthenticated = true;
        mockAuthContext.isLoading = true;

        renderWithRouter(<Login />);

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('validates required fields', async () => {
        renderWithRouter(<Login />);

        const submitButton = screen.getByRole('button', { name: /entrar/i });
        fireEvent.click(submitButton);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');

        expect(emailInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });

    it('has correct form attributes', () => {
        renderWithRouter(<Login />);

        const emailInput = screen.getByPlaceholderText('seu@email.com');
        const passwordInput = screen.getByPlaceholderText('Sua senha');

        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('autocomplete', 'email');
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');
    });

});

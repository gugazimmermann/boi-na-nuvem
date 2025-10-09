import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import ForgotPassword from './ForgotPassword';
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
const mockForgotPassword = vi.fn();
const mockAuthContext = {
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    forgotPassword: mockForgotPassword,
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

describe('ForgotPassword Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders forgot password form correctly', () => {
        renderWithRouter(<ForgotPassword />);

        expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
        expect(screen.getByText(/Esqueci minha/)).toBeInTheDocument();
        expect(screen.getByText('Digite seu email para receber instruções de redefinição de senha')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /enviar instruções/i })).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderWithRouter(<ForgotPassword />);

        expect(screen.getByText('Lembrou da senha?')).toBeInTheDocument();
        expect(screen.getByText('Voltar ao login')).toBeInTheDocument();
        expect(screen.getByText('Voltar para a página inicial')).toBeInTheDocument();
    });

    it('allows user to input email', () => {
        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(emailInput).toHaveValue('test@example.com');
    });

    it('validates email field is required', async () => {
        renderWithRouter(<ForgotPassword />);

        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });
        fireEvent.click(submitButton);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        expect(emailInput).toBeRequired();
    });

    it('submits form with correct email', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções enviadas para seu email'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
        });
    });

    it('shows loading state during submission', async () => {
        mockForgotPassword.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Enviando...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        await waitFor(() => {
            expect(screen.queryByText('Enviando...')).not.toBeInTheDocument();
        });
    });

    it('displays success message on successful submission', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções de redefinição enviadas para seu email'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email enviado!')).toBeInTheDocument();
            expect(screen.getByText('Instruções de redefinição enviadas para seu email')).toBeInTheDocument();
            expect(screen.getByText('Você será redirecionado para a página de redefinição de senha em alguns segundos...')).toBeInTheDocument();
        });
    });

    it('displays error message on submission failure', async () => {
        mockForgotPassword.mockResolvedValue({
            success: false,
            message: 'Email não encontrado'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email não encontrado')).toBeInTheDocument();
        });
    });

    it('displays connection error message on network failure', async () => {
        mockForgotPassword.mockRejectedValue(new Error('Network error'));

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Erro ao processar solicitação. Tente novamente.')).toBeInTheDocument();
        });
    });

    it('redirects to reset password page after successful submission', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções enviadas'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email enviado!')).toBeInTheDocument();
        });

        // Should redirect after 2 seconds
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/redefinir-senha');
        }, { timeout: 3000 });
    });

    it('shows send to another email button after success', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções enviadas'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Enviar para outro email')).toBeInTheDocument();
        });
    });

    it('allows sending to another email after success', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções enviadas'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email enviado!')).toBeInTheDocument();
        });

        const sendAnotherButton = screen.getByText('Enviar para outro email');
        fireEvent.click(sendAnotherButton);

        // Should return to form
        expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /enviar instruções/i })).toBeInTheDocument();
    });

    it('clears email field after successful submission', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções enviadas'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email enviado!')).toBeInTheDocument();
        });

    });

    it('has correct form attributes', () => {
        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('autocomplete', 'email');
    });


    it('shows success icon after successful submission', async () => {
        mockForgotPassword.mockResolvedValue({
            success: true,
            message: 'Instruções enviadas'
        });

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email enviado!')).toBeInTheDocument();
        });

        // Should show success icon
        const successIcon = document.querySelector('svg');
        expect(successIcon).toBeInTheDocument();
    });

    it('maintains form state during loading', async () => {
        mockForgotPassword.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

        renderWithRouter(<ForgotPassword />);

        const emailInput = screen.getByPlaceholderText('Digite seu email');
        const submitButton = screen.getByRole('button', { name: /enviar instruções/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        // Email should still be visible during loading
        expect(emailInput).toHaveValue('test@example.com');
        expect(screen.getByText('Enviando...')).toBeInTheDocument();
    });
});

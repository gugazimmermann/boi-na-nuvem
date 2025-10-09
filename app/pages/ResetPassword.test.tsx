import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import ResetPassword from './ResetPassword';
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
const mockResetPassword = vi.fn();
const mockAuthContext = {
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    forgotPassword: vi.fn(),
    resetPassword: mockResetPassword,
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

describe('ResetPassword Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders reset password form correctly', () => {
        renderWithRouter(<ResetPassword />);

        expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
        expect(screen.getByText('Redefinir senha')).toBeInTheDocument();
        expect(screen.getByText('Digite o código de verificação recebido por email e sua nova senha')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite o código de verificação')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite sua nova senha')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirme sua nova senha')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /redefinir senha/i })).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderWithRouter(<ResetPassword />);

        expect(screen.getByText('Voltar ao login')).toBeInTheDocument();
    });





    it('submits form with correct data', async () => {
        mockResetPassword.mockResolvedValue({
            success: true,
            message: 'Senha redefinida com sucesso'
        });

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockResetPassword).toHaveBeenCalledWith({
                code: '123456',
                newPassword: 'NewPassword123',
                confirmPassword: 'NewPassword123',
            });
        });
    });

    it('shows loading state during submission', async () => {
        mockResetPassword.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Redefinindo...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        await waitFor(() => {
            expect(screen.queryByText('Redefinindo...')).not.toBeInTheDocument();
        });
    });

    it('displays success message on successful reset', async () => {
        mockResetPassword.mockResolvedValue({
            success: true,
            message: 'Senha redefinida com sucesso'
        });

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Senha redefinida!')).toBeInTheDocument();
            expect(screen.getByText('Senha redefinida com sucesso')).toBeInTheDocument();
            expect(screen.getByText('Você será redirecionado para o login em alguns segundos...')).toBeInTheDocument();
        });
    });

    it('displays error message on reset failure', async () => {
        mockResetPassword.mockResolvedValue({
            success: false,
            message: 'Código de verificação inválido ou expirado'
        });

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: 'invalid' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Código de verificação inválido ou expirado')).toBeInTheDocument();
        });
    });

    it('displays connection error message on network failure', async () => {
        mockResetPassword.mockRejectedValue(new Error('Network error'));

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Erro ao processar solicitação. Tente novamente.')).toBeInTheDocument();
        });
    });

    it('redirects to login page after successful reset', async () => {
        mockResetPassword.mockResolvedValue({
            success: true,
            message: 'Senha redefinida com sucesso'
        });

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Senha redefinida!')).toBeInTheDocument();
        });

        // Should redirect after 3 seconds
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        }, { timeout: 4000 });
    });

    it('shows go to login button after success', async () => {
        mockResetPassword.mockResolvedValue({
            success: true,
            message: 'Senha redefinida com sucesso'
        });

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Ir para o login')).toBeInTheDocument();
        });
    });


    it('has correct form attributes', () => {
        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');

        expect(codeInput).toHaveAttribute('type', 'text');
        expect(codeInput).toHaveAttribute('autocomplete', 'one-time-code');
        expect(newPasswordInput).toHaveAttribute('type', 'password');
        expect(newPasswordInput).toHaveAttribute('autocomplete', 'new-password');
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
        expect(confirmPasswordInput).toHaveAttribute('autocomplete', 'new-password');
    });

    it('shows password requirements hint', () => {
        renderWithRouter(<ResetPassword />);

        expect(screen.getByText('Código enviado para seu email')).toBeInTheDocument();
        expect(screen.getByText('Mínimo de 8 caracteres, incluindo 1 letra maiúscula e 1 minúscula')).toBeInTheDocument();
    });


    it('shows success icon after successful reset', async () => {
        mockResetPassword.mockResolvedValue({
            success: true,
            message: 'Senha redefinida com sucesso'
        });

        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Senha redefinida!')).toBeInTheDocument();
        });

        // Should show success icon
        const successIcon = document.querySelector('svg');
        expect(successIcon).toBeInTheDocument();
    });

    it('disables submit button when form is invalid', () => {
        renderWithRouter(<ResetPassword />);

        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });
        expect(submitButton).toBeDisabled();
    });

    it('enables submit button when form is valid', () => {
        renderWithRouter(<ResetPassword />);

        const codeInput = screen.getByPlaceholderText('Digite o código de verificação');
        const newPasswordInput = screen.getByPlaceholderText('Digite sua nova senha');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
        const submitButton = screen.getByRole('button', { name: /redefinir senha/i });

        fireEvent.change(codeInput, { target: { value: '123456' } });
        fireEvent.change(newPasswordInput, { target: { value: 'NewPassword123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'NewPassword123' } });

        expect(submitButton).not.toBeDisabled();
    });
});

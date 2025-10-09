import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router';
import Register from './Register';
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
const mockRegister = vi.fn();
const mockAuthContext = {
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    register: mockRegister,
};

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => mockAuthContext,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock do fetch global
global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([])
});

const renderWithRouter = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                {component}
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Register Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders registration form correctly', () => {
        renderWithRouter(<Register />);

        expect(screen.getByText('Boi na Nuvem')).toBeInTheDocument();
        expect(screen.getByText('Crie sua Conta')).toBeInTheDocument();
        expect(screen.getByText('Comece a gerenciar sua propriedade rural hoje mesmo')).toBeInTheDocument();
        expect(screen.getByText('14 dias grátis - Plano Enterprise')).toBeInTheDocument();
    });

    it('renders personal information section', () => {
        renderWithRouter(<Register />);

        expect(screen.getByText('Informações Pessoais')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('João Silva')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('joao.silva@email.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('(11) 99999-9999')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('123.456.789-00 ou 12.345.678/0001-90')).toBeInTheDocument();
    });

    it('renders address section', () => {
        renderWithRouter(<Register />);

        expect(screen.getByText('Endereço')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite o nome da rua...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('123')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Apto 45')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Centro')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('São Paulo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('SP')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('01234-567')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Brasil')).toBeInTheDocument();
    });

    it('renders password section', () => {
        renderWithRouter(<Register />);

        expect(screen.getByText('Senha de Acesso')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mínimo 8 caracteres')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Digite a senha novamente')).toBeInTheDocument();
        expect(screen.getByText('A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula e 1 minúscula')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        renderWithRouter(<Register />);

        expect(screen.getByText('Ver Planos')).toBeInTheDocument();
        expect(screen.getByText('Fazer Login')).toBeInTheDocument();
        expect(screen.getByText('Já tem uma conta?')).toBeInTheDocument();
        expect(screen.getByText('Fazer login')).toBeInTheDocument();
    });

    it('allows user to input personal information', () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getByPlaceholderText('João Silva');
        const emailInput = screen.getByPlaceholderText('joao.silva@email.com');
        const phoneInput = screen.getByPlaceholderText('(11) 99999-9999');
        const documentInput = screen.getByPlaceholderText('123.456.789-00 ou 12.345.678/0001-90');

        fireEvent.change(nameInput, { target: { value: 'João Silva' } });
        fireEvent.change(emailInput, { target: { value: 'joao@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '(11) 99999-9999' } });
        fireEvent.change(documentInput, { target: { value: '123.456.789-00' } });

        expect(nameInput).toHaveValue('João Silva');
        expect(emailInput).toHaveValue('joao@example.com');
        expect(phoneInput).toHaveValue('(11) 99999-9999');
        expect(documentInput).toHaveValue('123.456.789-00');
    });

    it('allows user to input address information', () => {
        renderWithRouter(<Register />);

        const streetInput = screen.getByPlaceholderText('Digite o nome da rua...');
        const numberInput = screen.getByPlaceholderText('123');
        const cityInput = screen.getByPlaceholderText('São Paulo');
        const stateInput = screen.getByPlaceholderText('SP');
        const zipCodeInput = screen.getByPlaceholderText('01234-567');

        fireEvent.change(streetInput, { target: { value: 'Rua das Flores' } });
        fireEvent.change(numberInput, { target: { value: '123' } });
        fireEvent.change(cityInput, { target: { value: 'São Paulo' } });
        fireEvent.change(stateInput, { target: { value: 'SP' } });
        fireEvent.change(zipCodeInput, { target: { value: '01234-567' } });

        expect(streetInput).toHaveValue('Rua das Flores');
        expect(numberInput).toHaveValue('123');
        expect(cityInput).toHaveValue('São Paulo');
        expect(stateInput).toHaveValue('SP');
        expect(zipCodeInput).toHaveValue('01234-567');
    });

    it('allows user to input password information', () => {
        renderWithRouter(<Register />);

        const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');
        const confirmPasswordInput = screen.getByPlaceholderText('Digite a senha novamente');

        fireEvent.change(passwordInput, { target: { value: 'Password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });

        expect(passwordInput).toHaveValue('Password123');
        expect(confirmPasswordInput).toHaveValue('Password123');
    });


    it('validates password confirmation', async () => {
        renderWithRouter(<Register />);

        const nameInput = screen.getByPlaceholderText('João Silva');
        const emailInput = screen.getByPlaceholderText('joao.silva@email.com');
        const phoneInput = screen.getByPlaceholderText('(11) 99999-9999');
        const documentInput = screen.getByPlaceholderText('123.456.789-00 ou 12.345.678/0001-90');
        const streetInput = screen.getByLabelText('Rua *');
        const cityInput = screen.getByLabelText('Cidade *');
        const stateInput = screen.getByLabelText('Estado *');
        const zipCodeInput = screen.getByLabelText('CEP *');
        const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');
        const confirmPasswordInput = screen.getByPlaceholderText('Digite a senha novamente');
        const submitButton = screen.getByRole('button', { name: /criar conta/i });

        // Fill required fields
        fireEvent.change(nameInput, { target: { value: 'João Silva' } });
        fireEvent.change(emailInput, { target: { value: 'joao@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '(11) 99999-9999' } });
        fireEvent.change(documentInput, { target: { value: '123.456.789-00' } });
        fireEvent.change(streetInput, { target: { value: 'Rua das Flores' } });
        fireEvent.change(cityInput, { target: { value: 'São Paulo' } });
        fireEvent.change(stateInput, { target: { value: 'SP' } });
        fireEvent.change(zipCodeInput, { target: { value: '01234-567' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Different123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Senhas não coincidem')).toBeInTheDocument();
        });
    });

    it('submits form with correct data', async () => {
        mockRegister.mockResolvedValue({ success: true });

        renderWithRouter(<Register />);

        // Fill all required fields
        fireEvent.change(screen.getByLabelText('Nome Completo *'), { target: { value: 'João Silva' } });
        fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'joao@example.com' } });
        fireEvent.change(screen.getByLabelText('Telefone *'), { target: { value: '(11) 99999-9999' } });
        fireEvent.change(screen.getByLabelText('CPF/CNPJ *'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Rua *'), { target: { value: 'Rua das Flores' } });
        fireEvent.change(screen.getByLabelText('Cidade *'), { target: { value: 'São Paulo' } });
        fireEvent.change(screen.getByLabelText('Estado *'), { target: { value: 'SP' } });
        fireEvent.change(screen.getByLabelText('CEP *'), { target: { value: '01234-567' } });
        fireEvent.change(screen.getByLabelText('Senha *'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Senha *'), { target: { value: 'Password123' } });

        const submitButton = screen.getByRole('button', { name: /criar conta/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith({
                name: 'João Silva',
                email: 'joao@example.com',
                password: 'Password123',
                phone: '(11) 99999-9999',
                document: '123.456.789-00',
                street: 'Rua das Flores',
                number: '',
                complement: '',
                neighborhood: '',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil',
                zipCode: '01234-567',
            });
        });
    });

    it('shows loading state during registration', async () => {
        mockRegister.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

        renderWithRouter(<Register />);

        // Fill all required fields
        fireEvent.change(screen.getByLabelText('Nome Completo *'), { target: { value: 'João Silva' } });
        fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'joao@example.com' } });
        fireEvent.change(screen.getByLabelText('Telefone *'), { target: { value: '(11) 99999-9999' } });
        fireEvent.change(screen.getByLabelText('CPF/CNPJ *'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Rua *'), { target: { value: 'Rua das Flores' } });
        fireEvent.change(screen.getByLabelText('Cidade *'), { target: { value: 'São Paulo' } });
        fireEvent.change(screen.getByLabelText('Estado *'), { target: { value: 'SP' } });
        fireEvent.change(screen.getByLabelText('CEP *'), { target: { value: '01234-567' } });
        fireEvent.change(screen.getByLabelText('Senha *'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Senha *'), { target: { value: 'Password123' } });

        const submitButton = screen.getByRole('button', { name: /criar conta/i });
        fireEvent.click(submitButton);

        expect(screen.getByText('Criando conta...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();

        await waitFor(() => {
            expect(screen.queryByText('Criando conta...')).not.toBeInTheDocument();
        });
    });

    it('displays error message on registration failure', async () => {
        mockRegister.mockResolvedValue({
            success: false,
            message: 'Email já está em uso'
        });

        renderWithRouter(<Register />);

        // Fill all required fields
        fireEvent.change(screen.getByLabelText('Nome Completo *'), { target: { value: 'João Silva' } });
        fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'joao@example.com' } });
        fireEvent.change(screen.getByLabelText('Telefone *'), { target: { value: '(11) 99999-9999' } });
        fireEvent.change(screen.getByLabelText('CPF/CNPJ *'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Rua *'), { target: { value: 'Rua das Flores' } });
        fireEvent.change(screen.getByLabelText('Cidade *'), { target: { value: 'São Paulo' } });
        fireEvent.change(screen.getByLabelText('Estado *'), { target: { value: 'SP' } });
        fireEvent.change(screen.getByLabelText('CEP *'), { target: { value: '01234-567' } });
        fireEvent.change(screen.getByLabelText('Senha *'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Senha *'), { target: { value: 'Password123' } });

        const submitButton = screen.getByRole('button', { name: /criar conta/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email já está em uso')).toBeInTheDocument();
        });
    });

    it('shows success message and redirects on successful registration', async () => {
        mockRegister.mockResolvedValue({ success: true });

        renderWithRouter(<Register />);

        // Fill all required fields
        fireEvent.change(screen.getByLabelText('Nome Completo *'), { target: { value: 'João Silva' } });
        fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'joao@example.com' } });
        fireEvent.change(screen.getByLabelText('Telefone *'), { target: { value: '(11) 99999-9999' } });
        fireEvent.change(screen.getByLabelText('CPF/CNPJ *'), { target: { value: '123.456.789-00' } });
        fireEvent.change(screen.getByLabelText('Rua *'), { target: { value: 'Rua das Flores' } });
        fireEvent.change(screen.getByLabelText('Cidade *'), { target: { value: 'São Paulo' } });
        fireEvent.change(screen.getByLabelText('Estado *'), { target: { value: 'SP' } });
        fireEvent.change(screen.getByLabelText('CEP *'), { target: { value: '01234-567' } });
        fireEvent.change(screen.getByLabelText('Senha *'), { target: { value: 'Password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Senha *'), { target: { value: 'Password123' } });

        const submitButton = screen.getByRole('button', { name: /criar conta/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Conta criada com sucesso!')).toBeInTheDocument();
            expect(screen.getByText(/Você recebeu 14 dias grátis do plano Enterprise/)).toBeInTheDocument();
        });

        // Should redirect after 2 seconds
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        }, { timeout: 3000 });
    });

    it('applies document mask correctly', () => {
        renderWithRouter(<Register />);

        const documentInput = screen.getByLabelText('CPF/CNPJ *');

        // Test CPF mask
        fireEvent.change(documentInput, { target: { value: '12345678900' } });
        expect(documentInput).toHaveValue('123.456.789-00');

        // Test CNPJ mask
        fireEvent.change(documentInput, { target: { value: '12345678000190' } });
        expect(documentInput).toHaveValue('12.345.678/0001-90');
    });

    it('applies phone mask correctly', () => {
        renderWithRouter(<Register />);

        const phoneInput = screen.getByLabelText('Telefone *');

        // Test phone mask
        fireEvent.change(phoneInput, { target: { value: '11999999999' } });
        expect(phoneInput).toHaveValue('(11) 99999-9999');
    });

    it('applies zip code mask correctly', () => {
        renderWithRouter(<Register />);

        const zipCodeInput = screen.getByLabelText('CEP *');

        // Test zip code mask
        fireEvent.change(zipCodeInput, { target: { value: '01234567' } });
        expect(zipCodeInput).toHaveValue('01234-567');
    });
});

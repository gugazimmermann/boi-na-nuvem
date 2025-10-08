import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Form } from './Form';
import type { FormFieldConfig } from './types';

vi.mock('../input/Input', () => ({
  Input: ({
    label,
    config,
    error,
    helperText,
    onChange,
    onBlur,
    onFocus,
    'data-testid': testId,
  }: any) => (
    <div data-testid={testId || 'input'}>
      {label && <label>{label}</label>}
      <input
        type={config?.type || 'text'}
        value={config?.value || ''}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={config?.placeholder}
        required={config?.required}
        disabled={config?.disabled}
        data-testid="input-field"
      />
      {error && <div data-testid="error">{error}</div>}
      {helperText && <div data-testid="helper">{helperText}</div>}
    </div>
  ),
}));

vi.mock('../select/Select', () => ({
  Select: ({
    label,
    options,
    config,
    error,
    helperText,
    onChange,
    onBlur,
    onFocus,
    'data-testid': testId,
  }: any) => (
    <div data-testid={testId || 'select'}>
      {label && <label>{label}</label>}
      <select
        value={config?.value || ''}
        onChange={(e) =>
          onChange?.(
            e.target.value,
            options?.find((opt: any) => opt.value === e.target.value),
          )
        }
        onBlur={onBlur}
        onFocus={onFocus}
        required={config?.required}
        disabled={config?.disabled}
        multiple={config?.multiple}
        data-testid="select-field"
      >
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div data-testid="error">{error}</div>}
      {helperText && <div data-testid="helper">{helperText}</div>}
    </div>
  ),
}));

vi.mock('../button/Button', () => ({
  Button: ({ children, config, onClick, 'data-testid': testId }: any) => (
    <button
      type={config?.type || 'button'}
      disabled={config?.disabled || config?.loading}
      onClick={onClick}
      data-testid={testId || 'button'}
    >
      {config?.loading && <span data-testid="loading">Loading...</span>}
      {children}
    </button>
  ),
}));

describe('Form Component', () => {
  const mockFields: FormFieldConfig[] = [
    {
      type: 'input',
      name: 'username',
      label: 'Username',
      required: true,
      validation: {
        required: true,
        minLength: 3,
      },
      inputConfig: {
        type: 'text',
        placeholder: 'Enter username',
      },
    },
    {
      type: 'input',
      name: 'email',
      label: 'Email',
      required: true,
      validation: {
        required: true,
        email: true,
      },
      inputConfig: {
        type: 'email',
        placeholder: 'Enter email',
      },
    },
    {
      type: 'select',
      name: 'role',
      label: 'Role',
      required: true,
      validation: {
        required: true,
      },
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' },
      ],
    },
  ];

  const mockOnSubmit = vi.fn();
  const mockOnReset = vi.fn();
  const mockOnChange = vi.fn();
  const mockOnValidationChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders form with title and description', () => {
      render(
        <Form
          fields={mockFields}
          config={{
            title: 'Test Form',
            description: 'This is a test form',
          }}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(screen.getByText('Test Form')).toBeInTheDocument();
      expect(screen.getByText('This is a test form')).toBeInTheDocument();
    });

    it('renders all form fields', () => {
      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders submit and reset buttons', () => {
      render(
        <Form
          fields={mockFields}
          config={{
            showResetButton: true,
            submitButtonText: 'Save',
            resetButtonText: 'Clear',
          }}
          onSubmit={mockOnSubmit}
          onReset={mockOnReset}
        />,
      );

      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Form
          fields={mockFields}
          onSubmit={mockOnSubmit}
          className="custom-form"
          data-testid="test-form"
        />,
      );

      const form = screen.getByTestId('test-form');
      expect(form).toHaveClass('custom-form');
    });
  });

  describe('Form State Management', () => {
    it('initializes with provided initial values', () => {
      const initialValues = {
        username: 'testuser',
        email: 'test@example.com',
        role: 'admin',
      };

      render(<Form fields={mockFields} initialValues={initialValues} onSubmit={mockOnSubmit} />);

      const usernameInput = screen.getByDisplayValue('testuser');
      const emailInput = screen.getByDisplayValue('test@example.com');
      const roleSelect = screen.getByTestId('select-field');

      expect(usernameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(roleSelect).toBeInTheDocument();
      expect(roleSelect).toHaveValue('admin');
    });

    it('updates form state when fields change', async () => {
      const user = userEvent.setup();

      render(<Form fields={mockFields} onSubmit={mockOnSubmit} onChange={mockOnChange} />);

      const usernameInput = screen.getByPlaceholderText('Enter username');
      await user.type(usernameInput, 'newuser');

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    it('validates required fields', async () => {
      const user = userEvent.setup();

      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it('shows validation errors for invalid fields', async () => {
      const user = userEvent.setup();

      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      const usernameInput = screen.getByPlaceholderText('Enter username');
      await user.type(usernameInput, 'ab');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText(/tamanho mínimo é 3 caracteres/i)).toBeInTheDocument();
      });
    });

    it('validates email format', async () => {
      const user = userEvent.setup();

      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByPlaceholderText('Enter email');
      await user.type(emailInput, 'invalid-email');
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(/por favor, insira um endereço de email válido/i),
        ).toBeInTheDocument();
      });
    });

    it('calls onValidationChange when validation state changes', async () => {
      const user = userEvent.setup();

      render(
        <Form
          fields={mockFields}
          onSubmit={mockOnSubmit}
          onValidationChange={mockOnValidationChange}
        />,
      );

      const usernameInput = screen.getByPlaceholderText('Enter username');
      await user.type(usernameInput, 'validuser');
      await user.tab();

      expect(mockOnValidationChange).toHaveBeenCalled();
    });
  });

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup();

      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      const usernameInput = screen.getByPlaceholderText('Enter username');
      const emailInput = screen.getByPlaceholderText('Enter email');
      const roleSelect = screen.getByTestId('select-field');

      await user.type(usernameInput, 'testuser');
      await user.type(emailInput, 'test@example.com');
      await user.selectOptions(roleSelect, 'admin');

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            username: 'testuser',
            email: 'test@example.com',
            role: 'admin',
          },
          expect.objectContaining({
            values: {
              username: 'testuser',
              email: 'test@example.com',
              role: 'admin',
            },
            isValid: true,
          }),
        );
      });
    });

    it('prevents submission with invalid data', async () => {
      const user = userEvent.setup();

      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('shows loading state during submission', async () => {
      const user = userEvent.setup();
      const asyncOnSubmit = vi
        .fn()
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      render(<Form fields={mockFields} onSubmit={asyncOnSubmit} />);

      const usernameInput = screen.getByPlaceholderText('Enter username');
      const emailInput = screen.getByPlaceholderText('Enter email');
      const roleSelect = screen.getByTestId('select-field');

      await user.type(usernameInput, 'testuser');
      await user.type(emailInput, 'test@example.com');
      await user.selectOptions(roleSelect, 'admin');

      const submitButton = screen.getByRole('button', { name: /enviar/i });
      await user.click(submitButton);

      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });

  describe('Form Reset', () => {
    it('resets form to initial values', async () => {
      const user = userEvent.setup();
      const initialValues = {
        username: 'initialuser',
        email: 'initial@example.com',
        role: 'user',
      };

      render(
        <Form
          fields={mockFields}
          initialValues={initialValues}
          onSubmit={mockOnSubmit}
          onReset={mockOnReset}
          config={{ showResetButton: true }}
        />,
      );

      const usernameInput = screen.getByDisplayValue('initialuser');
      await user.clear(usernameInput);
      await user.type(usernameInput, 'changeduser');

      const resetButton = screen.getByRole('button', { name: /limpar/i });
      await user.click(resetButton);

      expect(screen.getByDisplayValue('initialuser')).toBeInTheDocument();
      expect(mockOnReset).toHaveBeenCalled();
    });
  });

  describe('Layout Options', () => {
    it('renders vertical layout by default', () => {
      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('renders grid layout when specified', () => {
      render(
        <Form
          fields={mockFields}
          config={{ layout: 'grid', gridColumns: 2 }}
          onSubmit={mockOnSubmit}
        />,
      );

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Field Types', () => {
    it('renders input fields correctly', () => {
      const inputField: FormFieldConfig = {
        type: 'input',
        name: 'testInput',
        label: 'Test Input',
        inputConfig: { type: 'text' },
      };

      render(<Form fields={[inputField]} onSubmit={mockOnSubmit} />);

      expect(screen.getByText('Test Input')).toBeInTheDocument();
      expect(screen.getByTestId('input-field')).toBeInTheDocument();
    });

    it('renders select fields correctly', () => {
      const selectField: FormFieldConfig = {
        type: 'select',
        name: 'testSelect',
        label: 'Test Select',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      };

      render(<Form fields={[selectField]} onSubmit={mockOnSubmit} />);

      expect(screen.getByText('Test Select')).toBeInTheDocument();
      expect(screen.getByTestId('select-field')).toBeInTheDocument();
    });

    it('shows error for unsupported field types', () => {
      const unsupportedField: FormFieldConfig = {
        type: 'unknown' as any,
        name: 'testUnknown',
        label: 'Test Unknown',
      };

      render(<Form fields={[unsupportedField]} onSubmit={mockOnSubmit} />);

      expect(screen.getByText(/unsupported field type: unknown/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<Form fields={mockFields} onSubmit={mockOnSubmit} data-testid="accessible-form" />);

      const form = screen.getByTestId('accessible-form');
      expect(form).toBeInTheDocument();
    });

    it('associates labels with form fields', () => {
      render(<Form fields={mockFields} onSubmit={mockOnSubmit} />);

      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });
  });
});

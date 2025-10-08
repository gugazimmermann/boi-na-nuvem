import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input, Icons } from './index';

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Nome de usuário" />);

    expect(screen.getByLabelText('Nome de usuário')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders input without label', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toBeDisabled();
    expect(input).not.toHaveAttribute('required');
  });

  it('renders with custom config', () => {
    render(
      <Input
        config={{
          type: 'email',
          placeholder: 'Enter email',
          required: true,
          disabled: true,
        }}
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test value' }),
      }),
    );
  });

  it('calls onBlur when input loses focus', () => {
    const handleBlur = vi.fn();
    render(<Input onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus when input gains focus', () => {
    const handleFocus = vi.fn();
    render(<Input onFocus={handleFocus} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Input config={{ variant }} data-testid={`input-${variant}`} />);

      expect(screen.getByTestId(`input-${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Input config={{ size }} data-testid={`input-${size}`} />);

      expect(screen.getByTestId(`input-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different types', () => {
    const types = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'search',
      'date',
      'time',
    ] as const;

    types.forEach((type) => {
      const { unmount } = render(<Input config={{ type }} data-testid={`input-${type}`} />);

      const input = screen.getByTestId(`input-${type}`);
      expect(input).toHaveAttribute('type', type);
      unmount();
    });
  });

  it('renders with icon on left', () => {
    render(<Input icon={Icons.user} iconPosition="left" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    expect(input.parentElement?.querySelector('.absolute')).toBeInTheDocument();
  });

  it('renders with icon on right', () => {
    render(<Input icon={Icons.search} iconPosition="right" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    expect(input.parentElement?.querySelector('.absolute')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input error="Este campo é obrigatório" />);

    expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders helper text', () => {
    render(<Input helperText="Digite seu nome de usuário" />);

    expect(screen.getByText('Digite seu nome de usuário')).toBeInTheDocument();
  });

  it('does not render helper text when error is present', () => {
    render(<Input error="Este campo é obrigatório" helperText="Digite seu nome de usuário" />);

    expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
    expect(screen.queryByText('Digite seu nome de usuário')).not.toBeInTheDocument();
  });

  it('renders required label indicator', () => {
    render(<Input label="Nome de usuário" config={{ required: true }} />);

    const label = screen.getByText('Nome de usuário');
    expect(label).toBeInTheDocument();
  });

  it('renders disabled input', () => {
    render(<Input config={{ disabled: true }} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders readonly input', () => {
    render(<Input config={{ readonly: true }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly');
  });

  it('renders with value', () => {
    render(<Input config={{ value: 'test value' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });

  it('renders with defaultValue', () => {
    render(<Input config={{ defaultValue: 'default value' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('default value');
  });

  it('renders with maxLength', () => {
    render(<Input config={{ maxLength: 10 }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('renders with minLength', () => {
    render(<Input config={{ minLength: 5 }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('minLength', '5');
  });

  it('renders with min and max for number input', () => {
    render(
      <Input
        config={{
          type: 'number',
          min: 0,
          max: 100,
        }}
      />,
    );

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('renders with step for number input', () => {
    render(
      <Input
        config={{
          type: 'number',
          step: 0.5,
        }}
      />,
    );

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('step', '0.5');
  });

  it('renders with pattern', () => {
    render(<Input config={{ pattern: '[0-9]+' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('pattern', '[0-9]+');
  });

  it('renders with autoComplete', () => {
    render(<Input config={{ autoComplete: 'email' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autoComplete', 'email');
  });

  it('renders with autoFocus', () => {
    const { container } = render(<Input config={{ autoFocus: true }} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('applies data-testid', () => {
    render(<Input data-testid="test-input" />);

    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<Input config={{ type: 'password' }} />);

    const input = screen.getByDisplayValue('');
    const toggleButton = screen.getByLabelText('Mostrar senha');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Ocultar senha')).toBeInTheDocument();
  });

  it('renders password input with lock icon', () => {
    render(<Input config={{ type: 'password' }} icon={Icons.lock} iconPosition="left" />);

    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'password');

    expect(input.parentElement?.querySelectorAll('svg')).toHaveLength(2);
  });

  it('renders with all available icons', () => {
    const iconNames = Object.keys(Icons) as Array<keyof typeof Icons>;

    iconNames.forEach((iconName) => {
      const { unmount } = render(<Input icon={Icons[iconName]} data-testid={`icon-${iconName}`} />);

      const input = screen.getByTestId(`icon-${iconName}`);
      expect(input).toBeInTheDocument();
      expect(input.parentElement?.querySelector('svg')).toBeInTheDocument();
      unmount();
    });
  });

  it('maintains proper ARIA attributes', () => {
    render(<Input label="Entrada de Teste" error="Erro de teste" helperText="Texto de ajuda" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('generates unique IDs for multiple inputs', () => {
    render(
      <div>
        <Input label="Input 1" />
        <Input label="Input 2" />
      </div>,
    );

    const inputs = screen.getAllByRole('textbox');
    const labels = screen.getAllByText(/Input \d/);

    expect(inputs).toHaveLength(2);
    expect(labels).toHaveLength(2);

    const ids = inputs.map((input) => input.id);
    expect(new Set(ids).size).toBe(2);
  });

  it('handles controlled input correctly', () => {
    const { rerender } = render(<Input config={{ value: 'initial' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial');

    rerender(<Input config={{ value: 'updated' }} />);
    expect(input).toHaveValue('updated');
  });

  it('handles uncontrolled input correctly', () => {
    render(<Input config={{ defaultValue: 'default' }} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('default');

    fireEvent.change(input, { target: { value: 'changed' } });
    expect(input).toHaveValue('changed');
  });
});

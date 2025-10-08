import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select, Icons } from './index';

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  const mockGroupedOptions = [
    { value: 'group1-option1', label: 'Group 1 Option 1', group: 'Group 1' },
    { value: 'group1-option2', label: 'Group 1 Option 2', group: 'Group 1' },
    { value: 'group2-option1', label: 'Group 2 Option 1', group: 'Group 2' },
    { value: 'no-group', label: 'No Group Option' },
  ];

  it('renders select with label', () => {
    render(<Select label="Seleção de Teste" options={mockOptions} />);

    expect(screen.getByLabelText('Seleção de Teste')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders select without label', () => {
    render(<Select options={mockOptions} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).not.toBeDisabled();
    expect(select).not.toHaveAttribute('required');
    expect(select).not.toHaveAttribute('multiple');
  });

  it('renders with custom config', () => {
    render(
      <Select
        options={mockOptions}
        config={{
          disabled: true,
          required: true,
          multiple: true,
          placeholder: 'Select an option',
        }}
      />,
    );

    const select = screen.getByRole('listbox');
    expect(select).toBeDisabled();
    expect(select).toHaveAttribute('required');
    expect(select).toHaveAttribute('multiple');
  });

  it('renders all options', () => {
    render(<Select options={mockOptions} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders disabled options as disabled', () => {
    render(<Select options={mockOptions} />);

    const disabledOption = screen.getByText('Option 3');
    expect(disabledOption).toBeDisabled();
  });

  it('renders grouped options with optgroups', () => {
    render(<Select options={mockGroupedOptions} />);

    const select = screen.getByRole('combobox');
    const optgroups = select.querySelectorAll('optgroup');
    expect(optgroups).toHaveLength(2);
    expect(optgroups[0]).toHaveAttribute('label', 'Group 1');
    expect(optgroups[1]).toHaveAttribute('label', 'Group 2');
    expect(screen.getByText('Group 1 Option 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2 Option 1')).toBeInTheDocument();
    expect(screen.getByText('No Group Option')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('option2', mockOptions[1]);
  });

  it('calls onChange with array for multiple select', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} config={{ multiple: true }} onChange={handleChange} />);

    const select = screen.getByRole('listbox');

    Object.defineProperty(select, 'selectedOptions', {
      value: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
      ],
      writable: true,
    });

    fireEvent.change(select, { target: { value: 'option1' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onBlur when select loses focus', () => {
    const handleBlur = vi.fn();
    render(<Select options={mockOptions} onBlur={handleBlur} />);

    const select = screen.getByRole('combobox');
    fireEvent.blur(select);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus when select gains focus', () => {
    const handleFocus = vi.fn();
    render(<Select options={mockOptions} onFocus={handleFocus} />);

    const select = screen.getByRole('combobox');
    fireEvent.focus(select);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const variants = ['default', 'success', 'warning', 'error', 'info'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Select options={mockOptions} config={{ variant }} data-testid={`select-${variant}`} />,
      );

      expect(screen.getByTestId(`select-${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(
        <Select options={mockOptions} config={{ size }} data-testid={`select-${size}`} />,
      );

      expect(screen.getByTestId(`select-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with icon on left', () => {
    render(<Select options={mockOptions} icon={Icons.globe} iconPosition="left" />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    expect(select.parentElement?.querySelector('.absolute')).toBeInTheDocument();
  });

  it('renders with icon on right', () => {
    render(<Select options={mockOptions} icon={Icons.star} iconPosition="right" />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    expect(select.parentElement?.querySelector('.absolute')).toBeInTheDocument();
  });

  it('renders dropdown arrow when no right icon', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    expect(select.parentElement?.querySelector('svg')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Select options={mockOptions} error="Este campo é obrigatório" />);

    expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders helper text', () => {
    render(<Select options={mockOptions} helperText="Selecione uma opção" />);

    expect(screen.getByText('Selecione uma opção')).toBeInTheDocument();
  });

  it('does not render helper text when error is present', () => {
    render(
      <Select
        options={mockOptions}
        error="Este campo é obrigatório"
        helperText="Selecione uma opção"
      />,
    );

    expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
    expect(screen.queryByText('Selecione uma opção')).not.toBeInTheDocument();
  });

  it('renders required label indicator', () => {
    render(<Select options={mockOptions} label="Seleção de Teste" config={{ required: true }} />);

    const label = screen.getByText('Seleção de Teste');
    expect(label).toBeInTheDocument();
  });

  it('renders disabled select', () => {
    render(<Select options={mockOptions} config={{ disabled: true }} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('renders with placeholder', () => {
    render(<Select options={mockOptions} config={{ placeholder: 'Escolha uma opção' }} />);

    expect(screen.getByText('Escolha uma opção')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Select options={mockOptions} config={{ value: 'option2' }} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('renders with defaultValue', () => {
    render(<Select options={mockOptions} config={{ defaultValue: 'option1' }} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');
  });

  it('renders with autoFocus', () => {
    const { container } = render(<Select options={mockOptions} config={{ autoFocus: true }} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Select options={mockOptions} className="custom-class" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });

  it('applies data-testid', () => {
    render(<Select options={mockOptions} data-testid="test-select" />);

    expect(screen.getByTestId('test-select')).toBeInTheDocument();
  });

  it('renders with all available icons', () => {
    const iconNames = Object.keys(Icons) as Array<keyof typeof Icons>;

    iconNames.forEach((iconName) => {
      const { unmount } = render(
        <Select options={mockOptions} icon={Icons[iconName]} data-testid={`icon-${iconName}`} />,
      );

      const select = screen.getByTestId(`icon-${iconName}`);
      expect(select).toBeInTheDocument();
      expect(select.parentElement?.querySelector('svg')).toBeInTheDocument();
      unmount();
    });
  });

  it('maintains proper ARIA attributes', () => {
    render(
      <Select
        options={mockOptions}
        label="Seleção de Teste"
        error="Erro de teste"
        helperText="Texto de ajuda"
      />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby');
  });

  it('generates unique IDs for multiple selects', () => {
    render(
      <div>
        <Select options={mockOptions} label="Select 1" />
        <Select options={mockOptions} label="Select 2" />
      </div>,
    );

    const selects = screen.getAllByRole('combobox');
    const labels = screen.getAllByText(/Select \d/);

    expect(selects).toHaveLength(2);
    expect(labels).toHaveLength(2);

    const ids = selects.map((select) => select.id);
    expect(new Set(ids).size).toBe(2);
  });

  it('handles controlled select correctly', () => {
    const { rerender } = render(<Select options={mockOptions} config={{ value: 'option1' }} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');

    rerender(<Select options={mockOptions} config={{ value: 'option2' }} />);
    expect(select).toHaveValue('option2');
  });

  it('handles uncontrolled select correctly', () => {
    render(<Select options={mockOptions} config={{ defaultValue: 'option1' }} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');

    fireEvent.change(select, { target: { value: 'option2' } });
    expect(select).toHaveValue('option2');
  });

  it('handles multiple select correctly', () => {
    render(
      <Select
        options={mockOptions}
        config={{
          multiple: true,
          value: ['option1', 'option2'],
        }}
      />,
    );

    const select = screen.getByRole('listbox');
    expect(select).toHaveAttribute('multiple');

    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('handles empty options array', () => {
    render(<Select options={[]} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(0);
  });

  it('handles options with different value types', () => {
    const mixedOptions = [
      { value: 'string', label: 'Valor String' },
      { value: 123, label: 'Valor Numérico' },
      { value: true, label: 'Valor Booleano' },
    ];

    render(<Select options={mixedOptions} />);

    expect(screen.getByText('Valor String')).toBeInTheDocument();
    expect(screen.getByText('Valor Numérico')).toBeInTheDocument();
    expect(screen.getByText('Valor Booleano')).toBeInTheDocument();
  });
});

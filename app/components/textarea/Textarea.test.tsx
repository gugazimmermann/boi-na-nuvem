import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders with label and updates uncontrolled value', () => {
    render(<Textarea label="Descrição" config={{ defaultValue: 'abc' }} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(textarea.value).toBe('abc');
    fireEvent.change(textarea, { target: { value: 'xyz' } });
    expect(textarea.value).toBe('xyz');
  });

  it('calls onChange and respects controlled value', () => {
    const onChange = vi.fn();
    render(<Textarea config={{ value: 'fixed' }} onChange={onChange} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('fixed');
    fireEvent.change(textarea, { target: { value: 'ignored' } });
    expect(onChange).toHaveBeenCalled();
    expect(textarea.value).toBe('fixed');
  });

  it('shows error and helper text appropriately', () => {
    const { rerender } = render(<Textarea error="Obrigatório" />);
    expect(screen.getByText('Obrigatório')).toBeInTheDocument();

    rerender(<Textarea helperText="Dica" />);
    expect(screen.getByText('Dica')).toBeInTheDocument();
  });
});

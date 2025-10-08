import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Actions } from './Actions';

describe('Actions Component', () => {
  it('renders title and optional description', () => {
    render(<Actions title="Ações" description="Descrição" actions={[]} />);

    expect(screen.getByText('Ações')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
  });

  it('omits description when not provided', () => {
    render(<Actions title="Sem descrição" actions={[]} />);

    expect(screen.getByText('Sem descrição')).toBeInTheDocument();
    expect(screen.queryByText('Descrição')).not.toBeInTheDocument();
  });

  it('renders all provided actions as buttons and handles clicks', () => {
    const onClick1 = vi.fn();
    const onClick2 = vi.fn();

    render(
      <Actions
        title="Title"
        actions={[
          { id: '1', label: 'Salvar', onClick: onClick1, variant: 'primary' },
          { id: '2', label: 'Cancelar', onClick: onClick2, variant: 'secondary' },
        ]}
      />,
    );

    const salvar = screen.getByRole('button', { name: 'Salvar' });
    const cancelar = screen.getByRole('button', { name: 'Cancelar' });

    expect(salvar).toBeInTheDocument();
    expect(cancelar).toBeInTheDocument();

    fireEvent.click(salvar);
    fireEvent.click(cancelar);

    expect(onClick1).toHaveBeenCalledTimes(1);
    expect(onClick2).toHaveBeenCalledTimes(1);
  });

  it('passes disabled and loading to buttons', () => {
    render(
      <Actions
        title="Title"
        actions={[
          { id: '1', label: 'Salvar', onClick: vi.fn(), disabled: true },
          { id: '2', label: 'Apagar', onClick: vi.fn(), loading: true },
        ]}
      />,
    );

    const disabledBtn = screen.getByRole('button', { name: 'Salvar' });
    const loadingBtn = screen.getByRole('button', { name: 'Apagar' });

    expect(disabledBtn).toBeDisabled();
    expect(loadingBtn).toBeDisabled();
  });
});

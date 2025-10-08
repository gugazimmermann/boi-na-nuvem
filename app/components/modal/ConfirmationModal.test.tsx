import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmationModal } from './ConfirmationModal';

describe('ConfirmationModal Component', () => {
  it('renders title and message when open', () => {
    render(
      <ConfirmationModal
        isOpen
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Confirmar"
        message="Deseja continuar?"
        data-testid="confirm-modal"
      />,
    );

    expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmar')[0]).toBeInTheDocument();
    expect(screen.getByText('Deseja continuar?')).toBeInTheDocument();
  });

  it('calls onConfirm and onCancel/Close appropriately', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <ConfirmationModal
        isOpen
        onClose={onClose}
        onConfirm={onConfirm}
        title="Remover"
        message="Tem certeza?"
        data-testid="confirm-modal"
      />,
    );

    fireEvent.click(screen.getByTestId('confirm-modal-confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('confirm-modal-cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('respects loading state (disables actions)', () => {
    render(
      <ConfirmationModal
        isOpen
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        title="Ação"
        message="Processando"
        loading
        data-testid="confirm-modal"
      />,
    );

    expect(screen.getByTestId('confirm-modal-confirm')).toBeDisabled();
    expect(screen.getByTestId('confirm-modal-cancel')).toBeDisabled();
  });
});

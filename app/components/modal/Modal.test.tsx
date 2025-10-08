import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

describe('Modal Component', () => {
  it('does not render when closed', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Content</div>
      </Modal>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders with basic structure when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} data-testid="modal">
        <ModalHeader title="Título" onClose={vi.fn()} />
        <ModalBody>
          <div>Conteúdo</div>
        </ModalBody>
        <ModalFooter>
          <button>Ok</button>
        </ModalFooter>
      </Modal>,
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked if enabled', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} config={{ closeOnOverlayClick: true }}>
        <div>Content</div>
      </Modal>,
    );

    const closeButton = screen.queryByLabelText('Fechar modal', { selector: 'button' });
    const overlayFromClose = closeButton?.parentElement?.previousElementSibling as
      | HTMLElement
      | undefined;
    const overlay = (overlayFromClose ||
      document.querySelector('[aria-hidden="true"]')) as HTMLElement | null;
    expect(overlay).toBeTruthy();
    if (overlay) fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay click is disabled', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} config={{ closeOnOverlayClick: false }}>
        <div>Content</div>
      </Modal>,
    );

    const overlay = document.querySelector('[aria-hidden="true"]') as HTMLElement | null;
    if (overlay) fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });
});

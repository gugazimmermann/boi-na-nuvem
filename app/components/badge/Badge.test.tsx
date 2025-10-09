import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Badge } from './Badge';
import { Icons } from './icons';

describe('Badge Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Badge>Badge de Teste</Badge>);

      const badge = screen.getByText('Badge de Teste').closest('span');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('renders with custom test id', () => {
      render(<Badge data-testid="custom-badge">Test Badge</Badge>);

      const badge = screen.getByTestId('custom-badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Badge className="custom-class">Test Badge</Badge>);

      const badge = screen.getByText('Test Badge').closest('span');
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Badge>Badge Primário</Badge>);

      const badge = screen.getByText('Badge Primário').closest('span');
      expect(badge).toHaveClass('bg-sky-100', 'text-sky-800');
    });

    it('renders secondary variant', () => {
      render(<Badge config={{ variant: 'secondary' }}>Badge Secundário</Badge>);

      const badge = screen.getByText('Badge Secundário').closest('span');
      expect(badge).toHaveClass('bg-stone-100', 'text-stone-800');
    });

    it('renders success variant', () => {
      render(<Badge config={{ variant: 'success' }}>Badge de Sucesso</Badge>);

      const badge = screen.getByText('Badge de Sucesso').closest('span');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('renders warning variant', () => {
      render(<Badge config={{ variant: 'warning' }}>Badge de Aviso</Badge>);

      const badge = screen.getByText('Badge de Aviso').closest('span');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-800');
    });

    it('renders error variant', () => {
      render(<Badge config={{ variant: 'error' }}>Badge de Erro</Badge>);

      const badge = screen.getByText('Badge de Erro').closest('span');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('renders info variant', () => {
      render(<Badge config={{ variant: 'info' }}>Badge de Informação</Badge>);

      const badge = screen.getByText('Badge de Informação').closest('span');
      expect(badge).toHaveClass('bg-sky-100', 'text-sky-800');
    });

    it('renders neutral variant', () => {
      render(<Badge config={{ variant: 'neutral' }}>Badge Neutro</Badge>);

      const badge = screen.getByText('Badge Neutro').closest('span');
      expect(badge).toHaveClass('bg-stone-50', 'text-stone-600');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Badge>Badge Médio</Badge>);

      const badge = screen.getByText('Badge Médio').closest('span');
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('renders extra small size', () => {
      render(<Badge config={{ size: 'xs' }}>XS Badge</Badge>);

      const badge = screen.getByText('XS Badge').closest('span');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders small size', () => {
      render(<Badge config={{ size: 'sm' }}>Badge Pequeno</Badge>);

      const badge = screen.getByText('Badge Pequeno').closest('span');
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });

    it('renders large size', () => {
      render(<Badge config={{ size: 'lg' }}>Badge Grande</Badge>);

      const badge = screen.getByText('Badge Grande').closest('span');
      expect(badge).toHaveClass('px-4', 'py-2', 'text-base');
    });
  });

  describe('Shapes', () => {
    it('renders rounded shape by default', () => {
      render(<Badge>Badge Arredondado</Badge>);

      const badge = screen.getByText('Badge Arredondado').closest('span');
      expect(badge).toHaveClass('rounded-md');
    });

    it('renders pill shape', () => {
      render(<Badge config={{ shape: 'pill' }}>Badge Pílula</Badge>);

      const badge = screen.getByText('Badge Pílula').closest('span');
      expect(badge).toHaveClass('rounded-full');
    });

    it('renders square shape', () => {
      render(<Badge config={{ shape: 'square' }}>Badge Quadrado</Badge>);

      const badge = screen.getByText('Badge Quadrado').closest('span');
      expect(badge).toHaveClass('rounded-none');
    });
  });

  describe('Icons', () => {
    it('renders with left icon', () => {
      render(
        <Badge
          config={{
            icon: <Icons.check />,
            iconPosition: 'left',
          }}
        >
          With Icon
        </Badge>,
      );

      const badge = screen.getByText('With Icon').closest('span');
      const icon = badge?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(
        <Badge
          config={{
            icon: <Icons.info />,
            iconPosition: 'right',
          }}
        >
          With Icon
        </Badge>,
      );

      const badge = screen.getByText('With Icon').closest('span');
      const icon = badge?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('does not render icon when not provided', () => {
      render(<Badge>No Icon</Badge>);

      const badge = screen.getByText('No Icon').closest('span');
      const icon = badge?.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Removable Badges', () => {
    it('renders remove button when removable is true', () => {
      const onRemove = vi.fn();
      render(
        <Badge config={{ removable: true }} onRemove={onRemove}>
          Removable Badge
        </Badge>,
      );

      const removeButton = screen.getByLabelText('Remover badge');
      expect(removeButton).toBeInTheDocument();
    });

    it('does not render remove button when removable is false', () => {
      render(<Badge>Non-removable Badge</Badge>);

      const removeButton = screen.queryByLabelText('Remover badge');
      expect(removeButton).not.toBeInTheDocument();
    });

    it('calls onRemove when remove button is clicked', () => {
      const onRemove = vi.fn();
      render(
        <Badge config={{ removable: true }} onRemove={onRemove}>
          Removable Badge
        </Badge>,
      );

      const removeButton = screen.getByLabelText('Remover badge');
      fireEvent.click(removeButton);

      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('calls onRemove when remove button is activated with keyboard', () => {
      const onRemove = vi.fn();
      render(
        <Badge config={{ removable: true }} onRemove={onRemove}>
          Removable Badge
        </Badge>,
      );

      const removeButton = screen.getByLabelText('Remover badge');
      fireEvent.keyDown(removeButton, { key: 'Enter' });

      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('calls onRemove when remove button is activated with space key', () => {
      const onRemove = vi.fn();
      render(
        <Badge config={{ removable: true }} onRemove={onRemove}>
          Removable Badge
        </Badge>,
      );

      const removeButton = screen.getByLabelText('Remover badge');
      fireEvent.keyDown(removeButton, { key: ' ' });

      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('prevents event propagation when remove button is clicked', () => {
      const onRemove = vi.fn();
      const onBadgeClick = vi.fn();

      render(
        <div onClick={onBadgeClick}>
          <Badge config={{ removable: true }} onRemove={onRemove}>
            Removable Badge
          </Badge>
        </div>,
      );

      const removeButton = screen.getByLabelText('Remover badge');
      fireEvent.click(removeButton);

      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onBadgeClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Badge>Badge Acessível</Badge>);

      const badge = screen.getByText('Badge Acessível').closest('span');
      expect(badge).toHaveAttribute('role', 'status');
      expect(badge).toHaveAttribute('aria-live', 'polite');
    });

    it('remove button has proper accessibility attributes', () => {
      const onRemove = vi.fn();
      render(
        <Badge config={{ removable: true }} onRemove={onRemove}>
          Removable Badge
        </Badge>,
      );

      const removeButton = screen.getByLabelText('Remover badge');
      expect(removeButton).toHaveAttribute('aria-label', 'Remover badge');
      expect(removeButton).toHaveAttribute('title', 'Remover badge');
    });
  });

  describe('Edge Cases', () => {
    it('renders without children', () => {
      render(<Badge config={{ variant: 'primary' }} />);

      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });

    it('handles empty string children', () => {
      render(<Badge>{''}</Badge>);

      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Badge>{null}</Badge>);

      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(<Badge>{undefined}</Badge>);

      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });
  });
});

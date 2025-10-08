import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingState } from './LoadingState';

describe('LoadingState Component', () => {
  it('renders with default message', () => {
    render(<LoadingState />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders with custom message and className', () => {
    const { container } = render(<LoadingState message="Buscando dados" className="h-20" />);
    expect(screen.getByText('Buscando dados')).toBeInTheDocument();

    expect(container.firstChild).toHaveClass('h-20');
  });
});

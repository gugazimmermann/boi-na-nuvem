import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
  it('renders title and optional subtitle', () => {
    render(<Header title="Título" subtitle="Subtítulo" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
  });

  it('renders optional icon and actions', () => {
    const Icon = () => <svg data-testid="icon" />;
    const Actions = () => <button>Action</button>;

    render(<Header title="Com Icone" icon={<Icon />} actions={<Actions />} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('renders and handles back button click', () => {
    const onBack = vi.fn();
    render(<Header title="Com Voltar" backButton={{ label: 'Voltar', onClick: onBack }} />);

    const back = screen.getByRole('button', { name: 'Voltar' });
    fireEvent.click(back);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders info items', () => {
    const InfoIcon = () => <svg data-testid="info-icon" />;
    render(<Header title="Com Info" info={[{ label: 'L', value: 'V', icon: <InfoIcon /> }]} />);

    expect(screen.getByText('V')).toBeInTheDocument();
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
  });
});

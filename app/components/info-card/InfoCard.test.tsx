import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfoCard } from './InfoCard';

describe('InfoCard Component', () => {
  it('renders title, icon and children', () => {
    const Icon = () => <svg data-testid="icon" />;

    render(
      <InfoCard
        title="Informações"
        icon={<Icon />}
        gradientFrom="from-blue-500"
        gradientTo="to-indigo-600"
      >
        <div>Conteúdo</div>
      </InfoCard>,
    );

    expect(screen.getByText('Informações')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });
});

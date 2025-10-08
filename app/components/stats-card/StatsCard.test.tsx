import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsCard } from './StatsCard';

describe('StatsCard Component', () => {
  it('renders title, value, description and icons', () => {
    const Icon = () => <svg data-testid="icon-instance" />;
    render(
      <StatsCard
        title="Animais"
        icon={<Icon />}
        value={120}
        description="Animais cadastrados"
        progressPercentage={60}
        gradientFrom="from-green-500"
        gradientTo="to-emerald-600"
        iconBgFrom="from-green-400"
        iconBgTo="to-emerald-500"
        iconTextColor="text-white"
      />,
    );

    expect(screen.getByText('Animais')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('Animais cadastrados')).toBeInTheDocument();

    expect(screen.getAllByTestId('icon-instance').length).toBeGreaterThanOrEqual(1);
  });
});

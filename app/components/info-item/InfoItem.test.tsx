import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfoItem } from './InfoItem';

describe('InfoItem Component', () => {
  it('renders icon, label and value', () => {
    const Icon = () => <svg data-testid="icon" />;

    render(<InfoItem icon={<Icon />} label="Peso" value="300kg" />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Peso')).toBeInTheDocument();
    expect(screen.getByText('300kg')).toBeInTheDocument();
  });
});

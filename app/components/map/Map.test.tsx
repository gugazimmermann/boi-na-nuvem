import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Map, MapWithFallback } from './Map';

describe('Map Components', () => {
  it('renders Map with iframe and computed src', () => {
    render(<Map latitude={-10} longitude={-50} zoom={16} />);
    const iframe = screen.getByTitle('Mapa da Localização') as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain('openstreetmap');
  });

  it('MapWithFallback shows Map when coordinates present', () => {
    render(<MapWithFallback latitude={-10} longitude={-50} />);
    expect(screen.getByTitle('Mapa da Localização')).toBeInTheDocument();
  });

  it('MapWithFallback shows OSM search link when address present', () => {
    render(<MapWithFallback address="Av. Paulista, São Paulo" />);
    const link = screen.getByRole('link', { name: 'Buscar no OpenStreetMap' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
  });

  it('MapWithFallback shows placeholder when no data', () => {
    render(<MapWithFallback />);
    expect(screen.getByText('Localização não informada')).toBeInTheDocument();
  });
});

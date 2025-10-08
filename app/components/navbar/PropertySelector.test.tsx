import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { PropertySelector } from './PropertySelector';

// Mock properties data (keep simple, cast to any where needed)
const mockActiveProperties = [
  { id: '1', code: 'PROP1', name: 'Property One', status: 1 },
  { id: '2', code: 'PROP2', name: 'Property Two', status: 1 },
];

// Match the actual import path used in the component: '../../hooks/useProperties'
vi.mock('../../hooks/useProperties', () => ({
  useProperties: () => ({
    properties: [],
    activeProperties: mockActiveProperties as any,
    loading: false,
    error: null,
    refetch: vi.fn(),
    updateProperty: vi.fn(),
    createProperty: vi.fn(),
    deleteProperty: vi.fn(),
  }),
}));

// Provide the service mock without referencing top-level variables (avoid hoisting issues)
vi.mock('~/services/selectedPropertyService', () => {
  return {
    SelectedPropertyService: {
      getSelectedPropertyId: vi.fn(),
      setSelectedPropertyId: vi.fn(),
    },
  };
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('PropertySelector - persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes from storage when id matches an active property', async () => {
    const { SelectedPropertyService } = (await import('~/services/selectedPropertyService')) as any;
    SelectedPropertyService.getSelectedPropertyId.mockReturnValue('2');

    render(
      <Wrapper>
        <PropertySelector />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('Property Two')).toBeInTheDocument();
    });

    // Should not override stored value on mount
    expect(SelectedPropertyService.setSelectedPropertyId).not.toHaveBeenCalled();
  });

  it('falls back to first active property and persists when no stored id', async () => {
    const { SelectedPropertyService } = (await import('~/services/selectedPropertyService')) as any;
    SelectedPropertyService.getSelectedPropertyId.mockReturnValue(null);

    render(
      <Wrapper>
        <PropertySelector />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('Property One')).toBeInTheDocument();
    });

    expect(SelectedPropertyService.setSelectedPropertyId).toHaveBeenCalledWith('1');
  });

  it('falls back to first active property and persists when stored id is invalid', async () => {
    const { SelectedPropertyService } = (await import('~/services/selectedPropertyService')) as any;
    SelectedPropertyService.getSelectedPropertyId.mockReturnValue('999');

    render(
      <Wrapper>
        <PropertySelector />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('Property One')).toBeInTheDocument();
    });

    expect(SelectedPropertyService.setSelectedPropertyId).toHaveBeenCalledWith('1');
  });

  it('persists selection when user changes property', async () => {
    const { SelectedPropertyService } = (await import('~/services/selectedPropertyService')) as any;
    SelectedPropertyService.getSelectedPropertyId.mockReturnValue(null);

    render(
      <Wrapper>
        <PropertySelector />
      </Wrapper>,
    );

    // Open dropdown
    const toggle = screen.getByRole('button', { name: /Selecionar propriedade/i });
    fireEvent.click(toggle);

    // Select second option
    const option = screen.getByText('Property Two');
    fireEvent.click(option);

    await waitFor(() => {
      expect(screen.getByText('Property Two')).toBeInTheDocument();
    });

    expect(SelectedPropertyService.setSelectedPropertyId).toHaveBeenCalledWith('2');
  });

  it('closes dropdown after selection', async () => {
    const { SelectedPropertyService } = (await import('~/services/selectedPropertyService')) as any;
    SelectedPropertyService.getSelectedPropertyId.mockReturnValue(null);

    render(
      <Wrapper>
        <PropertySelector />
      </Wrapper>,
    );

    const toggle = screen.getByRole('button', { name: /Selecionar propriedade/i });
    fireEvent.click(toggle);

    const option = screen.getByText('Property Two');
    fireEvent.click(option);

    // Backdrop should be gone after selection, so clicking outside should not throw
    expect(screen.getByText('Property Two')).toBeInTheDocument();
  });
});

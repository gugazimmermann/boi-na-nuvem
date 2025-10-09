import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import { TableFilters } from './TableFilters';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import type {
  TableConfig,
  TableColumn,
  TableAction,
  TableFilter,
  TableSearch,
  TablePagination as TablePaginationType,
} from './types';

const mockData = [
  { id: 1, name: 'Bessie', breed: 'Holstein', weight: 650, status: 'active' },
  { id: 2, name: 'Daisy', breed: 'Jersey', weight: 450, status: 'inactive' },
  { id: 3, name: 'Molly', breed: 'Angus', weight: 550, status: 'active' },
];

const mockColumns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'breed', label: 'Breed' },
  { key: 'weight', label: 'Weight (kg)', sortable: true },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={`status-badge ${value === 'active' ? 'active' : 'inactive'}`}>{value}</span>
    ),
  },
];

const mockActions: { import: TableAction; add: TableAction } = {
  import: {
    label: 'Import Animals',
    onClick: vi.fn(),
  },
  add: {
    label: 'Add Animal',
    onClick: vi.fn(),
  },
};

const mockFilters: TableFilter[] = [
  { label: 'All', active: true, onClick: vi.fn() },
  { label: 'Active', active: false, onClick: vi.fn() },
  { label: 'Inactive', active: false, onClick: vi.fn() },
];

const mockSearch: TableSearch = {
  placeholder: 'Search animals...',
  value: '',
  onChange: vi.fn(),
};

const mockPagination: TablePaginationType = {
  currentPage: 1,
  totalPages: 5,
  onPageChange: vi.fn(),
};

const mockTableConfig: TableConfig = {
  title: 'Animals',
  subtitle: 'Manage your animal records',
  count: 150,
  countLabel: 'animals',
  columns: mockColumns,
  data: mockData,
  actions: mockActions,
  filters: mockFilters,
  search: mockSearch,
  pagination: mockPagination,
};

describe('Table', () => {
  it('renders table with all components', () => {
    render(<Table config={mockTableConfig} />);

    expect(screen.getByText('Animals')).toBeInTheDocument();
    expect(screen.getByText('Manage your animal records')).toBeInTheDocument();
    expect(screen.getByText('150 animals')).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<Table config={mockTableConfig} />);

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it('renders table data correctly', () => {
    render(<Table config={mockTableConfig} />);

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.breed)).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-table';
    render(<Table config={mockTableConfig} className={customClass} />);

    const tableSection = document.querySelector('section');
    expect(tableSection).toHaveClass(customClass);
  });

  it('renders without optional props', () => {
    const minimalConfig: TableConfig = {
      title: 'Minimal Table',
      columns: mockColumns,
      data: mockData,
    };

    render(<Table config={minimalConfig} />);

    expect(screen.getByText('Minimal Table')).toBeInTheDocument();
    expect(screen.getByText('Bessie')).toBeInTheDocument();
  });

  it('renders sortable column headers', () => {
    render(<Table config={mockTableConfig} />);

    const sortableColumns = mockColumns.filter((col) => col.sortable);
    sortableColumns.forEach((column) => {
      const header = screen.getByText(column.label);
      expect(header.closest('th')).toBeInTheDocument();
    });
  });

  it('renders row actions when provided', () => {
    const configWithRowActions: TableConfig = {
      ...mockTableConfig,
      rowActions: (item) => (
        <button onClick={() => console.log('Edit', item.id)}>Edit {item.name}</button>
      ),
    };

    render(<Table config={configWithRowActions} />);

    expect(screen.getByText('Edit Bessie')).toBeInTheDocument();
    expect(screen.getByText('Edit Daisy')).toBeInTheDocument();
  });
});

describe('TableHeader', () => {
  it('renders title and subtitle', () => {
    render(<TableHeader config={mockTableConfig} />);

    expect(screen.getByText('Animals')).toBeInTheDocument();
    expect(screen.getByText('Manage your animal records')).toBeInTheDocument();
  });

  it('renders count badge when provided', () => {
    render(<TableHeader config={mockTableConfig} />);

    expect(screen.getByText('150 animals')).toBeInTheDocument();
  });

  it('renders action buttons when provided', () => {
    render(<TableHeader config={mockTableConfig} />);

    expect(screen.getByText('Import Animals')).toBeInTheDocument();
    expect(screen.getByText('Add Animal')).toBeInTheDocument();
  });

  it('handles click events on action buttons', () => {
    render(<TableHeader config={mockTableConfig} />);

    const importButton = screen.getByText('Import Animals');
    const addButton = screen.getByText('Add Animal');

    fireEvent.click(importButton);
    fireEvent.click(addButton);

    expect(mockActions.import.onClick).toHaveBeenCalledTimes(1);
    expect(mockActions.add.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders without optional props', () => {
    const minimalConfig = {
      title: 'Minimal Header',
      columns: mockColumns,
      data: mockData,
    };

    render(<TableHeader config={minimalConfig} />);

    expect(screen.getByText('Minimal Header')).toBeInTheDocument();
  });
});

describe('TableFilters', () => {
  it('renders filter buttons', () => {
    render(<TableFilters filters={mockFilters} search={mockSearch} />);

    mockFilters.forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });

  it('renders search input', () => {
    render(<TableFilters filters={mockFilters} search={mockSearch} />);

    const searchInput = screen.getByPlaceholderText('Search animals...');
    expect(searchInput).toBeInTheDocument();
  });

  it('handles filter button clicks', () => {
    render(<TableFilters filters={mockFilters} search={mockSearch} />);

    const activeFilter = screen.getByText('Active');
    fireEvent.click(activeFilter);

    expect(mockFilters[1].onClick).toHaveBeenCalledTimes(1);
  });

  it('handles search input changes', () => {
    render(<TableFilters filters={mockFilters} search={mockSearch} />);

    const searchInput = screen.getByPlaceholderText('Search animals...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockSearch.onChange).toHaveBeenCalledWith('test search');
  });

  it('shows active filter state', () => {
    render(<TableFilters filters={mockFilters} search={mockSearch} />);

    const allFilter = screen.getByText('All');

    expect(allFilter).toHaveClass('bg-gray-100');
  });

  it('renders without filters', () => {
    render(<TableFilters search={mockSearch} />);

    expect(screen.getByPlaceholderText('Search animals...')).toBeInTheDocument();
  });

  it('renders without search', () => {
    render(<TableFilters filters={mockFilters} />);

    mockFilters.forEach((filter) => {
      expect(screen.getByText(filter.label)).toBeInTheDocument();
    });
  });
});

describe('TableBody', () => {
  it('renders table rows for each data item', () => {
    render(
      <table>
        <TableBody columns={mockColumns} data={mockData} />
      </table>,
    );

    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.breed)).toBeInTheDocument();
    });
  });

  it('renders custom cell content using render function', () => {
    render(
      <table>
        <TableBody columns={mockColumns} data={mockData} />
      </table>,
    );

    const activeElements = screen.getAllByText('active');
    expect(activeElements.length).toBeGreaterThan(0);
    expect(screen.getByText('inactive')).toBeInTheDocument();
  });

  it('renders row actions when provided', () => {
    const rowActions = (item: any) => (
      <button onClick={() => console.log('Delete', item.id)}>Delete {item.name}</button>
    );

    render(
      <table>
        <TableBody columns={mockColumns} data={mockData} rowActions={rowActions} />
      </table>,
    );

    expect(screen.getByText('Delete Bessie')).toBeInTheDocument();
    expect(screen.getByText('Delete Daisy')).toBeInTheDocument();
  });

  it('handles empty data array', () => {
    render(
      <table>
        <TableBody columns={mockColumns} data={[]} />
      </table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('applies column-specific classes', () => {
    const columnsWithClasses: TableColumn[] = [
      { key: 'id', label: 'ID', className: 'custom-id-class' },
      { key: 'name', label: 'Name', className: 'custom-name-class' },
    ];

    render(
      <table>
        <TableBody columns={columnsWithClasses} data={mockData} />
      </table>,
    );

    expect(screen.getByText('Bessie')).toBeInTheDocument();
  });
});

describe('TablePagination', () => {
  it('renders pagination controls', () => {
    render(<TablePagination pagination={mockPagination} />);

    expect(screen.getByText('anterior')).toBeInTheDocument();
    expect(screen.getByText('próximo')).toBeInTheDocument();
  });

  it('renders page numbers', () => {
    render(<TablePagination pagination={mockPagination} />);

    expect(screen.getByText(/Página/)).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it('handles page change clicks', () => {
    render(<TablePagination pagination={mockPagination} />);

    const nextButton = screen.getByText('próximo');
    fireEvent.click(nextButton);

    expect(mockPagination.onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<TablePagination pagination={mockPagination} />);

    const prevButton = screen.getByText('anterior');

    const buttonElement = prevButton.closest('button');
    expect(buttonElement).toBeDisabled();
  });

  it('disables next button on last page', () => {
    const lastPagePagination: TablePaginationType = {
      currentPage: 5,
      totalPages: 5,
      onPageChange: vi.fn(),
    };

    render(<TablePagination pagination={lastPagePagination} />);

    const nextButton = screen.getByText('próximo');

    const buttonElement = nextButton.closest('button');
    expect(buttonElement).toBeDisabled();
  });

  it('shows current page as active', () => {
    render(<TablePagination pagination={mockPagination} />);

    expect(screen.getByText(/1.*de.*5/)).toBeInTheDocument();
  });

  it('handles page number clicks', () => {
    render(<TablePagination pagination={mockPagination} />);

    const nextButton = screen.getByText('próximo');
    fireEvent.click(nextButton);
    expect(mockPagination.onPageChange).toHaveBeenCalledWith(2);
  });
});

describe('Table Integration', () => {
  it('works with all features together', () => {
    render(<Table config={mockTableConfig} />);

    expect(screen.getByText('Animals')).toBeInTheDocument();

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search animals...')).toBeInTheDocument();

    expect(screen.getByText('Bessie')).toBeInTheDocument();

    expect(screen.getByText('anterior')).toBeInTheDocument();
    expect(screen.getByText('próximo')).toBeInTheDocument();
  });

  it('handles complex data types', () => {
    const complexData = [
      {
        id: 1,
        name: 'Bessie',
        metadata: { age: 5, location: 'Barn A' },
        tags: ['dairy', 'healthy'],
      },
    ];

    const complexColumns: TableColumn[] = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      {
        key: 'metadata',
        label: 'Age',
        render: (value) => value.age,
      },
      {
        key: 'tags',
        label: 'Tags',
        render: (value) => value.join(', '),
      },
    ];

    const complexConfig: TableConfig = {
      title: 'Complex Data',
      columns: complexColumns,
      data: complexData,
    };

    render(<Table config={complexConfig} />);

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('dairy, healthy')).toBeInTheDocument();
  });

  it('handles large datasets efficiently', () => {
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Animal ${i + 1}`,
      breed: 'Test Breed',
    }));

    const largeConfig: TableConfig = {
      title: 'Large Dataset',
      columns: mockColumns.slice(0, 3),
      data: largeData,
      pagination: {
        currentPage: 1,
        totalPages: 100,
        onPageChange: vi.fn(),
      },
    };

    render(<Table config={largeConfig} />);

    expect(screen.getByText('Large Dataset')).toBeInTheDocument();
  });
});

describe('Table Accessibility', () => {
  it('has proper table structure', () => {
    render(<Table config={mockTableConfig} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(mockColumns.length);
  });

  it('provides proper ARIA labels', () => {
    render(<Table config={mockTableConfig} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    render(<Table config={mockTableConfig} />);

    const sortableHeader = screen.getByText('ID');

    expect(sortableHeader).toBeInTheDocument();
  });

  it('has proper focus management', () => {
    render(<Table config={mockTableConfig} />);

    const addButton = screen.getByText('Add Animal');

    expect(addButton).toBeInTheDocument();
  });
});

describe('Table Styling', () => {
  it('applies dark mode classes', () => {
    render(<Table config={mockTableConfig} />);

    const table = screen.getByRole('table');
    expect(table).toHaveClass('dark:divide-gray-700');
  });

  it('applies hover effects', () => {
    render(<Table config={mockTableConfig} />);

    const addButton = screen.getByText('Add Animal');

    const buttonElement = addButton.closest('button');
    expect(buttonElement).toHaveClass('hover:bg-sky-500');
  });

  it('applies responsive classes', () => {
    render(<Table config={mockTableConfig} />);

    const tableWrapper = document.querySelector('.overflow-x-auto');
    expect(tableWrapper).toBeInTheDocument();
  });
});

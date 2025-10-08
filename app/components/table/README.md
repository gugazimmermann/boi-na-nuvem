# Table Component

A comprehensive, feature-rich table component with sorting, filtering, pagination, and row actions.

## Features

- ✅ **Sortable Columns**: Click to sort by any column
- ✅ **Filtering**: Built-in filter buttons and search functionality
- ✅ **Pagination**: Complete pagination with page numbers
- ✅ **Row Actions**: Custom actions for each row
- ✅ **Responsive Design**: Mobile-friendly table layout
- ✅ **TypeScript Support**: Full type safety with generics
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Custom Rendering**: Custom cell renderers for complex data
- ✅ **Accessibility**: ARIA labels and semantic HTML

## Structure

```
table/
├── Table.tsx            # Main table component
├── TableHeader.tsx      # Table header with title and actions
├── TableFilters.tsx     # Filter buttons and search input
├── TableBody.tsx        # Table body with data rows
├── TablePagination.tsx  # Pagination controls
├── types.ts            # TypeScript interfaces
├── constants.ts        # Styling constants
├── icons.tsx           # SVG icons
└── index.ts            # Clean exports
```

## Usage

### Basic Usage

```tsx
import { Table } from './components/table';

const tableConfig = {
  title: 'Animals',
  subtitle: 'Manage your animal records',
  count: 150,
  countLabel: 'animals',
  columns: [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'breed', label: 'Breed' },
    { key: 'weight', label: 'Weight (kg)', sortable: true },
  ],
  data: [
    { id: 1, name: 'Bessie', breed: 'Holstein', weight: 650 },
    { id: 2, name: 'Daisy', breed: 'Jersey', weight: 450 },
  ],
};

<Table config={tableConfig} />;
```

### Advanced Usage with All Features

```tsx
const advancedConfig = {
  title: 'Animal Records',
  subtitle: 'Complete animal management system',
  count: 150,
  countLabel: 'animals',
  columns: [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, item) => (
        <span className={`status-badge ${value === 'active' ? 'active' : 'inactive'}`}>
          {value}
        </span>
      ),
    },
    {
      key: 'weight',
      label: 'Weight (kg)',
      sortable: true,
      render: (value) => `${value} kg`,
    },
  ],
  data: animals,
  actions: {
    import: {
      label: 'Import Animals',
      onClick: () => handleImport(),
    },
    add: {
      label: 'Add Animal',
      onClick: () => handleAdd(),
    },
  },
  filters: [
    { label: 'All', active: true, onClick: () => setFilter('all') },
    { label: 'Active', active: false, onClick: () => setFilter('active') },
    { label: 'Inactive', active: false, onClick: () => setFilter('inactive') },
  ],
  search: {
    placeholder: 'Search animals...',
    value: searchTerm,
    onChange: setSearchTerm,
  },
  pagination: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: setCurrentPage,
  },
  rowActions: (item) => (
    <div className="flex gap-2">
      <button onClick={() => handleEdit(item)}>Edit</button>
      <button onClick={() => handleDelete(item)}>Delete</button>
    </div>
  ),
};

<Table config={advancedConfig} />;
```

## API Reference

### TableProps

| Prop        | Type             | Required | Description                |
| ----------- | ---------------- | -------- | -------------------------- |
| `config`    | `TableConfig<T>` | ✅       | Table configuration object |
| `className` | `string`         | ❌       | Additional CSS classes     |

### TableConfig<T>

| Property     | Type                     | Required | Description                       |
| ------------ | ------------------------ | -------- | --------------------------------- |
| `title`      | `string`                 | ✅       | Table title                       |
| `subtitle`   | `string`                 | ❌       | Table subtitle                    |
| `count`      | `number`                 | ❌       | Total item count                  |
| `countLabel` | `string`                 | ❌       | Label for count (e.g., "animals") |
| `columns`    | `TableColumn<T>[]`       | ✅       | Column definitions                |
| `data`       | `T[]`                    | ✅       | Table data                        |
| `actions`    | `TableActions`           | ❌       | Header action buttons             |
| `filters`    | `TableFilter[]`          | ❌       | Filter buttons                    |
| `search`     | `TableSearch`            | ❌       | Search input configuration        |
| `pagination` | `TablePagination`        | ❌       | Pagination configuration          |
| `rowActions` | `(item: T) => ReactNode` | ❌       | Custom row actions                |

### TableColumn<T>

| Property    | Type                                 | Required | Description                |
| ----------- | ------------------------------------ | -------- | -------------------------- |
| `key`       | `string`                             | ✅       | Data key for this column   |
| `label`     | `string`                             | ✅       | Column header text         |
| `sortable`  | `boolean`                            | ❌       | Whether column is sortable |
| `render`    | `(value: any, item: T) => ReactNode` | ❌       | Custom cell renderer       |
| `className` | `string`                             | ❌       | Additional CSS classes     |

### TableActions

| Property | Type          | Required | Description          |
| -------- | ------------- | -------- | -------------------- |
| `import` | `TableAction` | ❌       | Import action button |
| `add`    | `TableAction` | ❌       | Add action button    |

### TableAction

| Property  | Type         | Required | Description   |
| --------- | ------------ | -------- | ------------- |
| `label`   | `string`     | ✅       | Button text   |
| `onClick` | `() => void` | ✅       | Click handler |

### TableFilter

| Property  | Type         | Required | Description              |
| --------- | ------------ | -------- | ------------------------ |
| `label`   | `string`     | ✅       | Filter button text       |
| `active`  | `boolean`    | ❌       | Whether filter is active |
| `onClick` | `() => void` | ✅       | Click handler            |

### TableSearch

| Property      | Type                      | Required | Description              |
| ------------- | ------------------------- | -------- | ------------------------ |
| `placeholder` | `string`                  | ✅       | Search input placeholder |
| `value`       | `string`                  | ✅       | Search input value       |
| `onChange`    | `(value: string) => void` | ✅       | Change handler           |

### TablePagination

| Property       | Type                     | Required | Description              |
| -------------- | ------------------------ | -------- | ------------------------ |
| `currentPage`  | `number`                 | ✅       | Current page number      |
| `totalPages`   | `number`                 | ✅       | Total number of pages    |
| `itemsPerPage` | `number`                 | ✅       | Number of items per page |
| `totalItems`   | `number`                 | ✅       | Total number of items    |
| `onPageChange` | `(page: number) => void` | ✅       | Page change handler      |

## Sub-Components

### TableHeader

Displays the table title, subtitle, count, and action buttons.

```tsx
<TableHeader config={config} />
```

### TableFilters

Renders filter buttons and search input.

```tsx
<TableFilters filters={config.filters} search={config.search} />
```

### TableBody

Renders the table data with custom cell renderers and row actions.

```tsx
<TableBody columns={config.columns} data={config.data} rowActions={config.rowActions} />
```

### TablePagination

Renders pagination controls with page numbers and navigation.

```tsx
<TablePagination pagination={config.pagination} />
```

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`:

```tsx
export const styles = {
  // Container styles
  container: 'container px-4 mx-auto',
  tableWrapper: 'flex flex-col mt-6',

  // Table styles
  table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
  thead: 'bg-gray-50 dark:bg-gray-800',
  tbody: 'bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900',

  // Header styles
  title: 'text-lg font-medium text-gray-800 dark:text-white',
  countBadge:
    'px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400',

  // Action button styles
  actionButton:
    'flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700',
  primaryButton:
    'flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600',

  // ... more styles
};
```

## Custom Cell Rendering

Use the `render` function to customize how data is displayed:

```tsx
const columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value, item) => (
      <span className={`status-badge ${value === 'active' ? 'active' : 'inactive'}`}>{value}</span>
    ),
  },
  {
    key: 'weight',
    label: 'Weight',
    render: (value) => `${value} kg`,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (value, item) => (
      <div className="flex gap-2">
        <button onClick={() => handleEdit(item)}>Edit</button>
        <button onClick={() => handleDelete(item)}>Delete</button>
      </div>
    ),
  },
];
```

## Row Actions

Define custom actions for each row:

```tsx
const rowActions = (item) => (
  <div className="flex items-center gap-x-6">
    <button
      className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
      onClick={() => handleEdit(item)}
    >
      Edit
    </button>
    <button
      className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
      onClick={() => handleDelete(item)}
    >
      Delete
    </button>
  </div>
);
```

## Icons

Available icons in the `Icons` object:

- `Icons.sort` - Sort icon for sortable columns
- `Icons.search` - Search icon
- `Icons.import` - Import icon
- `Icons.add` - Add icon
- `Icons.chevronLeft` - Previous page icon
- `Icons.chevronRight` - Next page icon

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Semantic HTML**: Uses proper `<table>`, `<thead>`, `<tbody>` elements
- **Focus Management**: Proper focus handling for interactive elements

## Best Practices

1. **Column Keys**: Use meaningful keys that match your data structure
2. **Custom Rendering**: Use custom renderers for complex data display
3. **Pagination**: Always provide pagination for large datasets
4. **Search**: Include search functionality for better UX
5. **Responsive Design**: Test on mobile devices
6. **Accessibility**: Ensure proper ARIA labels and keyboard navigation

## Performance Considerations

- **Large Datasets**: Use pagination to limit rendered rows
- **Custom Renderers**: Keep render functions lightweight
- **Memoization**: Consider memoizing expensive render functions
- **Virtual Scrolling**: For very large datasets, consider virtual scrolling

## Integration Examples

### With State Management

```tsx
import { DEFAULT_ITEMS_PER_PAGE } from '~/components/table/constants';

const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [searchTerm, setSearchTerm] = useState('');
const [filter, setFilter] = useState('all');

const tableConfig = {
  title: 'Animals',
  columns: columns,
  data: data,
  search: {
    placeholder: 'Search animals...',
    value: searchTerm,
    onChange: setSearchTerm,
  },
  pagination: {
    currentPage,
    totalPages: Math.ceil(data.length / DEFAULT_ITEMS_PER_PAGE),
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    totalItems: data.length,
    onPageChange: setCurrentPage,
  },
};
```

### With API Integration

```tsx
useEffect(() => {
  const fetchData = async () => {
    const response = await api.getAnimals({
      page: currentPage,
      search: searchTerm,
      filter,
    });
    setData(response.data);
  };

  fetchData();
}, [currentPage, searchTerm, filter]);
```

## Dependencies

- React for component logic
- Tailwind CSS for styling
- Custom icons component
- TypeScript for type safety

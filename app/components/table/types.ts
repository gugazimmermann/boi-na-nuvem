export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
  onSort?: () => void;
}

export interface TableAction {
  label: string;
  onClick: () => void;
}

export interface TableActions {
  import?: TableAction;
  add?: TableAction;
}

export interface TableFilter {
  label: string;
  active?: boolean;
  onClick: () => void;
}

export interface TableSearch {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export interface TablePagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
}

export interface TableConfig<T = any> {
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableActions;
  filters?: TableFilter[];
  search?: TableSearch;
  pagination?: TablePagination;
  rowActions?: (item: T) => React.ReactNode;
  className?: string;
  rowClassName?: (item: T) => string | undefined;
}

export interface TableProps {
  config: TableConfig;
  className?: string;
}

export interface TableHeaderProps {
  config: Pick<TableConfig, 'title' | 'subtitle' | 'count' | 'countLabel' | 'actions'>;
}

export interface TableFiltersProps {
  filters?: TableFilter[];
  search?: TableSearch;
}

export interface TableBodyProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  rowActions?: (item: T) => React.ReactNode;
  rowClassName?: (item: T) => string | undefined;
}

export interface TablePaginationProps {
  pagination: TablePagination;
}

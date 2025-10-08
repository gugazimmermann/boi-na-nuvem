export const DEFAULT_ITEMS_PER_PAGE = 50;

export const styles = {
  container: 'container mx-auto',
  tableWrapper: 'flex flex-col mt-4',
  tableContainer: 'overflow-x-auto',
  tableInner: 'inline-block min-w-full py-1 align-middle',
  tableBorder: 'overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-md',

  table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm',
  thead: 'bg-gray-50 dark:bg-gray-800',
  tbody: 'bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900',

  headerContainer: 'sm:flex sm:items-center sm:justify-between',
  titleContainer: 'flex items-center gap-x-2',
  title: 'text-base font-medium text-gray-800 dark:text-white',
  countBadge:
    'px-2 py-0.5 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400',
  subtitle: 'mt-0.5 text-sm text-gray-500 dark:text-gray-300',

  actionsContainer: 'flex items-center mt-3 gap-x-2',
  actionButton:
    'flex items-center justify-center w-1/2 px-3 py-1.5 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-md gap-x-1.5 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 cursor-pointer',
  primaryButton:
    'flex items-center justify-center w-1/2 px-3 py-1.5 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-md shrink-0 sm:w-auto gap-x-1.5 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 cursor-pointer',

  filtersContainer: 'mt-4 md:flex md:items-center md:justify-between',
  filtersGroup:
    'inline-flex overflow-hidden bg-white border divide-x rounded-md dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700',
  filterButton: 'px-2 py-1 text-xs font-medium transition-colors duration-200 cursor-pointer',
  filterButtonActive: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
  filterButtonInactive: 'text-gray-600 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100',
  searchContainer: 'relative flex items-center mt-3 md:mt-0',
  searchInput:
    'block w-full py-1 pr-4 text-gray-700 bg-white border border-gray-200 rounded-md md:w-72 placeholder-gray-400/70 pl-9 rtl:pr-9 rtl:pl-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm',

  columnHeader:
    'py-2 px-3 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400',
  columnHeaderButton: 'flex items-center gap-x-1.5 focus:outline-none cursor-pointer',
  columnHeaderSortable: 'flex items-center gap-x-2 focus:outline-none cursor-pointer',

  cell: 'px-3 py-2 text-sm whitespace-nowrap',
  cellMedium: 'px-3 py-2 text-sm font-medium whitespace-nowrap',
  cellText: 'text-gray-500 dark:text-gray-300',
  cellTextMedium: 'font-medium text-gray-800 dark:text-white',

  rowActions: 'flex items-center gap-x-4',
  rowActionButton:
    'text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none cursor-pointer',
  rowActionButtonEdit:
    'text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none cursor-pointer',

  paginationContainer: 'mt-4 sm:flex sm:items-center sm:justify-between',
  paginationInfo: 'text-sm text-gray-500 dark:text-gray-400',
  paginationInfoHighlight: 'font-medium text-gray-700 dark:text-gray-100',
  paginationButtons: 'flex items-center justify-center mt-3 gap-x-3 sm:mt-0',
  paginationButton:
    'flex items-center justify-center w-1/2 px-3 py-1.5 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-1.5 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer',
  paginationButtonDisabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  paginationNumbers: 'items-center hidden lg:flex gap-x-2',
  paginationNumber:
    'px-1.5 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 cursor-pointer',
  paginationNumberActive:
    'px-1.5 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60',

  statusBadge: 'inline-flex items-center px-2 py-0.5 rounded-full gap-x-1.5',
  statusActive: 'bg-emerald-100/60 dark:bg-gray-800 text-emerald-500',
  statusInactive: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
  statusDot: 'h-1.5 w-1.5 rounded-full bg-emerald-500',

  srOnly: 'sr-only',
  icon: 'w-4 h-4',
  iconSmall: 'h-3',
  iconLarge: 'w-5 h-5',
  iconMedium: 'w-4 h-4',
  iconSearch: 'w-4 h-4 mx-2 text-gray-400 dark:text-gray-600',
  iconRtl: 'rtl:-scale-x-100',
};

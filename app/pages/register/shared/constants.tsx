// Layout constants - Slim design
export const LAYOUT_CONSTANTS = {
  CONTAINER_CLASSES: 'bg-gray-50 dark:bg-gray-900',
  CONTENT_CLASSES: 'max-w-7xl mx-auto px-4 py-4',
  SECTION_CLASSES: 'mt-4',
  LOADING_CONTAINER_CLASSES: 'max-w-7xl mx-auto px-3',
  LOADING_SPINNER_CLASSES: 'animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  BADGE_CLASSES: 'bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full',
  ACTION_BUTTON_CLASSES: {
    EDIT: 'text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 text-sm cursor-pointer',
    DELETE: 'text-red-600 hover:text-red-800 text-sm cursor-pointer',
  },
  STATUS_INDICATOR_CLASSES: 'flex items-center gap-2',
  COUNT_CLASSES: 'flex items-center justify-center',
} as const;

// Sort directions
export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: null,
} as const;

// Common icon components
export const ICONS = {
  BUILDING: (props: { className?: string } = {}) => (
    <svg
      className={`w-10 h-10 text-white ${props.className || ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  LOCATION: (props: { className?: string } = {}) => (
    <svg
      className={`w-10 h-10 text-white ${props.className || ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  DOCUMENT: (props: { className?: string } = {}) => (
    <svg
      className={`w-8 h-8 text-white ${props.className || ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  ANIMAL: (props: { className?: string } = {}) => (
    <svg
      className={`w-10 h-10 text-white ${props.className || ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14.828v1.172a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.172m14 0l-7-7m0 0l-7 7m7-7v12"
      />
    </svg>
  ),
} as const;

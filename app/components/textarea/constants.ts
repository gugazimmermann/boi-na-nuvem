export const styles = {
  container: 'w-full',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2',
  labelRequired: 'after:content-["*"] after:ml-1 after:text-red-500',

  textarea:
    'w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',

  variants: {
    default: {
      textarea:
        'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400',
      disabled: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed',
    },
    filled: {
      textarea:
        'border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400',
      disabled: 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed',
    },
    outlined: {
      textarea:
        'border-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400',
      disabled: 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed',
    },
  },

  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  },

  resize: {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y',
  },

  readonly: 'bg-gray-50 dark:bg-gray-800 cursor-default',

  error: 'text-red-500 dark:text-red-400 text-sm mt-1',

  helper: 'text-gray-500 dark:text-gray-400 text-sm mt-1',
};

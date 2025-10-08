export const styles = {
  container: 'w-full',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5',
  labelRequired: "after:content-['*'] after:ml-0.5 after:text-red-500",

  input:
    'block w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring focus:ring-opacity-40',

  sizes: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  },

  variants: {
    default: {
      input:
        'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-400',
      disabled:
        'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
    },
    success: {
      input:
        'border-green-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-300 dark:border-green-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-green-400',
      disabled:
        'border-green-200 bg-green-50 text-gray-500 cursor-not-allowed dark:border-green-700 dark:bg-green-900/20 dark:text-gray-400',
    },
    warning: {
      input:
        'border-yellow-300 bg-white text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-300 dark:border-yellow-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-yellow-400',
      disabled:
        'border-yellow-200 bg-yellow-50 text-gray-500 cursor-not-allowed dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-gray-400',
    },
    error: {
      input:
        'border-red-300 bg-white text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-300 dark:border-red-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-red-400',
      disabled:
        'border-red-200 bg-red-50 text-gray-500 cursor-not-allowed dark:border-red-700 dark:bg-red-900/20 dark:text-gray-400',
    },
    info: {
      input:
        'border-blue-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-300 dark:border-blue-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-400',
      disabled:
        'border-blue-200 bg-blue-50 text-gray-500 cursor-not-allowed dark:border-blue-700 dark:bg-blue-900/20 dark:text-gray-400',
    },
  },

  icon: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  },

  iconContainer: 'absolute inset-y-0 flex items-center pointer-events-none',
  iconContainerLeft: 'left-0 pl-3',
  iconContainerRight: 'right-0 pr-3',

  inputWithIcon: {
    left: {
      sm: 'pl-10',
      md: 'pl-11',
      lg: 'pl-12',
    },
    right: {
      sm: 'pr-10',
      md: 'pr-11',
      lg: 'pr-12',
    },
  },

  error: 'mt-2 text-sm text-red-600 dark:text-red-400',

  helper: 'mt-2 text-sm text-gray-500 dark:text-gray-400',

  readonly: 'bg-gray-50 dark:bg-gray-800 cursor-default',

  focus: 'focus:ring-2 focus:ring-offset-0',

  disabled: 'cursor-not-allowed opacity-60',

  transition: 'transition-colors duration-200',

  srOnly: 'sr-only',

  inputGroup: 'relative',

  dark: {
    default: 'dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300',
    success: 'dark:border-green-600 dark:bg-gray-900 dark:text-gray-300',
    warning: 'dark:border-yellow-600 dark:bg-gray-900 dark:text-gray-300',
    error: 'dark:border-red-600 dark:bg-gray-900 dark:text-gray-300',
    info: 'dark:border-blue-600 dark:bg-gray-900 dark:text-gray-300',
  },
};

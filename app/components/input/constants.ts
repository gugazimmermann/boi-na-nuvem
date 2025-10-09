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
        'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-sky-400',
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
        'border-orange-300 bg-white text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-orange-300 dark:border-orange-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-orange-400',
      disabled:
        'border-orange-200 bg-orange-50 text-gray-500 cursor-not-allowed dark:border-orange-700 dark:bg-orange-900/20 dark:text-gray-400',
    },
    error: {
      input:
        'border-red-300 bg-white text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-red-300 dark:border-red-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-red-400',
      disabled:
        'border-red-200 bg-red-50 text-gray-500 cursor-not-allowed dark:border-red-700 dark:bg-red-900/20 dark:text-gray-400',
    },
    info: {
      input:
        'border-sky-300 bg-white text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-sky-300 dark:border-sky-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-sky-400',
      disabled:
        'border-sky-200 bg-sky-50 text-gray-500 cursor-not-allowed dark:border-sky-700 dark:bg-sky-900/20 dark:text-gray-400',
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
    warning: 'dark:border-orange-600 dark:bg-gray-900 dark:text-gray-300',
    error: 'dark:border-red-600 dark:bg-gray-900 dark:text-gray-300',
    info: 'dark:border-sky-600 dark:bg-gray-900 dark:text-gray-300',
  },
};

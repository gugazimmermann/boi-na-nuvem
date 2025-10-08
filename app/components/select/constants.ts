export const styles = {
  container: 'w-full',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2',
  labelRequired: "after:content-['*'] after:ml-0.5 after:text-red-500",

  select:
    'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring focus:ring-opacity-40 appearance-none cursor-pointer',

  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  },

  variants: {
    default: {
      select:
        'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-400',
      disabled:
        'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
    },
    success: {
      select:
        'border-green-300 bg-white text-gray-900 focus:border-green-500 focus:ring-green-300 dark:border-green-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-green-400',
      disabled:
        'border-green-200 bg-green-50 text-gray-500 cursor-not-allowed dark:border-green-700 dark:bg-green-900/20 dark:text-gray-400',
    },
    warning: {
      select:
        'border-yellow-300 bg-white text-gray-900 focus:border-yellow-500 focus:ring-yellow-300 dark:border-yellow-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-yellow-400',
      disabled:
        'border-yellow-200 bg-yellow-50 text-gray-500 cursor-not-allowed dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-gray-400',
    },
    error: {
      select:
        'border-red-300 bg-white text-gray-900 focus:border-red-500 focus:ring-red-300 dark:border-red-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-400',
      disabled:
        'border-red-200 bg-red-50 text-gray-500 cursor-not-allowed dark:border-red-700 dark:bg-red-900/20 dark:text-gray-400',
    },
    info: {
      select:
        'border-blue-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-300 dark:border-blue-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-400',
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

  selectWithIcon: {
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

  dropdownArrow: 'absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none',
  dropdownArrowIcon: 'text-gray-400',

  error: 'mt-2 text-sm text-red-600 dark:text-red-400',

  helper: 'mt-2 text-sm text-gray-500 dark:text-gray-400',

  focus: 'focus:ring-2 focus:ring-offset-0',

  disabled: 'cursor-not-allowed opacity-60',

  transition: 'transition-colors duration-200',

  srOnly: 'sr-only',

  selectGroup: 'relative',

  option: 'text-gray-900 dark:text-gray-300',
  optionDisabled: 'text-gray-400 dark:text-gray-600 cursor-not-allowed',
  optionSelected: 'bg-blue-100 dark:bg-blue-900',

  optgroup: 'text-gray-500 dark:text-gray-400 font-semibold',

  multiple: 'min-h-[2.5rem] py-2',

  dark: {
    default: 'dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300',
    success: 'dark:border-green-600 dark:bg-gray-900 dark:text-gray-300',
    warning: 'dark:border-yellow-600 dark:bg-gray-900 dark:text-gray-300',
    error: 'dark:border-red-600 dark:bg-gray-900 dark:text-gray-300',
    info: 'dark:border-blue-600 dark:bg-gray-900 dark:text-gray-300',
  },
};

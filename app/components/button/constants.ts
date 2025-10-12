export const styles = {
  base: 'inline-flex items-center justify-center font-medium tracking-wide transition-colors duration-300 transform focus:outline-none focus:ring focus:ring-opacity-80 rounded-md cursor-pointer',

  sizes: {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-5 py-2.5 text-lg',
  },

  variants: {
    primary: {
      base: 'bg-sky-600 text-white hover:bg-sky-500 focus:ring-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600 dark:focus:ring-sky-400',
      disabled: 'bg-sky-300 text-white cursor-not-allowed hover:bg-sky-300 dark:bg-sky-800 dark:text-gray-400',
    },
    secondary: {
      base: 'bg-stone-800 text-white hover:bg-stone-700 focus:ring-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 dark:focus:ring-stone-400',
      disabled: 'bg-stone-300 text-white cursor-not-allowed hover:bg-stone-300 dark:bg-stone-800 dark:text-gray-400',
    },
    success: {
      base: 'bg-green-600 text-white hover:bg-green-500 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-600 dark:focus:ring-green-400',
      disabled: 'bg-green-300 text-white cursor-not-allowed hover:bg-green-300 dark:bg-green-800 dark:text-gray-400',
    },
    warning: {
      base: 'bg-orange-600 text-white hover:bg-orange-500 focus:ring-orange-300 dark:bg-orange-700 dark:hover:bg-orange-600 dark:focus:ring-orange-400',
      disabled: 'bg-orange-300 text-white cursor-not-allowed hover:bg-orange-300 dark:bg-orange-800 dark:text-gray-400',
    },
    error: {
      base: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-400',
      disabled: 'bg-red-300 text-white cursor-not-allowed hover:bg-red-300 dark:bg-red-800 dark:text-gray-400',
    },
    info: {
      base: 'bg-sky-600 text-white hover:bg-sky-500 focus:ring-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600 dark:focus:ring-sky-400',
      disabled: 'bg-sky-300 text-white cursor-not-allowed hover:bg-sky-300 dark:bg-sky-800 dark:text-gray-400',
    },
    ghost: {
      base: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-600',
      disabled:
        'bg-transparent text-gray-400 cursor-not-allowed hover:bg-transparent dark:text-gray-600',
    },
    outline: {
      base: 'border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-600',
      disabled:
        'border-2 border-gray-200 bg-transparent text-gray-400 cursor-not-allowed hover:bg-transparent dark:border-gray-700 dark:text-gray-600',
    },
  },

  icon: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  },

  iconSpacing: {
    left: 'mr-1',
    right: 'ml-1',
  },

  spinner: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  },

  fullWidth: 'w-full',

  loading: 'cursor-wait',

  disabled: 'cursor-not-allowed opacity-50',

  animations: {
    hover: 'hover:scale-105',
    active: 'active:scale-95',
    transition: 'transition-transform duration-150',
  },

  focus: 'focus:ring-2 focus:ring-offset-2',

  srOnly: 'sr-only',

  dark: {
    primary: 'dark:bg-blue-700 dark:hover:bg-blue-600',
    secondary: 'dark:bg-gray-700 dark:hover:bg-gray-600',
    success: 'dark:bg-green-700 dark:hover:bg-green-600',
    warning: 'dark:bg-yellow-700 dark:hover:bg-yellow-600',
    error: 'dark:bg-red-700 dark:hover:bg-red-600',
    info: 'dark:bg-cyan-700 dark:hover:bg-cyan-600',
  },
};

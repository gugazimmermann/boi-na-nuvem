export const styles = {
  base: 'inline-flex items-center justify-center',

  sizes: {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  },

  shapes: {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none',
  },

  variants: {
    primary: {
      base: 'bg-blue-100 text-blue-800',
      outline: 'border border-blue-200 bg-transparent text-blue-700',
    },
    secondary: {
      base: 'bg-gray-100 text-gray-800',
      outline: 'border border-gray-200 bg-transparent text-gray-700',
    },
    success: {
      base: 'bg-green-100 text-green-800',
      outline: 'border border-green-200 bg-transparent text-green-700',
    },
    warning: {
      base: 'bg-yellow-100 text-yellow-800',
      outline: 'border border-yellow-200 bg-transparent text-yellow-700',
    },
    error: {
      base: 'bg-red-100 text-red-800',
      outline: 'border border-red-200 bg-transparent text-red-700',
    },
    info: {
      base: 'bg-cyan-100 text-cyan-800',
      outline: 'border border-cyan-200 bg-transparent text-cyan-700',
    },
    neutral: {
      base: 'bg-gray-50 text-gray-600',
      outline: 'border border-gray-200 bg-transparent text-gray-600',
    },
  },

  icon: {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  },

  removeButton: {
    base: 'ml-1 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1',
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  },

  removeIcon: {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  },

  focus: 'focus:ring-2 focus:ring-offset-1',

  srOnly: 'sr-only',

  animations: {
    hover: 'hover:scale-105',
    transition: 'transition-transform duration-150',
  },
};

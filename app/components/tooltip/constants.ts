export const styles = {
  container: 'relative inline-block',

  trigger:
    'text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500',
  triggerButton: 'inline-flex items-center justify-center',
  triggerIcon: 'w-6 h-6',

  content:
    'absolute flex items-center justify-center p-3 text-sm font-medium rounded-lg shadow-lg z-50 transition-opacity duration-200',
  contentVisible: 'opacity-100',
  contentHidden: 'opacity-0 pointer-events-none',

  positions: {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  },

  variants: {
    default: {
      content:
        'bg-white text-gray-900 border border-gray-200 shadow-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700',
      arrow: 'text-white dark:text-gray-800',
    },
    dark: {
      content: 'bg-gray-900 text-white border border-gray-700 shadow-gray-900',
      arrow: 'text-gray-900',
    },
    light: {
      content: 'bg-white text-gray-900 border border-gray-200 shadow-gray-200',
      arrow: 'text-white',
    },
    info: {
      content: 'bg-blue-500 text-white border border-blue-600 shadow-blue-500',
      arrow: 'text-blue-500',
    },
    success: {
      content: 'bg-green-500 text-white border border-green-600 shadow-green-500',
      arrow: 'text-green-500',
    },
    warning: {
      content: 'bg-yellow-500 text-white border border-yellow-600 shadow-yellow-500',
      arrow: 'text-yellow-500',
    },
    error: {
      content: 'bg-red-500 text-white border border-red-600 shadow-red-500',
      arrow: 'text-red-500',
    },
  },

  arrow: 'absolute w-3 h-3 transform rotate-45',
  arrowPositions: {
    top: 'top-full left-1/2 transform -translate-x-1/2 -mt-1.5',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1.5',
    left: 'left-full top-1/2 transform -translate-y-1/2 -ml-1.5',
    right: 'right-full top-1/2 transform -translate-y-1/2 -mr-1.5',
  },

  text: 'truncate',
  textMultiline: 'whitespace-normal break-words',

  sizes: {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  },

  animations: {
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in',
    scaleIn: 'animate-scale-in',
  },

  responsive: 'max-w-xs sm:max-w-sm md:max-w-md',

  srOnly: 'sr-only',
  focusRing: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',

  interactive: 'cursor-pointer',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
};

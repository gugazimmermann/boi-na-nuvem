export const styles = {
  container: 'w-full',

  label: 'block text-sm font-medium text-gray-700 mb-2',
  labelRequired: 'after:content-["*"] after:ml-1 after:text-red-500',

  textarea:
    'w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',

  variants: {
    default: {
      textarea:
        'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
      disabled: 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed',
    },
    filled: {
      textarea:
        'border-transparent bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-blue-500',
      disabled: 'bg-gray-50 text-gray-400 cursor-not-allowed',
    },
    outlined: {
      textarea:
        'border-2 border-gray-300 bg-transparent text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
      disabled: 'border-gray-200 text-gray-400 cursor-not-allowed',
    },
  },

  sizes: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  },

  resize: {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y',
  },

  readonly: 'bg-gray-50 cursor-default',

  error: 'text-red-500 text-sm mt-1',

  helper: 'text-gray-500 text-sm mt-1',
};

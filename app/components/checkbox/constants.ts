export const styles = {
  container: 'w-full',

  label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5',
  labelRequired: 'after:content-["*"] after:ml-0.5 after:text-red-500',

  checkbox: 'block w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring focus:ring-opacity-40',

  variants: {
    default: {
      checkbox: 'border-gray-300 bg-white text-gray-900 focus:border-sky-500 focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-sky-400',
      disabled: 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
    },
    filled: {
      checkbox: 'border-transparent bg-gray-100 text-gray-900 focus:bg-white focus:border-sky-500 focus:ring-sky-300 dark:bg-gray-800 dark:text-gray-300 dark:focus:bg-gray-700 dark:focus:border-sky-400',
      disabled: 'bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400',
    },
    outlined: {
      checkbox: 'border-2 border-gray-300 bg-transparent text-gray-900 focus:border-sky-500 focus:ring-sky-300 dark:border-gray-600 dark:text-gray-300 dark:focus:border-sky-400',
      disabled: 'border-gray-200 text-gray-500 cursor-not-allowed dark:border-gray-700 dark:text-gray-400',
    },
  },

  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  },

  readonly: 'bg-gray-50 dark:bg-gray-800 cursor-default',

  error: 'text-red-500 dark:text-red-400 text-sm mt-1.5',
  helper: 'text-gray-500 dark:text-gray-400 text-sm mt-1.5',

  // Checkbox specific styles
  checkboxInput: 'sr-only',
  checkboxVisual: 'relative flex items-center justify-center border-2 rounded transition-all duration-200 bg-white border-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2',
  checkboxLabel: 'flex items-center gap-2 cursor-pointer',
  checkboxLabelDisabled: 'cursor-not-allowed opacity-60',
  checkboxLabelError: 'text-red-600',

  checkboxSizes: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  },

  checkboxStates: {
    error: 'border-red-500 bg-red-50 hover:border-red-600 focus-within:ring-red-500',
    disabled: 'opacity-60 cursor-not-allowed hover:border-gray-300',
    readonly: 'cursor-default',
  },

  checkboxIcon: 'text-white',
  checkboxIconError: 'text-red-600',

  checkboxLabelText: 'text-sm font-medium text-gray-700 dark:text-gray-300',
  checkboxLabelTextDisabled: 'text-gray-400 dark:text-gray-500',
  checkboxLabelTextError: 'text-red-600 dark:text-red-400',

  checkboxRequired: 'text-red-500 ml-1',

  // Checked states
  checkboxChecked: 'bg-sky-600 border-sky-600',
  checkboxCheckedError: 'bg-red-600 border-red-600',
  checkboxCheckedIcon: 'text-white',

  // Indeterminate states
  checkboxIndeterminate: 'bg-sky-600 border-sky-600',
  checkboxIndeterminateError: 'bg-red-600 border-red-600',
  checkboxIndeterminateIcon: 'text-white',

  // Focus states
  checkboxFocus: 'ring-2 ring-sky-500 ring-offset-2',
  checkboxFocusError: 'ring-red-500',
};

export const groupStyles = {
  container: 'flex flex-row flex-wrap gap-6 items-start',
  containerHorizontal: 'flex-row flex-wrap gap-6',
  containerVertical: 'flex-col gap-2',

  spacing: {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8',
  },

  legend: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2',
  legendError: 'text-red-600 dark:text-red-400',

  fieldset: 'border-0 p-0 m-0',

  error: 'text-red-500 dark:text-red-400 text-sm mt-1.5',
  helper: 'text-gray-500 dark:text-gray-400 text-sm mt-1.5',
};

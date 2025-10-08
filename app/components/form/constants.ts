export const styles = {
  form: {
    base: 'w-full',
    wrapper: 'w-full',
    title: 'text-xl font-bold text-gray-900 mb-1.5',
    description: 'text-gray-600 mb-6',
  },

  layout: {
    vertical: 'space-y-4',
    horizontal: 'space-y-4',
    grid: 'grid gap-4',
  },

  spacing: {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  },

  grid: {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-1 lg:grid-cols-2',
    cols3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },

  section: {
    container: 'mb-6 p-4 bg-gray-50 rounded-md border border-gray-200',
    title: 'text-base font-semibold text-gray-800 mb-3 flex items-center',
    description: 'text-sm text-gray-600 mb-4',
    fields: 'space-y-4',
  },

  field: {
    container: 'w-full',
    required: 'text-red-500 ml-1',
    error: 'text-red-500 text-sm mt-1.5 flex items-center',
    helper: 'text-gray-500 text-sm mt-1.5',
  },

  actions: {
    container: 'flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200',
    containerCenter:
      'flex flex-col sm:flex-row justify-center gap-3 mt-8 pt-6 border-t border-gray-200',
    containerBetween:
      'flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t border-gray-200',
    submitButton:
      'px-6 py-2.5 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-700 rounded-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
    resetButton:
      'px-6 py-2.5 text-gray-700 font-semibold bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  },

  validation: {
    error: 'border-red-300 focus:border-red-500 focus:ring-red-200',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-200',
    warning: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200',
  },

  states: {
    loading: 'opacity-50 pointer-events-none',
    disabled: 'opacity-50 pointer-events-none',
    readonly: 'bg-gray-50',
  },
};

export const defaultFormConfig = {
  layout: 'vertical' as const,
  gridColumns: 1,
  spacing: 'md' as const,
  showRequiredIndicator: true,
  submitButtonText: 'Enviar',
  resetButtonText: 'Limpar',
  showResetButton: false,
};

export const defaultFieldConfig = {
  type: 'input' as const,
  required: false,
  disabled: false,
  validation: {},
};

export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
  decimal: /^\d*\.?\d+$/,
};

export const validationMessages = {
  required: 'Este campo é obrigatório',
  minLength: (min: number) => `Tamanho mínimo é ${min} caracteres`,
  maxLength: (max: number) => `Tamanho máximo é ${max} caracteres`,
  min: (min: number) => `Valor mínimo é ${min}`,
  max: (max: number) => `Valor máximo é ${max}`,
  email: 'Por favor, insira um endereço de email válido',
  url: 'Por favor, insira uma URL válida',
  pattern: 'Por favor, insira um formato válido',
  custom: 'Valor inválido',
};

export const fieldTypeConfig = {
  input: {
    component: 'Input',
    defaultProps: {
      config: {
        type: 'text',
        variant: 'default',
        size: 'md',
      },
    },
  },
  select: {
    component: 'Select',
    defaultProps: {
      options: [],
      config: {
        variant: 'default',
        size: 'md',
      },
    },
  },
  textarea: {
    component: 'Textarea',
    defaultProps: {
      config: {
        variant: 'default',
        size: 'md',
        rows: 3,
      },
    },
  },
  checkbox: {
    component: 'Checkbox',
    defaultProps: {
      config: {
        variant: 'default',
        size: 'md',
      },
    },
  },
  radio: {
    component: 'Radio',
    defaultProps: {
      config: {
        variant: 'default',
        size: 'md',
      },
    },
  },
  file: {
    component: 'FileInput',
    defaultProps: {
      config: {
        variant: 'default',
        size: 'md',
      },
    },
  },
};

export const gridColumnClasses = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  full: 'col-span-full',
  auto: 'col-auto',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const styles = {
  base: 'fixed inset-0 z-50 overflow-y-auto',

  overlay: {
    base: 'fixed inset-0 bg-black transition-opacity duration-300',
    visible: 'opacity-50',
    hidden: 'opacity-0',
  },

  container: {
    base: 'flex min-h-full items-center justify-center p-3 text-center sm:p-0',
  },

  panel: {
    base: 'relative transform overflow-hidden rounded-md bg-white dark:bg-gray-800 text-left shadow-xl transition-all duration-300 w-full',
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl',
    visible: 'translate-y-0 opacity-100 sm:scale-100',
    hidden: 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95',
  },

  header: {
    base: 'px-4 py-3 border-b border-gray-200 dark:border-gray-700',
    title: 'text-base font-semibold text-gray-900 dark:text-gray-100',
    closeButton:
      'absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200',
  },

  body: {
    base: 'px-4 py-3',
    withHeader: 'px-4 py-3',
    withFooter: 'px-4 py-3',
  },

  footer: {
    base: 'px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50',
    actions:
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0',
  },

  icon: {
    base: 'mx-auto flex h-10 w-10 items-center justify-center rounded-full',
    default: 'bg-blue-100 dark:bg-blue-900/30',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30',
    error: 'bg-red-100 dark:bg-red-900/30',
    success: 'bg-green-100 dark:bg-green-900/30',
    info: 'bg-cyan-100 dark:bg-cyan-900/30',
  },

  iconColor: {
    default: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400',
    info: 'text-cyan-600 dark:text-cyan-400',
  },

  text: {
    title: 'text-base font-medium text-gray-900 dark:text-gray-100',
    message: 'text-sm text-gray-500 dark:text-gray-400',
    center: 'text-center',
  },

  animations: {
    fadeIn: 'animate-in fade-in duration-300',
    fadeOut: 'animate-out fade-out duration-200',
    slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
    slideOut: 'animate-out slide-out-to-bottom-4 duration-200',
  },

  focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',

  srOnly: 'sr-only',

  dark: {
    panel: 'dark:bg-gray-800 dark:text-gray-100',
    header: 'dark:border-gray-700',
    footer: 'dark:border-gray-700 dark:bg-gray-700/50',
  },
};

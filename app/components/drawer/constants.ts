export const styles = {
  base: 'fixed inset-0 z-50 overflow-hidden',

  overlay: {
    base: 'absolute inset-0 bg-black transition-opacity duration-300 ease-in-out',
    visible: 'opacity-50',
    hidden: 'opacity-0',
    animating: 'opacity-0',
  },

  container: {
    base: 'absolute inset-0 flex items-end justify-end',
  },

  panel: {
    base: 'relative bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out flex flex-col h-full',
    visible: 'transform-none',
    hidden: 'transform',
    animating: 'transform',

    left: 'mr-auto',
    right: 'ml-auto',
    top: 'mb-auto',
    bottom: 'mt-auto',

    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[32rem]',
    xl: 'w-[40rem]',
    full: 'w-full',
  },

  header: {
    base: 'flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700',
    title: 'text-lg font-semibold text-gray-900 dark:text-gray-100',
    closeButton:
      'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700',
  },

  body: {
    base: 'flex-1 px-6 py-4 overflow-y-auto',
  },

  footer: {
    base: 'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
    actions: 'flex items-center justify-end space-x-3',
  },
};

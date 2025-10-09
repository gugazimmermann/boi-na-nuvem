export const styles = {
  container: 'flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800',
  containerLarge:
    'flex w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800',
  containerFull: 'flex w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800',

  iconContainer: 'flex items-center justify-center w-12',
  iconContainerLarge: 'flex items-center justify-center w-16',

  success: {
    iconContainer: 'bg-emerald-500',
    title: 'text-emerald-500 dark:text-emerald-400',
    icon: 'text-white fill-current',
  },
  error: {
    iconContainer: 'bg-red-500',
    title: 'text-red-500 dark:text-red-400',
    icon: 'text-white fill-current',
  },
  warning: {
    iconContainer: 'bg-orange-500',
    title: 'text-orange-500 dark:text-orange-400',
    icon: 'text-white fill-current',
  },
  info: {
    iconContainer: 'bg-sky-500',
    title: 'text-sky-500 dark:text-sky-400',
    icon: 'text-white fill-current',
  },

  content: 'px-4 py-2 -mx-3',
  contentContainer: 'mx-3',
  title: 'font-semibold',
  message: 'text-sm text-gray-600 dark:text-gray-200',

  dismissButton:
    'absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer',
  dismissIcon: 'w-4 h-4',

  iconSmall: 'w-6 h-6',
  iconMedium: 'w-8 h-8',
  iconLarge: 'w-10 h-10',

  responsive: 'sm:max-w-md md:max-w-lg lg:max-w-xl',

  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',

  srOnly: 'sr-only',
};

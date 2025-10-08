export const styles = {
  container: 'flex overflow-x-auto whitespace-nowrap',
  containerVertical: 'flex flex-col space-y-0.5',

  tabItem:
    'inline-flex items-center h-10 px-2 py-1.5 text-center text-gray-700 border border-b-0 border-gray-300 sm:px-3 dark:border-gray-500 rounded-t-sm -px-1 dark:text-white whitespace-nowrap focus:outline-none transition-all duration-300 group relative',
  tabItemActive:
    'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-500 shadow-md shadow-gray-200/50 dark:shadow-gray-900/50 transform scale-102 z-10',
  tabItemInactive:
    'bg-gray-50/50 border-b border-gray-300 dark:border-gray-500 dark:bg-gray-900/30 cursor-pointer hover:border-gray-400 dark:hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-sm hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30 hover:transform hover:scale-101',
  tabItemDisabled:
    'opacity-50 cursor-not-allowed hover:border-gray-300 dark:hover:border-gray-500 hover:bg-transparent hover:shadow-none hover:transform-none',

  default: {
    container: 'border-b border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/20',
    tabItem: 'border-b-0 rounded-t-sm',
    tabItemActive:
      'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-500 shadow-md shadow-gray-200/50 dark:shadow-gray-900/50 transform scale-102 z-10 border-b-2 border-b-blue-500 dark:border-b-blue-400',
    tabItemInactive:
      'bg-gray-50/50 border-b border-gray-300 dark:border-gray-500 dark:bg-gray-900/30 cursor-pointer hover:border-gray-400 dark:hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-sm hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30 hover:transform hover:scale-101',
  },

  pills: {
    container: 'space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
    tabItem: 'border-0 rounded-sm',
    tabItemActive:
      'bg-white text-gray-900 shadow-md shadow-gray-300/60 dark:bg-gray-700 dark:text-white dark:shadow-gray-900/60 transform scale-105 border-2 border-blue-500 dark:border-blue-400',
    tabItemInactive:
      'bg-transparent text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 hover:shadow-sm hover:shadow-gray-200/40 dark:hover:shadow-gray-900/40 hover:transform hover:scale-102',
  },

  underline: {
    container: 'border-b border-gray-200 dark:border-gray-700 bg-gray-50/20 dark:bg-gray-900/10',
    tabItem: 'border-b-2 border-transparent rounded-none relative',
    tabItemActive:
      'border-blue-500 text-blue-600 dark:text-blue-400 font-semibold shadow-sm shadow-blue-200/30 dark:shadow-blue-900/30 transform scale-102',
    tabItemInactive:
      'cursor-pointer hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 hover:border-b-blue-300 dark:hover:border-b-blue-500 hover:transform hover:scale-101',
  },

  icon: 'w-3 h-3 transition-all duration-300 ease-in-out sm:w-4 sm:h-4',
  iconContainer: 'flex items-center justify-center mr-1.5 transition-all duration-300 ease-in-out',
  iconActive:
    'text-blue-600 dark:text-blue-400 scale-110 drop-shadow-md shadow-blue-200/50 dark:shadow-blue-900/50',
  iconInactive:
    'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:scale-105 group-hover:drop-shadow-sm group-hover:shadow-gray-200/30 dark:group-hover:shadow-gray-900/30',

  label: 'mx-0.5 text-sm font-medium transition-all duration-300',
  labelActive: 'text-gray-900 dark:text-white font-semibold drop-shadow-sm',
  labelInactive:
    'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 group-hover:font-medium',

  badge: 'ml-1.5 px-1.5 py-0.5 text-xs font-medium rounded-full transition-all duration-300',
  badgeDefault: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  badgePrimary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  badgeSuccess: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  badgeWarning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  badgeError: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  badgeActive: 'shadow-sm shadow-gray-200/50 dark:shadow-gray-900/50 transform scale-105',
  badgeInactive:
    'group-hover:shadow-sm group-hover:shadow-gray-200/30 dark:group-hover:shadow-gray-900/30 group-hover:scale-102',

  content: 'mt-3',
  contentActive: 'block',
  contentInactive: 'hidden',

  responsive: 'sm:px-4 sm:text-base',

  transition: 'transition-colors duration-200',
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',

  srOnly: 'sr-only',
  focusRing:
    'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:outline-none focus:shadow-lg focus:shadow-blue-200/50 dark:focus:shadow-blue-900/50',

  iconPulse: 'animate-pulse',
  iconBounce: 'hover:animate-bounce',
  iconRotate: 'group-hover:rotate-12 transition-transform duration-300',
};

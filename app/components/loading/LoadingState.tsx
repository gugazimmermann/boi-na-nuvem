interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'Carregando...',
  className = 'min-h-screen bg-gray-50 dark:bg-gray-900',
}: LoadingStateProps) {
  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  icon,
  gradientFrom,
  gradientTo,
  children,
  className = '',
}: InfoCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-sm rounded-md border border-gray-200 dark:border-gray-600 overflow-hidden ${className}`}
    >
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-3 py-2`}>
        <div className="flex items-center space-x-1.5">
          <div className="w-6 h-6 bg-white/20 rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 text-white">{icon}</div>
          </div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="px-3 py-3 bg-white dark:bg-gray-800">{children}</div>
    </div>
  );
}

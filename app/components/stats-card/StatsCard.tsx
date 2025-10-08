export interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  description: string;
  progressPercentage: number;
  gradientFrom: string;
  gradientTo: string;
  iconBgFrom: string;
  iconBgTo: string;
  iconTextColor: string;
  className?: string;
}

export function StatsCard({
  title,
  icon,
  value,
  description,
  progressPercentage,
  gradientFrom,
  gradientTo,
  iconBgFrom,
  iconBgTo,
  iconTextColor,
  className = '',
}: StatsCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}
    >
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-4 py-3`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
            <div className="w-4 h-4 text-white">{icon}</div>
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="px-4 py-6 bg-white dark:bg-gray-800">
        <div className="text-center">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${iconBgFrom} ${iconBgTo} rounded-lg flex items-center justify-center mx-auto mb-4`}
          >
            <div className={`w-8 h-8 ${iconTextColor}`}>{icon}</div>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent mb-1">
            {value}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{description}</p>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} h-1.5 rounded-full transition-all duration-300`}
              style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
  className?: string;
}

export function InfoItem({
  icon,
  label,
  value,
  iconBgColor = 'bg-gray-100 dark:bg-gray-700',
  iconTextColor = 'text-gray-600 dark:text-gray-300',
  className = '',
}: InfoItemProps) {
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <div
        className={`w-8 h-8 ${iconBgColor} rounded-md flex items-center justify-center flex-shrink-0`}
      >
        <div className={`w-4 h-4 ${iconTextColor}`}>{icon}</div>
      </div>
      <div className="flex-1">
        <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
          {label}
        </dt>
        <dd className="text-sm text-gray-900 dark:text-gray-100 leading-snug">{value}</dd>
      </div>
    </div>
  );
}

import type { ButtonProps, ButtonIconProps, ButtonLoadingProps } from './types';
import { styles } from './constants';

function LoadingSpinner({ loading, size, className = '' }: ButtonLoadingProps) {
  if (!loading) return null;

  const spinnerClasses = `${styles.spinner[size]} ${className}`;

  return (
    <svg
      className={spinnerClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

function ButtonIcon({ icon, position, size, className = '' }: ButtonIconProps) {
  if (!icon) return null;

  const iconClasses = `${styles.icon[size]} ${styles.iconSpacing[position]} ${className}`;

  return (
    <span className={iconClasses} aria-hidden="true">
      {icon}
    </span>
  );
}

export function Button({
  children,
  config = {},
  onClick,
  className = '',
  'data-testid': testId,
}: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
  } = config;

  const variantStyles = styles.variants[variant];
  const sizeStyles = styles.sizes[size];

  const baseClasses = styles.base;
  const variantClasses = disabled ? variantStyles.disabled : variantStyles.base;
  const sizeClasses = sizeStyles;
  const widthClasses = fullWidth ? styles.fullWidth : '';
  const stateClasses = disabled ? styles.disabled : loading ? styles.loading : '';
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${stateClasses} ${className}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        event.preventDefault();
        onClick(event as any);
      }
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={combinedClasses}
      data-testid={testId}
      aria-disabled={disabled || loading}
    >
      {icon && iconPosition === 'left' && <ButtonIcon icon={icon} position="left" size={size} />}

      {loading && <LoadingSpinner loading={loading} size={size} />}

      {children && <span className={loading ? 'opacity-0' : ''}>{children}</span>}

      {icon && iconPosition === 'right' && <ButtonIcon icon={icon} position="right" size={size} />}
    </button>
  );
}

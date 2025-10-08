import React from 'react';
import type { BadgeProps, BadgeIconProps, BadgeRemoveProps } from './types';
import { styles } from './constants';
import { Icons } from './icons';

function BadgeIcon({ icon, position, size, className = '' }: BadgeIconProps) {
  if (!icon) return null;

  const iconClasses = `${styles.icon[size]} ${className}`;

  return React.cloneElement<{ className?: string }>(icon, {
    className: iconClasses,
  });
}

function BadgeRemove({ onRemove, size, className = '' }: BadgeRemoveProps) {
  const buttonClasses = `${styles.removeButton.base} ${styles.removeButton[size]} ${className}`;
  const iconClasses = styles.removeIcon[size];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemove();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onRemove();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={buttonClasses}
      aria-label="Remover badge"
      title="Remover badge"
    >
      <Icons.close className={iconClasses} />
    </button>
  );
}

export function Badge({
  children,
  config = {},
  onRemove,
  className = '',
  'data-testid': testId,
}: BadgeProps) {
  const {
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
    icon,
    iconPosition = 'left',
    removable = false,
  } = config;

  const isOutline = variant === 'outline';
  const actualVariant = isOutline ? 'primary' : variant;

  const variantStyles = isOutline
    ? styles.variants[actualVariant].outline
    : styles.variants[actualVariant].base;

  const sizeStyles = styles.sizes[size];
  const shapeStyles = styles.shapes[shape];

  const baseClasses = styles.base;
  const combinedClasses = `${baseClasses} ${variantStyles} ${sizeStyles} ${shapeStyles} ${className}`;

  return (
    <span className={combinedClasses} data-testid={testId} role="status" aria-live="polite">
      {icon && iconPosition === 'left' && <BadgeIcon icon={icon} position="left" size={size} />}

      {children}

      {icon && iconPosition === 'right' && <BadgeIcon icon={icon} position="right" size={size} />}

      {removable && onRemove && <BadgeRemove onRemove={onRemove} size={size} />}
    </span>
  );
}

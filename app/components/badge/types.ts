export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'outline';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill' | 'square';

export interface BadgeConfig {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  icon?: React.ReactElement<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  removable?: boolean;
  className?: string;
}

export interface BadgeProps {
  children?: React.ReactNode;
  config?: BadgeConfig;
  onRemove?: () => void;
  className?: string;
  'data-testid'?: string;
}

export interface BadgeIconProps {
  icon: React.ReactElement<{ className?: string }>;
  position: 'left' | 'right';
  size: BadgeSize;
  className?: string;
}

export interface BadgeRemoveProps {
  onRemove: () => void;
  size: BadgeSize;
  className?: string;
}

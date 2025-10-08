export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonConfig {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  config?: ButtonConfig;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  'data-testid'?: string;
}

export interface ButtonIconProps {
  icon: React.ReactNode;
  position: 'left' | 'right';
  size: ButtonSize;
  className?: string;
}

export interface ButtonLoadingProps {
  loading: boolean;
  size: ButtonSize;
  className?: string;
}

export interface ButtonContentProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition: 'left' | 'right';
  loading: boolean;
  size: ButtonSize;
  className?: string;
}

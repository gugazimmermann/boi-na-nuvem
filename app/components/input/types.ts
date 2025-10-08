export type InputVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local';

export interface InputConfig {
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
}

export interface InputProps {
  label?: string;
  config?: InputConfig;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  'data-testid'?: string;
}

export interface InputLabelProps {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
}

export interface InputIconProps {
  icon: React.ReactNode;
  position: 'left' | 'right';
  size: InputSize;
  className?: string;
}

export interface InputErrorProps {
  error: string;
  className?: string;
}

export interface InputHelperProps {
  helperText: string;
  className?: string;
}

export interface InputWrapperProps {
  children: React.ReactNode;
  className?: string;
}

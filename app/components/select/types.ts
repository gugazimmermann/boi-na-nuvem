export type SelectVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectOptionValue = string | number | boolean;

export interface SelectOption {
  value: SelectOptionValue;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectConfig {
  variant?: SelectVariant;
  size?: SelectSize;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
  value?: SelectOptionValue | SelectOptionValue[];
  defaultValue?: SelectOptionValue | SelectOptionValue[];
  autoFocus?: boolean;
  className?: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  config?: SelectConfig;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onChange?: (
    value: SelectOptionValue | SelectOptionValue[],
    option: SelectOption | SelectOption[],
  ) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  className?: string;
  'data-testid'?: string;
}

export interface SelectLabelProps {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
}

export interface SelectIconProps {
  icon: React.ReactNode;
  position: 'left' | 'right';
  size: SelectSize;
  className?: string;
}

export interface SelectErrorProps {
  error: string;
  className?: string;
}

export interface SelectHelperProps {
  helperText: string;
  className?: string;
}

export interface SelectOptionGroupProps {
  label: string;
  options: SelectOption[];
  className?: string;
}

export interface SelectWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export interface CheckboxConfig {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  autoFocus?: boolean;
}

export interface CheckboxProps {
  label?: string;
  config?: CheckboxConfig;
  error?: string;
  helperText?: string;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  'data-testid'?: string;
}

export interface CheckboxGroupConfig {
  direction?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

export interface CheckboxGroupProps {
  label?: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string[];
  config?: CheckboxGroupConfig;
  error?: string;
  helperText?: string;
  onChange?: (values: string[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  'data-testid'?: string;
}

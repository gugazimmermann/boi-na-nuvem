export interface TextareaConfig {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoFocus?: boolean;
}

export interface TextareaLabelProps {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
}

export interface TextareaErrorProps {
  error: string;
  className?: string;
}

export interface TextareaHelperProps {
  helperText: string;
  className?: string;
}

export interface TextareaProps {
  label?: string;
  config?: TextareaConfig;
  error?: string;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  'data-testid'?: string;
}

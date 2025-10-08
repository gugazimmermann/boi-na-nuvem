import type { InputConfig } from '../input/types';
import type { SelectConfig, SelectOption } from '../select/types';
import type { ButtonConfig } from '../button/types';

export type FormFieldType = 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';

export interface FormValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
}

export interface FormFieldConfig {
  type: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: FormValidationRule;
  className?: string;
  'data-testid'?: string;

  inputConfig?: InputConfig;

  selectConfig?: SelectConfig;
  options?: SelectOption[];

  textareaConfig?: {
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    value?: string;
    defaultValue?: string;
    autoFocus?: boolean;
  };

  buttonConfig?: ButtonConfig;

  gridColumn?: number | string;
  gridRow?: number | string;
  order?: number;
}

export interface FormConfig {
  title?: string;
  description?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  gridColumns?: number;
  spacing?: 'sm' | 'md' | 'lg';
  showRequiredIndicator?: boolean;
  submitButtonText?: string;
  resetButtonText?: string;
  showResetButton?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

export interface FormFieldProps {
  field: FormFieldConfig;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: any) => void;
  onBlur: (name: string) => void;
  onFocus: (name: string) => void;
}

export interface FormProps {
  fields: FormFieldConfig[];
  config?: FormConfig;
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>, formState: FormState) => void | Promise<void>;
  onReset?: (formState: FormState) => void;
  onChange?: (values: Record<string, any>, formState: FormState) => void;
  onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
  className?: string;
  'data-testid'?: string;
}

export interface FormContextType {
  formState: FormState;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value: any) => string | null;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

export interface UseFormReturn {
  formState: FormState;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value: any) => string | null;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  handleSubmit: (event: React.FormEvent) => void;
  handleReset: (event: React.FormEvent) => void;
}

export interface FormSectionProps {
  title?: string;
  description?: string;
  fields: FormFieldConfig[];
  className?: string;
}

export interface FormActionsProps {
  submitButtonText?: string;
  resetButtonText?: string;
  showResetButton?: boolean;
  isSubmitting?: boolean;
  isValid?: boolean;
  onSubmit: () => void;
  onReset?: () => void;
  className?: string;
}

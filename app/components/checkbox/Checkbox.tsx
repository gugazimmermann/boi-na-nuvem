import React from 'react';
import { CheckIcon } from './icons';
import { styles } from './constants';

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

function Checkbox({
  label,
  config = {},
  error,
  helperText,
  onChange,
  onBlur,
  onFocus,
  className = '',
  'data-testid': testId,
}: CheckboxProps) {
  const {
    variant = 'default',
    size = 'md',
    disabled = false,
    required = false,
    readonly = false,
    checked = false,
    indeterminate = false,
    autoFocus = false,
  } = config;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !readonly && onChange) {
      onChange(event.target.checked);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const variantStyles = styles.variants[variant];
  const sizeStyles = styles.checkboxSizes[size];

  const baseClasses = styles.checkboxVisual;
  const variantClasses = disabled ? variantStyles.disabled : variantStyles.checkbox;
  const sizeClasses = sizeStyles;
  const stateClasses = [
    error && styles.checkboxStates.error,
    disabled && styles.checkboxStates.disabled,
    readonly && styles.checkboxStates.readonly,
  ].filter(Boolean).join(' ');

  const checkboxClasses = `${baseClasses} ${sizeClasses} ${stateClasses} ${className}`;

  const labelClasses = [
    styles.checkboxLabel,
    disabled && styles.checkboxLabelDisabled,
    error && styles.checkboxLabelError,
  ].filter(Boolean).join(' ');


  return (
    <div className="inline-block" data-testid={testId}>
      <label className={labelClasses}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          readOnly={readonly}
          required={required}
          autoFocus={autoFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.checkboxInput}
          data-testid={testId ? `${testId}-input` : undefined}
        />
        <span 
          className={checkboxClasses}
          style={{
            backgroundColor: checked || indeterminate ? (error ? '#dc2626' : '#0ea5e9') : undefined,
            borderColor: checked || indeterminate ? (error ? '#dc2626' : '#0ea5e9') : undefined,
          }}
        >
          {(checked || indeterminate) && (
            <CheckIcon className={error ? styles.checkboxIconError : styles.checkboxIcon} />
          )}
        </span>
        {label && (
          <span className={[
            styles.checkboxLabelText,
            disabled && styles.checkboxLabelTextDisabled,
            error && styles.checkboxLabelTextError,
          ].filter(Boolean).join(' ')}>
            {label}
            {required && <span className={styles.checkboxRequired}>*</span>}
          </span>
        )}
      </label>
      {error && (
        <div className={styles.error} data-testid={testId ? `${testId}-error` : undefined}>
          {error}
        </div>
      )}
      {helperText && !error && (
        <div className={styles.helper} data-testid={testId ? `${testId}-helper` : undefined}>
          {helperText}
        </div>
      )}
    </div>
  );
}

export { Checkbox };

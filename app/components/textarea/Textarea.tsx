import { useState, useRef } from 'react';
import type {
  TextareaProps,
  TextareaLabelProps,
  TextareaErrorProps,
  TextareaHelperProps,
} from './types';
import { styles } from './constants';
import { generateId } from '~/utils/idGenerator';

function TextareaLabel({ label, required, htmlFor, className = '' }: TextareaLabelProps) {
  const labelClasses = `${styles.label} ${required ? styles.labelRequired : ''} ${className}`;

  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {label}
    </label>
  );
}

function TextareaError({ error, className = '' }: TextareaErrorProps) {
  if (!error) return null;

  return <p className={`${styles.error} ${className}`}>{error}</p>;
}

function TextareaHelper({ helperText, className = '' }: TextareaHelperProps) {
  if (!helperText) return null;

  return <p className={`${styles.helper} ${className}`}>{helperText}</p>;
}

export function Textarea({
  label,
  config = {},
  error,
  helperText,
  onChange,
  onBlur,
  onFocus,
  className = '',
  'data-testid': testId,
}: TextareaProps) {
  const {
    variant = 'default',
    size = 'md',
    disabled = false,
    required = false,
    readonly = false,
    placeholder,
    value,
    defaultValue,
    maxLength,
    minLength,
    rows = 3,
    resize = 'vertical',
    autoFocus = false,
  } = config;

  const [textareaValue, setTextareaValue] = useState(defaultValue || '');
  const currentValue = value !== undefined ? value : textareaValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const variantStyles = styles.variants[variant];
  const sizeStyles = styles.sizes[size];

  const baseClasses = styles.textarea;
  const variantClasses = disabled ? variantStyles.disabled : variantStyles.textarea;
  const sizeClasses = sizeStyles;
  const readonlyClasses = readonly ? styles.readonly : '';
  const resizeClasses = styles.resize[resize];
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${readonlyClasses} ${resizeClasses} ${className}`;

  const textareaId = generateId('textarea');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setTextareaValue(event.target.value);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={styles.container}>
      {label && <TextareaLabel label={label} required={required} htmlFor={textareaId} />}

      <textarea
        ref={textareaRef}
        id={textareaId}
        value={currentValue}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        rows={rows}
        autoFocus={autoFocus}
        className={combinedClasses}
        data-testid={testId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
      />

      {error && <TextareaError error={error} className={error ? `${textareaId}-error` : ''} />}

      {helperText && !error && (
        <TextareaHelper
          helperText={helperText}
          className={helperText ? `${textareaId}-helper` : ''}
        />
      )}
    </div>
  );
}

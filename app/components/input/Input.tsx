import { useState, useRef } from 'react';
import type {
  InputProps,
  InputLabelProps,
  InputIconProps,
  InputErrorProps,
  InputHelperProps,
} from './types';
import { styles } from './constants';
import { Icons } from './icons';
import { generateId } from '~/utils/idGenerator';

function InputLabel({ label, required, htmlFor, className = '' }: InputLabelProps) {
  const labelClasses = `${styles.label} ${required ? styles.labelRequired : ''} ${className}`;

  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {label}
    </label>
  );
}

function InputIcon({ icon, position, size, className = '' }: InputIconProps) {
  if (!icon) return null;

  const iconClasses = `${styles.iconContainer} ${position === 'left' ? styles.iconContainerLeft : styles.iconContainerRight} ${className}`;
  const iconSizeClasses = styles.icon[size];

  return (
    <div className={iconClasses}>
      <span className={iconSizeClasses} aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}

function InputError({ error, className = '' }: InputErrorProps) {
  if (!error) return null;

  return <p className={`${styles.error} ${className}`}>{error}</p>;
}

function InputHelper({ helperText, className = '' }: InputHelperProps) {
  if (!helperText) return null;

  return <p className={`${styles.helper} ${className}`}>{helperText}</p>;
}

export function Input({
  label,
  config = {},
  error,
  helperText,
  icon,
  iconPosition = 'left',
  onChange,
  onBlur,
  onFocus,
  className = '',
  'data-testid': testId,
}: InputProps) {
  const {
    type = 'text',
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
    min,
    max,
    step,
    pattern,
    autoComplete,
    autoFocus = false,
  } = config;

  const [inputValue, setInputValue] = useState(defaultValue || '');
  const currentValue = value !== undefined ? value : inputValue;
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const variantStyles = styles.variants[variant];
  const sizeStyles = styles.sizes[size];

  const baseClasses = styles.input;
  const variantClasses = disabled ? variantStyles.disabled : variantStyles.input;
  const sizeClasses = sizeStyles;
  const readonlyClasses = readonly ? styles.readonly : '';
  const iconClasses = icon
    ? iconPosition === 'left'
      ? styles.inputWithIcon.left[size]
      : styles.inputWithIcon.right[size]
    : '';
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${readonlyClasses} ${iconClasses} ${className}`;

  const inputId = generateId('input');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInputValue(event.target.value);
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  const getPasswordIcon = () => {
    if (type === 'password') {
      return showPassword ? Icons.eyeSlash : Icons.eye;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      {label && <InputLabel label={label} required={required} htmlFor={inputId} />}

      <div className={styles.inputGroup}>
        {icon && iconPosition === 'left' && <InputIcon icon={icon} position="left" size={size} />}

        <input
          ref={inputRef}
          id={inputId}
          type={getInputType()}
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
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={combinedClasses}
          data-testid={testId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
        />

        {(icon && iconPosition === 'right') || type === 'password' ? (
          <div className={`${styles.iconContainer} ${styles.iconContainerRight}`}>
            {type === 'password' ? (
              <button
                type="button"
                onClick={handlePasswordToggle}
                className={`${styles.icon[size]} text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600`}
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {getPasswordIcon()}
              </button>
            ) : (
              <span className={styles.icon[size]} aria-hidden="true">
                {icon}
              </span>
            )}
          </div>
        ) : null}
      </div>

      {error && <InputError error={error} className={error ? `${inputId}-error` : ''} />}

      {helperText && !error && (
        <InputHelper helperText={helperText} className={helperText ? `${inputId}-helper` : ''} />
      )}
    </div>
  );
}

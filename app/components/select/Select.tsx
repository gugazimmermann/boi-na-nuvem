import { useState, useRef } from 'react';
import type {
  SelectProps,
  SelectLabelProps,
  SelectIconProps,
  SelectErrorProps,
  SelectHelperProps,
} from './types';
import { styles } from './constants';
import { Icons } from './icons';
import { generateId } from '~/utils/idGenerator';

function SelectLabel({ label, required, htmlFor, className = '' }: SelectLabelProps) {
  const labelClasses = `${styles.label} ${required ? styles.labelRequired : ''} ${className}`;

  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {label}
    </label>
  );
}

function SelectIcon({ icon, position, size, className = '' }: SelectIconProps) {
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

function SelectError({ error, className = '' }: SelectErrorProps) {
  if (!error) return null;

  return <p className={`${styles.error} ${className}`}>{error}</p>;
}

function SelectHelper({ helperText, className = '' }: SelectHelperProps) {
  if (!helperText) return null;

  return <p className={`${styles.helper} ${className}`}>{helperText}</p>;
}

export function Select({
  label,
  options,
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
}: SelectProps) {
  const {
    variant = 'default',
    size = 'md',
    disabled = false,
    required = false,
    multiple = false,
    placeholder,
    value,
    defaultValue,
    autoFocus = false,
  } = config;

  const [selectValue, setSelectValue] = useState(value || defaultValue || (multiple ? [] : ''));
  const selectRef = useRef<HTMLSelectElement>(null);

  const variantStyles = styles.variants[variant];
  const sizeStyles = styles.sizes[size];

  const baseClasses = styles.select;
  const variantClasses = disabled ? variantStyles.disabled : variantStyles.select;
  const sizeClasses = sizeStyles;
  const multipleClasses = multiple ? styles.multiple : '';
  const iconClasses = icon
    ? iconPosition === 'left'
      ? styles.selectWithIcon.left[size]
      : styles.selectWithIcon.right[size]
    : '';
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${multipleClasses} ${iconClasses} ${className}`;

  const selectId = generateId('select');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = multiple
      ? Array.from(event.target.selectedOptions, (option) => option.value)
      : event.target.value;

    setSelectValue(selectedValue);

    if (onChange) {
      const selectedOptions = multiple
        ? Array.from(
            event.target.selectedOptions,
            (option) => options.find((opt) => opt.value.toString() === option.value)!,
          )
        : options.find((opt) => opt.value.toString() === event.target.value)!;

      onChange(selectedValue, selectedOptions);
    }
  };

  const renderOptions = () => {
    const groupedOptions = options.reduce(
      (groups, option) => {
        const group = option.group || 'default';
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(option);
        return groups;
      },
      {} as Record<string, typeof options>,
    );

    return Object.entries(groupedOptions).map(([groupName, groupOptions]) => {
      if (groupName === 'default') {
        return groupOptions.map((option) => (
          <option
            key={option.value.toString()}
            value={option.value.toString()}
            disabled={option.disabled}
            className={option.disabled ? styles.optionDisabled : styles.option}
          >
            {option.label}
          </option>
        ));
      }

      return (
        <optgroup key={groupName} label={groupName} className={styles.optgroup}>
          {groupOptions.map((option) => (
            <option
              key={option.value.toString()}
              value={option.value.toString()}
              disabled={option.disabled}
              className={option.disabled ? styles.optionDisabled : styles.option}
            >
              {option.label}
            </option>
          ))}
        </optgroup>
      );
    });
  };

  const getCurrentValue = () => {
    if (value !== undefined) {
      return value;
    }
    return selectValue;
  };

  return (
    <div className={styles.container}>
      {label && <SelectLabel label={label} required={required} htmlFor={selectId} />}

      <div className={styles.selectGroup}>
        {icon && iconPosition === 'left' && <SelectIcon icon={icon} position="left" size={size} />}

        <select
          ref={selectRef}
          id={selectId}
          value={getCurrentValue()}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          multiple={multiple}
          autoFocus={autoFocus}
          className={combinedClasses}
          data-testid={testId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
        >
          {!multiple && placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {renderOptions()}
        </select>

        <div className={styles.dropdownArrow}>
          {icon && iconPosition === 'right' ? (
            <span className={`${styles.icon[size]} ${styles.dropdownArrowIcon}`} aria-hidden="true">
              {icon}
            </span>
          ) : (
            <span className={`${styles.icon[size]} ${styles.dropdownArrowIcon}`} aria-hidden="true">
              {Icons.chevronDown}
            </span>
          )}
        </div>
      </div>

      {error && <SelectError error={error} className={error ? `${selectId}-error` : ''} />}

      {helperText && !error && (
        <SelectHelper helperText={helperText} className={helperText ? `${selectId}-helper` : ''} />
      )}
    </div>
  );
}

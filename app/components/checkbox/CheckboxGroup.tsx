import React from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxGroupProps } from './types';
import { groupStyles } from './constants';

function CheckboxGroup({
  label,
  options,
  value = [],
  config = {},
  error,
  helperText,
  onChange,
  onBlur,
  onFocus,
  className = '',
  'data-testid': testId,
}: CheckboxGroupProps) {
  const {
    direction = 'horizontal',
    spacing = 'md',
  } = config;

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (onChange) {
      if (checked) {
        // Se está selecionando "Ciclo Completo", desmarca todas as outras fases
        if (optionValue === 'ciclo_completo') {
          onChange(['ciclo_completo']);
        } else {
          // Se está selecionando qualquer outra fase, remove "Ciclo Completo" se estiver selecionado
          const newValue = value.filter(v => v !== 'ciclo_completo');
          onChange([...newValue, optionValue]);
        }
      } else {
        // Se está desmarcando, simplesmente remove o valor
        onChange(value.filter(v => v !== optionValue));
      }
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

  const containerClasses = [
    groupStyles.container,
    direction === 'horizontal' ? groupStyles.containerHorizontal : groupStyles.containerVertical,
    groupStyles.spacing[spacing],
    className,
  ].filter(Boolean).join(' ');

  const fieldsetClasses = [
    groupStyles.fieldset,
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full" data-testid={testId}>
      {label && (
        <div className={[
          groupStyles.legend,
          error && groupStyles.legendError,
        ].filter(Boolean).join(' ')}>
          {label}
        </div>
      )}
      <div className={containerClasses}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            config={{
              checked: value.includes(option.value),
              disabled: option.disabled,
            }}
            onChange={(checked) => handleCheckboxChange(option.value, checked)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            data-testid={testId ? `${testId}-${option.value}` : undefined}
          />
        ))}
      </div>
      {error && (
        <div className={groupStyles.error} data-testid={testId ? `${testId}-error` : undefined}>
          {error}
        </div>
      )}
      {helperText && !error && (
        <div className={groupStyles.helper} data-testid={testId ? `${testId}-helper` : undefined}>
          {helperText}
        </div>
      )}
    </div>
  );
}

export { CheckboxGroup };

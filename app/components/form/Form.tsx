import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { Textarea } from '../textarea/Textarea';
import { Button } from '../button/Button';
import { AddressInput } from '../input/AddressInput';
import { CoordinatesInput } from '../input/CoordinatesInput';
import type { FormProps, FormState, FormContextType, FormFieldProps } from './types';
import { styles, defaultFormConfig, validationPatterns, validationMessages } from './constants';

export const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
};

function FormField({ field, value, error, touched, onChange, onBlur, onFocus }: FormFieldProps) {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newValue = event.target.value;
      onChange(field.name, newValue);
    },
    [field.name, onChange],
  );

  const handleTextareaChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      onChange(field.name, newValue);
    },
    [field.name, onChange],
  );

  const handleSelectChange = useCallback(
    (selectedValue: any, selectedOption: any) => {
      onChange(field.name, selectedValue);
    },
    [field.name, onChange],
  );

  const handleBlur = useCallback(() => {
    onBlur(field.name);
  }, [field.name, onBlur]);

  const handleFocus = useCallback(() => {
    onFocus(field.name);
  }, [field.name, onFocus]);

  const renderField = () => {
    switch (field.type) {
      case 'input':
        return (
          <Input
            label={field.label}
            config={{
              ...field.inputConfig,
              value: value || '',
              required: field.required,
              disabled: field.disabled,
            }}
            error={error}
            helperText={field.helperText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={field.className}
            data-testid={field['data-testid']}
          />
        );

      case 'address':
        return (
          <AddressInput
            label={field.label}
            config={{
              ...field.inputConfig,
              value: value || '',
              required: field.required,
              disabled: field.disabled,
            }}
            value={value || ''}
            onChange={(newValue) => onChange(field.name, newValue)}
            onAddressSelect={(address) => {
              if (field.onAddressSelect) {
                field.onAddressSelect(address);
              }
            }}
            error={error}
            helperText={field.helperText}
            className={field.className}
            data-testid={field['data-testid']}
          />
        );

      case 'coordinates':
        return (
          <CoordinatesInput
            label={field.label}
            config={{
              ...field.inputConfig,
              value: value || '',
              required: field.required,
              disabled: field.disabled,
            }}
            value={value || ''}
            onChange={(newValue) => onChange(field.name, newValue)}
            error={error}
            helperText={field.helperText}
            className={field.className}
            data-testid={field['data-testid']}
          />
        );

      case 'select':
        return (
          <Select
            label={field.label}
            options={field.options || []}
            config={{
              ...field.selectConfig,
              value: value || '',
              required: field.required,
              disabled: field.disabled,
            }}
            error={error}
            helperText={field.helperText}
            onChange={handleSelectChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={field.className}
            data-testid={field['data-testid']}
          />
        );

      case 'textarea':
        return (
          <Textarea
            label={field.label}
            config={{
              ...field.textareaConfig,
              value: value || '',
              required: field.required,
              disabled: field.disabled,
            }}
            error={error}
            helperText={field.helperText}
            onChange={handleTextareaChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={field.className}
            data-testid={field['data-testid']}
          />
        );

      default:
        return <div className="text-red-500 text-sm">Unsupported field type: {field.type}</div>;
    }
  };

  const getColumnSpan = () => {
    if (field.gridColumn) {
      if (typeof field.gridColumn === 'number') {
        return `col-span-${field.gridColumn}`;
      }
      return field.gridColumn;
    }
    return '';
  };

  const columnSpanClass = getColumnSpan();

  return <div className={`${styles.field.container} ${columnSpanClass}`}>{renderField()}</div>;
}

function FormActions({
  submitButtonText = 'Enviar',
  resetButtonText = 'Limpar',
  showResetButton = false,
  isSubmitting = false,
  isValid = true,
  onSubmit,
  onReset,
  className = '',
}: {
  submitButtonText?: string;
  resetButtonText?: string;
  showResetButton?: boolean;
  isSubmitting?: boolean;
  isValid?: boolean;
  onSubmit: () => void;
  onReset?: () => void;
  className?: string;
}) {
  return (
    <div className={`${styles.actions.container} ${className}`}>
      {showResetButton && onReset && (
        <Button
          config={{
            variant: 'secondary',
            type: 'button',
            disabled: isSubmitting,
          }}
          onClick={onReset}
        >
          {resetButtonText}
        </Button>
      )}
      <Button
        config={{
          variant: 'primary',
          type: 'submit',
          disabled: !isValid || isSubmitting,
          loading: isSubmitting,
        }}
        onClick={onSubmit}
      >
        {submitButtonText}
      </Button>
    </div>
  );
}

export function Form({
  fields,
  config = {},
  initialValues = {},
  onSubmit,
  onReset,
  onChange,
  onValidationChange,
  className = '',
  'data-testid': testId,
}: FormProps) {
  const formConfig = { ...defaultFormConfig, ...config };

  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    isDirty: false,
  });

  const validateField = useCallback(
    (name: string, value: any): string | null => {
      const field = fields.find((f) => f.name === name);
      if (!field || !field.validation) return null;

      const rules = field.validation;

      if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        return validationMessages.required;
      }

      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return null;
      }

      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        return validationMessages.minLength(rules.minLength);
      }

      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        return validationMessages.maxLength(rules.maxLength);
      }

      if (rules.min !== undefined && typeof value === 'number' && value < rules.min) {
        return validationMessages.min(rules.min);
      }

      if (rules.max !== undefined && typeof value === 'number' && value > rules.max) {
        return validationMessages.max(rules.max);
      }

      if (rules.email && !validationPatterns.email.test(value)) {
        return validationMessages.email;
      }

      if (rules.url && !validationPatterns.url.test(value)) {
        return validationMessages.url;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return validationMessages.pattern;
      }

      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) return customError;
      }

      return null;
    },
    [fields],
  );

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formState.values[field.name];
      const error = validateField(field.name, value);
      if (error) {
        errors[field.name] = error;
        isValid = false;
      }
    });

    setFormState((prev) => ({ ...prev, errors, isValid }));
    onValidationChange?.(isValid, errors);

    return isValid;
  }, [fields, formState.values, validateField, onValidationChange]);

  const setFieldValue = useCallback((name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      isDirty: true,
    }));
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
    }));
  }, []);

  const setFieldTouched = useCallback((name: string, touched: boolean) => {
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
      isDirty: false,
    });
    onReset?.(formState);
  }, [initialValues, onReset, formState]);

  const submitForm = useCallback(async () => {
    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values, formState);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [validateForm, onSubmit, formState]);

  const handleFieldChange = useCallback(
    (name: string, value: any) => {
      setFieldValue(name, value);

      if (formState.errors[name]) {
        setFieldError(name, '');
      }
    },
    [setFieldValue, setFieldError, formState.errors],
  );

  const handleFieldBlur = useCallback(
    (name: string) => {
      setFieldTouched(name, true);

      const value = formState.values[name];
      const error = validateField(name, value);
      if (error) {
        setFieldError(name, error);
      }

      const newErrors = { ...formState.errors };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      const isValid = Object.keys(newErrors).length === 0;
      onValidationChange?.(isValid, newErrors);
    },
    [
      setFieldTouched,
      validateField,
      setFieldError,
      formState.values,
      formState.errors,
      onValidationChange,
    ],
  );

  const handleFieldFocus = useCallback(
    (name: string) => {
      setFieldTouched(name, true);
    },
    [setFieldTouched],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      submitForm();
    },
    [submitForm],
  );

  const handleReset = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      resetForm();
    },
    [resetForm],
  );

  const formContextValue: FormContextType = useMemo(
    () => ({
      formState,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      validateField,
      validateForm,
      resetForm,
      submitForm,
    }),
    [
      formState,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      validateField,
      validateForm,
      resetForm,
      submitForm,
    ],
  );

  const layoutClasses =
    formConfig.layout === 'grid'
      ? `${styles.layout.grid} ${styles.grid[`cols${formConfig.gridColumns}` as keyof typeof styles.grid]}`
      : styles.layout[formConfig.layout];

  React.useEffect(() => {
    onChange?.(formState.values, formState);
  }, [formState.values, formState, onChange]);

  return (
    <FormContext.Provider value={formContextValue}>
      <div className={`${styles.form.wrapper} ${className}`} data-testid={testId}>
        {formConfig.title && <h2 className={styles.form.title}>{formConfig.title}</h2>}

        {formConfig.description && (
          <p className={styles.form.description}>{formConfig.description}</p>
        )}

        <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form.base}>
          <div className={layoutClasses}>
            {fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formState.values[field.name]}
                error={formState.errors[field.name]}
                touched={formState.touched[field.name]}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                onFocus={handleFieldFocus}
              />
            ))}
          </div>

          <FormActions
            submitButtonText={formConfig.submitButtonText}
            resetButtonText={formConfig.resetButtonText}
            showResetButton={formConfig.showResetButton}
            isSubmitting={formState.isSubmitting}
            isValid={formState.isValid}
            onSubmit={submitForm}
            onReset={resetForm}
          />
        </form>
      </div>
    </FormContext.Provider>
  );
}

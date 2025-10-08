# Form Component

A comprehensive, generic, and reusable form component built with React and TypeScript. This component provides a flexible way to create forms with built-in validation, state management, and support for various field types.

## Features

- **Generic and Reusable**: Configure forms declaratively with field definitions
- **Built-in Validation**: Comprehensive validation system with custom rules
- **Multiple Field Types**: Support for input, select, and extensible field types
- **Flexible Layouts**: Vertical, horizontal, and grid layouts
- **State Management**: Built-in form state management with React hooks
- **Accessibility**: Full accessibility support with proper ARIA attributes
- **TypeScript**: Fully typed with comprehensive TypeScript support
- **Customizable**: Extensive customization options for styling and behavior

## Installation

The Form component is part of the component library and uses the existing Input, Select, and Button components.

```tsx
import { Form } from './components/form';
```

## Basic Usage

```tsx
import React from 'react';
import { Form } from './components/form';
import type { FormFieldConfig } from './components/form/types';

const fields: FormFieldConfig[] = [
  {
    type: 'input',
    name: 'username',
    label: 'Username',
    required: true,
    validation: {
      required: true,
      minLength: 3,
    },
    inputConfig: {
      type: 'text',
      placeholder: 'Enter your username',
    },
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email',
    required: true,
    validation: {
      required: true,
      email: true,
    },
    inputConfig: {
      type: 'email',
      placeholder: 'Enter your email',
    },
  },
];

function MyForm() {
  const handleSubmit = async (values: Record<string, any>) => {
    console.log('Form submitted:', values);
    // Handle form submission
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      config={{
        title: 'User Registration',
        description: 'Please fill out the form below',
        submitButtonText: 'Create Account',
        showResetButton: true,
      }}
    />
  );
}
```

## API Reference

### Form Props

| Prop                 | Type                                           | Default             | Description                     |
| -------------------- | ---------------------------------------------- | ------------------- | ------------------------------- |
| `fields`             | `FormFieldConfig[]`                            | -                   | Array of field configurations   |
| `config`             | `FormConfig`                                   | `defaultFormConfig` | Form configuration options      |
| `initialValues`      | `Record<string, any>`                          | `{}`                | Initial form values             |
| `onSubmit`           | `(values, formState) => void \| Promise<void>` | -                   | Form submission handler         |
| `onReset`            | `(formState) => void`                          | -                   | Form reset handler              |
| `onChange`           | `(values, formState) => void`                  | -                   | Form change handler             |
| `onValidationChange` | `(isValid, errors) => void`                    | -                   | Validation state change handler |
| `className`          | `string`                                       | `''`                | Additional CSS classes          |
| `data-testid`        | `string`                                       | -                   | Test identifier                 |

### FormFieldConfig

| Property       | Type                 | Required | Description                             |
| -------------- | -------------------- | -------- | --------------------------------------- |
| `type`         | `FormFieldType`      | ✅       | Field type ('input', 'select', etc.)    |
| `name`         | `string`             | ✅       | Field name (used as key in form values) |
| `label`        | `string`             | ❌       | Field label                             |
| `placeholder`  | `string`             | ❌       | Field placeholder text                  |
| `helperText`   | `string`             | ❌       | Helper text below the field             |
| `required`     | `boolean`            | ❌       | Whether the field is required           |
| `disabled`     | `boolean`            | ❌       | Whether the field is disabled           |
| `validation`   | `FormValidationRule` | ❌       | Validation rules                        |
| `inputConfig`  | `InputConfig`        | ❌       | Input-specific configuration            |
| `selectConfig` | `SelectConfig`       | ❌       | Select-specific configuration           |
| `options`      | `SelectOption[]`     | ❌       | Options for select fields               |
| `className`    | `string`             | ❌       | Additional CSS classes                  |
| `data-testid`  | `string`             | ❌       | Test identifier                         |

### FormConfig

| Property                | Type                                   | Default      | Description                       |
| ----------------------- | -------------------------------------- | ------------ | --------------------------------- |
| `title`                 | `string`                               | -            | Form title                        |
| `description`           | `string`                               | -            | Form description                  |
| `layout`                | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | Form layout                       |
| `gridColumns`           | `number`                               | `1`          | Number of columns for grid layout |
| `spacing`               | `'sm' \| 'md' \| 'lg'`                 | `'md'`       | Spacing between fields            |
| `showRequiredIndicator` | `boolean`                              | `true`       | Show asterisk for required fields |
| `submitButtonText`      | `string`                               | `'Submit'`   | Submit button text                |
| `resetButtonText`       | `string`                               | `'Reset'`    | Reset button text                 |
| `showResetButton`       | `boolean`                              | `false`      | Show reset button                 |
| `className`             | `string`                               | -            | Additional CSS classes            |
| `wrapperClassName`      | `string`                               | -            | Wrapper CSS classes               |

### FormValidationRule

| Property    | Type                        | Description                |
| ----------- | --------------------------- | -------------------------- |
| `required`  | `boolean`                   | Field is required          |
| `minLength` | `number`                    | Minimum string length      |
| `maxLength` | `number`                    | Maximum string length      |
| `min`       | `number`                    | Minimum numeric value      |
| `max`       | `number`                    | Maximum numeric value      |
| `pattern`   | `RegExp`                    | Custom regex pattern       |
| `email`     | `boolean`                   | Email format validation    |
| `url`       | `boolean`                   | URL format validation      |
| `custom`    | `(value) => string \| null` | Custom validation function |

## Field Types

### Input Fields

```tsx
{
  type: 'input',
  name: 'username',
  label: 'Username',
  inputConfig: {
    type: 'text', // 'text', 'email', 'password', 'number', 'tel', 'url', etc.
    variant: 'default', // 'default', 'success', 'warning', 'error', 'info'
    size: 'md', // 'sm', 'md', 'lg'
    placeholder: 'Enter username',
    disabled: false,
    readonly: false,
    autoFocus: false,
  },
  validation: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
}
```

### Select Fields

```tsx
{
  type: 'select',
  name: 'country',
  label: 'Country',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ],
  selectConfig: {
    variant: 'default',
    size: 'md',
    multiple: false,
    placeholder: 'Select a country',
  },
  validation: {
    required: true,
  },
}
```

## Layout Options

### Vertical Layout (Default)

```tsx
<Form fields={fields} config={{ layout: 'vertical' }} onSubmit={handleSubmit} />
```

### Grid Layout

```tsx
<Form
  fields={fields}
  config={{
    layout: 'grid',
    gridColumns: 2,
  }}
  onSubmit={handleSubmit}
/>
```

### Horizontal Layout

```tsx
<Form fields={fields} config={{ layout: 'horizontal' }} onSubmit={handleSubmit} />
```

## Validation Examples

### Basic Validation

```tsx
{
  type: 'input',
  name: 'email',
  label: 'Email',
  validation: {
    required: true,
    email: true,
  },
}
```

### Custom Validation

```tsx
{
  type: 'input',
  name: 'password',
  label: 'Password',
  validation: {
    required: true,
    minLength: 8,
    custom: (value) => {
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Password must contain at least one number';
      }
      return null;
    },
  },
}
```

### Pattern Validation

```tsx
{
  type: 'input',
  name: 'phone',
  label: 'Phone Number',
  validation: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
  },
}
```

## Form State Management

The Form component provides built-in state management with the following features:

- **Values**: Current form field values
- **Errors**: Validation errors for each field
- **Touched**: Whether fields have been interacted with
- **isSubmitting**: Whether the form is currently being submitted
- **isValid**: Whether the form is valid
- **isDirty**: Whether the form has been modified

### Accessing Form State

```tsx
function MyForm() {
  const handleSubmit = async (values: Record<string, any>, formState: FormState) => {
    console.log('Values:', values);
    console.log('Is Valid:', formState.isValid);
    console.log('Is Dirty:', formState.isDirty);
    console.log('Errors:', formState.errors);
  };

  const handleChange = (values: Record<string, any>, formState: FormState) => {
    // Called whenever form values change
    console.log('Form changed:', values);
  };

  return <Form fields={fields} onSubmit={handleSubmit} onChange={handleChange} />;
}
```

## Using Form Context

For advanced use cases, you can access the form context directly:

```tsx
import { useFormContext } from './components/form';

function CustomField() {
  const { formState, setFieldValue, validateField } = useFormContext();

  const handleCustomAction = () => {
    setFieldValue('customField', 'new value');
    const error = validateField('customField', 'new value');
    if (error) {
      console.log('Validation error:', error);
    }
  };

  return <button onClick={handleCustomAction}>Custom Action</button>;
}
```

## Styling

The Form component uses Tailwind CSS classes and provides extensive customization options:

### Custom Styling

```tsx
<Form
  fields={fields}
  onSubmit={handleSubmit}
  className="custom-form-class"
  config={{
    wrapperClassName: 'custom-wrapper-class',
  }}
/>
```

### Field Styling

```tsx
{
  type: 'input',
  name: 'username',
  label: 'Username',
  className: 'custom-field-class',
  inputConfig: {
    className: 'custom-input-class',
  },
}
```

## Examples

### User Registration Form

```tsx
const registrationFields: FormFieldConfig[] = [
  {
    type: 'input',
    name: 'firstName',
    label: 'First Name',
    required: true,
    validation: { required: true },
    inputConfig: { type: 'text' },
  },
  {
    type: 'input',
    name: 'lastName',
    label: 'Last Name',
    required: true,
    validation: { required: true },
    inputConfig: { type: 'text' },
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email',
    required: true,
    validation: { required: true, email: true },
    inputConfig: { type: 'email' },
  },
  {
    type: 'input',
    name: 'password',
    label: 'Password',
    required: true,
    validation: {
      required: true,
      minLength: 8,
      custom: (value) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return null;
      },
    },
    inputConfig: { type: 'password' },
  },
  {
    type: 'select',
    name: 'country',
    label: 'Country',
    required: true,
    validation: { required: true },
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
    ],
  },
];

function RegistrationForm() {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      await api.createUser(values);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Form
      fields={registrationFields}
      onSubmit={handleSubmit}
      config={{
        title: 'Create Account',
        description: 'Join our platform today',
        layout: 'grid',
        gridColumns: 2,
        submitButtonText: 'Create Account',
        showResetButton: true,
      }}
    />
  );
}
```

### Contact Form

```tsx
const contactFields: FormFieldConfig[] = [
  {
    type: 'input',
    name: 'name',
    label: 'Full Name',
    required: true,
    validation: { required: true },
    inputConfig: { type: 'text' },
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email',
    required: true,
    validation: { required: true, email: true },
    inputConfig: { type: 'email' },
  },
  {
    type: 'input',
    name: 'subject',
    label: 'Subject',
    required: true,
    validation: { required: true },
    inputConfig: { type: 'text' },
  },
  {
    type: 'input',
    name: 'message',
    label: 'Message',
    required: true,
    validation: { required: true, minLength: 10 },
    inputConfig: { type: 'text' },
  },
];

function ContactForm() {
  const handleSubmit = async (values: Record<string, any>) => {
    await api.sendContactMessage(values);
    alert('Message sent successfully!');
  };

  return (
    <Form
      fields={contactFields}
      onSubmit={handleSubmit}
      config={{
        title: 'Contact Us',
        description: 'We would love to hear from you',
        submitButtonText: 'Send Message',
      }}
    />
  );
}
```

## Testing

The Form component includes comprehensive tests covering:

- Rendering and layout
- Form state management
- Validation
- Form submission
- Form reset
- Field interactions
- Accessibility

Run tests with:

```bash
npm test Form.test.tsx
```

## Accessibility

The Form component is built with accessibility in mind:

- Proper form structure with semantic HTML
- ARIA attributes for form validation
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Error announcements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to the Form component:

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test across different browsers

## License

This component is part of the component library and follows the same license terms.

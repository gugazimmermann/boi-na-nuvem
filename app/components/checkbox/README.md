# Checkbox Component

A reusable checkbox component with support for single and multiple selection.

## Features

- **Single Checkbox**: Individual checkbox with label and validation
- **Checkbox Group**: Multiple checkboxes for array selection
- **Accessibility**: Full ARIA support and keyboard navigation
- **Validation**: Error states and helper text
- **Customizable**: Multiple variants and sizes
- **TypeScript**: Fully typed with comprehensive interfaces

## Installation

```tsx
import { Checkbox, CheckboxGroup } from './components/checkbox';
```

## Basic Usage

### Single Checkbox

```tsx
import React, { useState } from 'react';
import { Checkbox } from './components/checkbox';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Accept terms and conditions"
      config={{ checked }}
      onChange={setChecked}
      helperText="Please read and accept our terms"
    />
  );
}
```

### Checkbox Group

```tsx
import React, { useState } from 'react';
import { CheckboxGroup } from './components/checkbox';

function MyComponent() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <CheckboxGroup
      label="Select your preferences"
      options={options}
      value={selectedValues}
      onChange={setSelectedValues}
      config={{ direction: 'vertical' }}
      helperText="Choose one or more options"
    />
  );
}
```

## Props

### Checkbox Props

| Property     | Type                    | Default | Description                    |
| ------------ | ----------------------- | ------- | ------------------------------ |
| `label`      | `string`                | -       | Checkbox label                 |
| `config`     | `CheckboxConfig`        | `{}`    | Checkbox configuration         |
| `error`      | `string`                | -       | Error message                  |
| `helperText` | `string`                | -       | Helper text below checkbox     |
| `onChange`   | `(checked: boolean)`    | -       | Change handler                 |
| `onBlur`     | `() => void`            | -       | Blur handler                   |
| `onFocus`    | `() => void`            | -       | Focus handler                  |
| `className`  | `string`                | `''`    | Additional CSS classes         |
| `data-testid`| `string`                | -       | Test identifier                |

### CheckboxConfig

| Property      | Type                    | Default   | Description                    |
| ------------- | ----------------------- | --------- | ------------------------------ |
| `variant`     | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual variant                |
| `size`        | `'sm' \| 'md' \| 'lg'`  | `'md'`    | Checkbox size                  |
| `disabled`    | `boolean`               | `false`   | Whether checkbox is disabled   |
| `required`    | `boolean`               | `false`   | Whether checkbox is required   |
| `readonly`    | `boolean`               | `false`   | Whether checkbox is readonly   |
| `checked`     | `boolean`               | `false`   | Whether checkbox is checked    |
| `indeterminate`| `boolean`               | `false`   | Whether checkbox is indeterminate |
| `autoFocus`   | `boolean`               | `false`   | Whether to auto-focus          |

### CheckboxGroup Props

| Property     | Type                    | Default | Description                    |
| ------------ | ----------------------- | ------- | ------------------------------ |
| `label`      | `string`                | -       | Group label                    |
| `options`    | `Array<{value: string, label: string, disabled?: boolean}>` | - | Checkbox options |
| `value`      | `string[]`              | `[]`    | Selected values                |
| `config`     | `CheckboxGroupConfig`   | `{}`    | Group configuration            |
| `error`      | `string`                | -       | Error message                  |
| `helperText` | `string`                | -       | Helper text below group        |
| `onChange`   | `(values: string[])`    | -       | Change handler                 |
| `onBlur`     | `() => void`            | -       | Blur handler                   |
| `onFocus`    | `() => void`            | -       | Focus handler                  |
| `className`  | `string`                | `''`    | Additional CSS classes         |
| `data-testid`| `string`                | -       | Test identifier                |

### CheckboxGroupConfig

| Property    | Type                    | Default     | Description                    |
| ----------- | ----------------------- | ----------- | ------------------------------ |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction              |
| `spacing`   | `'sm' \| 'md' \| 'lg'`  | `'md'`      | Spacing between checkboxes     |

## Styling

The component uses CSS modules for styling. You can customize the appearance by overriding the CSS classes:

- `.container` - Main container
- `.checkbox` - Checkbox element
- `.label` - Label element
- `.error` - Error message
- `.helper` - Helper text

## Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management
- Error announcements
- Required field indicators

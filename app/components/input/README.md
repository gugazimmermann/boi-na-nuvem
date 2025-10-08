# Input Component

A reusable React input component that follows the same pattern as the alert, tab, tooltip, and button components, providing consistent styling and behavior across the application.

## Features

- **Multiple Variants**: Default, Success, Warning, Error, and Info styles
- **Multiple Sizes**: Small, Medium, and Large
- **Multiple Types**: Text, Email, Password, Number, Tel, URL, Search, Date, Time, and more
- **Icons Support**: Built-in icon library with customizable icons and positioning
- **Password Toggle**: Built-in password visibility toggle functionality
- **Validation**: Built-in error and helper text support
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with proper type definitions
- **Customizable**: Support for custom CSS classes and styling
- **Advanced Features**: Disabled states, readonly states, and form integration

## Usage

### Basic Usage

```tsx
import { Input } from '~/components/input';

function MyComponent() {
  return (
    <Input
      label="Username"
      config={{
        type: 'text',
        placeholder: 'Enter your username',
      }}
    />
  );
}
```

### With Different Variants

```tsx
import { Input } from '~/components/input';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Input label="Default Input" config={{ variant: 'default' }} />

      <Input
        label="Success Input"
        config={{ variant: 'success' }}
        helperText="This input is valid"
      />

      <Input label="Error Input" config={{ variant: 'error' }} error="This field is required" />

      <Input
        label="Warning Input"
        config={{ variant: 'warning' }}
        helperText="Please review this input"
      />

      <Input label="Info Input" config={{ variant: 'info' }} helperText="Additional information" />
    </div>
  );
}
```

### With Icons

```tsx
import { Input, Icons } from '~/components/input';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Input label="Username" config={{ type: 'text' }} icon={Icons.user} iconPosition="left" />

      <Input label="Email" config={{ type: 'email' }} icon={Icons.email} iconPosition="left" />

      <Input label="Search" config={{ type: 'search' }} icon={Icons.search} iconPosition="right" />
    </div>
  );
}
```

### Password Input with Toggle

```tsx
import { Input, Icons } from '~/components/input';

function MyComponent() {
  return (
    <Input
      label="Password"
      config={{
        type: 'password',
        placeholder: 'Enter your password',
      }}
      icon={Icons.lock}
      iconPosition="left"
      helperText="Password must be at least 6 characters"
    />
  );
}
```

### Form Integration

```tsx
import { Input, Icons } from '@/components/input';
import { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <form className="space-y-4">
      <Input
        label="Username"
        config={{
          type: 'text',
          required: true,
          autoComplete: 'username',
        }}
        icon={Icons.user}
        iconPosition="left"
        value={formData.username}
        onChange={handleInputChange('username')}
        error={errors.username}
      />

      <Input
        label="Email"
        config={{
          type: 'email',
          required: true,
          autoComplete: 'email',
        }}
        icon={Icons.email}
        iconPosition="left"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={errors.email}
      />

      <Input
        label="Password"
        config={{
          type: 'password',
          required: true,
          autoComplete: 'new-password',
        }}
        icon={Icons.lock}
        iconPosition="left"
        value={formData.password}
        onChange={handleInputChange('password')}
        error={errors.password}
        helperText="Password must be at least 6 characters"
      />
    </form>
  );
}
```

## Props

### InputProps

| Prop           | Type                                                   | Required | Description                            |
| -------------- | ------------------------------------------------------ | -------- | -------------------------------------- |
| `label`        | `string`                                               | No       | Input label text                       |
| `config`       | `InputConfig`                                          | No       | Input configuration object             |
| `error`        | `string`                                               | No       | Error message to display               |
| `helperText`   | `string`                                               | No       | Helper text to display                 |
| `icon`         | `React.ReactNode`                                      | No       | Icon to display                        |
| `iconPosition` | `'left' \| 'right'`                                    | No       | Position of the icon (default: 'left') |
| `onChange`     | `(event: React.ChangeEvent<HTMLInputElement>) => void` | No       | Change handler function                |
| `onBlur`       | `(event: React.FocusEvent<HTMLInputElement>) => void`  | No       | Blur handler function                  |
| `onFocus`      | `(event: React.FocusEvent<HTMLInputElement>) => void`  | No       | Focus handler function                 |
| `className`    | `string`                                               | No       | Additional CSS classes                 |
| `data-testid`  | `string`                                               | No       | Test identifier for testing            |

### InputConfig

| Prop           | Type               | Required | Description                                    |
| -------------- | ------------------ | -------- | ---------------------------------------------- |
| `type`         | `InputType`        | No       | Input type (default: 'text')                   |
| `variant`      | `InputVariant`     | No       | Input variant style (default: 'default')       |
| `size`         | `InputSize`        | No       | Input size (default: 'md')                     |
| `disabled`     | `boolean`          | No       | Whether the input is disabled (default: false) |
| `required`     | `boolean`          | No       | Whether the input is required (default: false) |
| `readonly`     | `boolean`          | No       | Whether the input is readonly (default: false) |
| `placeholder`  | `string`           | No       | Placeholder text                               |
| `value`        | `string`           | No       | Controlled input value                         |
| `defaultValue` | `string`           | No       | Uncontrolled input default value               |
| `maxLength`    | `number`           | No       | Maximum character length                       |
| `minLength`    | `number`           | No       | Minimum character length                       |
| `min`          | `number \| string` | No       | Minimum value (for number inputs)              |
| `max`          | `number \| string` | No       | Maximum value (for number inputs)              |
| `step`         | `number \| string` | No       | Step value (for number inputs)                 |
| `pattern`      | `string`           | No       | Pattern for validation                         |
| `autoComplete` | `string`           | No       | Autocomplete attribute                         |
| `autoFocus`    | `boolean`          | No       | Whether to auto-focus (default: false)         |
| `className`    | `string`           | No       | Additional CSS classes for the input           |

## Input Variants

- **default**: Standard input with gray border
- **success**: Green theme for valid inputs
- **warning**: Yellow theme for warning states
- **error**: Red theme for error states
- **info**: Blue theme for informational inputs

## Input Sizes

- **sm**: Small (px-3 py-1.5 text-sm)
- **md**: Medium (px-4 py-2.5 text-base)
- **lg**: Large (px-5 py-3 text-lg)

## Input Types

- **text**: Standard text input
- **email**: Email input with validation
- **password**: Password input with toggle visibility
- **number**: Number input with min/max/step support
- **tel**: Telephone number input
- **url**: URL input with validation
- **search**: Search input
- **date**: Date picker input
- **time**: Time picker input
- **datetime-local**: Date and time picker input

## Available Icons

The component includes a set of predefined icons:

- `Icons.user` - User profile icon
- `Icons.email` - Email icon
- `Icons.lock` - Lock/security icon
- `Icons.phone` - Phone icon
- `Icons.search` - Search icon
- `Icons.calendar` - Calendar icon
- `Icons.clock` - Clock icon
- `Icons.globe` - Globe/world icon
- `Icons.creditCard` - Credit card icon
- `Icons.mapPin` - Location icon
- `Icons.building` - Building icon
- `Icons.eye` - Eye/visibility icon
- `Icons.eyeSlash` - Eye slash/hide icon
- `Icons.check` - Checkmark icon
- `Icons.exclamation` - Exclamation icon
- `Icons.information` - Information icon

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`. You can customize the appearance by:

1. Modifying the styles in `constants.ts`
2. Adding custom classes via the `className` prop
3. Overriding specific variant or size styles

## Accessibility

- Proper ARIA labels and attributes
- Screen reader friendly
- Focus management
- Semantic HTML structure
- Error and helper text associations
- Keyboard navigation support

## Examples

### Basic Form

```tsx
function BasicForm() {
  return (
    <form className="space-y-4">
      <Input
        label="Full Name"
        config={{
          type: 'text',
          required: true,
          placeholder: 'Enter your full name',
        }}
        icon={Icons.user}
        iconPosition="left"
      />

      <Input
        label="Email Address"
        config={{
          type: 'email',
          required: true,
          placeholder: 'Enter your email',
        }}
        icon={Icons.email}
        iconPosition="left"
      />

      <Input
        label="Phone Number"
        config={{
          type: 'tel',
          placeholder: 'Enter your phone number',
        }}
        icon={Icons.phone}
        iconPosition="left"
      />
    </form>
  );
}
```

### Validation Example

```tsx
function ValidationExample() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <Input
      label="Email"
      config={{
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
      }}
      icon={Icons.email}
      iconPosition="left"
      value={email}
      onChange={handleEmailChange}
      error={emailError}
    />
  );
}
```

### Different Input Types

```tsx
function InputTypesExample() {
  return (
    <div className="space-y-4">
      <Input label="Date" config={{ type: 'date' }} icon={Icons.calendar} iconPosition="left" />

      <Input label="Time" config={{ type: 'time' }} icon={Icons.clock} iconPosition="left" />

      <Input
        label="Website"
        config={{ type: 'url', placeholder: 'https://example.com' }}
        icon={Icons.globe}
        iconPosition="left"
      />

      <Input
        label="Age"
        config={{
          type: 'number',
          min: 0,
          max: 120,
          step: 1,
        }}
      />
    </div>
  );
}
```

### Disabled and Readonly States

```tsx
function StatesExample() {
  return (
    <div className="space-y-4">
      <Input
        label="Disabled Input"
        config={{
          type: 'text',
          disabled: true,
          placeholder: 'This input is disabled',
        }}
        helperText="This input is disabled"
      />

      <Input
        label="Readonly Input"
        config={{
          type: 'text',
          readonly: true,
        }}
        value="This value cannot be changed"
        helperText="This input is readonly"
      />
    </div>
  );
}
```

### Custom Styling

```tsx
function CustomStyledInput() {
  return (
    <Input
      label="Custom Styled Input"
      config={{
        type: 'text',
        placeholder: 'Custom styling',
      }}
      className="border-purple-300 focus:border-purple-500 focus:ring-purple-300"
      helperText="This input has custom purple styling"
    />
  );
}
```

## Testing

The component includes comprehensive tests covering:

- All variants, sizes, and types
- Icon positioning and rendering
- Password toggle functionality
- Error and helper text display
- Form integration
- Accessibility attributes
- Controlled and uncontrolled inputs
- Custom styling
- Edge cases

Run tests with:

```bash
npm test Input.test.tsx
```

## Migration from Static HTML

If you're migrating from the static HTML version, replace your hardcoded input structure with the Input component:

**Before:**

```html
<div>
  <label for="username" class="block text-sm text-gray-500 dark:text-gray-300">Username</label>
  <input
    type="text"
    placeholder="John Doe"
    class="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
  />
  <p class="mt-3 text-xs text-red-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</div>
```

**After:**

```tsx
<Input
  label="Username"
  config={{
    type: 'text',
    placeholder: 'John Doe',
    variant: 'error',
  }}
  error="Lorem ipsum dolor sit amet consectetur adipisicing elit."
/>
```

## Performance Considerations

- Icons are rendered efficiently with proper cloning
- State management is optimized to prevent unnecessary re-renders
- Event handlers are properly memoized
- Controlled and uncontrolled inputs are handled efficiently
- Custom styling is applied efficiently through CSS classes

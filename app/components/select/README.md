# Select Component

A reusable React select component that follows the same pattern as the input, alert, tab, tooltip, and button components, providing consistent styling and behavior across the application.

## Features

- **Multiple Variants**: Default, Success, Warning, Error, and Info styles
- **Multiple Sizes**: Small, Medium, and Large
- **Icons Support**: Built-in icon library with customizable icons and positioning
- **Grouped Options**: Support for option groups with optgroups
- **Multiple Selection**: Support for multiple option selection
- **Validation**: Built-in error and helper text support
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with proper type definitions
- **Customizable**: Support for custom CSS classes and styling
- **Advanced Features**: Disabled states, required states, and form integration

## Usage

### Basic Usage

```tsx
import { Select } from '~/components/select';

function MyComponent() {
  const options = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  return (
    <Select
      label="Country"
      options={options}
      config={{
        placeholder: 'Select a country',
      }}
    />
  );
}
```

### With Different Variants

```tsx
import { Select } from '~/components/select';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Select label="Default Select" options={options} config={{ variant: 'default' }} />

      <Select
        label="Success Select"
        options={options}
        config={{ variant: 'success' }}
        helperText="This selection is valid"
      />

      <Select
        label="Error Select"
        options={options}
        config={{ variant: 'error' }}
        error="This field is required"
      />

      <Select
        label="Warning Select"
        options={options}
        config={{ variant: 'warning' }}
        helperText="Please review this selection"
      />

      <Select
        label="Info Select"
        options={options}
        config={{ variant: 'info' }}
        helperText="Additional information"
      />
    </div>
  );
}
```

### With Icons

```tsx
import { Select, Icons } from '~/components/select';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Select label="Country" options={countries} icon={Icons.globe} iconPosition="left" />

      <Select label="City" options={cities} icon={Icons.mapPin} iconPosition="left" />

      <Select label="Priority" options={priorities} icon={Icons.star} iconPosition="right" />
    </div>
  );
}
```

### Grouped Options

```tsx
import { Select } from '~/components/select';

function MyComponent() {
  const groupedOptions = [
    { value: 'ny', label: 'New York', group: 'United States' },
    { value: 'la', label: 'Los Angeles', group: 'United States' },
    { value: 'toronto', label: 'Toronto', group: 'Canada' },
    { value: 'vancouver', label: 'Vancouver', group: 'Canada' },
  ];

  return (
    <Select
      label="City"
      options={groupedOptions}
      config={{ placeholder: 'Select a city' }}
      helperText="Cities are grouped by country"
    />
  );
}
```

### Multiple Selection

```tsx
import { Select } from '@/components/select';

function MyComponent() {
  const skills = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
  ];

  return (
    <Select
      label="Skills"
      options={skills}
      config={{
        multiple: true,
        placeholder: 'Select your skills',
      }}
      helperText="Hold Ctrl/Cmd to select multiple options"
    />
  );
}
```

### Form Integration

```tsx
import { Select, Icons } from '@/components/select';
import { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    country: '',
    language: '',
    skills: [],
  });

  const [errors, setErrors] = useState({});

  const handleSelectChange = (field: string) => (value: any, option: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user makes selection
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <form className="space-y-4">
      <Select
        label="Country"
        options={countries}
        config={{
          placeholder: 'Select your country',
          required: true,
        }}
        icon={Icons.globe}
        iconPosition="left"
        value={formData.country}
        onChange={handleSelectChange('country')}
        error={errors.country}
      />

      <Select
        label="Language"
        options={languages}
        config={{
          placeholder: 'Select your language',
          required: true,
        }}
        icon={Icons.user}
        iconPosition="left"
        value={formData.language}
        onChange={handleSelectChange('language')}
        error={errors.language}
      />

      <Select
        label="Skills"
        options={skills}
        config={{
          multiple: true,
          placeholder: 'Select your skills',
        }}
        value={formData.skills}
        onChange={handleSelectChange('skills')}
        error={errors.skills}
        helperText="Hold Ctrl/Cmd to select multiple options"
      />
    </form>
  );
}
```

## Props

### SelectProps

| Prop           | Type                                                                                                | Required | Description                            |
| -------------- | --------------------------------------------------------------------------------------------------- | -------- | -------------------------------------- |
| `label`        | `string`                                                                                            | No       | Select label text                      |
| `options`      | `SelectOption[]`                                                                                    | Yes      | Array of select options                |
| `config`       | `SelectConfig`                                                                                      | No       | Select configuration object            |
| `error`        | `string`                                                                                            | No       | Error message to display               |
| `helperText`   | `string`                                                                                            | No       | Helper text to display                 |
| `icon`         | `React.ReactNode`                                                                                   | No       | Icon to display                        |
| `iconPosition` | `'left' \| 'right'`                                                                                 | No       | Position of the icon (default: 'left') |
| `onChange`     | `(value: SelectOptionValue \| SelectOptionValue[], option: SelectOption \| SelectOption[]) => void` | No       | Change handler function                |
| `onBlur`       | `(event: React.FocusEvent<HTMLSelectElement>) => void`                                              | No       | Blur handler function                  |
| `onFocus`      | `(event: React.FocusEvent<HTMLSelectElement>) => void`                                              | No       | Focus handler function                 |
| `className`    | `string`                                                                                            | No       | Additional CSS classes                 |
| `data-testid`  | `string`                                                                                            | No       | Test identifier for testing            |

### SelectConfig

| Prop           | Type                                       | Required | Description                                               |
| -------------- | ------------------------------------------ | -------- | --------------------------------------------------------- |
| `variant`      | `SelectVariant`                            | No       | Select variant style (default: 'default')                 |
| `size`         | `SelectSize`                               | No       | Select size (default: 'md')                               |
| `disabled`     | `boolean`                                  | No       | Whether the select is disabled (default: false)           |
| `required`     | `boolean`                                  | No       | Whether the select is required (default: false)           |
| `multiple`     | `boolean`                                  | No       | Whether multiple options can be selected (default: false) |
| `placeholder`  | `string`                                   | No       | Placeholder text                                          |
| `value`        | `SelectOptionValue \| SelectOptionValue[]` | No       | Controlled select value                                   |
| `defaultValue` | `SelectOptionValue \| SelectOptionValue[]` | No       | Uncontrolled select default value                         |
| `autoFocus`    | `boolean`                                  | No       | Whether to auto-focus (default: false)                    |
| `className`    | `string`                                   | No       | Additional CSS classes for the select                     |

### SelectOption

| Prop       | Type                | Required | Description                               |
| ---------- | ------------------- | -------- | ----------------------------------------- |
| `value`    | `SelectOptionValue` | Yes      | Option value (string, number, or boolean) |
| `label`    | `string`            | Yes      | Option display text                       |
| `disabled` | `boolean`           | No       | Whether the option is disabled            |
| `group`    | `string`            | No       | Option group name for grouping            |

## Select Variants

- **default**: Standard select with gray border
- **success**: Green theme for valid selections
- **warning**: Yellow theme for warning states
- **error**: Red theme for error states
- **info**: Blue theme for informational selects

## Select Sizes

- **sm**: Small (px-3 py-1.5 text-sm)
- **md**: Medium (px-4 py-2.5 text-base)
- **lg**: Large (px-5 py-3 text-lg)

## Available Icons

The component includes a set of predefined icons:

- `Icons.chevronDown` - Dropdown arrow (default)
- `Icons.chevronUp` - Up arrow
- `Icons.user` - User profile icon
- `Icons.building` - Building icon
- `Icons.globe` - Globe/world icon
- `Icons.mapPin` - Location icon
- `Icons.calendar` - Calendar icon
- `Icons.tag` - Tag icon
- `Icons.star` - Star icon
- `Icons.heart` - Heart icon
- `Icons.check` - Checkmark icon
- `Icons.x` - X/close icon
- `Icons.plus` - Plus icon
- `Icons.minus` - Minus icon
- `Icons.search` - Search icon
- `Icons.filter` - Filter icon

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
      <Select
        label="Country"
        options={countries}
        config={{
          placeholder: 'Select your country',
          required: true,
        }}
        icon={Icons.globe}
        iconPosition="left"
      />

      <Select
        label="Language"
        options={languages}
        config={{
          placeholder: 'Select your language',
        }}
        icon={Icons.user}
        iconPosition="left"
      />

      <Select
        label="Priority"
        options={priorities}
        config={{
          placeholder: 'Select priority',
        }}
        icon={Icons.star}
        iconPosition="right"
      />
    </form>
  );
}
```

### Validation Example

```tsx
function ValidationExample() {
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');

  const validateCountry = (value: string) => {
    if (!value) {
      setCountryError('Country is required');
    } else {
      setCountryError('');
    }
  };

  const handleCountryChange = (value: string, option: SelectOption) => {
    setCountry(value);
    validateCountry(value);
  };

  return (
    <Select
      label="Country"
      options={countries}
      config={{
        placeholder: 'Select your country',
        required: true,
      }}
      icon={Icons.globe}
      iconPosition="left"
      value={country}
      onChange={handleCountryChange}
      error={countryError}
    />
  );
}
```

### Multiple Selection

```tsx
function MultipleSelectionExample() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillsChange = (value: string[], options: SelectOption[]) => {
    setSelectedSkills(value);
    console.log(
      'Selected skills:',
      options.map((opt) => opt.label),
    );
  };

  return (
    <Select
      label="Skills"
      options={skills}
      config={{
        multiple: true,
        placeholder: 'Select your skills',
      }}
      value={selectedSkills}
      onChange={handleSkillsChange}
      helperText="Hold Ctrl/Cmd to select multiple options"
    />
  );
}
```

### Grouped Options

```tsx
function GroupedOptionsExample() {
  const groupedCities = [
    { value: 'ny', label: 'New York', group: 'United States' },
    { value: 'la', label: 'Los Angeles', group: 'United States' },
    { value: 'toronto', label: 'Toronto', group: 'Canada' },
    { value: 'vancouver', label: 'Vancouver', group: 'Canada' },
    { value: 'london', label: 'London', group: 'United Kingdom' },
    { value: 'manchester', label: 'Manchester', group: 'United Kingdom' },
  ];

  return (
    <Select
      label="City"
      options={groupedCities}
      config={{ placeholder: 'Select a city' }}
      icon={Icons.mapPin}
      iconPosition="left"
      helperText="Cities are grouped by country"
    />
  );
}
```

### Disabled and Required States

```tsx
function StatesExample() {
  return (
    <div className="space-y-4">
      <Select
        label="Disabled Select"
        options={countries}
        config={{
          disabled: true,
          placeholder: 'This select is disabled',
        }}
        helperText="This select is disabled"
      />

      <Select
        label="Required Select"
        options={languages}
        config={{
          required: true,
          placeholder: 'This field is required',
        }}
        helperText="This field is required"
      />
    </div>
  );
}
```

### Custom Styling

```tsx
function CustomStyledSelect() {
  return (
    <Select
      label="Custom Styled Select"
      options={priorities}
      config={{ placeholder: 'Custom styling' }}
      className="border-purple-300 focus:border-purple-500 focus:ring-purple-300"
      helperText="This select has custom purple styling"
    />
  );
}
```

## Testing

The component includes comprehensive tests covering:

- All variants, sizes, and configurations
- Icon positioning and rendering
- Option rendering and grouping
- Multiple selection functionality
- Error and helper text display
- Form integration
- Accessibility attributes
- Controlled and uncontrolled selects
- Custom styling
- Edge cases

Run tests with:

```bash
npm test Select.test.tsx
```

## Migration from Static HTML

If you're migrating from static HTML select elements, replace your hardcoded select structure with the Select component:

**Before:**

```html
<div>
  <label for="country" class="block text-sm text-gray-500 dark:text-gray-300">Country</label>
  <select
    id="country"
    class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
  >
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </select>
</div>
```

**After:**

```tsx
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ]}
  config={{ placeholder: 'Select a country' }}
/>
```

## Performance Considerations

- Options are rendered efficiently with proper grouping
- State management is optimized to prevent unnecessary re-renders
- Event handlers are properly memoized
- Controlled and uncontrolled selects are handled efficiently
- Custom styling is applied efficiently through CSS classes
- Large option lists are handled efficiently with native select elements

# Button Component

A reusable React button component that follows the same pattern as the alert, tab, and tooltip components, providing consistent styling and behavior across the application.

## Features

- **Multiple Variants**: Primary, Secondary, Success, Warning, Error, Info, Ghost, and Outline styles
- **Multiple Sizes**: Extra Small, Small, Medium, Large, and Extra Large
- **Icons Support**: Built-in icon library with customizable icons and positioning
- **Loading States**: Built-in loading spinner with proper state management
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with proper type definitions
- **Customizable**: Support for custom CSS classes and styling
- **Advanced Features**: Full width, disabled states, and form integration

## Usage

### Basic Usage

```tsx
import { Button } from '~/components/button';

function MyComponent() {
  return <Button config={{ variant: 'primary' }}>Click me</Button>;
}
```

### With Different Variants

```tsx
import { Button } from '~/components/button';

function MyComponent() {
  return (
    <div className="space-x-4">
      <Button config={{ variant: 'primary' }}>Primary</Button>
      <Button config={{ variant: 'secondary' }}>Secondary</Button>
      <Button config={{ variant: 'success' }}>Success</Button>
      <Button config={{ variant: 'warning' }}>Warning</Button>
      <Button config={{ variant: 'error' }}>Error</Button>
      <Button config={{ variant: 'info' }}>Info</Button>
      <Button config={{ variant: 'ghost' }}>Ghost</Button>
      <Button config={{ variant: 'outline' }}>Outline</Button>
    </div>
  );
}
```

### With Different Sizes

```tsx
import { Button } from '@/components/button';

function MyComponent() {
  return (
    <div className="space-x-4">
      <Button config={{ size: 'xs' }}>Extra Small</Button>
      <Button config={{ size: 'sm' }}>Small</Button>
      <Button config={{ size: 'md' }}>Medium</Button>
      <Button config={{ size: 'lg' }}>Large</Button>
      <Button config={{ size: 'xl' }}>Extra Large</Button>
    </div>
  );
}
```

### With Icons

```tsx
import { Button, Icons } from '~/components/button';

function MyComponent() {
  return (
    <div className="space-x-4">
      <Button config={{ icon: Icons.save, iconPosition: 'left' }}>Save</Button>

      <Button config={{ icon: Icons.download, iconPosition: 'right' }}>Download</Button>

      <Button config={{ icon: Icons.settings }}>
        <span className="sr-only">Settings</span>
      </Button>
    </div>
  );
}
```

### With Loading States

```tsx
import { Button, Icons } from '~/components/button';
import { useState } from 'react';

function MyComponent() {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      config={{
        loading: loading,
        icon: Icons.save,
        variant: 'success',
      }}
      onClick={handleSave}
    >
      Save Changes
    </Button>
  );
}
```

### With Form Integration

```tsx
import { Button } from '~/components/button';

function MyForm() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <Button config={{ type: 'submit', variant: 'success' }}>Submit</Button>
      <Button config={{ type: 'reset', variant: 'secondary' }}>Reset</Button>
    </form>
  );
}
```

## Props

### ButtonProps

| Prop          | Type                                                   | Required | Description                       |
| ------------- | ------------------------------------------------------ | -------- | --------------------------------- |
| `children`    | `React.ReactNode`                                      | Yes      | Button content (text or elements) |
| `config`      | `ButtonConfig`                                         | No       | Button configuration object       |
| `onClick`     | `(event: React.MouseEvent<HTMLButtonElement>) => void` | No       | Click handler function            |
| `className`   | `string`                                               | No       | Additional CSS classes            |
| `data-testid` | `string`                                               | No       | Test identifier for testing       |

### ButtonConfig

| Prop           | Type                | Required | Description                                             |
| -------------- | ------------------- | -------- | ------------------------------------------------------- |
| `variant`      | `ButtonVariant`     | No       | Button variant style (default: 'primary')               |
| `size`         | `ButtonSize`        | No       | Button size (default: 'md')                             |
| `type`         | `ButtonType`        | No       | Button type (default: 'button')                         |
| `disabled`     | `boolean`           | No       | Whether the button is disabled (default: false)         |
| `loading`      | `boolean`           | No       | Whether the button is in loading state (default: false) |
| `fullWidth`    | `boolean`           | No       | Whether the button takes full width (default: false)    |
| `icon`         | `React.ReactNode`   | No       | Icon to display                                         |
| `iconPosition` | `'left' \| 'right'` | No       | Position of the icon (default: 'left')                  |
| `className`    | `string`            | No       | Additional CSS classes for the button                   |

## Button Variants

- **primary**: Blue theme for primary actions
- **secondary**: Gray theme for secondary actions
- **success**: Green theme for success actions
- **warning**: Yellow theme for warning actions
- **error**: Red theme for destructive actions
- **info**: Cyan theme for informational actions
- **ghost**: Transparent background with hover effects
- **outline**: Outlined style with transparent background

## Button Sizes

- **xs**: Extra small (px-2 py-1 text-xs)
- **sm**: Small (px-3 py-1.5 text-sm)
- **md**: Medium (px-4 py-2 text-base)
- **lg**: Large (px-6 py-3 text-lg)
- **xl**: Extra large (px-8 py-4 text-xl)

## Available Icons

The component includes a set of predefined icons:

- `Icons.refresh` - Refresh/reload icon
- `Icons.save` - Save icon
- `Icons.edit` - Edit icon
- `Icons.delete` - Delete icon
- `Icons.add` - Add/plus icon
- `Icons.search` - Search icon
- `Icons.download` - Download icon
- `Icons.upload` - Upload icon
- `Icons.close` - Close/X icon
- `Icons.check` - Checkmark icon
- `Icons.arrowLeft` - Left arrow icon
- `Icons.arrowRight` - Right arrow icon
- `Icons.settings` - Settings gear icon
- `Icons.user` - User profile icon
- `Icons.home` - Home icon
- `Icons.loading` - Loading spinner icon

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`. You can customize the appearance by:

1. Modifying the styles in `constants.ts`
2. Adding custom classes via the `className` prop
3. Overriding specific variant or size styles

## Accessibility

- Proper ARIA labels and attributes
- Keyboard navigation support (Enter and Space keys)
- Screen reader friendly
- Focus management
- Semantic HTML structure
- Disabled state handling

## Examples

### Action Buttons

```tsx
function ActionButtons() {
  return (
    <div className="flex space-x-2">
      <Button config={{ icon: Icons.edit, variant: 'info' }}>Edit</Button>
      <Button config={{ icon: Icons.save, variant: 'success' }}>Save</Button>
      <Button config={{ icon: Icons.delete, variant: 'error' }}>Delete</Button>
    </div>
  );
}
```

### Navigation Buttons

```tsx
function NavigationButtons() {
  return (
    <div className="flex space-x-2">
      <Button config={{ icon: Icons.arrowLeft, variant: 'outline' }}>Previous</Button>
      <Button config={{ icon: Icons.arrowRight, variant: 'primary' }}>Next</Button>
    </div>
  );
}
```

### Form Buttons

```tsx
function FormButtons() {
  return (
    <div className="flex space-x-2">
      <Button config={{ type: 'submit', variant: 'success', fullWidth: true }}>Submit Form</Button>
      <Button config={{ type: 'reset', variant: 'secondary' }}>Reset</Button>
    </div>
  );
}
```

### Loading Button

```tsx
function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    try {
      await performAsyncAction();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      config={{
        loading: loading,
        icon: Icons.save,
        variant: 'primary',
      }}
      onClick={handleAsyncAction}
    >
      {loading ? 'Saving...' : 'Save'}
    </Button>
  );
}
```

### Icon Only Buttons

```tsx
function IconOnlyButtons() {
  return (
    <div className="flex space-x-2">
      <Button config={{ icon: Icons.settings, variant: 'ghost' }}>
        <span className="sr-only">Settings</span>
      </Button>
      <Button config={{ icon: Icons.user, variant: 'ghost' }}>
        <span className="sr-only">User Profile</span>
      </Button>
      <Button config={{ icon: Icons.close, variant: 'ghost' }}>
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
}
```

### Custom Styled Buttons

```tsx
function CustomStyledButtons() {
  return (
    <div className="space-x-2">
      <Button
        config={{ variant: 'primary' }}
        className="shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Custom Styled
      </Button>

      <Button
        config={{ variant: 'outline' }}
        className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
      >
        Custom Colors
      </Button>
    </div>
  );
}
```

## Testing

The component includes comprehensive tests covering:

- All variants and sizes
- Icon positioning and rendering
- Loading states
- Disabled states
- Click and keyboard interactions
- Form integration
- Accessibility attributes
- Custom styling
- Edge cases

Run tests with:

```bash
npm test Button.test.tsx
```

## Migration from Static HTML

If you're migrating from the static HTML version, replace your hardcoded button structure with the Button component:

**Before:**

```html
<button
  class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
>
  <svg
    class="w-5 h-5 mx-1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
      clip-rule="evenodd"
    />
  </svg>
  <span class="mx-1">Refresh</span>
</button>
```

**After:**

```tsx
<Button
  config={{
    icon: Icons.refresh,
    iconPosition: 'left',
    variant: 'primary',
  }}
  onClick={handleRefresh}
>
  Refresh
</Button>
```

## Performance Considerations

- Icons are rendered efficiently with proper cloning
- Loading states are optimized to prevent unnecessary re-renders
- Event handlers are properly memoized
- Disabled states prevent unnecessary event processing
- Custom styling is applied efficiently through CSS classes

# Alert Component

A reusable React alert component that follows the same pattern as the table component, providing consistent styling and behavior across the application.

## Features

- **Multiple Alert Types**: Success, Error, Warning, and Info
- **Dismissible**: Optional dismiss functionality with callback
- **Customizable**: Support for custom CSS classes
- **Accessible**: Proper ARIA labels and semantic HTML
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with proper type definitions

## Usage

### Basic Usage

```tsx
import { Alert } from '~/components/alert';

function MyComponent() {
  const alertConfig = {
    type: 'success' as const,
    title: 'Success',
    message: 'Your account was registered!',
  };

  return <Alert config={alertConfig} />;
}
```

### Dismissible Alert

```tsx
import { Alert } from '~/components/alert';

function MyComponent() {
  const [showAlert, setShowAlert] = useState(true);

  const alertConfig = {
    type: 'error' as const,
    title: 'Error',
    message: 'Something went wrong!',
    dismissible: true,
    onDismiss: () => setShowAlert(false),
  };

  return showAlert ? <Alert config={alertConfig} /> : null;
}
```

### With Custom Styling

```tsx
import { Alert } from '~/components/alert';

function MyComponent() {
  const alertConfig = {
    type: 'warning' as const,
    title: 'Warning',
    message: 'Please review your information.',
    dismissible: true,
    onDismiss: () => console.log('Alert dismissed'),
  };

  return <Alert config={alertConfig} className="max-w-md mx-auto" />;
}
```

## Alert Types

- **success**: Green theme for positive feedback
- **error**: Red theme for error messages
- **warning**: Yellow theme for warnings
- **info**: Blue theme for informational messages

## Props

### AlertProps

| Prop        | Type          | Required | Description                |
| ----------- | ------------- | -------- | -------------------------- |
| `config`    | `AlertConfig` | Yes      | Alert configuration object |
| `className` | `string`      | No       | Additional CSS classes     |

### AlertConfig

| Prop          | Type         | Required | Description                                |
| ------------- | ------------ | -------- | ------------------------------------------ |
| `type`        | `AlertType`  | Yes      | Alert type (success, error, warning, info) |
| `title`       | `string`     | Yes      | Alert title                                |
| `message`     | `string`     | Yes      | Alert message                              |
| `dismissible` | `boolean`    | No       | Whether the alert can be dismissed         |
| `onDismiss`   | `() => void` | No       | Callback when alert is dismissed           |
| `className`   | `string`     | No       | Additional CSS classes for the alert       |

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`. You can customize the appearance by:

1. Modifying the styles in `constants.ts`
2. Adding custom classes via the `className` prop
3. Overriding specific alert type styles

## Accessibility

- Proper ARIA labels for dismiss buttons
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## Examples

### Success Alert

```tsx
<Alert
  config={{
    type: 'success',
    title: 'Success',
    message: 'Operation completed successfully!',
  }}
/>
```

### Error Alert with Dismiss

```tsx
<Alert
  config={{
    type: 'error',
    title: 'Error',
    message: 'Failed to save changes.',
    dismissible: true,
    onDismiss: handleDismiss,
  }}
/>
```

### Warning Alert

```tsx
<Alert
  config={{
    type: 'warning',
    title: 'Warning',
    message: 'This action cannot be undone.',
  }}
/>
```

### Info Alert

```tsx
<Alert
  config={{
    type: 'info',
    title: 'Information',
    message: 'New features are available in the latest update.',
  }}
/>
```

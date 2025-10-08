# Tooltip Component

A reusable React tooltip component that follows the same pattern as the alert and tab components, providing consistent styling and behavior across the application.

## Features

- **Multiple Triggers**: Hover, Click, Focus, and Manual triggers
- **Multiple Positions**: Top, Bottom, Left, and Right positioning
- **Multiple Variants**: Default, Dark, Light, Info, Success, Warning, and Error styles
- **Icons Support**: Built-in icon library with customizable icons
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with proper type definitions
- **Customizable**: Support for custom CSS classes, delays, and max width
- **Advanced Features**: Click outside to close, escape key support, and timeout management

## Usage

### Basic Usage

```tsx
import { Tooltip } from '@/components/tooltip';

function MyComponent() {
  return (
    <Tooltip config={{ content: 'This is a tooltip' }}>
      <button>Hover me</button>
    </Tooltip>
  );
}
```

### With Different Triggers

```tsx
import { Tooltip } from '@/components/tooltip';

function MyComponent() {
  return (
    <div className="space-x-4">
      {/* Hover trigger (default) */}
      <Tooltip config={{ content: 'Hover to show' }}>
        <button>Hover me</button>
      </Tooltip>

      {/* Click trigger */}
      <Tooltip config={{ content: 'Click to toggle', trigger: 'click' }}>
        <button>Click me</button>
      </Tooltip>

      {/* Focus trigger */}
      <Tooltip config={{ content: 'Focus to show', trigger: 'focus' }}>
        <input type="text" placeholder="Focus me" />
      </Tooltip>
    </div>
  );
}
```

### With Different Positions

```tsx
import { Tooltip } from '@/components/tooltip';

function MyComponent() {
  return (
    <div className="space-x-4">
      <Tooltip config={{ content: 'Top tooltip', position: 'top' }}>
        <button>Top</button>
      </Tooltip>

      <Tooltip config={{ content: 'Bottom tooltip', position: 'bottom' }}>
        <button>Bottom</button>
      </Tooltip>

      <Tooltip config={{ content: 'Left tooltip', position: 'left' }}>
        <button>Left</button>
      </Tooltip>

      <Tooltip config={{ content: 'Right tooltip', position: 'right' }}>
        <button>Right</button>
      </Tooltip>
    </div>
  );
}
```

### With Different Variants

```tsx
import { Tooltip } from '@/components/tooltip';

function MyComponent() {
  return (
    <div className="space-x-4">
      <Tooltip config={{ content: 'Info tooltip', variant: 'info' }}>
        <button>Info</button>
      </Tooltip>

      <Tooltip config={{ content: 'Success tooltip', variant: 'success' }}>
        <button>Success</button>
      </Tooltip>

      <Tooltip config={{ content: 'Warning tooltip', variant: 'warning' }}>
        <button>Warning</button>
      </Tooltip>

      <Tooltip config={{ content: 'Error tooltip', variant: 'error' }}>
        <button>Error</button>
      </Tooltip>
    </div>
  );
}
```

### With Icons

```tsx
import { Tooltip, Icons } from '@/components/tooltip';

function MyComponent() {
  return (
    <div className="space-x-4">
      <Tooltip config={{ content: 'Information about this feature' }}>
        <button className="text-gray-600 hover:text-blue-500">{Icons.info}</button>
      </Tooltip>

      <Tooltip config={{ content: 'Get help with this feature' }}>
        <button className="text-gray-600 hover:text-green-500">{Icons.help}</button>
      </Tooltip>

      <Tooltip config={{ content: 'Settings and configuration' }}>
        <button className="text-gray-600 hover:text-purple-500">{Icons.settings}</button>
      </Tooltip>
    </div>
  );
}
```

### Advanced Features

```tsx
import { Tooltip } from '@/components/tooltip';

function MyComponent() {
  return (
    <div className="space-x-4">
      {/* With delay */}
      <Tooltip
        config={{
          content: 'This tooltip has a delay',
          delay: 500,
        }}
      >
        <button>Delayed</button>
      </Tooltip>

      {/* Without arrow */}
      <Tooltip
        config={{
          content: 'No arrow tooltip',
          showArrow: false,
        }}
      >
        <button>No Arrow</button>
      </Tooltip>

      {/* Custom max width */}
      <Tooltip
        config={{
          content: 'This tooltip has a custom max width to prevent it from being too wide',
          maxWidth: '200px',
        }}
      >
        <button>Custom Width</button>
      </Tooltip>

      {/* Disabled */}
      <Tooltip
        config={{
          content: 'This tooltip is disabled',
          disabled: true,
        }}
      >
        <button>Disabled</button>
      </Tooltip>
    </div>
  );
}
```

## Props

### TooltipProps

| Prop        | Type              | Required | Description                              |
| ----------- | ----------------- | -------- | ---------------------------------------- |
| `children`  | `React.ReactNode` | Yes      | The element that triggers the tooltip    |
| `config`    | `TooltipConfig`   | Yes      | Tooltip configuration object             |
| `className` | `string`          | No       | Additional CSS classes for the container |

### TooltipConfig

| Prop        | Type                        | Required | Description                                      |
| ----------- | --------------------------- | -------- | ------------------------------------------------ |
| `content`   | `string \| React.ReactNode` | Yes      | Tooltip content                                  |
| `position`  | `TooltipPosition`           | No       | Tooltip position (default: 'top')                |
| `variant`   | `TooltipVariant`            | No       | Tooltip variant style (default: 'default')       |
| `trigger`   | `TooltipTrigger`            | No       | Trigger behavior (default: 'hover')              |
| `delay`     | `number`                    | No       | Delay before showing tooltip in ms (default: 0)  |
| `disabled`  | `boolean`                   | No       | Whether the tooltip is disabled (default: false) |
| `maxWidth`  | `string`                    | No       | Maximum width of the tooltip                     |
| `showArrow` | `boolean`                   | No       | Whether to show the arrow (default: true)        |
| `className` | `string`                    | No       | Additional CSS classes for the tooltip           |

## Tooltip Positions

- **top**: Tooltip appears above the trigger element
- **bottom**: Tooltip appears below the trigger element
- **left**: Tooltip appears to the left of the trigger element
- **right**: Tooltip appears to the right of the trigger element

## Tooltip Variants

- **default**: Standard tooltip with white background
- **dark**: Dark tooltip with dark background
- **light**: Light tooltip with light background
- **info**: Blue theme for informational content
- **success**: Green theme for success messages
- **warning**: Yellow theme for warnings
- **error**: Red theme for error messages

## Tooltip Triggers

- **hover**: Show on mouse enter, hide on mouse leave (default)
- **click**: Toggle on click, hide on click outside or escape key
- **focus**: Show on focus, hide on blur
- **manual**: Controlled visibility (not implemented in current version)

## Available Icons

The component includes a set of predefined icons:

- `Icons.info` - Information icon
- `Icons.help` - Help icon
- `Icons.question` - Question mark icon
- `Icons.warning` - Warning triangle icon
- `Icons.success` - Success checkmark icon
- `Icons.error` - Error X icon
- `Icons.lightbulb` - Lightbulb icon
- `Icons.eye` - Eye icon
- `Icons.settings` - Settings gear icon
- `Icons.star` - Star icon
- `Icons.heart` - Heart icon
- `Icons.bookmark` - Bookmark icon

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`. You can customize the appearance by:

1. Modifying the styles in `constants.ts`
2. Adding custom classes via the `className` prop
3. Overriding specific variant or position styles

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support (Escape key to close)
- Screen reader friendly
- Focus management
- Semantic HTML structure

## Examples

### Form Field Help

```tsx
function UserForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Username
          <Tooltip config={{ content: 'Choose a unique username' }}>
            <span className="ml-1 text-gray-500">{Icons.info}</span>
          </Tooltip>
        </label>
        <input type="text" className="w-full px-3 py-2 border rounded" />
      </div>
    </div>
  );
}
```

### Action Buttons with Tooltips

```tsx
function ActionButtons() {
  return (
    <div className="flex space-x-2">
      <Tooltip config={{ content: 'Save changes', variant: 'success' }}>
        <button className="p-2 text-green-600 hover:bg-green-50 rounded">{Icons.success}</button>
      </Tooltip>

      <Tooltip config={{ content: 'Delete item', variant: 'error' }}>
        <button className="p-2 text-red-600 hover:bg-red-50 rounded">{Icons.error}</button>
      </Tooltip>

      <Tooltip config={{ content: 'Edit item', variant: 'info' }}>
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">{Icons.settings}</button>
      </Tooltip>
    </div>
  );
}
```

### Complex Content Tooltip

```tsx
function ComplexTooltip() {
  const tooltipContent = (
    <div>
      <div className="font-semibold">Advanced Settings</div>
      <div className="text-sm mt-1">
        Configure advanced options for this feature. These settings affect the overall behavior.
      </div>
    </div>
  );

  return (
    <Tooltip
      config={{
        content: tooltipContent,
        maxWidth: '250px',
        variant: 'info',
      }}
    >
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Advanced</button>
    </Tooltip>
  );
}
```

### Clickable Tooltip with Custom Behavior

```tsx
function ClickableTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      config={{
        content: 'Click outside to close or press Escape',
        trigger: 'click',
      }}
    >
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle Tooltip
      </button>
    </Tooltip>
  );
}
```

## Testing

The component includes comprehensive tests covering:

- All trigger types (hover, click, focus)
- All positions and variants
- Delay functionality
- Disabled state
- Keyboard navigation
- Click outside behavior
- Complex content rendering
- Icon integration
- Form element compatibility
- Timeout cleanup

Run tests with:

```bash
npm test Tooltip.test.tsx
```

## Migration from Static HTML

If you're migrating from the static HTML version, replace your hardcoded tooltip structure with the Tooltip component:

**Before:**

```html
<div class="relative inline-block">
  <button class="text-gray-600...">
    <svg>...</svg>
  </button>
  <p class="absolute flex items-center...">
    <span>This is a tooltip</span>
    <svg class="w-6 h-6 absolute...">...</svg>
  </p>
</div>
```

**After:**

```tsx
<Tooltip config={{ content: 'This is a tooltip' }}>
  <button className="text-gray-600">{Icons.info}</button>
</Tooltip>
```

## Performance Considerations

- Tooltips are rendered on demand to minimize DOM impact
- Timeouts are properly cleaned up to prevent memory leaks
- Event listeners are added/removed as needed
- Complex content is supported but should be kept lightweight for better performance

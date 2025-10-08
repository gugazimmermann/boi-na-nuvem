# Badge Component

A flexible and accessible badge component for displaying status indicators, counts, tags, and other short pieces of information.

## Features

- **Multiple Variants**: Primary, secondary, success, warning, error, info, and neutral
- **Flexible Sizes**: Extra small, small, medium, and large
- **Shape Options**: Rounded, pill, and square
- **Icon Support**: Left or right positioned icons
- **Removable**: Optional remove functionality with keyboard support
- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with comprehensive types

## Usage

### Basic Badge

```tsx
import { Badge } from '~/components/badge';

<Badge>Default Badge</Badge>;
```

### With Configuration

```tsx
<Badge
  config={{
    variant: 'success',
    size: 'lg',
    shape: 'pill',
  }}
>
  Success Badge
</Badge>
```

### With Icons

```tsx
import { Icons } from '~/components/badge';

<Badge
  config={{
    variant: 'success',
    icon: <Icons.check />,
    iconPosition: 'left',
  }}
>
  Completed
</Badge>;
```

### Removable Badge

```tsx
<Badge config={{ removable: true }} onRemove={() => console.log('Badge removed')}>
  Removable Badge
</Badge>
```

## API Reference

### BadgeProps

| Prop          | Type              | Default | Description                            |
| ------------- | ----------------- | ------- | -------------------------------------- |
| `children`    | `React.ReactNode` | -       | Badge content                          |
| `config`      | `BadgeConfig`     | `{}`    | Badge configuration                    |
| `onRemove`    | `() => void`      | -       | Callback when remove button is clicked |
| `className`   | `string`          | `''`    | Additional CSS classes                 |
| `data-testid` | `string`          | -       | Test identifier                        |

### BadgeConfig

| Property       | Type                | Default     | Description                  |
| -------------- | ------------------- | ----------- | ---------------------------- |
| `variant`      | `BadgeVariant`      | `'primary'` | Badge color variant          |
| `size`         | `BadgeSize`         | `'md'`      | Badge size                   |
| `shape`        | `BadgeShape`        | `'rounded'` | Badge shape                  |
| `icon`         | `React.ReactNode`   | -           | Icon to display              |
| `iconPosition` | `'left' \| 'right'` | `'left'`    | Icon position                |
| `removable`    | `boolean`           | `false`     | Whether badge can be removed |
| `className`    | `string`            | -           | Additional CSS classes       |

### BadgeVariant

- `'primary'` - Blue badge (default)
- `'secondary'` - Gray badge
- `'success'` - Green badge
- `'warning'` - Yellow badge
- `'error'` - Red badge
- `'info'` - Cyan badge
- `'neutral'` - Light gray badge
- `'outline'` - Outlined badge (uses primary colors)

### BadgeSize

- `'xs'` - Extra small (12px text, minimal padding)
- `'sm'` - Small (14px text, compact padding)
- `'md'` - Medium (14px text, standard padding) - **Default**
- `'lg'` - Large (16px text, generous padding)

### BadgeShape

- `'rounded'` - Rounded corners (default)
- `'pill'` - Fully rounded (pill shape)
- `'square'` - Sharp corners

## Examples

### Status Indicators

```tsx
// Active status
<Badge
  config={{
    variant: 'success',
    icon: <Icons.check />,
    iconPosition: 'left'
  }}
>
  Active
</Badge>

// Inactive status
<Badge
  config={{
    variant: 'error',
    icon: <Icons.error />,
    iconPosition: 'left'
  }}
>
  Inactive
</Badge>

// Pending status
<Badge
  config={{
    variant: 'warning',
    icon: <Icons.exclamation />,
    iconPosition: 'left'
  }}
>
  Pending
</Badge>
```

### Count Badges

```tsx
<Badge config={{ variant: 'primary', size: 'sm' }}>
  42 items
</Badge>

<Badge config={{ variant: 'secondary', size: 'sm' }}>
  3 new
</Badge>
```

### Tags

```tsx
<Badge config={{ variant: 'info', shape: 'pill' }}>
  #javascript
</Badge>

<Badge config={{ variant: 'info', shape: 'pill' }}>
  #react
</Badge>
```

### Removable Tags

```tsx
const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);

{
  tags.map((tag) => (
    <Badge
      key={tag}
      config={{ removable: true }}
      onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
    >
      {tag}
    </Badge>
  ));
}
```

## Accessibility

The Badge component includes several accessibility features:

- **ARIA Role**: Uses `role="status"` for screen readers
- **Live Region**: Uses `aria-live="polite"` for dynamic content
- **Keyboard Support**: Remove button supports Enter and Space keys
- **Focus Management**: Proper focus handling for interactive elements
- **Screen Reader Support**: Descriptive labels for remove buttons

## Styling

The component uses Tailwind CSS classes and follows the design system patterns:

- **Consistent Spacing**: Uses standardized padding and margins
- **Color System**: Follows the established color palette
- **Dark Mode**: Automatic dark mode support
- **Responsive**: Works across all screen sizes
- **Focus States**: Clear focus indicators for keyboard navigation

## Icons

The component includes a set of commonly used icons:

- `Icons.check` - Checkmark for success states
- `Icons.exclamation` - Exclamation for warnings
- `Icons.info` - Information icon
- `Icons.error` - Error/X icon
- `Icons.close` - Close/X icon for remove buttons

## Testing

The component includes comprehensive tests covering:

- Basic rendering and props
- All variants, sizes, and shapes
- Icon positioning and display
- Remove functionality
- Accessibility features
- Edge cases and error handling

Run tests with:

```bash
npm test Badge.test.tsx
```

## Migration from Table Header Badge

If you're currently using the `countBadge` style from the table component, you can easily migrate:

```tsx
// Before (in TableHeader)
<span className={styles.countBadge}>
  {config.count} {config.countLabel || 'items'}
</span>

// After (using Badge component)
<Badge config={{ variant: 'primary', size: 'sm' }}>
  {config.count} {config.countLabel || 'items'}
</Badge>
```

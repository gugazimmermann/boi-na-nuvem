# Sidebar Component

A collapsible sidebar navigation component with expandable sections and active state management.

## Features

- ✅ **Collapsible Sections**: Expandable/collapsible navigation sections
- ✅ **Active State Management**: Visual indication of current page
- ✅ **TypeScript Support**: Full type safety
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Icon Support**: Custom icons for navigation items
- ✅ **Accessibility**: Proper ARIA attributes and keyboard navigation
- ✅ **Responsive Design**: Mobile-friendly layout

## Structure

```
sidebar/
├── Sidebar.tsx          # Main sidebar component
├── SidebarLink.tsx      # Individual sidebar link component
├── types.ts            # TypeScript interfaces
├── constants.ts        # Sidebar sections and styles
├── icons.tsx           # SVG icons
└── index.ts            # Clean exports
```

## Usage

### Basic Usage

```tsx
import { Sidebar } from './components/sidebar';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      {/* Your main content */}
    </div>
  );
}
```

### With Custom Styling

```tsx
<Sidebar className="custom-sidebar-styles" />
```

## API Reference

### SidebarProps

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | `''`    | Additional CSS classes |

### SidebarLinkProps

| Prop       | Type                       | Required | Description                          |
| ---------- | -------------------------- | -------- | ------------------------------------ |
| `item`     | `SidebarItem`              | ✅       | Sidebar item configuration           |
| `isActive` | `boolean`                  | ✅       | Whether the item is currently active |
| `onClick`  | `(itemId: string) => void` | ✅       | Click handler for the item           |

### SidebarItem

| Property | Type              | Required | Description       |
| -------- | ----------------- | -------- | ----------------- |
| `id`     | `string`          | ✅       | Unique identifier |
| `label`  | `string`          | ✅       | Display text      |
| `href`   | `string`          | ✅       | Link URL          |
| `icon`   | `React.ReactNode` | ✅       | Icon component    |

### SidebarSection

| Property | Type            | Required | Description            |
| -------- | --------------- | -------- | ---------------------- |
| `title`  | `string`        | ✅       | Section title          |
| `items`  | `SidebarItem[]` | ✅       | Array of sidebar items |

## Sidebar Sections

Sidebar sections are defined in `constants.ts`:

```tsx
export const sidebarSections = [
  {
    title: 'Cadastros',
    items: [
      {
        id: 'animais',
        label: 'Animais',
        href: '/cadastros/animais',
        icon: Icons.animal,
      },
      {
        id: 'fornecedores',
        label: 'Fornecedores',
        href: '/cadastros/fornecedores',
        icon: Icons.supplier,
      },
      // ... more items
    ],
  },
  // ... more sections
];
```

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`:

```tsx
export const styles = {
  sidebar:
    'flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700',
  // ... more styles
};
```

## Behavior

### Section Expansion

- Only one section can be expanded at a time
- Clicking an expanded section collapses it
- Clicking a collapsed section expands it and collapses any other open section

### Active State

- The sidebar tracks which item is currently active
- Active items are visually highlighted
- Clicking an item updates the active state

## Components

### Sidebar

Main sidebar component that manages section expansion and active states.

```tsx
<Sidebar className="custom-styles" />
```

### SidebarLink

Individual sidebar link component with active state styling.

```tsx
<SidebarLink item={item} isActive={activeItem === item.id} onClick={handleItemClick} />
```

## Icons

Available icons in the `Icons` object:

- `Icons.chevronRight` - Right chevron for collapsed sections
- `Icons.chevronDown` - Down chevron for expanded sections
- `Icons.animal` - Animal icon
- `Icons.supplier` - Supplier icon
- `Icons.buyer` - Buyer icon
- `Icons.employee` - Employee icon
- `Icons.serviceProvider` - Service provider icon
- `Icons.location` - Location icon
- `Icons.property` - Property icon

## State Management

The sidebar manages two pieces of state:

1. **Active Item**: Tracks which sidebar item is currently active
2. **Expanded Section**: Tracks which section is currently expanded

```tsx
const [activeItem, setActiveItem] = useState<string>('animais');
const [expandedSection, setExpandedSection] = useState<string | null>(null);
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support for section toggles
- **ARIA Attributes**: Proper ARIA labels and states
- **Focus Management**: Proper focus handling for interactive elements
- **Screen Reader Support**: Semantic HTML structure

## Customization

### Adding New Sections

Edit `constants.ts` to add new sections:

```tsx
export const sidebarSections = [
  // Existing sections...
  {
    title: 'New Section',
    items: [
      {
        id: 'new-item',
        label: 'New Item',
        href: '/new-item',
        icon: Icons.newIcon,
      },
    ],
  },
];
```

### Custom Styling

Override styles by passing custom classes:

```tsx
<Sidebar className="bg-blue-50 border-blue-200" />
```

### Custom Icons

Add new icons to the `Icons` object in `icons.tsx`:

```tsx
export const Icons = {
  // Existing icons...
  newIcon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      {/* SVG content */}
    </svg>
  ),
};
```

## Best Practices

1. **Section Organization**: Group related items into logical sections
2. **Icon Consistency**: Use consistent icon styles throughout
3. **Active State**: Always provide visual feedback for the current page
4. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
5. **Performance**: Component is optimized with proper state management

## Integration

### With React Router

The sidebar works seamlessly with React Router for navigation:

```tsx
import { useNavigate } from 'react-router';

const handleItemClick = (itemId: string) => {
  setActiveItem(itemId);
  // Navigation is handled by the SidebarLink component
};
```

### With State Management

For global state management, you can lift the active state up:

```tsx
const [activeItem, setActiveItem] = useState<string>('animais');

<Sidebar activeItem={activeItem} onActiveItemChange={setActiveItem} />;
```

## Dependencies

- React for component logic
- Tailwind CSS for styling
- Custom icons component
- React Router for navigation (via SidebarLink)

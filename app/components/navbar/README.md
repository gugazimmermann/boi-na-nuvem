# Navbar Component

A responsive navigation bar component with mobile support, search functionality, and property/language selectors.

## Features

- ✅ **Responsive Design**: Mobile-first approach with collapsible menu
- ✅ **TypeScript Support**: Full type safety
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Search Integration**: Built-in search input component
- ✅ **Property Selector**: Dynamic property selection
- ✅ **Language Selector**: Multi-language support
- ✅ **Accessibility**: ARIA labels and semantic HTML
- ✅ **Environment Configuration**: Configurable app title and logo

## Structure

```
navbar/
├── Navbar.tsx           # Main navigation component
├── NavLink.tsx          # Individual navigation link component
├── SearchInput.tsx      # Search input component
├── LanguageSelector.tsx # Language selection component
├── PropertySelector.tsx # Property selection component
├── types.ts            # TypeScript interfaces
├── constants.ts        # Navigation items and styles
├── icons.tsx           # SVG icons
└── index.ts            # Clean exports
```

## Usage

### Basic Usage

```tsx
import { Navbar } from '~/components/navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Your app content */}
    </div>
  );
}
```

### Environment Configuration

Set these environment variables in your `.env` file:

```env
VITE_TITLE=Boi na Nuvem
VITE_LOGO=/assets/angus.png
```

## API Reference

### Navbar Component

The main `Navbar` component doesn't accept props - it's self-contained and uses environment variables for configuration.

### NavLinkProps

| Prop    | Type     | Required | Description  |
| ------- | -------- | -------- | ------------ |
| `to`    | `string` | ✅       | Route path   |
| `label` | `string` | ✅       | Display text |

### SearchInputProps

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | `''`    | Additional CSS classes |

## Navigation Items

Navigation items are defined in `constants.ts`:

```tsx
export const navigationItems = [
  { to: '/producao/controle-peso', label: 'Controle de Peso' },
  { to: '/producao/movimentacao', label: 'Movimentação' },
];
```

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`:

```tsx
export const styles = {
  navLink:
    'px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
  searchInput:
    'py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300',
};
```

## Mobile Behavior

- **Desktop**: Full navigation with all components visible
- **Mobile**: Collapsible hamburger menu with:
  - Navigation links in a vertical stack
  - Search input (full width)
  - Property and language selectors stacked vertically

## Components

### NavLink

Individual navigation link component with hover effects and active states.

```tsx
<NavLink to="/dashboard" label="Dashboard" />
```

### SearchInput

Search input with icon and responsive styling.

```tsx
<SearchInput className="w-full" />
```

### LanguageSelector

Language selection dropdown with flag icons.

```tsx
<LanguageSelector />
```

### PropertySelector

Property selection dropdown for multi-property applications. It persists the selected property in `localStorage` and restores it across sessions.

```tsx
<PropertySelector />
```

#### Persistence Behavior

- On mount, the selector tries to restore the selected property from `localStorage` using `SelectedPropertyService`.
- If the stored id exists and is among the active properties, it will be selected.
- If there is no stored id or it is invalid, the first active property is selected and stored.
- On user selection, the chosen property id is saved to `localStorage`.

#### Programmatic Access

You can access the current selection elsewhere in the app via the service:

```ts
import { SelectedPropertyService } from '~/services/selectedPropertyService';

const selectedPropertyId = SelectedPropertyService.getSelectedPropertyId();
```

Use this id to filter data and show only information relevant to the selected property when necessary.

## Icons

Available icons in the `Icons` object:

- `Icons.menu` - Hamburger menu icon
- `Icons.close` - Close menu icon
- `Icons.search` - Search icon
- `Icons.chevronDown` - Dropdown arrow
- `Icons.flag` - Flag icon for language selector

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling for mobile menu
- **Semantic HTML**: Uses proper `<nav>` and `<button>` elements

## Best Practices

1. **Environment Variables**: Use environment variables for app title and logo
2. **Responsive Design**: Test on both desktop and mobile devices
3. **Navigation Items**: Keep navigation items concise and meaningful
4. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
5. **Performance**: Component is optimized with proper state management

## Customization

### Adding New Navigation Items

Edit `constants.ts`:

```tsx
export const navigationItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/producao/controle-peso', label: 'Controle de Peso' },
  { to: '/producao/movimentacao', label: 'Movimentação' },
  // Add new items here
];
```

### Custom Styling

Override styles by passing custom classes:

```tsx
<SearchInput className="custom-search-styles" />
```

### Environment Configuration

Create a `.env` file in your project root:

```env
VITE_TITLE=Your App Name
VITE_LOGO=/path/to/your/logo.png
```

## Dependencies

- React Router for navigation
- Tailwind CSS for styling
- Custom icons component
- Environment variables for configuration

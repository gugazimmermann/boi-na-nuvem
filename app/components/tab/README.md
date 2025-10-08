# Tab Component

A reusable React tab component that follows the same pattern as the alert component, providing consistent styling and behavior across the application.

## Features

- **Multiple Variants**: Default, Pills, and Underline styles
- **Icons Support**: Built-in icon library with customizable icons
- **Badges**: Optional badges for tab items
- **Disabled State**: Support for disabled tabs
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support with proper type definitions
- **Customizable**: Support for custom CSS classes

## Usage

### Basic Usage

```tsx
import { Tab } from '@/components/tab';

function MyComponent() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabConfig = {
    items: [
      { id: 'profile', label: 'Profile' },
      { id: 'account', label: 'Account' },
      { id: 'settings', label: 'Settings' },
    ],
    activeTab,
    onTabChange: setActiveTab,
  };

  return <Tab config={tabConfig} />;
}
```

### With Icons

```tsx
import { Tab, Icons } from '@/components/tab';

function MyComponent() {
  const tabConfig = {
    items: [
      { id: 'home', label: 'Home', icon: Icons.home },
      { id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard },
      { id: 'settings', label: 'Settings', icon: Icons.settings },
    ],
    activeTab: 'home',
    onTabChange: (tabId) => console.log('Tab changed:', tabId),
  };

  return <Tab config={tabConfig} />;
}
```

### With Badges

```tsx
import { Tab, Icons } from '@/components/tab';

function MyComponent() {
  const tabConfig = {
    items: [
      { id: 'notifications', label: 'Notifications', icon: Icons.notification, badge: '3' },
      { id: 'messages', label: 'Messages', icon: Icons.users, badge: '12' },
    ],
    activeTab: 'notifications',
    onTabChange: handleTabChange,
  };

  return <Tab config={tabConfig} />;
}
```

### Different Variants

```tsx
// Pills variant
<Tab config={{
  ...tabConfig,
  variant: 'pills'
}} />

// Underline variant
<Tab config={{
  ...tabConfig,
  variant: 'underline'
}} />
```

### With Disabled Tabs

```tsx
const tabConfig = {
  items: [
    { id: 'active', label: 'Active Tab' },
    { id: 'disabled', label: 'Disabled Tab', disabled: true },
  ],
  activeTab: 'active',
  onTabChange: handleTabChange,
};
```

## Tab Variants

- **default**: Traditional tab style with borders and rounded corners
- **pills**: Pill-shaped tabs with background styling
- **underline**: Minimal style with underline indicators

## Props

### TabProps

| Prop        | Type        | Required | Description              |
| ----------- | ----------- | -------- | ------------------------ |
| `config`    | `TabConfig` | Yes      | Tab configuration object |
| `className` | `string`    | No       | Additional CSS classes   |

### TabConfig

| Prop          | Type                      | Required | Description                                  |
| ------------- | ------------------------- | -------- | -------------------------------------------- |
| `items`       | `TabItem[]`               | Yes      | Array of tab items                           |
| `activeTab`   | `string`                  | No       | ID of the currently active tab               |
| `variant`     | `TabVariant`              | No       | Tab variant style (default: 'default')       |
| `onTabChange` | `(tabId: string) => void` | No       | Callback when tab is changed                 |
| `className`   | `string`                  | No       | Additional CSS classes for the tab container |

### TabItem

| Prop       | Type               | Required | Description                     |
| ---------- | ------------------ | -------- | ------------------------------- |
| `id`       | `string`           | Yes      | Unique identifier for the tab   |
| `label`    | `string`           | Yes      | Display text for the tab        |
| `icon`     | `React.ReactNode`  | No       | Icon component to display       |
| `disabled` | `boolean`          | No       | Whether the tab is disabled     |
| `badge`    | `string \| number` | No       | Badge text or number to display |

## Available Icons

The component includes a set of predefined icons:

- `Icons.profile` - User profile icon
- `Icons.account` - Account/settings icon
- `Icons.notification` - Notification bell icon
- `Icons.settings` - Settings gear icon
- `Icons.home` - Home icon
- `Icons.dashboard` - Dashboard grid icon
- `Icons.analytics` - Analytics chart icon
- `Icons.users` - Users icon
- `Icons.documents` - Documents icon

## Styling

The component uses Tailwind CSS classes defined in `constants.ts`. You can customize the appearance by:

1. Modifying the styles in `constants.ts`
2. Adding custom classes via the `className` prop
3. Overriding specific variant styles

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support (Enter and Space keys)
- Screen reader friendly
- Focus management
- Semantic HTML structure

## Examples

### Basic Tab Navigation

```tsx
function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = {
    items: [
      { id: 'profile', label: 'Profile', icon: Icons.profile },
      { id: 'account', label: 'Account', icon: Icons.account },
      { id: 'notifications', label: 'Notifications', icon: Icons.notification, badge: '3' },
    ],
    activeTab,
    onTabChange: setActiveTab,
  };

  return (
    <div>
      <Tab config={tabs} />
      <div className="mt-4">
        {activeTab === 'profile' && <ProfileContent />}
        {activeTab === 'account' && <AccountContent />}
        {activeTab === 'notifications' && <NotificationsContent />}
      </div>
    </div>
  );
}
```

### Pills Style Navigation

```tsx
function Dashboard() {
  const tabs = {
    items: [
      { id: 'overview', label: 'Overview', icon: Icons.dashboard },
      { id: 'analytics', label: 'Analytics', icon: Icons.analytics },
      { id: 'reports', label: 'Reports', icon: Icons.documents },
    ],
    activeTab: 'overview',
    variant: 'pills',
    onTabChange: handleTabChange,
  };

  return <Tab config={tabs} />;
}
```

### Underline Style with Disabled Tab

```tsx
function AdminPanel() {
  const tabs = {
    items: [
      { id: 'users', label: 'Users', icon: Icons.users },
      { id: 'settings', label: 'Settings', icon: Icons.settings },
      { id: 'maintenance', label: 'Maintenance', icon: Icons.settings, disabled: true },
    ],
    activeTab: 'users',
    variant: 'underline',
    onTabChange: handleTabChange,
  };

  return <Tab config={tabs} />;
}
```

### Custom Styling

```tsx
function CustomTabs() {
  const tabs = {
    items: [
      { id: 'tab1', label: 'Custom Tab 1' },
      { id: 'tab2', label: 'Custom Tab 2' },
    ],
    activeTab: 'tab1',
    onTabChange: handleTabChange,
  };

  return <Tab config={tabs} className="border-2 border-blue-200 rounded-lg p-2 bg-blue-50" />;
}
```

## Testing

The component includes comprehensive tests covering:

- Rendering of all tab items
- Active/inactive states
- Icon and badge display
- Disabled state handling
- Click and keyboard interactions
- Different variants
- Custom styling
- Edge cases (empty items, missing callbacks)

Run tests with:

```bash
npm test Tab.test.tsx
```

## Migration from Static HTML

If you're migrating from the static HTML version, replace your hardcoded tab structure with the Tab component:

**Before:**

```html
<div class="flex overflow-x-auto whitespace-nowrap">
  <button class="inline-flex items-center h-12 px-2 py-2...">
    <!-- Static content -->
  </button>
</div>
```

**After:**

```tsx
<Tab
  config={{
    items: [
      { id: 'profile', label: 'Profile', icon: Icons.profile },
      { id: 'account', label: 'Account', icon: Icons.account },
    ],
    activeTab: 'profile',
    onTabChange: setActiveTab,
  }}
/>
```

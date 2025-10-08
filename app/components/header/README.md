# Header Component

A reusable header component for detail pages with back navigation, title, subtitle, info items, and actions.

## Features

- Back button with customizable label and action
- Title and optional subtitle
- Custom icon support
- Info items with icons and values
- Actions section for buttons or other components
- Responsive design with dark mode support
- Gradient background with modern styling

## Usage

```tsx
import { Header } from '~/components/header';

function MyDetailPage() {
  const handleBack = () => {
    navigate('/previous-page');
  };

  return (
    <Header
      title="Property Name"
      subtitle="Optional subtitle"
      icon={<MyIcon />}
      backButton={{
        label: 'Voltar para lista',
        onClick: handleBack,
      }}
      info={[
        {
          label: 'Code',
          value: 'PROP-001',
          icon: <CodeIcon />,
        },
      ]}
      actions={<StatusBadge status="active" />}
    />
  );
}
```

## Props

| Prop         | Type                                     | Required | Description                             |
| ------------ | ---------------------------------------- | -------- | --------------------------------------- |
| `title`      | `string`                                 | ✅       | Main title of the page                  |
| `subtitle`   | `string`                                 | ❌       | Optional subtitle                       |
| `icon`       | `ReactNode`                              | ❌       | Icon to display in the header           |
| `backButton` | `{ label: string, onClick: () => void }` | ❌       | Back button configuration               |
| `info`       | `HeaderInfo[]`                           | ❌       | Array of info items to display          |
| `actions`    | `ReactNode`                              | ❌       | Actions section (buttons, badges, etc.) |
| `className`  | `string`                                 | ❌       | Additional CSS classes                  |

## HeaderInfo Interface

```tsx
interface HeaderInfo {
  label: string; // Label for the info item
  value: string; // Value to display
  icon?: ReactNode; // Optional icon
}
```

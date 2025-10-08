# Actions Component

A reusable actions component that provides a consistent way to display action buttons using the Button component.

## Features

- Uses the existing Button component for consistency
- Multiple layout options (horizontal, vertical, responsive)
- Support for different button variants
- Loading and disabled states
- Icons support
- Responsive design
- Clean and modern styling

## Usage

```tsx
import { Actions } from '~/components/actions';

function MyDetailPage() {
  const handleEdit = () => {
    console.log('Edit item');
  };

  const handleDelete = () => {
    console.log('Delete item');
  };

  return (
    <Actions
      title="Ações da Propriedade"
      description="Gerencie esta propriedade e suas configurações"
      actions={[
        {
          id: 'edit',
          label: 'Editar Propriedade',
          onClick: handleEdit,
          variant: 'primary',
          icon: <EditIcon />,
        },
        {
          id: 'delete',
          label: 'Excluir Propriedade',
          onClick: handleDelete,
          variant: 'error',
          icon: <DeleteIcon />,
        },
      ]}
    />
  );
}
```

## Props

| Prop          | Type                                         | Required | Description                         |
| ------------- | -------------------------------------------- | -------- | ----------------------------------- |
| `title`       | `string`                                     | ✅       | Title of the actions section        |
| `description` | `string`                                     | ❌       | Optional description text           |
| `actions`     | `ActionItem[]`                               | ✅       | Array of action items               |
| `className`   | `string`                                     | ❌       | Additional CSS classes              |
| `layout`      | `'horizontal' \| 'vertical' \| 'responsive'` | ❌       | Layout type (default: 'responsive') |

## ActionItem Interface

```tsx
interface ActionItem {
  id: string; // Unique identifier
  label: string; // Button text
  onClick: () => void; // Click handler
  variant?: ButtonVariant; // Button variant (default: 'primary')
  icon?: ReactNode; // Optional icon
  disabled?: boolean; // Disabled state
  loading?: boolean; // Loading state
}
```

## Layout Options

- **responsive** (default): Stacks vertically on mobile, horizontally on desktop
- **horizontal**: Always displays buttons in a row
- **vertical**: Always displays buttons in a column

## Button Variants

The component supports all Button component variants:

- `primary` (default)
- `secondary`
- `success`
- `warning`
- `error`
- `info`
- `ghost`
- `outline`

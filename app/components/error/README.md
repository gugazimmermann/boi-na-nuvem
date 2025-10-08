# ErrorState Component

Displays a prominent error banner with a retry action and optional title.

## Usage

```tsx
import { ErrorState } from '~/components/error';

function ErrorExample() {
  return (
    <ErrorState
      title="Failed to load data"
      error="Network request timed out."
      onRetry={() => window.location.reload()}
    />
  );
}
```

## Props

| Prop        | Type         | Required | Default                                      | Description               |
| ----------- | ------------ | -------- | -------------------------------------------- | ------------------------- |
| `error`     | `string`     | ✅       | -                                            | Error message to display  |
| `onRetry`   | `() => void` | ✅       | -                                            | Callback for retry button |
| `title`     | `string`     | ❌       | `"Erro ao carregar"`                         | Optional headline         |
| `className` | `string`     | ❌       | `"min-h-screen bg-gray-50 dark:bg-gray-900"` | Container classes         |

## Notes

- Uses Tailwind classes; adjust layout via `className`.
- Button label is "Tentar novamente" for consistency with existing UI language.

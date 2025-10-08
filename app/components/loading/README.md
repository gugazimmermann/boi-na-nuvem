# LoadingState Component

Shows a centered spinner with an optional message, in a full-height container by default.

## Usage

```tsx
import { LoadingState } from '~/components/loading';

function LoadingExample() {
  return <LoadingState message="Carregando dados..." />;
}
```

## Props

| Prop        | Type     | Required | Default                                      | Description               |
| ----------- | -------- | -------- | -------------------------------------------- | ------------------------- |
| `message`   | `string` | ❌       | `"Carregando..."`                            | Message below the spinner |
| `className` | `string` | ❌       | `"min-h-screen bg-gray-50 dark:bg-gray-900"` | Container classes         |

## Notes

- Spinner uses Tailwind `animate-spin` with a border indicator.
- Customize spacing and background by overriding `className`.

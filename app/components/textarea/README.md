# Textarea Component

A configurable textarea with label, helper and error text, sizes, variants, and accessibility attributes.

## Features

- Variants: default, filled, outlined
- Sizes: sm, md, lg
- Error and helper text slots
- Controlled and uncontrolled modes
- Resize control and row count

## Usage

```tsx
import { Textarea } from '~/components/textarea';

function Example() {
  const [bio, setBio] = useState('');

  return (
    <Textarea
      label="Bio"
      config={{ placeholder: 'Tell us about yourself', rows: 4 }}
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      helperText="Max 200 characters"
    />
  );
}
```

## Props

```ts
type TextareaVariant = 'default' | 'filled' | 'outlined';
type TextareaSize = 'sm' | 'md' | 'lg';

interface TextareaConfig {
  variant?: TextareaVariant; // default: 'default'
  size?: TextareaSize; // default: 'md'
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  maxLength?: number;
  minLength?: number;
  rows?: number; // default: 3
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'; // default: 'vertical'
  autoFocus?: boolean;
}

interface TextareaProps {
  label?: string;
  config?: TextareaConfig;
  error?: string;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  'data-testid'?: string;
}
```

## Accessibility

- Associates label via `htmlFor`/`id`
- Sets `aria-invalid` when `error` is provided
- Sets `aria-describedby` to helper or error text element

## Styling

All classes are defined in `constants.ts` and composed based on variant/size/resize.

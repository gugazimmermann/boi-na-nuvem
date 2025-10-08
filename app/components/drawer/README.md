# Drawer Component

A flexible sliding panel component that appears from screen edges. Includes header, body, and footer helpers, focus trap, escape/overlay close, sizes, and edge positions.

## Features

- Positions: left, right, top, bottom
- Sizes: sm, md, lg, xl, full
- Overlay click close and Escape close
- Optional close button in header
- Focus trap and body scroll lock
- TypeScript types and Tailwind-based styling via `constants.ts`

## Usage

```tsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '~/components/drawer';
import { Button } from '~/components/button';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        config={{ position: 'right', size: 'md', closeOnOverlayClick: true }}
      >
        <DrawerHeader
          title="Settings"
          subtitle="Manage your preferences"
          onClose={() => setOpen(false)}
        />
        <DrawerBody>{/* content */}</DrawerBody>
        <DrawerFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
```

## API Reference

### Drawer

```ts
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface DrawerConfig {
  position?: DrawerPosition; // default: 'right'
  size?: DrawerSize; // default: 'md'
  closable?: boolean; // reserved
  closeOnOverlayClick?: boolean; // default: true
  closeOnEscape?: boolean; // default: true
  showCloseButton?: boolean; // default: true
  className?: string;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config?: DrawerConfig;
  children: React.ReactNode;
  'data-testid'?: string;
}
```

### DrawerHeader

```ts
interface DrawerHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
  showCloseButton?: boolean; // default: true
  className?: string;
}
```

### DrawerBody

```ts
interface DrawerBodyProps {
  children: React.ReactNode;
  className?: string;
}
```

### DrawerFooter

```ts
interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}
```

## Accessibility

- `role="dialog"` and `aria-modal="true"`
- Focus trap within the panel when open
- Escape key handling when enabled
- Overlay click handling when enabled

## Styling

Classes come from `constants.ts` in this folder. Extend by passing `className` via `config.className` or on subcomponents.

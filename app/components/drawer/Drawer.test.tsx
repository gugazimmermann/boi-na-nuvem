import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from './Drawer';

describe('Drawer Component', () => {
  it('does not render when not visible', () => {
    const { container } = render(
      <Drawer isOpen={false} onClose={() => {}}>
        Content
      </Drawer>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders when open with structure', () => {
    render(
      <Drawer isOpen onClose={() => {}} data-testid="drawer">
        <DrawerHeader title="Título" onClose={() => {}} />
        <DrawerBody>
          <div>Conteúdo</div>
        </DrawerBody>
        <DrawerFooter>
          <button>Ok</button>
        </DrawerFooter>
      </Drawer>,
    );

    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
  });
});

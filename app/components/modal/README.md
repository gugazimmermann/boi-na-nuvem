# Modal Component

Um componente de modal reutilizável e acessível para exibir conteúdo em overlay.

## Componentes

### Modal

Componente base para criar modais customizados.

### ConfirmationModal

Modal especializado para confirmações com botões de ação.

## Uso

### Modal Básico

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '~/components/modal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      config={{
        size: 'md',
        closeOnOverlayClick: true,
        closeOnEscape: true,
      }}
    >
      <ModalHeader title="Título do Modal" />
      <ModalBody>Conteúdo do modal aqui</ModalBody>
      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>Fechar</Button>
      </ModalFooter>
    </Modal>
  );
}
```

### Modal de Confirmação

```tsx
import { ConfirmationModal } from '~/components/modal';

function MyComponent() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    // Lógica de exclusão
    console.log('Item deletado');
    setShowConfirm(false);
  };

  return (
    <ConfirmationModal
      isOpen={showConfirm}
      onClose={() => setShowConfirm(false)}
      onConfirm={handleDelete}
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
      confirmText="Excluir"
      cancelText="Cancelar"
      variant="error"
    />
  );
}
```

## Props

### Modal

| Prop       | Tipo          | Padrão | Descrição                        |
| ---------- | ------------- | ------ | -------------------------------- |
| `isOpen`   | `boolean`     | -      | Controla se o modal está aberto  |
| `onClose`  | `() => void`  | -      | Função chamada ao fechar o modal |
| `config`   | `ModalConfig` | `{}`   | Configurações do modal           |
| `children` | `ReactNode`   | -      | Conteúdo do modal                |

### ModalConfig

| Prop                  | Tipo                           | Padrão | Descrição                   |
| --------------------- | ------------------------------ | ------ | --------------------------- |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho do modal            |
| `closable`            | `boolean`                      | `true` | Se o modal pode ser fechado |
| `closeOnOverlayClick` | `boolean`                      | `true` | Fechar ao clicar no overlay |
| `closeOnEscape`       | `boolean`                      | `true` | Fechar ao pressionar Escape |
| `showCloseButton`     | `boolean`                      | `true` | Mostrar botão de fechar     |

### ConfirmationModal

| Prop          | Tipo                                                       | Padrão        | Descrição                             |
| ------------- | ---------------------------------------------------------- | ------------- | ------------------------------------- |
| `isOpen`      | `boolean`                                                  | -             | Controla se o modal está aberto       |
| `onClose`     | `() => void`                                               | -             | Função chamada ao fechar              |
| `onConfirm`   | `() => void`                                               | -             | Função chamada ao confirmar           |
| `onCancel`    | `() => void`                                               | -             | Função chamada ao cancelar (opcional) |
| `title`       | `string`                                                   | -             | Título do modal                       |
| `message`     | `string`                                                   | -             | Mensagem de confirmação               |
| `confirmText` | `string`                                                   | `'Confirmar'` | Texto do botão de confirmação         |
| `cancelText`  | `string`                                                   | `'Cancelar'`  | Texto do botão de cancelamento        |
| `variant`     | `'default' \| 'warning' \| 'error' \| 'success' \| 'info'` | `'default'`   | Variante visual                       |
| `loading`     | `boolean`                                                  | `false`       | Estado de carregamento                |

## Variantes

- `default`: Ícone de lixeira, botão vermelho
- `warning`: Ícone de aviso, botão amarelo
- `error`: Ícone de erro, botão vermelho
- `success`: Ícone de sucesso, botão verde
- `info`: Ícone de informação, botão azul

## Acessibilidade

- Suporte completo a navegação por teclado
- Focus trap dentro do modal
- Suporte a leitores de tela
- Atributos ARIA apropriados
- Fechamento com tecla Escape

## Recursos

- Animações suaves de entrada/saída
- Suporte a dark mode
- Responsivo
- Bloqueio de scroll do body
- Focus management automático

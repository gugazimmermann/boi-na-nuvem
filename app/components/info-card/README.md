# InfoCard Component

Um componente reutilizável para criar cards de informação com header colorido e conteúdo estruturado.

## Uso

```tsx
import { InfoCard, INFO_CARD_CONSTANTS } from '~/components/info-card';

<InfoCard
  title="Título da Seção"
  icon={<SomeIcon />}
  gradientFrom={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.from}
  gradientTo={INFO_CARD_CONSTANTS.GRADIENTS.BLUE.to}
>
  <div>Conteúdo do card</div>
</InfoCard>;
```

## Props

- `title`: string - Título do card
- `icon`: React.ReactNode - Ícone a ser exibido no header
- `gradientFrom`: string - Cor inicial do gradiente
- `gradientTo`: string - Cor final do gradiente
- `children`: React.ReactNode - Conteúdo do card
- `className`: string - Classes CSS adicionais (opcional)

## Dark Mode

O componente suporta dark mode automaticamente. O fundo do card e as bordas se adaptam ao tema escuro, mantendo o header colorido sempre visível.

## Gradientes Disponíveis

- `BLUE` - Azul para índigo
- `EMERALD` - Verde esmeralda para teal
- `VIOLET` - Violeta para roxo
- `AMBER` - Âmbar para laranja
- `GREEN` - Verde para esmeralda
- `RED` - Vermelho para rosa

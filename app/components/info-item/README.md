# InfoItem Component

Um componente reutilizável para exibir informações individuais com ícone, label e valor.

## Uso

```tsx
import { InfoItem, INFO_ITEM_CONSTANTS } from '~/components/info-item';

<InfoItem
  icon={<SomeIcon />}
  label="Nome do Campo"
  value="Valor do Campo"
  iconBgColor={INFO_ITEM_CONSTANTS.ICON_BG_COLORS.BLUE}
  iconTextColor={INFO_ITEM_CONSTANTS.ICON_TEXT_COLORS.BLUE}
/>;
```

## Props

- `icon`: React.ReactNode - Ícone a ser exibido
- `label`: string - Label do campo
- `value`: React.ReactNode - Valor a ser exibido
- `iconBgColor`: string - Cor de fundo do ícone (opcional)
- `iconTextColor`: string - Cor do ícone (opcional)
- `className`: string - Classes CSS adicionais (opcional)

## Dark Mode

O componente suporta dark mode automaticamente através das classes do Tailwind CSS. As cores se adaptam automaticamente quando o tema escuro está ativo.

## Constantes Disponíveis

### Cores de Fundo do Ícone

- `BLUE`, `GREEN`, `PURPLE`, `ORANGE`, `INDIGO`, `EMERALD`, `TEAL`, `CYAN`, `GRAY`

### Cores do Ícone

- `BLUE`, `GREEN`, `PURPLE`, `ORANGE`, `INDIGO`, `EMERALD`, `TEAL`, `CYAN`, `GRAY`

Todas as constantes incluem suporte automático a dark mode.

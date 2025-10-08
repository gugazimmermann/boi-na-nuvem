# StatsCard Component

Um componente reutilizável para criar cards de estatísticas com ícone, valor, descrição e barra de progresso.

## Uso

```tsx
import { StatsCard, STATS_CARD_CONSTANTS } from '~/components/stats-card';

<StatsCard
  title="Título da Estatística"
  icon={<SomeIcon />}
  value="123"
  description="descrição da estatística"
  progressPercentage={75}
  gradientFrom={STATS_CARD_CONSTANTS.GRADIENTS.VIOLET.from}
  gradientTo={STATS_CARD_CONSTANTS.GRADIENTS.VIOLET.to}
  iconBgFrom={STATS_CARD_CONSTANTS.ICON_BG_GRADIENTS.VIOLET.from}
  iconBgTo={STATS_CARD_CONSTANTS.ICON_BG_GRADIENTS.VIOLET.to}
  iconTextColor={STATS_CARD_CONSTANTS.ICON_TEXT_COLORS.VIOLET}
/>;
```

## Props

- `title`: string - Título do card
- `icon`: React.ReactNode - Ícone a ser exibido
- `value`: React.ReactNode - Valor da estatística
- `description`: string - Descrição da estatística
- `progressPercentage`: number - Porcentagem da barra de progresso (0-100)
- `gradientFrom`: string - Cor inicial do gradiente
- `gradientTo`: string - Cor final do gradiente
- `iconBgFrom`: string - Cor inicial do gradiente do ícone
- `iconBgTo`: string - Cor final do gradiente do ícone
- `iconTextColor`: string - Cor do ícone
- `className`: string - Classes CSS adicionais (opcional)

## Dark Mode

O componente suporta dark mode automaticamente. O fundo do card, bordas, texto e barra de progresso se adaptam ao tema escuro, mantendo o header colorido sempre visível.

## Constantes Disponíveis

### Gradientes

- `VIOLET`, `AMBER`, `BLUE`, `GREEN`, `RED`

### Gradientes de Fundo do Ícone

- `VIOLET`, `AMBER`, `BLUE`, `GREEN`, `RED`

### Cores do Ícone

- `VIOLET`, `AMBER`, `BLUE`, `GREEN`, `RED`

Todas as constantes incluem suporte automático a dark mode.

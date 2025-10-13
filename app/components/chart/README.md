# Componente de Gráfico Climático

## PropertyClimateChart

Componente que exibe um gráfico combinado com dados climáticos e qualidade da pastagem de uma propriedade.

### Características

- **Precipitação**: Exibida em barras azuis (mm)
- **Temperatura**: Exibida em barras laranja (°C)
- **Qualidade da Pastagem**: Exibida como linha verde com valores:
  - 3 = Boa (Good)
  - 2 = Média (Medium)  
  - 1 = Ruim (Poor)

### Uso

```tsx
import { PropertyClimateChart } from '~/components/chart';

<PropertyClimateChart pasturePlanning={property.pasturePlanning} />
```

### Props

- `pasturePlanning`: Array de dados de planejamento de pastagem com:
  - `month`: Mês em inglês (será traduzido para português)
  - `precipitation`: Precipitação em mm
  - `temperature`: Temperatura em °C
  - `state`: Estado da pastagem ('Good', 'Medium', 'Poor')

### Dependências

- `recharts`: Biblioteca de gráficos para React
- `tailwindcss`: Para estilização

### Funcionalidades

- Tooltip personalizado com informações detalhadas
- Responsivo e adaptável a diferentes tamanhos de tela
- Suporte a modo escuro
- Tradução automática dos meses para português
- Cores diferenciadas para cada métrica

# Map Component

Componente de mapa usando OpenStreetMap para exibir localizações de propriedades.

## Componentes

### `Map`

Componente básico que renderiza um mapa do OpenStreetMap com coordenadas específicas.

**Props:**

- `latitude: number` - Latitude da localização
- `longitude: number` - Longitude da localização
- `zoom?: number` - Nível de zoom (padrão: 22)
- `width?: string` - Largura do mapa (padrão: '100%')
- `height?: string` - Altura do mapa (padrão: '300px')
- `className?: string` - Classes CSS adicionais

### `MapWithFallback`

Componente inteligente que exibe o mapa quando há coordenadas, ou fallbacks quando não há.

**Props:**

- `latitude?: number` - Latitude da localização (opcional)
- `longitude?: number` - Longitude da localização (opcional)
- `address?: string` - Endereço completo para busca (opcional)
- `zoom?: number` - Nível de zoom (padrão: 22)
- `width?: string` - Largura do mapa (padrão: '100%')
- `height?: string` - Altura do mapa (padrão: '300px')
- `className?: string` - Classes CSS adicionais

## Comportamentos

### 1. Com Coordenadas

Exibe o mapa do OpenStreetMap com marcador na localização exata.

### 2. Sem Coordenadas, Com Endereço

Exibe um placeholder com link para buscar o endereço no OpenStreetMap.

### 3. Sem Coordenadas e Sem Endereço

Exibe um placeholder informando que a localização não foi informada.

## Uso

```tsx
import { MapWithFallback } from '~/components/map';

// Com coordenadas
<MapWithFallback
  latitude={-21.1775}
  longitude={-47.8103}
  height="250px"
/>

// Sem coordenadas, com endereço
<MapWithFallback
  address="Ribeirão Preto, São Paulo - Brasil"
  height="250px"
/>

// Sem dados
<MapWithFallback height="250px" />
```

## Características

- ✅ **Sem Dependências**: Usa OpenStreetMap via iframe
- ✅ **Responsivo**: Adapta-se a diferentes tamanhos de tela
- ✅ **Fallback Inteligente**: Lida com diferentes cenários de dados
- ✅ **Acessível**: Inclui títulos e descrições apropriadas
- ✅ **Performance**: Carregamento lazy do iframe
- ✅ **Seguro**: Configurações de referrer policy adequadas

## Integração

O componente está integrado na página de detalhes da propriedade (`PropertyDetail.tsx`) na seção de localização, mostrando:

1. **Informações de endereço** (lado esquerdo)
2. **Mapa interativo** (lado direito)

O mapa se adapta automaticamente aos dados disponíveis da propriedade.

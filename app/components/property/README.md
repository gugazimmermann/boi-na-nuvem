# Operações CRUD de Propriedades

Este documento explica como usar as operações CRUD (Create, Read, Update, Delete) para propriedades no frontend.

## Serviços Disponíveis

### PropertyService

O `PropertyService` fornece métodos estáticos para interagir com a API de propriedades:

#### Métodos Disponíveis

- `getAllProperties()`: Busca todas as propriedades
- `getPropertyById(id)`: Busca uma propriedade específica por ID
- `createProperty(data)`: Cria uma nova propriedade
- `updateProperty(id, data)`: Atualiza uma propriedade existente
- `deleteProperty(id)`: Deleta uma propriedade
- `restoreProperty(id)`: Restaura uma propriedade deletada
- `clearCache()`: Limpa o cache de propriedades
- `refreshProperties()`: Força atualização das propriedades

### Hook usePropertyCrud

O hook `usePropertyCrud` facilita o uso das operações CRUD com gerenciamento de estado:

```typescript
import { usePropertyCrud } from '~/hooks/usePropertyCrud';

const {
  loading,
  error,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyById,
  restoreProperty,
  clearError,
} = usePropertyCrud();
```

## Exemplos de Uso

### 1. Criar Propriedade

```typescript
import { PropertyStatus } from '~/types/property';

const propertyData = {
  code: 'FAZ-001',
  name: 'Fazenda São José',
  street: 'Rodovia BR-163',
  number: 'Km 45',
  neighborhood: 'Zona Rural',
  city: 'Ribeirão Preto',
  state: 'São Paulo',
  country: 'Brasil',
  zipCode: '14000-000',
  latitude: -21.1775,
  longitude: -47.8103,
  status: PropertyStatus.ACTIVE,
  description: 'Propriedade com boa infraestrutura',
};

try {
  const newProperty = await createProperty(propertyData);
  console.log('Propriedade criada:', newProperty);
} catch (error) {
  console.error('Erro ao criar propriedade:', error);
}
```

### 2. Atualizar Propriedade

```typescript
const updateData = {
  name: 'Fazenda São José - Atualizada',
  description: 'Nova descrição da propriedade',
};

try {
  const updatedProperty = await updateProperty('property-id', updateData);
  console.log('Propriedade atualizada:', updatedProperty);
} catch (error) {
  console.error('Erro ao atualizar propriedade:', error);
}
```

### 3. Deletar Propriedade

```typescript
try {
  const success = await deleteProperty('property-id');
  if (success) {
    console.log('Propriedade deletada com sucesso');
  }
} catch (error) {
  console.error('Erro ao deletar propriedade:', error);
}
```

### 4. Buscar Propriedade por ID

```typescript
try {
  const property = await getPropertyById('property-id');
  console.log('Propriedade encontrada:', property);
} catch (error) {
  console.error('Erro ao buscar propriedade:', error);
}
```

### 5. Restaurar Propriedade

```typescript
try {
  const restoredProperty = await restoreProperty('property-id');
  console.log('Propriedade restaurada:', restoredProperty);
} catch (error) {
  console.error('Erro ao restaurar propriedade:', error);
}
```

## Componente de Exemplo

O arquivo `PropertyCrudExample.tsx` contém um componente completo que demonstra todas as operações CRUD com interface de usuário.

## Tipos TypeScript

### CreatePropertyRequest

```typescript
interface CreatePropertyRequest {
  code: string;
  name: string;
  street: string;
  number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  country?: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  status: PropertyStatus;
  description?: string;
}
```

### UpdatePropertyRequest

```typescript
interface UpdatePropertyRequest {
  name?: string;
  totalArea?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  mainActivity?: string;
  status?: string;
  acquisitionDate?: string;
  description?: string;
}
```

## Tratamento de Erros

Todas as operações podem gerar erros. É importante tratar esses erros adequadamente:

```typescript
try {
  const result = await createProperty(data);
  // Sucesso
} catch (error) {
  if (error instanceof Error) {
    console.error('Erro:', error.message);
  } else {
    console.error('Erro desconhecido:', error);
  }
}
```

## Autenticação

Todas as operações requerem autenticação. O token JWT é obtido automaticamente do localStorage ou sessionStorage com a chave `boi_na_nuvem_token`.

## Cache

O serviço mantém um cache das propriedades por 30 segundos para otimizar performance. O cache é automaticamente limpo após operações de escrita (create, update, delete, restore).

## Endpoints da API

- `GET /property` - Lista todas as propriedades
- `GET /property/:id` - Busca propriedade por ID
- `POST /property` - Cria nova propriedade
- `PUT /property/:id` - Atualiza propriedade
- `DELETE /property/:id` - Deleta propriedade
- `POST /property/:id/restore` - Restaura propriedade deletada

# Guia de Integração Frontend-Backend - Propriedades

Este documento explica como o frontend está integrado com o backend para gerenciar propriedades.

## 🚀 Endpoints Implementados

### Backend (NestJS)
- **GET /property** - Lista todas as propriedades (resumo)
- **GET /property/:id** - Busca propriedade específica por ID (dados completos)
- **POST /property** - Cria nova propriedade
- **PUT /property/:id** - Atualiza propriedade existente
- **DELETE /property/:id** - Deleta propriedade (soft delete)
- **POST /property/:id/restore** - Restaura propriedade deletada

### Frontend (React + Remix)
- **PropertyService** - Serviço para comunicação com API
- **usePropertyCrud** - Hook personalizado para operações CRUD
- **PropertyList** - Componente para listar propriedades
- **PropertyDetail** - Componente para exibir detalhes completos
- **PropertyManagement** - Página principal de gestão

## 📊 Fluxo de Dados

### 1. Lista de Propriedades
```
Frontend → GET /property → Backend
Backend → PropertySummary[] → Frontend
```

**Dados retornados:**
- ID, código, nome
- Endereço resumido
- Capacidade e ocupação
- Número de colaboradores
- Status

### 2. Detalhes da Propriedade
```
Frontend → GET /property/:id → Backend
Backend → Property (completo) → Frontend
```

**Dados retornados:**
- Todas as informações básicas
- Endereço completo
- Coordenadas GPS
- Planejamento de pastagem
- Dados climáticos

## 🔧 Componentes Principais

### PropertyService
```typescript
// Buscar propriedade por ID
const property = await PropertyService.getPropertyById('property-id');

// Listar todas as propriedades
const properties = await PropertyService.getAllProperties();

// Criar nova propriedade
const newProperty = await PropertyService.createProperty(propertyData);

// Atualizar propriedade
const updatedProperty = await PropertyService.updateProperty(id, updateData);

// Deletar propriedade
const success = await PropertyService.deleteProperty(id);
```

### usePropertyCrud Hook
```typescript
const {
  loading,
  error,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyById,
  restoreProperty,
  clearError,
  refreshProperties,
} = usePropertyCrud();
```

### PropertyList Component
- Exibe lista de propriedades em cards
- Mostra informações resumidas
- Permite clicar para ver detalhes
- Botão "Ver Detalhes" para cada propriedade

### PropertyDetail Component
- Exibe informações completas da propriedade
- Inclui endereço, coordenadas GPS
- Mostra planejamento de pastagem
- Link para Google Maps
- Botões de ação (atualizar, imprimir)

## 🎯 Páginas Disponíveis

### /property-management
Página principal com 3 abas:

1. **Lista de Propriedades**
   - Visualização em cards
   - Informações resumidas
   - Navegação para detalhes

2. **Operações CRUD**
   - Teste de todas as operações
   - Formulários de exemplo
   - Exibição de resultados

3. **Detalhes**
   - Informações sobre o endpoint
   - IDs de exemplo para teste
   - Documentação de uso

## 🔐 Autenticação

Todas as requisições requerem token JWT:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}
```

Token é obtido automaticamente do localStorage/sessionStorage.

## 📝 Exemplos de Uso

### Buscar Propriedade por ID
```typescript
import { usePropertyCrud } from '~/hooks/usePropertyCrud';

function MyComponent() {
  const { getPropertyById, loading, error } = usePropertyCrud();
  
  const handleGetProperty = async () => {
    try {
      const property = await getPropertyById('550e8400-e29b-41d4-a716-446655440001');
      console.log('Propriedade:', property);
    } catch (err) {
      console.error('Erro:', err);
    }
  };
  
  return (
    <button onClick={handleGetProperty} disabled={loading}>
      {loading ? 'Carregando...' : 'Buscar Propriedade'}
    </button>
  );
}
```

### Exibir Lista de Propriedades
```typescript
import { PropertyList } from '~/components/property/PropertyList';

function MyPage() {
  return (
    <div>
      <h1>Minhas Propriedades</h1>
      <PropertyList />
    </div>
  );
}
```

### Exibir Detalhes de Propriedade
```typescript
import { PropertyDetail } from '~/components/property/PropertyDetail';

function MyPage() {
  return (
    <PropertyDetail 
      propertyId="550e8400-e29b-41d4-a716-446655440001"
      onClose={() => console.log('Fechar')}
    />
  );
}
```

## 🧪 Testes

### IDs de Exemplo para Teste
- `550e8400-e29b-41d4-a716-446655440001` - Fazenda do Juca (com dados climáticos)
- `550e8400-e29b-41d4-a716-446655440002` - Fazenda Boa Vista (com dados climáticos)
- `550e8400-e29b-41d4-a716-446655440003` - Sítio Esperança (sem dados climáticos)
- `550e8400-e29b-41d4-a716-446655440006` - Fazenda Antiga (deletada - retorna 404)

### Cenários de Teste
1. **Sucesso**: Buscar propriedade existente
2. **Não Encontrado**: Buscar ID inexistente
3. **Deletada**: Buscar propriedade deletada
4. **Sem Token**: Fazer requisição sem autenticação
5. **Token Inválido**: Fazer requisição com token expirado

## 🚨 Tratamento de Erros

### Frontend
- Estados de loading e error no hook
- Mensagens de erro amigáveis
- Botões para tentar novamente
- Validação de dados

### Backend
- Status codes apropriados (200, 404, 401, 500)
- Mensagens de erro descritivas
- Logs detalhados
- Validação de entrada

## 📱 Interface Responsiva

- Design mobile-first
- Grid responsivo para cards
- Tabelas com scroll horizontal
- Botões e formulários adaptáveis

## 🔄 Cache e Performance

- Cache de 30 segundos para lista de propriedades
- Invalidação automática após operações de escrita
- Debounce para evitar requisições simultâneas
- Loading states para melhor UX

## 🎨 Estilização

- Tailwind CSS para estilização
- Cores consistentes para status
- Ícones e badges informativos
- Hover effects e transições

## 📚 Próximos Passos

1. Implementar paginação na lista
2. Adicionar filtros e busca
3. Implementar upload de imagens
4. Adicionar gráficos de dados climáticos
5. Implementar notificações em tempo real
6. Adicionar testes automatizados

import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const SUPPLIER_CONFIG = createEntityConfig('fornecedor', {
  title: 'Fornecedores',
  subtitle: 'Gerencie todos os fornecedores do sistema',
  countLabel: 'fornecedores',
  searchPlaceholder:
    'Buscar por nome, email, cidade ou estado (ex: "agrofornecedores" ou "ribeirão preto")...',
  searchFields: ['name', 'email', 'city', 'state'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: 'active', label: 'Ativo' },
    { key: 'inactive', label: 'Inativo' },
  ],
});

export const SUPPLIER_MESSAGES = getEntityMessages('fornecedor');

export const SUPPLIER_ROUTES = getEntityRoutes('/cadastros/fornecedores');

export const SUPPLIER_ICONS = {
  default: ICONS.BUILDING(),
  form: ICONS.DOCUMENT(),
};

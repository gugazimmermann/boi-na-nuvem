import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const BUYER_CONFIG = createEntityConfig('comprador', {
  title: 'Compradores',
  subtitle: 'Gerencie todos os compradores do sistema',
  countLabel: 'compradores',
  searchPlaceholder:
    'Buscar por nome, email, cidade ou estado (ex: "frigorífico" ou "ribeirão preto")...',
  searchFields: ['name', 'email', 'city', 'state'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: 'active', label: 'Ativo' },
    { key: 'inactive', label: 'Inativo' },
  ],
});

export const BUYER_MESSAGES = getEntityMessages('comprador');

export const BUYER_ROUTES = getEntityRoutes('/cadastros/compradores');

export const BUYER_ICONS = {
  default: ICONS.BUILDING(),
  form: ICONS.DOCUMENT(),
};

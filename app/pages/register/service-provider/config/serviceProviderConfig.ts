import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const SERVICEPROVIDER_CONFIG = createEntityConfig('prestador de serviço', {
  title: 'Prestadores de Serviço',
  subtitle: 'Gerencie todos os prestadores de serviço do sistema',
  countLabel: 'prestadores de serviço',
  searchPlaceholder:
    'Buscar por nome, email, cidade ou estado (ex: "agrotec" ou "ribeirão preto")...',
  searchFields: ['name', 'email', 'city', 'state'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: 'active', label: 'Ativo' },
    { key: 'inactive', label: 'Inativo' },
  ],
});

export const SERVICEPROVIDER_MESSAGES = getEntityMessages('prestador de serviço');

export const SERVICEPROVIDER_ROUTES = getEntityRoutes('/cadastros/prestadores-servico');

export const SERVICEPROVIDER_ICONS = {
  default: ICONS.BUILDING(),
  form: ICONS.DOCUMENT(),
};

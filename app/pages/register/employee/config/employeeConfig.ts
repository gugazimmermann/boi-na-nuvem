import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const EMPLOYEE_CONFIG = createEntityConfig('colaborador', {
  title: 'Colaboradores',
  subtitle: 'Gerencie todos os colaboradores do sistema',
  countLabel: 'colaboradores',
  searchPlaceholder:
    'Buscar por nome, email, cidade ou estado (ex: "joão silva" ou "ribeirão preto")...',
  searchFields: ['name', 'email', 'city', 'state'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: 'active', label: 'Ativo' },
    { key: 'inactive', label: 'Inativo' },
  ],
});

export const EMPLOYEE_MESSAGES = getEntityMessages('colaborador');

export const EMPLOYEE_ROUTES = getEntityRoutes('/cadastros/colaboradores');

export const EMPLOYEE_ICONS = {
  default: ICONS.BUILDING(),
  form: ICONS.DOCUMENT(),
};

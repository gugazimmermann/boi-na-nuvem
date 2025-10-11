import { PropertyStatus } from '~/types/property';
import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const PROPERTY_CONFIG = createEntityConfig('propriedade', {
  title: 'Propriedades',
  subtitle: 'Gerencie todas as propriedades do sistema',
  countLabel: 'propriedades',
  searchPlaceholder:
    'Buscar por nome, código, cidade ou estado (ex: "fazenda são josé" ou "FARM-001")...',
  searchFields: ['name', 'code', 'city', 'state'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: PropertyStatus.ACTIVE, label: 'Ativo' },
    { key: PropertyStatus.INACTIVE, label: 'Inativo' },
  ],
});

export const PROPERTY_MESSAGES = getEntityMessages('propriedade');

export const PROPERTY_ROUTES = getEntityRoutes('/sistema/cadastros/propriedades');

export const PROPERTY_ICONS = {
  default: ICONS.BUILDING(),
  form: ICONS.DOCUMENT(),
};

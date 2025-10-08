import { LocationStatus, LocationType } from '~/types/location';
import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const LOCATION_CONFIG = createEntityConfig('localização', {
  title: 'Localizações',
  subtitle: 'Gerencie todas as localizações do sistema',
  countLabel: 'localizações',
  searchPlaceholder:
    'Buscar por nome, código, tipo ou descrição (ex: "pasto rotativo" ou "LOC-001")...',
  searchFields: ['name', 'code', 'type', 'description'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: LocationStatus.ACTIVE, label: 'Ativo' },
    { key: LocationStatus.INACTIVE, label: 'Inativo' },
    { key: LocationStatus.MAINTENANCE, label: 'Manutenção' },
  ],
});

export const LOCATION_MESSAGES = getEntityMessages('localização');

export const LOCATION_ROUTES = getEntityRoutes('/cadastros/localizacoes');

export const LOCATION_ICONS = {
  default: ICONS.LOCATION(),
  form: ICONS.DOCUMENT(),
};

export const LOCATION_TYPE_OPTIONS = [
  { value: LocationType.LIVESTOCK, label: 'Pecuária' },
  { value: LocationType.CULTIVATION, label: 'Cultivo' },
  { value: LocationType.STORAGE, label: 'Armazenamento' },
];

export const LOCATION_STATUS_OPTIONS = [
  { value: LocationStatus.ACTIVE, label: 'Ativo' },
  { value: LocationStatus.INACTIVE, label: 'Inativo' },
  { value: LocationStatus.MAINTENANCE, label: 'Manutenção' },
];

export const AREA_TYPE_OPTIONS = [
  { value: 'hectares', label: 'Hectares' },
  { value: 'metros_quadrados', label: 'Metros Quadrados' },
  { value: 'acres', label: 'Acres' },
];

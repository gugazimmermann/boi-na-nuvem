import { PropertyStatus, PropertyPhase } from '~/types/property';

export const STATUS_INDICATORS = {
  [PropertyStatus.ACTIVE]: '🟢',
  [PropertyStatus.INACTIVE]: '🔴',
} as const;

export const STATUS_LABELS = {
  [PropertyStatus.ACTIVE]: 'Ativo',
  [PropertyStatus.INACTIVE]: 'Inativo',
} as const;

export const PHASE_LABELS = {
  [PropertyPhase.CRIA]: 'Cria',
  [PropertyPhase.RECRIA]: 'Recria',
  [PropertyPhase.ENGORDA]: 'Engorda',
  [PropertyPhase.CICLO_COMPLETO]: 'Ciclo Completo',
} as const;

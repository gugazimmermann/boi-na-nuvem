import { AnimalBreed, BloodDegree } from '~/types/animal';
import { createEntityConfig, getEntityMessages, getEntityRoutes } from '../../shared/utils';
import { ICONS } from '../../shared/constants';

export const ANIMAL_CONFIG = createEntityConfig('animal', {
  title: 'Animais',
  subtitle: 'Gerencie todos os animais do sistema',
  countLabel: 'animais',
  searchPlaceholder:
    'Buscar por código, registro, raça, sexo, finalidade, grau de sangue ou idade (ex: "001", "Angus", "Fêmea", "Corte")...',
  searchFields: ['code', 'registrationNumber', 'breed', 'bloodDegree'],
  filterOptions: [
    { key: 'all', label: 'Todos' },
    { key: AnimalBreed.ANGUS, label: 'Angus' },
    { key: AnimalBreed.NELORE, label: 'Nelore' },
    { key: AnimalBreed.SRD, label: 'SRD' },
  ],
});

export const ANIMAL_MESSAGES = getEntityMessages('animal');

export const ANIMAL_ROUTES = getEntityRoutes('/sistema/cadastros/animais');

export const ANIMAL_ICONS = {
  default: ICONS.ANIMAL(),
  form: ICONS.DOCUMENT(),
};

export const ANIMAL_BREED_OPTIONS = [
  { value: AnimalBreed.ANGUS, label: 'Angus' },
  { value: AnimalBreed.NELORE, label: 'Nelore' },
  { value: AnimalBreed.SRD, label: 'SRD' },
];

export const BLOOD_DEGREE_OPTIONS = [
  { value: BloodDegree.SRD, label: 'SRD' },
  { value: BloodDegree.PO, label: 'PO - Puro de Origem' },
  { value: BloodDegree.PC, label: 'PC - Puro por Cruza' },
  { value: BloodDegree.F1, label: 'F1 - 1ª geração (50%)' },
  { value: BloodDegree.F2, label: 'F2 - 2ª geração (75%)' },
  { value: BloodDegree.F3, label: 'F3 - 3ª geração (87.5%)' },
  { value: BloodDegree.F4, label: 'F4 - 4ª geração (93.75%)' },
];

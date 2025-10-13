import type { FormFieldConfig } from '~/components/form/types';
import { PropertyStatus, PropertyPhase, type Property } from '~/types/property';
import { BRAZILIAN_STATES } from '~/utils/constants/location';

export const createPropertyFormFields = (isEdit = false): FormFieldConfig[] => [
  {
    name: 'name',
    type: 'input',
    label: 'Nome da Propriedade',
    required: true,
    gridColumn: 3,

    inputConfig: {
      type: 'text',
      placeholder: 'Ex: Fazenda São José',
      maxLength: 100,
    },

    validation: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },

    helperText: 'Nome descritivo da propriedade',
  },

  {
    name: 'code',
    type: 'input',
    label: 'Código da Propriedade',
    required: true,
    gridColumn: 2,

    inputConfig: {
      type: 'text',
      placeholder: 'Ex: PROP001',
      maxLength: 20,
    },

    validation: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },

    helperText: 'Código único para identificar a propriedade',
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    required: true,
    gridColumn: 1,
    options: [
      { value: PropertyStatus.ACTIVE, label: 'Ativo' },
      { value: PropertyStatus.INACTIVE, label: 'Inativo' },
    ],
    selectConfig: {
      placeholder: 'Selecione um status',
      ...(isEdit ? {} : { defaultValue: PropertyStatus.ACTIVE }),
    },
    validation: {
      required: true,
    },
    helperText: 'Status da propriedade no sistema',
  },

  {
    name: 'phases',
    type: 'checkbox',
    label: 'Fases',
    required: true,
    gridColumn: 2,
    options: [
      { value: PropertyPhase.CRIA, label: 'Cria' },
      { value: PropertyPhase.RECRIA, label: 'Recria' },
      { value: PropertyPhase.ENGORDA, label: 'Engorda' },
      { value: PropertyPhase.CICLO_COMPLETO, label: 'Ciclo Completo' },
    ],
    validation: {
      required: true,
      minLength: 1,
    },
    helperText: 'Selecione uma ou mais fases da propriedade',
  },

  {
    name: 'description',
    type: 'textarea',
    label: 'Descrição',
    required: false,
    gridColumn: 3,

    textareaConfig: {
      placeholder: 'Descrição detalhada da propriedade',
      maxLength: 500,
      rows: 4,
    },

    validation: {
      maxLength: 500,
    },

    helperText: 'Informações adicionais sobre a propriedade',
  },

  {
    name: 'street',
    type: 'address',
    label: 'Rua',
    required: true,

    inputConfig: {
      type: 'text',
      placeholder: 'Digite o nome da rua...',
      maxLength: 100,
    },

    validation: {
      required: true,
      maxLength: 100,
    },
  },
  {
    name: 'number',
    type: 'input',
    label: 'Número',
    required: false,
    inputConfig: {
      type: 'text',
      placeholder: 'Número ou S/N',
      maxLength: 10,
    },
    validation: {
      maxLength: 10,
    },
  },
  {
    name: 'neighborhood',
    type: 'input',
    label: 'Bairro/Distrito',
    required: false,
    inputConfig: {
      type: 'text',
      placeholder: 'Nome do bairro ou distrito',
      maxLength: 50,
    },
    validation: {
      maxLength: 50,
    },
  },
  {
    name: 'city',
    type: 'input',
    label: 'Cidade',
    required: true,
    inputConfig: {
      type: 'text',
      placeholder: 'Nome da cidade',
      maxLength: 50,
    },
    validation: {
      required: true,
      maxLength: 50,
    },
  },
  {
    name: 'state',
    type: 'select',
    label: 'Estado',
    required: true,
    options: BRAZILIAN_STATES,
    selectConfig: {
      placeholder: 'Selecione um estado',
    },
    validation: {
      required: true,
    },
  },
  {
    name: 'country',
    type: 'input',
    label: 'País',
    required: true,
    inputConfig: {
      type: 'text',
      placeholder: 'País',
      maxLength: 50,
      ...(isEdit ? {} : { defaultValue: 'Brasil' }),
    },
    validation: {
      required: true,
      maxLength: 50,
    },
  },
  {
    name: 'zipCode',
    type: 'input',
    label: 'CEP',
    required: true,
    gridColumn: 1,
    inputConfig: {
      type: 'text',
      placeholder: '00000-000',
      maxLength: 9,
    },
    validation: {
      required: true,
      maxLength: 9,
      pattern: /^\d{5}-?\d{3}$/,
    },
    helperText: 'Código postal (formato: 00000-000)',
  },

  {
    name: 'latitude',
    type: 'coordinates',
    label: 'Latitude',
    required: true,

    inputConfig: {
      type: 'number',
      placeholder: 'Ex: -23.5505',
      step: 'any',
      min: -90,
      max: 90,
    },

    validation: {
      required: true,
      min: -90,
      max: 90,
    },

    helperText: 'Coordenada de latitude',
  },
  {
    name: 'longitude',
    type: 'coordinates',
    label: 'Longitude',
    required: true,
    inputConfig: {
      type: 'number',
      placeholder: 'Ex: -46.6333',
      step: 'any',
      min: -180,
      max: 180,
    },
    validation: {
      required: true,
      min: -180,
      max: 180,
    },
    helperText: 'Coordenada de longitude',
  },
];

export const createPropertyFormConfig = (isEdit = false) => ({
  title: '',
  description: '',
  layout: 'grid' as const,
  gridColumns: 3,
  submitButtonText: isEdit ? 'Salvar Alterações' : 'Cadastrar Propriedade',
  resetButtonText: isEdit ? 'Restaurar Valores' : 'Limpar Formulário',
  showResetButton: true,
});

export const getInitialValues = (): Omit<Property, 'id'> => ({
  code: '',
  name: '',
  status: PropertyStatus.ACTIVE,
  phases: [],
  country: 'Brasil',
  zipCode: '',
});

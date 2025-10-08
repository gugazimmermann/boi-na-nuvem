import type { FormFieldConfig } from '~/components/form/types';
import { LocationStatus, LocationType, type Location } from '~/types/location';
import {
  LOCATION_TYPE_OPTIONS,
  LOCATION_STATUS_OPTIONS,
  AREA_TYPE_OPTIONS,
} from '../config/locationConfig';

export const createLocationFormFields = (
  isEdit = false,
  properties: any[] = [],
): FormFieldConfig[] => [
  {
    name: 'name',
    type: 'input',
    label: 'Nome da Localização',
    required: true,
    gridColumn: 3,

    inputConfig: {
      type: 'text',
      placeholder: 'Ex: Pasto Rotativo - Setor A',
      maxLength: 100,
    },

    validation: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },

    helperText: 'Nome descritivo da localização',
  },

  {
    name: 'code',
    type: 'input',
    label: 'Código da Localização',
    required: true,
    gridColumn: 2,

    inputConfig: {
      type: 'text',
      placeholder: 'Ex: LOC-001',
      maxLength: 20,
    },

    validation: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },

    helperText: 'Código único para identificar a localização',
  },
  {
    name: 'type',
    type: 'select',
    label: 'Tipo',
    required: true,
    gridColumn: 1,
    options: LOCATION_TYPE_OPTIONS,
    selectConfig: {
      placeholder: 'Selecione um tipo',
    },
    validation: {
      required: true,
    },
    helperText: 'Tipo da localização',
  },

  {
    name: 'description',
    type: 'textarea',
    label: 'Descrição',
    required: false,
    gridColumn: 3,

    textareaConfig: {
      placeholder: 'Descrição detalhada da localização',
      maxLength: 500,
      rows: 4,
    },

    validation: {
      maxLength: 500,
    },

    helperText: 'Informações adicionais sobre a localização',
  },

  {
    name: 'propertyId',
    type: 'select',
    label: 'Propriedade',
    required: true,
    gridColumn: 2,

    options: [
      { value: '', label: 'Selecione uma propriedade' },
      ...properties.map((property) => ({
        value: property.id,
        label: `${property.name} (${property.code})`,
      })),
    ],

    selectConfig: {
      placeholder: 'Selecione uma propriedade',
    },

    validation: {
      required: true,
    },

    helperText: 'Propriedade à qual esta localização pertence',
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    required: true,
    gridColumn: 1,
    options: LOCATION_STATUS_OPTIONS,
    selectConfig: {
      placeholder: 'Selecione um status',
      ...(isEdit ? {} : { defaultValue: LocationStatus.ACTIVE }),
    },
    validation: {
      required: true,
    },
    helperText: 'Status da localização no sistema',
  },

  {
    name: 'area',
    type: 'input',
    label: 'Área',
    required: true,
    gridColumn: 2,

    inputConfig: {
      type: 'number',
      placeholder: 'Ex: 120.0',
      step: '0.1',
      min: 0,
    },

    validation: {
      required: true,
      min: 0,
    },

    helperText: 'Área da localização',
  },
  {
    name: 'areaType',
    type: 'select',
    label: 'Unidade de Área',
    required: true,
    gridColumn: 1,
    options: AREA_TYPE_OPTIONS,
    selectConfig: {
      placeholder: 'Selecione a unidade',
      ...(isEdit ? {} : { defaultValue: 'hectares' }),
    },
    validation: {
      required: true,
    },
    helperText: 'Unidade de medida da área',
  },

  {
    name: 'capacity',
    type: 'input',
    label: 'Capacidade',
    required: true,
    gridColumn: 1,

    inputConfig: {
      type: 'number',
      placeholder: 'Ex: 60',
      min: 1,
    },

    validation: {
      required: true,
      min: 1,
    },

    helperText: 'Capacidade máxima da localização',
  },
];

export const createLocationFormConfig = (isEdit = false) => ({
  title: '',
  description: '',
  layout: 'grid' as const,
  gridColumns: 3,
  submitButtonText: isEdit ? 'Salvar Alterações' : 'Cadastrar Localização',
  resetButtonText: isEdit ? 'Restaurar Valores' : 'Limpar Formulário',
  showResetButton: true,
});

export const getInitialValues = (): Omit<Location, 'id' | 'createdAt' | 'deletedAt'> => ({
  code: '',
  name: '',
  description: '',
  type: LocationType.LIVESTOCK,
  area: 0,
  areaType: 'hectares',
  capacity: 1,
  status: LocationStatus.ACTIVE,
  propertyId: '',
});

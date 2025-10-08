import type { FormFieldConfig } from '~/components/form/types';
import type { ServiceProvider } from '~/types/service-provider';
import { BRAZILIAN_STATES } from '~/utils/constants/location';

export const createServiceProviderFormFields = (isEdit = false): FormFieldConfig[] => [
  {
    name: 'name',
    type: 'input',
    label: 'Nome da Empresa',
    required: true,
    gridColumn: 3,

    inputConfig: {
      type: 'text',
      placeholder: 'Ex: AgroTec Soluções Agrícolas',
      maxLength: 100,
    },

    validation: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },

    helperText: 'Nome da empresa prestadora de serviço',
  },

  {
    name: 'email',
    type: 'input',
    label: 'Email',
    required: true,
    gridColumn: 2,

    inputConfig: {
      type: 'email',
      placeholder: 'Ex: contato@empresa.com.br',
      maxLength: 100,
    },

    validation: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 100,
    },

    helperText: 'Email de contato da empresa',
  },
  {
    name: 'phone',
    type: 'input',
    label: 'Telefone',
    required: true,
    gridColumn: 1,
    inputConfig: {
      type: 'tel',
      placeholder: 'Ex: (16) 3333-1111',
      maxLength: 20,
    },
    validation: {
      required: true,
      minLength: 10,
      maxLength: 20,
    },
    helperText: 'Telefone de contato',
  },

  {
    name: 'status',
    type: 'select',
    label: 'Status',
    required: true,
    gridColumn: 1,

    options: [
      { value: 'active', label: 'Ativo' },
      { value: 'inactive', label: 'Inativo' },
    ],

    selectConfig: {
      placeholder: 'Selecione um status',
      ...(isEdit ? {} : { defaultValue: 'active' }),
    },

    validation: {
      required: true,
    },

    helperText: 'Status do prestador de serviço',
  },

  {
    name: 'street',
    type: 'input',
    label: 'Rua',
    required: false,

    inputConfig: {
      type: 'text',
      placeholder: 'Nome da rua ou estrada',
      maxLength: 100,
    },

    validation: {
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
    required: false,
    inputConfig: {
      type: 'text',
      placeholder: 'Nome da cidade',
      maxLength: 50,
    },
    validation: {
      maxLength: 50,
    },
  },
  {
    name: 'state',
    type: 'select',
    label: 'Estado',
    required: false,
    options: BRAZILIAN_STATES,
    selectConfig: {
      placeholder: 'Selecione um estado',
    },
  },
  {
    name: 'country',
    type: 'input',
    label: 'País',
    required: false,
    inputConfig: {
      type: 'text',
      placeholder: 'País',
      maxLength: 50,
      ...(isEdit ? {} : { defaultValue: 'Brasil' }),
    },
    validation: {
      maxLength: 50,
    },
  },
  {
    name: 'zipCode',
    type: 'input',
    label: 'CEP',
    required: false,
    inputConfig: {
      type: 'text',
      placeholder: 'Ex: 14050-000',
      maxLength: 10,
    },
    validation: {
      maxLength: 10,
    },
    helperText: 'Código postal',
  },

  {
    name: 'latitude',
    type: 'input',
    label: 'Latitude',
    required: false,

    inputConfig: {
      type: 'number',
      placeholder: 'Ex: -23.5505',
      step: 'any',
      min: -90,
      max: 90,
    },

    validation: {
      min: -90,
      max: 90,
    },

    helperText: 'Coordenada de latitude (opcional)',
  },
  {
    name: 'longitude',
    type: 'input',
    label: 'Longitude',
    required: false,
    inputConfig: {
      type: 'number',
      placeholder: 'Ex: -46.6333',
      step: 'any',
      min: -180,
      max: 180,
    },
    validation: {
      min: -180,
      max: 180,
    },
    helperText: 'Coordenada de longitude (opcional)',
  },
];

export const createServiceProviderFormConfig = (isEdit = false) => ({
  title: '',
  description: '',
  layout: 'grid' as const,
  gridColumns: 3,
  submitButtonText: isEdit ? 'Salvar Alterações' : 'Cadastrar Prestador de Serviço',
  resetButtonText: isEdit ? 'Restaurar Valores' : 'Limpar Formulário',
  showResetButton: true,
});

export const getInitialValues = (): Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'> => ({
  name: '',
  email: '',
  phone: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  country: 'Brasil',
  zipCode: '',
  latitude: 0,
  longitude: 0,
  status: 'active',
});

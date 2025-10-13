export enum PropertyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PropertyPhase {
  CRIA = 'cria',
  RECRIA = 'recria',
  ENGORDA = 'engorda',
  CICLO_COMPLETO = 'ciclo_completo',
}

export interface PasturePlanning {
  month: string;
  precipitation: number;
  temperature: number;
  state: 'Good' | 'Medium' | 'Poor';
}

export interface Property {
  id: string;
  code: string;
  name: string;
  description?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  status: PropertyStatus;
  phases: PropertyPhase[];
  createdAt?: string;
  deletedAt?: string | null;
  pasturePlanning?: PasturePlanning[];
  // Aggregated data from getPropertyById endpoint
  statistics?: {
    totalLocations: number;
    totalAnimals: number;
    totalCapacity: number;
    occupancyPercentage: number;
    totalEmployees: number;
  };
  locations?: any[];
  animals?: any[];
  employees?: any[];
  locationMovements?: any[];
  animalLocations?: any[];
  observations?: any[];
  locationQualities?: any[];
}

// Interface para o retorno do endpoint GET /property
export interface PropertySummary {
  id: string;
  codigo: string;
  nome: string;
  endereco: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  quantidadeLocalizacoes: number;
  capacidade: {
    total: number;
    totalAnimais: number;
    porcentagemOcupacao: number;
  };
  totalColaboradores: number;
  status: PropertyStatus;
}

// Interface para a resposta da API
export interface PropertyApiResponse {
  success: boolean;
  data: PropertySummary[];
  count: number;
  message: string;
}

// Interface para criar propriedade
export interface CreatePropertyRequest {
  code: string;
  name: string;
  street: string;
  number?: string;
  neighborhood?: string;
  city: string;
  state: string;
  country?: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  status: PropertyStatus;
  phases: PropertyPhase[];
  description?: string;
}

// Interface para atualizar propriedade
export interface UpdatePropertyRequest {
  name?: string;
  totalArea?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  mainActivity?: string;
  status?: string;
  phases?: PropertyPhase[];
  acquisitionDate?: string;
  description?: string;
}

// Interface para resposta de operações CRUD
export interface PropertyCrudResponse {
  success: boolean;
  data?: any;
  message: string;
}

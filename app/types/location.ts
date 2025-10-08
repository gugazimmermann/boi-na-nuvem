export enum LocationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

export enum LocationType {
  CULTIVATION = 'cultivation',
  LIVESTOCK = 'livestock',
  STORAGE = 'storage',
  CONFINEMENT = 'confinement',
  SEMI_CONFINEMENT = 'semi-confinement',
}

export enum LocationMovimentType {
  ENTRY = 'entry',
  EXIT = 'exit',
  SUPPLEMENTATION = 'supplementation',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
  CONSTRUCTION = 'construction',
  EQUIPMENT_INSTALLATION = 'equipment_installation',
}

export enum LocationQualityType {
  GOOD = 'good',
  REGULAR = 'regular',
  BAD = 'bad',
}

export interface Location {
  id: string;
  code: string;
  name: string;
  description: string;
  type: LocationType;
  area: number;
  areaType: string;
  capacity: number;
  status: LocationStatus;
  createdAt: string;
  deletedAt: string | null;
  propertyId: string;
}

export interface LocationMoviment {
  id: string;
  type: LocationMovimentType;
  description?: string;
  quantity?: number;
  createdAt: string;
  deletedAt: string | null;
  responsibleType: ResponsibleType;
  locationId: string;
  employeeId: string | null;
  serviceProviderId: string | null;
}

export interface LocationObservation {
  id: string;
  observation: string;
  createdAt: string;
  deletedAt: string | null;
  locationId: string;
}

export interface LocationQuality {
  id: string;
  quality: LocationQualityType;
  createdAt: string;
  deletedAt: string | null;
  locationId: string;
}

export enum ResponsibleType {
  EMPLOYEE = 'employee',
  SERVICE_PROVIDER = 'serviceProvider',
}

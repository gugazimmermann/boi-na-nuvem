export interface ServiceProvider {
  id: string;
  name: string;
  cnpj?: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: string;
  deletedAt: string | null;
}

import { ResponsibleType } from './location';

export interface ServiceProviderHasProperty {
  serviceProvider_id: string;
  property_id: string;
}

export enum ServiceProviderMovimentType {
  SERVICE = 'SERVICE',
  MAINTENANCE = 'MAINTENANCE',
  CONSULTATION = 'CONSULTATION',
  DELIVERY = 'DELIVERY',
  INSTALLATION = 'INSTALLATION',
  REPAIR = 'REPAIR',
  INSPECTION = 'INSPECTION',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER',
}

export interface ServiceProviderMoviment {
  id: string;
  serviceProviderId: string;
  type: ServiceProviderMovimentType;
  description?: string;
  locationId?: string;
  propertyId?: string;
  responsibleType: ResponsibleType;
  employeeId?: string;
  createdAt: string;
  updatedAt: string;
}

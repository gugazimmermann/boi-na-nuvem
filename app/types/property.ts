export enum PropertyStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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
  latitude?: number;
  longitude?: number;
  status: PropertyStatus;
  createdAt?: string;
  deletedAt?: string | null;
}

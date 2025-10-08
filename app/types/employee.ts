export interface Employee {
  id: string;
  name: string;
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

export interface PropertyHasEmployee {
  propertyId: string;
  employeeId: string;
}

export enum AnimalBreed {
  SRD = 'SRD',
  ANGUS = 'Angus',
  NELORE = 'Nelore',
}

export enum BloodDegree {
  SRD = 'SRD',
  PO = 'PO', // Puro de Origem
  PC = 'PC', // Puro por Cruza
  F1 = 'F1', // 1ª geração (50%)
  F2 = 'F2', // 2ª geração (75%)
  F3 = 'F3', // 3ª geração (87.5%)
  F4 = 'F4', // 4ª geração (93.75%)
}

export enum AnimalSex {
  FEMEA = 'Fêmea',
  MACHO = 'Macho',
  TOURO = 'Touro',
}

export enum AnimalPurpose {
  CORTE = 'Corte',
  MATRIZ = 'Matriz',
  REPRODUTOR = 'Reprodutor',
}

export interface Animal {
  id: string;
  code: string;
  registrationNumber: string;
  breed: AnimalBreed;
  bloodDegree: BloodDegree;
  bloodPercentage: number;
  sex: AnimalSex;
  purpose: AnimalPurpose;
  birthDate: string;
  acquisitionDate: string;
  fatherId: string | null;
  motherId: string | null;
  createdAt: string;
  deletedAt: string | null;
}

export interface AnimalLocation {
  id: string;
  animalId: string;
  locationMovimentId: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface Pedigree {
  id: string;
  animalId: string;
  fatherId: string | null;
  motherId: string | null;
}

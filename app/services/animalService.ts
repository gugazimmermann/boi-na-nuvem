import { ANIMALS } from '~/mocks/animals-mock';
import type { Animal, AnimalBreed, BloodDegree } from '~/types/animal';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class AnimalService {
  private static animals: Animal[] = [...ANIMALS];

  static async getAllAnimals(): Promise<Animal[]> {
    await delay(500);
    return [...this.animals];
  }

  static async getAnimalById(id: string): Promise<Animal | null> {
    await delay(300);
    return this.animals.find((animal) => animal.id === id) || null;
  }

  static async getAnimalsByBreed(breed: AnimalBreed): Promise<Animal[]> {
    await delay(300);
    return this.animals.filter((animal) => animal.breed === breed);
  }

  static async getAnimalsByBloodDegree(bloodDegree: BloodDegree): Promise<Animal[]> {
    await delay(300);
    return this.animals.filter((animal) => animal.bloodDegree === bloodDegree);
  }

  static async createAnimal(
    animalData: Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Animal> {
    await delay(800);

    const newAnimal: Animal = {
      ...animalData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    this.animals.push(newAnimal);
    return newAnimal;
  }

  static async updateAnimal(id: string, animalData: Partial<Animal>): Promise<Animal> {
    await delay(800);

    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) {
      throw new Error('Animal não encontrado');
    }

    this.animals[index] = {
      ...this.animals[index],
      ...animalData,
      id,
    };

    return this.animals[index];
  }

  static async deleteAnimal(id: string): Promise<void> {
    await delay(500);

    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) {
      throw new Error('Animal não encontrado');
    }

    this.animals[index] = {
      ...this.animals[index],
      deletedAt: new Date().toISOString(),
    };
  }

  static async searchAnimals(query: string): Promise<Animal[]> {
    await delay(300);

    const lowercaseQuery = query.toLowerCase();
    return this.animals.filter(
      (animal) =>
        animal.code.toLowerCase().includes(lowercaseQuery) ||
        animal.registrationNumber.toLowerCase().includes(lowercaseQuery) ||
        animal.breed.toLowerCase().includes(lowercaseQuery) ||
        animal.bloodDegree.toLowerCase().includes(lowercaseQuery),
    );
  }

  static async getAnimalsByAgeRange(minAge: number, maxAge: number): Promise<Animal[]> {
    await delay(300);
    const now = new Date();
    return this.animals.filter((animal) => {
      const birthDate = new Date(animal.birthDate);
      const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return ageInYears >= minAge && ageInYears <= maxAge;
    });
  }

  static async getAnimalsByParent(parentId: string): Promise<Animal[]> {
    await delay(300);
    return this.animals.filter(
      (animal) => animal.fatherId === parentId || animal.motherId === parentId,
    );
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

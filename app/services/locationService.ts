import { LOCATIONS } from '~/mocks/locations-mock';
import type { Location, LocationType, LocationStatus } from '~/types/location';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class LocationService {
  private static locations: Location[] = [...LOCATIONS];

  static async getAllLocations(): Promise<Location[]> {
    await delay(500);
    return [...this.locations];
  }

  static async getLocationById(id: string): Promise<Location | null> {
    await delay(300);
    return this.locations.find((location) => location.id === id) || null;
  }

  static async getLocationsByPropertyId(propertyId: string): Promise<Location[]> {
    await delay(300);
    return this.locations.filter((location) => location.propertyId === propertyId);
  }

  static async createLocation(
    locationData: Omit<Location, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Location> {
    await delay(800);

    const newLocation: Location = {
      ...locationData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    this.locations.push(newLocation);
    return newLocation;
  }

  static async updateLocation(id: string, locationData: Partial<Location>): Promise<Location> {
    await delay(800);

    const index = this.locations.findIndex((location) => location.id === id);
    if (index === -1) {
      throw new Error('Localização não encontrada');
    }

    this.locations[index] = {
      ...this.locations[index],
      ...locationData,
      id,
    };

    return this.locations[index];
  }

  static async deleteLocation(id: string): Promise<void> {
    await delay(500);

    const index = this.locations.findIndex((location) => location.id === id);
    if (index === -1) {
      throw new Error('Localização não encontrada');
    }

    this.locations[index] = {
      ...this.locations[index],
      deletedAt: new Date().toISOString(),
    };
  }

  static async searchLocations(query: string): Promise<Location[]> {
    await delay(300);

    const lowercaseQuery = query.toLowerCase();
    return this.locations.filter(
      (location) =>
        location.name.toLowerCase().includes(lowercaseQuery) ||
        location.code.toLowerCase().includes(lowercaseQuery) ||
        location.description.toLowerCase().includes(lowercaseQuery),
    );
  }

  static async getLocationsByStatus(status: LocationStatus): Promise<Location[]> {
    await delay(300);
    return this.locations.filter((location) => location.status === status);
  }

  static async getLocationsByType(type: LocationType): Promise<Location[]> {
    await delay(300);
    return this.locations.filter((location) => location.type === type);
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

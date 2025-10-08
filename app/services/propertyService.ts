import { type Property } from '~/types/property';
import { PROPERTIES } from '~/mocks/properties-mock';

export class PropertyService {
  static async getAllProperties(): Promise<Property[]> {
    await this.simulateNetworkDelay();
    return PROPERTIES.filter((property) => property.code !== 'ALL' && !property.deletedAt);
  }

  static async getAllPropertiesForSelector(): Promise<Property[]> {
    await this.simulateNetworkDelay();
    return PROPERTIES.filter((property) => !property.deletedAt);
  }

  static async getPropertyById(id: string): Promise<Property | null> {
    await this.simulateNetworkDelay();
    const property = PROPERTIES.find((p) => p.id === id);
    return property || null;
  }

  static async updateProperty(id: string, updateData: Partial<Property>): Promise<Property> {
    await this.simulateNetworkDelay();

    const propertyIndex = PROPERTIES.findIndex((p) => p.id === id);
    if (propertyIndex === -1) {
      throw new Error('Propriedade não encontrada');
    }

    const updatedProperty = {
      ...PROPERTIES[propertyIndex],
      ...updateData,
      id,
    };

    PROPERTIES[propertyIndex] = updatedProperty;
    return updatedProperty;
  }

  static async createProperty(propertyData: Omit<Property, 'id'>): Promise<Property> {
    await this.simulateNetworkDelay();

    const newProperty: Property = {
      ...propertyData,
      id: `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    PROPERTIES.push(newProperty);
    return newProperty;
  }

  static async deleteProperty(id: string): Promise<void> {
    await this.simulateNetworkDelay();

    const propertyIndex = PROPERTIES.findIndex((p) => p.id === id);
    if (propertyIndex === -1) {
      throw new Error('Propriedade não encontrada');
    }

    PROPERTIES[propertyIndex].deletedAt = new Date().toISOString();
  }

  private static async simulateNetworkDelay(min: number = 100, max: number = 500): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}

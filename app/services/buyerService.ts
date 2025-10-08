import { BUYERS, PROPERTYHASBUYER } from '~/mocks/buyer-mock';
import type { Buyer, BuyerHasProperty } from '~/types/buyer';

export class BuyerService {
  static async getAll(): Promise<Buyer[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return BUYERS;
  }

  static async getById(id: string): Promise<Buyer | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return BUYERS.find((buyer) => buyer.id === id) || null;
  }

  static async create(buyer: Omit<Buyer, 'id' | 'createdAt' | 'deletedAt'>): Promise<Buyer> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newBuyer: Buyer = {
      ...buyer,
      id: `buyer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    return newBuyer;
  }

  static async update(id: string, updates: Partial<Buyer>): Promise<Buyer> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingBuyer = BUYERS.find((buyer) => buyer.id === id);
    if (!existingBuyer) {
      throw new Error('Comprador não encontrado');
    }

    return {
      ...existingBuyer,
      ...updates,
    };
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingBuyer = BUYERS.find((buyer) => buyer.id === id);
    if (!existingBuyer) {
      throw new Error('Comprador não encontrado');
    }

    return true;
  }

  static async getBuyerProperties(buyerId: string): Promise<BuyerHasProperty[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROPERTYHASBUYER.filter((buyer) => buyer.buyerId === buyerId);
  }

  static async getPropertyBuyers(propertyId: string): Promise<BuyerHasProperty[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROPERTYHASBUYER.filter((buyer) => buyer.propertyId === propertyId);
  }
}

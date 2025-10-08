import { SUPPLIERS, PROPERTYHASSUPPLIER } from '~/mocks/supplier-mock';
import type { Supplier, SupplierHasProperty } from '~/types/supplier';

export class SupplierService {
  static async getAll(): Promise<Supplier[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return SUPPLIERS;
  }

  static async getById(id: string): Promise<Supplier | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return SUPPLIERS.find((supplier) => supplier.id === id) || null;
  }

  static async create(
    supplier: Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<Supplier> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newSupplier: Supplier = {
      ...supplier,
      id: `supplier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    return newSupplier;
  }

  static async update(id: string, updates: Partial<Supplier>): Promise<Supplier> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingSupplier = SUPPLIERS.find((supplier) => supplier.id === id);
    if (!existingSupplier) {
      throw new Error('Fornecedor não encontrado');
    }

    return {
      ...existingSupplier,
      ...updates,
    };
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingSupplier = SUPPLIERS.find((supplier) => supplier.id === id);
    if (!existingSupplier) {
      throw new Error('Fornecedor não encontrado');
    }

    return true;
  }

  static async getSupplierProperties(supplierId: string): Promise<SupplierHasProperty[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROPERTYHASSUPPLIER.filter((supplier) => supplier.supplierId === supplierId);
  }

  static async getPropertySuppliers(propertyId: string): Promise<SupplierHasProperty[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return PROPERTYHASSUPPLIER.filter((supplier) => supplier.propertyId === propertyId);
  }
}

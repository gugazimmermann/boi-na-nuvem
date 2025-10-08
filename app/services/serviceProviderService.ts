import { SERVICEPROVIDERS, SERVICEPROVIDERHASPROPERTY } from '~/mocks/service-provider-mock';
import type { ServiceProvider, ServiceProviderHasProperty } from '~/types/service-provider';

export class ServiceProviderService {
  static async getAll(): Promise<ServiceProvider[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return SERVICEPROVIDERS;
  }

  static async getById(id: string): Promise<ServiceProvider | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return SERVICEPROVIDERS.find((sp) => sp.id === id) || null;
  }

  static async create(
    serviceProvider: Omit<ServiceProvider, 'id' | 'createdAt' | 'deletedAt'>,
  ): Promise<ServiceProvider> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newServiceProvider: ServiceProvider = {
      ...serviceProvider,
      id: `sp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      deletedAt: null,
    };

    return newServiceProvider;
  }

  static async update(id: string, updates: Partial<ServiceProvider>): Promise<ServiceProvider> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingServiceProvider = SERVICEPROVIDERS.find((sp) => sp.id === id);
    if (!existingServiceProvider) {
      throw new Error('Prestador de serviço não encontrado');
    }

    return {
      ...existingServiceProvider,
      ...updates,
    };
  }

  static async delete(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingServiceProvider = SERVICEPROVIDERS.find((sp) => sp.id === id);
    if (!existingServiceProvider) {
      throw new Error('Prestador de serviço não encontrado');
    }

    return true;
  }

  static async getServiceProviderProperties(
    serviceProviderId: string,
  ): Promise<ServiceProviderHasProperty[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return SERVICEPROVIDERHASPROPERTY.filter((sp) => sp.serviceProvider_id === serviceProviderId);
  }

  static async getPropertyServiceProviders(
    propertyId: string,
  ): Promise<ServiceProviderHasProperty[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return SERVICEPROVIDERHASPROPERTY.filter((sp) => sp.property_id === propertyId);
  }
}

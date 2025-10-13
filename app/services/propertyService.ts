import { 
  type PropertySummary, 
  type PropertyApiResponse, 
  type CreatePropertyRequest, 
  type UpdatePropertyRequest, 
  type PropertyCrudResponse,
  type Property 
} from '~/types/property';

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000';

// Cache para propriedades
let propertiesCache: PropertySummary[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 30000; // 30 segundos

// Debounce para evitar requests simultâneos
let pendingRequest: Promise<PropertySummary[]> | null = null;

export class PropertyService {
  static async getAllProperties(): Promise<PropertySummary[]> {
    // Se já há uma requisição pendente, aguarda ela
    if (pendingRequest) {
      return pendingRequest;
    }

    // Verifica se o cache ainda é válido
    const now = Date.now();
    if (propertiesCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return propertiesCache;
    }

    // Cria uma nova requisição
    pendingRequest = this.fetchPropertiesFromAPI();
    
    try {
      const result = await pendingRequest;
      return result;
    } finally {
      pendingRequest = null;
    }
  }

  private static async fetchPropertiesFromAPI(): Promise<PropertySummary[]> {
    const token = localStorage.getItem('boi_na_nuvem_token') || sessionStorage.getItem('boi_na_nuvem_token');
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/property`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: PropertyApiResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao buscar propriedades');
    }

    // Atualiza o cache
    propertiesCache = data.data;
    cacheTimestamp = Date.now();

    return data.data;
  }

  static clearCache(): void {
    propertiesCache = null;
    cacheTimestamp = 0;
  }

  static async refreshProperties(): Promise<PropertySummary[]> {
    this.clearCache();
    return this.getAllProperties();
  }

  // Método para obter token de autenticação
  private static getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('boi_na_nuvem_token') || sessionStorage.getItem('boi_na_nuvem_token');
  }

  // Método para obter propriedade por ID
  static async getPropertyById(id: string): Promise<Property> {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: PropertyCrudResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao buscar propriedade');
    }

    return data.data;
  }

  // Método para criar propriedade
  static async createProperty(propertyData: CreatePropertyRequest): Promise<Property> {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/property`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: PropertyCrudResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao criar propriedade');
    }

    // Limpa o cache para forçar atualização
    this.clearCache();

    return data.data;
  }

  // Método para atualizar propriedade
  static async updateProperty(id: string, propertyData: UpdatePropertyRequest): Promise<Property> {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: PropertyCrudResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao atualizar propriedade');
    }

    // Limpa o cache para forçar atualização
    this.clearCache();

    return data.data;
  }

  // Método para deletar propriedade
  static async deleteProperty(id: string): Promise<boolean> {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: PropertyCrudResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao deletar propriedade');
    }

    // Limpa o cache para forçar atualização
    this.clearCache();

    return true;
  }

  // Método para restaurar propriedade deletada
  static async restoreProperty(id: string): Promise<Property> {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/property/${id}/restore`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: PropertyCrudResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao restaurar propriedade');
    }

    // Limpa o cache para forçar atualização
    this.clearCache();

    return data.data;
  }
}

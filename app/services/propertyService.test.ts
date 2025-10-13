import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PropertyService } from './propertyService';
import { PropertyStatus } from '~/types/property';

// Mock do fetch
global.fetch = vi.fn();

describe('PropertyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock do localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => 'mock-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  describe('createProperty', () => {
    it('should create a property successfully', async () => {
      const mockPropertyData = {
        code: 'FAZ-001',
        name: 'Fazenda São José',
        street: 'Rodovia BR-163',
        city: 'Ribeirão Preto',
        state: 'São Paulo',
        zipCode: '14000-000',
        latitude: -21.1775,
        longitude: -47.8103,
        status: PropertyStatus.ACTIVE,
      };

      const mockResponse = {
        success: true,
        data: {
          id: 'prop-123',
          ...mockPropertyData,
        },
        message: 'Propriedade criada com sucesso',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PropertyService.createProperty(mockPropertyData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/property'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(mockPropertyData),
        })
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error when token is not found', async () => {
      (window.localStorage.getItem as any).mockReturnValue(null);

      const mockPropertyData = {
        code: 'FAZ-001',
        name: 'Fazenda São José',
        street: 'Rodovia BR-163',
        city: 'Ribeirão Preto',
        state: 'São Paulo',
        zipCode: '14000-000',
        latitude: -21.1775,
        longitude: -47.8103,
        status: PropertyStatus.ACTIVE,
      };

      await expect(PropertyService.createProperty(mockPropertyData)).rejects.toThrow(
        'Token de autenticação não encontrado'
      );
    });

    it('should throw error when API returns error', async () => {
      const mockPropertyData = {
        code: 'FAZ-001',
        name: 'Fazenda São José',
        street: 'Rodovia BR-163',
        city: 'Ribeirão Preto',
        state: 'São Paulo',
        zipCode: '14000-000',
        latitude: -21.1775,
        longitude: -47.8103,
        status: PropertyStatus.ACTIVE,
      };

      const mockErrorResponse = {
        success: false,
        message: 'Erro ao criar propriedade',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockErrorResponse,
      });

      await expect(PropertyService.createProperty(mockPropertyData)).rejects.toThrow(
        'Erro ao criar propriedade'
      );
    });
  });

  describe('updateProperty', () => {
    it('should update a property successfully', async () => {
      const propertyId = 'prop-123';
      const updateData = {
        name: 'Fazenda São José - Atualizada',
        description: 'Nova descrição',
      };

      const mockResponse = {
        success: true,
        data: {
          id: propertyId,
          name: updateData.name,
          description: updateData.description,
        },
        message: 'Propriedade atualizada com sucesso',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PropertyService.updateProperty(propertyId, updateData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/property/${propertyId}`),
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(updateData),
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('deleteProperty', () => {
    it('should delete a property successfully', async () => {
      const propertyId = 'prop-123';

      const mockResponse = {
        success: true,
        message: 'Propriedade deletada com sucesso',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PropertyService.deleteProperty(propertyId);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/property/${propertyId}`),
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token',
            'Content-Type': 'application/json',
          }),
        })
      );

      expect(result).toBe(true);
    });
  });

  describe('getPropertyById', () => {
    it('should get a property by ID successfully', async () => {
      const propertyId = 'prop-123';

      const mockResponse = {
        success: true,
        data: {
          id: propertyId,
          name: 'Fazenda São José',
          code: 'FAZ-001',
        },
        message: 'Propriedade encontrada',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PropertyService.getPropertyById(propertyId);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/property/${propertyId}`),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token',
            'Content-Type': 'application/json',
          }),
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('restoreProperty', () => {
    it('should restore a property successfully', async () => {
      const propertyId = 'prop-123';

      const mockResponse = {
        success: true,
        data: {
          id: propertyId,
          name: 'Fazenda São José',
          code: 'FAZ-001',
        },
        message: 'Propriedade restaurada com sucesso',
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await PropertyService.restoreProperty(propertyId);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/property/${propertyId}/restore`),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token',
            'Content-Type': 'application/json',
          }),
        })
      );

      expect(result).toEqual(mockResponse.data);
    });
  });
});

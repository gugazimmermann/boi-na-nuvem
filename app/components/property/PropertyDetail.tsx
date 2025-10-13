import React, { useState, useEffect } from 'react';
import { usePropertyCrud } from '~/hooks/usePropertyCrud';
import { Property, PropertyStatus } from '~/types/property';

interface PropertyDetailProps {
  propertyId: string;
  onClose?: () => void;
}

export function PropertyDetail({ propertyId, onClose }: PropertyDetailProps) {
  const { getPropertyById, loading, error, clearError } = usePropertyCrud();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (propertyId) {
      loadProperty();
    }
  }, [propertyId]);

  const loadProperty = async () => {
    try {
      clearError();
      const propertyData = await getPropertyById(propertyId);
      setProperty(propertyData);
    } catch (err) {
      console.error('Erro ao carregar propriedade:', err);
    }
  };

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return 'bg-green-100 text-green-800';
      case PropertyStatus.INACTIVE:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.ACTIVE:
        return 'Ativo';
      case PropertyStatus.INACTIVE:
        return 'Inativo';
      default:
        return status;
    }
  };

  const getPastureStateColor = (state: string) => {
    switch (state) {
      case 'Good':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPastureStateLabel = (state: string) => {
    switch (state) {
      case 'Good':
        return 'Bom';
      case 'Medium':
        return 'Médio';
      case 'Poor':
        return 'Ruim';
      default:
        return state;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando propriedade...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={loadProperty}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Nenhuma propriedade encontrada.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
          <p className="text-lg text-gray-600">Código: {property.code}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}>
            {getStatusLabel(property.status)}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      {property.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Descrição</h2>
          <p className="text-gray-700">{property.description}</p>
        </div>
      )}

      {/* Address Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Endereço</h2>
          <div className="space-y-2">
            {property.street && (
              <p><span className="font-medium">Rua:</span> {property.street}</p>
            )}
            {property.number && (
              <p><span className="font-medium">Número:</span> {property.number}</p>
            )}
            {property.neighborhood && (
              <p><span className="font-medium">Bairro:</span> {property.neighborhood}</p>
            )}
            {property.city && (
              <p><span className="font-medium">Cidade:</span> {property.city}</p>
            )}
            {property.state && (
              <p><span className="font-medium">Estado:</span> {property.state}</p>
            )}
            {property.country && (
              <p><span className="font-medium">País:</span> {property.country}</p>
            )}
            {property.zipCode && (
              <p><span className="font-medium">CEP:</span> {property.zipCode}</p>
            )}
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Coordenadas GPS</h2>
          <div className="space-y-2">
            {property.latitude && (
              <p><span className="font-medium">Latitude:</span> {property.latitude}</p>
            )}
            {property.longitude && (
              <p><span className="font-medium">Longitude:</span> {property.longitude}</p>
            )}
            {property.latitude && property.longitude && (
              <div className="mt-4">
                <a
                  href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Ver no Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações da Propriedade</h2>
          <div className="space-y-2">
            <p><span className="font-medium">ID:</span> {property.id}</p>
            <p><span className="font-medium">Código:</span> {property.code}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                {getStatusLabel(property.status)}
              </span>
            </p>
            {property.createdAt && (
              <p><span className="font-medium">Criado em:</span> {new Date(property.createdAt).toLocaleDateString('pt-BR')}</p>
            )}
            {property.deletedAt && (
              <p><span className="font-medium">Deletado em:</span> {new Date(property.deletedAt).toLocaleDateString('pt-BR')}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações</h2>
          <div className="space-y-2">
            <button
              onClick={loadProperty}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Atualizar Dados
            </button>
            <button
              onClick={() => window.print()}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Pasture Planning */}
      {property.pasturePlanning && property.pasturePlanning.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Planejamento de Pastagem</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mês
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precipitação (mm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temperatura (°C)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado da Pastagem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {property.pasturePlanning.map((planning, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {planning.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {planning.precipitation.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {planning.temperature.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPastureStateColor(planning.state)}`}>
                        {getPastureStateLabel(planning.state)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

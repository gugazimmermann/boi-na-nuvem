import React, { useState, useEffect } from 'react';
import { PropertyService } from '~/services/propertyService';
import { PropertySummary, PropertyStatus } from '~/types/property';
import { PropertyDetail } from './PropertyDetail';

export function PropertyList() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const propertiesData = await PropertyService.getAllProperties();
      setProperties(propertiesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar propriedades');
    } finally {
      setLoading(false);
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

  const formatAddress = (endereco: PropertySummary['endereco']) => {
    const parts = [];
    if (endereco.street) parts.push(endereco.street);
    if (endereco.number) parts.push(endereco.number);
    if (endereco.neighborhood) parts.push(endereco.neighborhood);
    if (endereco.city) parts.push(endereco.city);
    if (endereco.state) parts.push(endereco.state);
    return parts.join(', ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando propriedades...</span>
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
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={loadProperties}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (selectedPropertyId) {
    return (
      <div>
        <div className="mb-4">
          <button
            onClick={() => setSelectedPropertyId(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            ← Voltar para Lista
          </button>
        </div>
        <PropertyDetail 
          propertyId={selectedPropertyId} 
          onClose={() => setSelectedPropertyId(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Propriedades</h1>
        <button
          onClick={loadProperties}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Atualizar
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhuma propriedade encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPropertyId(property.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{property.nome}</h3>
                    <p className="text-sm text-gray-600">Código: {property.codigo}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                    {getStatusLabel(property.status)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Endereço:</span> {formatAddress(property.endereco)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Localizações:</span> {property.quantidadeLocalizacoes}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{property.capacidade.total}</p>
                    <p className="text-xs text-gray-500">Capacidade Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{property.capacidade.totalAnimais}</p>
                    <p className="text-xs text-gray-500">Animais</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Ocupação</span>
                    <span>{property.capacidade.porcentagemOcupacao.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(property.capacidade.porcentagemOcupacao, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Colaboradores:</span> {property.totalColaboradores}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPropertyId(property.id);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

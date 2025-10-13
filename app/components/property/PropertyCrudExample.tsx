import React, { useState } from 'react';
import { usePropertyCrud } from '~/hooks/usePropertyCrud';
import { 
  type CreatePropertyRequest, 
  type UpdatePropertyRequest,
  PropertyStatus 
} from '~/types/property';

export function PropertyCrudExample() {
  const {
    loading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    restoreProperty,
    clearError,
  } = usePropertyCrud();

  const [propertyId, setPropertyId] = useState('');
  const [result, setResult] = useState<any>(null);

  // Exemplo de dados para criar uma propriedade
  const exampleCreateData: CreatePropertyRequest = {
    code: 'FAZ-001',
    name: 'Fazenda São José',
    street: 'Rodovia BR-163',
    number: 'Km 45',
    neighborhood: 'Zona Rural',
    city: 'Ribeirão Preto',
    state: 'São Paulo',
    country: 'Brasil',
    zipCode: '14000-000',
    latitude: -21.1775,
    longitude: -47.8103,
    status: PropertyStatus.ACTIVE,
    description: 'Propriedade com boa infraestrutura e acesso facilitado',
  };

  // Exemplo de dados para atualizar uma propriedade
  const exampleUpdateData: UpdatePropertyRequest = {
    name: 'Fazenda São José - Atualizada',
    description: 'Propriedade atualizada com novas informações',
  };

  const handleCreateProperty = async () => {
    try {
      clearError();
      const newProperty = await createProperty(exampleCreateData);
      setResult({ operation: 'CREATE', data: newProperty });
    } catch (err) {
      console.error('Erro ao criar propriedade:', err);
    }
  };

  const handleUpdateProperty = async () => {
    if (!propertyId) {
      setError('ID da propriedade é obrigatório para atualização');
      return;
    }

    try {
      clearError();
      const updatedProperty = await updateProperty(propertyId, exampleUpdateData);
      setResult({ operation: 'UPDATE', data: updatedProperty });
    } catch (err) {
      console.error('Erro ao atualizar propriedade:', err);
    }
  };

  const handleDeleteProperty = async () => {
    if (!propertyId) {
      setError('ID da propriedade é obrigatório para exclusão');
      return;
    }

    try {
      clearError();
      const success = await deleteProperty(propertyId);
      setResult({ operation: 'DELETE', data: { success } });
    } catch (err) {
      console.error('Erro ao deletar propriedade:', err);
    }
  };

  const handleGetProperty = async () => {
    if (!propertyId) {
      setError('ID da propriedade é obrigatório para busca');
      return;
    }

    try {
      clearError();
      const property = await getPropertyById(propertyId);
      setResult({ operation: 'GET', data: property });
    } catch (err) {
      console.error('Erro ao buscar propriedade:', err);
    }
  };

  const handleRestoreProperty = async () => {
    if (!propertyId) {
      setError('ID da propriedade é obrigatório para restauração');
      return;
    }

    try {
      clearError();
      const restoredProperty = await restoreProperty(propertyId);
      setResult({ operation: 'RESTORE', data: restoredProperty });
    } catch (err) {
      console.error('Erro ao restaurar propriedade:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Exemplo de Operações CRUD - Propriedades</h2>
      
      {/* Campo para ID da propriedade */}
      <div className="mb-6">
        <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
          ID da Propriedade (para operações que precisam de ID):
        </label>
        <input
          id="propertyId"
          type="text"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o ID da propriedade"
        />
      </div>

      {/* Botões de operação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          onClick={handleCreateProperty}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Criando...' : 'Criar Propriedade'}
        </button>

        <button
          onClick={handleGetProperty}
          disabled={loading || !propertyId}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Buscando...' : 'Buscar Propriedade'}
        </button>

        <button
          onClick={handleUpdateProperty}
          disabled={loading || !propertyId}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Atualizando...' : 'Atualizar Propriedade'}
        </button>

        <button
          onClick={handleDeleteProperty}
          disabled={loading || !propertyId}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Deletando...' : 'Deletar Propriedade'}
        </button>

        <button
          onClick={handleRestoreProperty}
          disabled={loading || !propertyId}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Restaurando...' : 'Restaurar Propriedade'}
        </button>
      </div>

      {/* Exibição de erro */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
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
      )}

      {/* Exibição do resultado */}
      {result && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Resultado da Operação: {result.operation}
          </h3>
          <pre className="bg-white p-3 rounded border overflow-auto max-h-96">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      {/* Informações sobre os dados de exemplo */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">
          Dados de Exemplo Utilizados:
        </h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Criar:</strong> Usa dados fixos de exemplo (Fazenda São José)</p>
          <p><strong>Atualizar:</strong> Atualiza nome e descrição da propriedade</p>
          <p><strong>Buscar/Deletar/Restaurar:</strong> Usa o ID informado no campo acima</p>
        </div>
      </div>
    </div>
  );
}

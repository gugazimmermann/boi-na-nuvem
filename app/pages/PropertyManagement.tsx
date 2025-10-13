import React, { useState } from 'react';
import { PropertyList } from '~/components/property/PropertyList';
import { PropertyCrudExample } from '~/components/property/PropertyCrudExample';

type TabType = 'list' | 'crud' | 'details';

export default function PropertyManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('list');

  const tabs = [
    { id: 'list', label: 'Lista de Propriedades', icon: '📋' },
    { id: 'crud', label: 'Operações CRUD', icon: '⚙️' },
    { id: 'details', label: 'Detalhes', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestão de Propriedades</h1>
              <p className="mt-1 text-sm text-gray-500">
                Gerencie suas propriedades e visualize informações detalhadas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'list' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Lista de Propriedades
              </h2>
              <p className="text-gray-600">
                Visualize todas as suas propriedades e clique em uma para ver os detalhes completos.
                Os dados são carregados diretamente do backend usando o endpoint GET /property.
              </p>
            </div>
            <PropertyList />
          </div>
        )}

        {activeTab === 'crud' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Operações CRUD
              </h2>
              <p className="text-gray-600">
                Teste todas as operações CRUD (Create, Read, Update, Delete) com a API.
                Use os dados de exemplo ou forneça IDs específicos para testar.
              </p>
            </div>
            <PropertyCrudExample />
          </div>
        )}

        {activeTab === 'details' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Detalhes da Propriedade
              </h2>
              <p className="text-gray-600">
                Visualize informações completas de uma propriedade específica, incluindo:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Informações básicas (nome, código, descrição)</li>
                <li>Endereço completo</li>
                <li>Coordenadas GPS com link para Google Maps</li>
                <li>Status e datas de criação</li>
                <li>Planejamento de pastagem com dados climáticos</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Teste o Endpoint GET /property/:id
              </h3>
              <p className="text-gray-600 mb-4">
                Para testar, vá para a aba "Lista de Propriedades" e clique em "Ver Detalhes" 
                em qualquer propriedade, ou use a aba "Operações CRUD" para buscar por ID específico.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-900 mb-2">IDs de Exemplo:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li><code>550e8400-e29b-41d4-a716-446655440001</code> - Fazenda do Juca (com dados climáticos)</li>
                  <li><code>550e8400-e29b-41d4-a716-446655440002</code> - Fazenda Boa Vista (com dados climáticos)</li>
                  <li><code>550e8400-e29b-41d4-a716-446655440003</code> - Sítio Esperança (sem dados climáticos)</li>
                  <li><code>550e8400-e29b-41d4-a716-446655440006</code> - Fazenda Antiga (deletada - retorna erro 404)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

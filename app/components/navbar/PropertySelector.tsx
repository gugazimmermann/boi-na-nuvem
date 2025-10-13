import { useState, useEffect, useMemo } from 'react';
import { type PropertySummary } from '../../types/property';
import { useProperties } from '../../hooks/useProperties';
import { SelectedPropertyService } from '~/services/selectedPropertyService';

interface PropertySelectorProps {
  className?: string;
}

export function PropertySelector({ className = '' }: PropertySelectorProps) {
  const { properties, loading, error } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<PropertySummary | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar apenas propriedades ativas
  const activeProperties = useMemo(() => 
    properties.filter(property => property.status === 'active'), 
    [properties]
  );
  
  // Adicionar opção "ALL" no início da lista
  const allPropertiesOption = useMemo(() => ({
    id: 'ALL',
    codigo: 'ALL',
    nome: 'Todas as Propriedades',
    endereco: {},
    quantidadeLocalizacoes: 0,
    capacidade: { total: 0, totalAnimais: 0, porcentagemOcupacao: 0 },
    totalColaboradores: 0,
    status: 'active' as const
  }), []);
  
  const propertiesWithAll = useMemo(() => 
    [allPropertiesOption, ...activeProperties], 
    [allPropertiesOption, activeProperties]
  );

  useEffect(() => {
    if (propertiesWithAll.length === 0) return;

    const storedId = SelectedPropertyService.getSelectedPropertyId();
    if (storedId) {
      const found = propertiesWithAll.find((p) => p.id === storedId);
      if (found) {
        setSelectedProperty(found);
        return;
      }
    }

    // Se não há propriedade selecionada, seleciona a primeira
    setSelectedProperty(propertiesWithAll[0]);
    SelectedPropertyService.setSelectedPropertyId(propertiesWithAll[0].id);
  }, [propertiesWithAll]);

  const handlePropertyChange = (property: PropertySummary) => {
    setSelectedProperty(property);
    setIsOpen(false);
    SelectedPropertyService.setSelectedPropertyId(property.id);
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center space-x-2 px-3 py-2 text-sm text-red-500">
          <span>Erro ao carregar</span>
        </div>
      </div>
    );
  }

  if (!selectedProperty || propertiesWithAll.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md transition-colors duration-200 min-w-0 cursor-pointer"
        aria-label="Selecionar propriedade"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div className="flex flex-col items-start min-w-0">
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {selectedProperty.codigo}
            </span>
            <span className="text-sm font-medium truncate max-w-32">{selectedProperty.nome}</span>
          </div>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />

          <div className="absolute right-0 z-20 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {propertiesWithAll.map((property) => (
                <button
                  key={property.id}
                  onClick={() => handlePropertyChange(property)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer ${
                    selectedProperty.id === property.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : property.id === 'ALL'
                      ? 'text-gray-800 dark:text-gray-100 font-semibold border-b border-gray-200 dark:border-gray-600'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  role="menuitem"
                >
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {property.codigo}
                    </span>
                    <span className="font-medium truncate w-full">{property.nome}</span>
                  </div>
                  {selectedProperty.id === property.id && (
                    <svg
                      className="w-4 h-4 ml-auto flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

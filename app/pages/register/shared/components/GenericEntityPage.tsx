import { useState, useEffect } from 'react';
import { EntityPage } from './EntityPage';
import { useGenericEntityFilters } from '../hooks/useGenericEntityFilters';
import { useGenericEntityNavigation } from '../hooks/useGenericEntityNavigation';
import { LAYOUT_CONSTANTS } from '../constants';

interface GenericEntityPageProps<T> {
  service: {
    getAll: () => Promise<T[]>;
    delete: (id: string) => Promise<void>;
  };
  routes: {
    list: string;
    new: string;
    details: (id: string) => string;
    edit: (id: string) => string;
  };
  config: {
    searchFields: (keyof T)[];
    searchPlaceholder: string;
    filterOptions: Array<{ key: string; label: string }>;
    entityType: string;
    messages: {
      loading: string;
      errorTitle: string;
    };
  };
  createTableConfig: (props: any) => any;
  getEntityId: (entity: T) => string;
  getEntityName: (entity: T) => string;
}

export function GenericEntityPage<T extends { id: string; name: string }>({
  service,
  routes,
  config,
  createTableConfig,
  getEntityId,
  getEntityName,
}: GenericEntityPageProps<T>) {
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { handleEditEntity, handleViewEntity, handleAddEntity } = useGenericEntityNavigation({
    routes,
  });

  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, handleSort, filteredEntities } =
    useGenericEntityFilters({ entities, searchFields: config.searchFields });

  useEffect(() => {
    const loadEntities = async () => {
      try {
        setLoading(true);
        console.log('Carregando entidades...');
        const entitiesData = await service.getAll();
        console.log('Entidades carregadas:', entitiesData);
        setEntities(entitiesData);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar entidades:', err);
        setError('Erro ao carregar entidades');
      } finally {
        setLoading(false);
      }
    };

    loadEntities();
  }, []);

  const deleteEntity = async (id: string) => {
    try {
      await service.delete(id);
      setEntities((prev) => prev.filter((entity) => getEntityId(entity) !== id));
    } catch (err) {
      setError('Erro ao excluir entidade');
      console.error('Erro ao excluir entidade:', err);
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      const entitiesData = await service.getAll();
      setEntities(entitiesData);
      setError(null);
    } catch (err) {
      setError('Erro ao recarregar entidades');
      console.error('Erro ao recarregar entidades:', err);
    } finally {
      setLoading(false);
    }
  };

  const tableConfig =
    filteredEntities && Array.isArray(filteredEntities)
      ? createTableConfig({
          filteredEntities,
          searchTerm,
          setSearchTerm,
          statusFilter,
          setStatusFilter,
          handleSort,
          onEditEntity: (entity: T) => handleEditEntity(getEntityId(entity)),
          onDeleteEntity: (entity: T) => deleteEntity(getEntityId(entity)),
          onAddEntity: handleAddEntity,
          onViewEntity: (entity: T) => handleViewEntity(getEntityId(entity)),
        })
      : null;

  if (!tableConfig) {
    return null;
  }

  return (
    <EntityPage
      entities={entities}
      loading={loading}
      error={error}
      refetch={refetch}
      deleteEntity={deleteEntity}
      filteredEntities={filteredEntities || []}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter as (status: string) => void}
      handleSort={handleSort}
      tableConfig={tableConfig}
      containerClasses={LAYOUT_CONSTANTS.CONTAINER_CLASSES}
      loadingMessage={config.messages.loading}
      errorTitle={config.messages.errorTitle}
      entityType={config.entityType}
      entityNameKey="name"
    />
  );
}

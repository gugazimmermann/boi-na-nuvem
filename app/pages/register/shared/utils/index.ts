export const createEntityConfig = <T>(
  entityType: string,
  config: {
    title: string;
    subtitle: string;
    countLabel: string;
    searchPlaceholder: string;
    searchFields: (keyof T)[];
    filterOptions: Array<{ key: string; label: string }>;
  },
) => ({
  entityType,
  ...config,
});

export const getEntityMessages = (entityType: string) => ({
  loading: `Carregando ${entityType}...`,
  errorTitle: `Erro ao carregar ${entityType}`,
  notFound: `${entityType} não encontrado`,
  deleteConfirm: `Tem certeza que deseja excluir este ${entityType}?`,
  deleteSuccess: `${entityType} excluído com sucesso!`,
  createSuccess: `${entityType} cadastrado com sucesso!`,
  updateSuccess: `${entityType} atualizado com sucesso!`,
});

export const getEntityRoutes = (basePath: string) => ({
  list: basePath,
  new: `${basePath}/novo`,
  detail: (id: string) => `${basePath}/${id}`,
  edit: (id: string) => `${basePath}/${id}/editar`,
});

export const createTableConfig = (config: {
  columns: any[];
  data: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  handleSort: (field: string) => void;
  onAdd: () => void;
  addButtonText: string;
  searchPlaceholder: string;
  emptyMessage: string;
  loadingMessage: string;
  title?: string;
  subtitle?: string;
  countLabel?: string;
}) => {
  return {
    title: config.title || 'Entidades',
    subtitle: config.subtitle || 'Gerencie todas as entidades do sistema',
    count: config.data.length,
    countLabel: config.countLabel || 'entidades',
    data: config.data,
    columns: config.columns,
    filters: [
      {
        label: 'Todos',
        active: config.statusFilter === 'all',
        onClick: () => config.setStatusFilter('all'),
      },
      {
        label: 'Ativo',
        active: config.statusFilter === 'active',
        onClick: () => config.setStatusFilter('active'),
      },
      {
        label: 'Inativo',
        active: config.statusFilter === 'inactive',
        onClick: () => config.setStatusFilter('inactive'),
      },
    ],
    search: {
      placeholder: config.searchPlaceholder,
      value: config.searchTerm,
      onChange: config.setSearchTerm,
    },
    actions: {
      add: {
        label: config.addButtonText,
        onClick: config.onAdd,
      },
    },
    emptyMessage: config.emptyMessage,
    loadingMessage: config.loadingMessage,
  };
};

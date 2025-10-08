import { Icons } from './icons';

export const sidebarSections = [
  {
    title: 'Cadastros',
    items: [
      {
        id: 'animais',
        label: 'Animais',
        href: '/sistema/cadastros/animais',
        icon: Icons.animais,
      },
      {
        id: 'fornecedores',
        label: 'Fornecedores',
        href: '/sistema/cadastros/fornecedores',
        icon: Icons.fornecedores,
      },
      {
        id: 'compradores',
        label: 'Compradores',
        href: '/sistema/cadastros/compradores',
        icon: Icons.compradores,
      },
      {
        id: 'colaboradores',
        label: 'Colaboradores',
        href: '/sistema/cadastros/colaboradores',
        icon: Icons.colaboradores,
      },
      {
        id: 'prestadores',
        label: 'Prestadores de Serviço',
        href: '/sistema/cadastros/prestadores-servico',
        icon: Icons.prestadores,
      },
      {
        id: 'localizacoes',
        label: 'Localizações',
        href: '/sistema/cadastros/localizacoes',
        icon: Icons.localizacoes,
      },
      {
        id: 'propriedades',
        label: 'Propriedades',
        href: '/sistema/cadastros/propriedades',
        icon: Icons.propriedades,
      },
    ],
  },
  {
    title: 'Produção',
    items: [
      {
        id: 'nascimento',
        label: 'Nascimento',
        href: '/sistema/producao/nascimento',
        icon: Icons.nascimento,
      },
      {
        id: 'aquisicao',
        label: 'Aquisição',
        href: '/sistema/producao/aquisicao',
        icon: Icons.aquisicao,
      },
      {
        id: 'desmama',
        label: 'Desmama',
        href: '/sistema/producao/desmama',
        icon: Icons.desmama,
      },
      {
        id: 'controlePeso',
        label: 'Controle de Peso',
        href: '/sistema/producao/controle-peso',
        icon: Icons.controlePeso,
      },
      {
        id: 'reproducao',
        label: 'Reprodução',
        href: '/sistema/producao/reproducao',
        icon: Icons.reproducao,
      },
      {
        id: 'sanidade',
        label: 'Sanidade',
        href: '/sistema/producao/sanidade',
        icon: Icons.sanidade,
      },
      {
        id: 'movimentacao',
        label: 'Movimentação',
        href: '/sistema/producao/movimentacao',
        icon: Icons.movimentacao,
      },
      {
        id: 'saidaVenda',
        label: 'Saída / Venda',
        href: '/sistema/producao/saida-venda',
        icon: Icons.saidaVenda,
      },
      {
        id: 'morte',
        label: 'Morte',
        href: '/sistema/producao/morte',
        icon: Icons.morte,
      },
    ],
  },
  {
    title: 'Estoque',
    items: [
      {
        id: 'medicamentos',
        label: 'Medicamentos',
        href: '/sistema/estoque/medicamentos',
        icon: Icons.medicamentos,
      },
      {
        id: 'vacinas',
        label: 'Vacinas',
        href: '/sistema/estoque/vacinas',
        icon: Icons.vacinas,
      },
      {
        id: 'suplementos',
        label: 'Suplementos',
        href: '/sistema/estoque/suplementos',
        icon: Icons.suplementos,
      },
      {
        id: 'racao',
        label: 'Ração',
        href: '/sistema/estoque/racao',
        icon: Icons.racao,
      },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      {
        id: 'receitas',
        label: 'Receitas',
        href: '/sistema/financeiro/receitas',
        icon: Icons.receitas,
      },
      {
        id: 'despesas',
        label: 'Despesas',
        href: '/sistema/financeiro/despesas',
        icon: Icons.despesas,
      },
      {
        id: 'custosFixos',
        label: 'Custos Fixos',
        href: '/sistema/financeiro/custos-fixos',
        icon: Icons.custosFixos,
      },
      {
        id: 'custosVariaveis',
        label: 'Custos Variáveis',
        href: '/sistema/financeiro/custos-variaveis',
        icon: Icons.custosVariaveis,
      },
      {
        id: 'cda',
        label: 'CDA (Custo Diário por Animal)',
        href: '/sistema/financeiro/cda',
        icon: Icons.cda,
      },
    ],
  },
  {
    title: 'Relatórios',
    items: [
      {
        id: 'desempenho',
        label: 'Desempenho por Animal / Lote',
        href: '/sistema/relatorios/desempenho',
        icon: Icons.desempenho,
      },
      {
        id: 'custoVsLucro',
        label: 'Custo vs Lucro',
        href: '/sistema/relatorios/custo-vs-lucro',
        icon: Icons.custoVsLucro,
      },
      {
        id: 'historicoSanitario',
        label: 'Histórico Sanitário',
        href: '/sistema/relatorios/historico-sanitario',
        icon: Icons.historicoSanitario,
      },
      {
        id: 'alertas',
        label: 'Alertas',
        href: '/sistema/relatorios/alertas',
        icon: Icons.alertas,
      },
    ],
  },
];

export const styles = {
  sidebar:
    'fixed md:relative flex flex-col w-56 h-full px-3 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 min-h-0 z-40 md:z-auto transition-transform duration-300 ease-in-out',
  sectionTitle: 'px-2 text-xs text-gray-500 uppercase dark:text-gray-400',
  sectionTitleActive: 'px-2 text-xs text-blue-600 uppercase dark:text-blue-400 font-semibold',
  sectionButton:
    'flex items-center justify-between w-full px-2 py-1.5 text-left text-gray-600 transition-all duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200',
  sectionButtonActive:
    'flex items-center justify-between w-full px-2 py-1.5 text-left text-blue-600 transition-all duration-300 transform rounded-md dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-3 border-blue-500 dark:border-blue-400 shadow-sm',
  sidebarLink:
    'flex items-center px-2 py-1.5 text-gray-600 transition-all duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
  sidebarLinkActive:
    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium shadow-sm border-l-3 border-blue-500 dark:border-blue-400',
  icon: 'w-4 h-4',
  label: 'mx-1.5 text-sm font-medium',
};

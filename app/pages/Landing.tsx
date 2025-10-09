import type { Route } from '../routes/+types/landing';
import { Link } from 'react-router';
import { Button } from '../components/button';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${import.meta.env.VITE_TITLE || 'Boi na Nuvem'} - Gestão Rural Inteligente` },
    {
      name: 'description',
      content:
        'Boi na Nuvem - Sistema completo de gestão rural para propriedades, animais, colaboradores e muito mais. Modernize sua fazenda com tecnologia.',
    },
    { name: 'keywords', content: 'boi na nuvem, gestão rural, fazenda, propriedades, animais, agricultura, pecuária' },
    { property: 'og:title', content: 'Boi na Nuvem - Gestão Rural Inteligente' },
    {
      property: 'og:description',
      content: 'Sistema completo de gestão rural para propriedades, animais, colaboradores e muito mais.',
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Boi na Nuvem - Gestão Rural Inteligente' },
    {
      name: 'twitter:description',
      content: 'Sistema completo de gestão rural para propriedades, animais, colaboradores e muito mais.',
    },
  ];
}

export default function Landing() {

  console.log('import.meta.env', import.meta.env);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-green-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="Boi na Nuvem Logo"
                  className="w-14 h-14 rounded-xl object-contain shadow-lg"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-sky-600 bg-clip-text text-transparent">
                Boi na Nuvem
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/planos">
                <Button
                  config={{
                    variant: 'success',
                    size: 'lg',
                  }}
                  className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Cadastrar-se
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  config={{
                    variant: 'primary',
                    size: 'lg',
                  }}
                  className="bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Acessar Sistema
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-sky-400/20 to-sky-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-sky-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container relative z-10 flex flex-col px-6 py-12 mx-auto space-y-4 lg:h-[35rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-gradient-to-r from-green-100 to-green-100 dark:from-green-900/50 dark:to-green-900/50 rounded-full text-green-800 dark:text-green-200 text-sm font-medium shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                +500 propriedades já utilizam nossa plataforma
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl mb-4 leading-tight">
                Modernize sua{' '}
                <span className="bg-gradient-to-r from-green-600 via-green-600 to-sky-600 bg-clip-text text-transparent animate-gradient">
                  Fazenda
                </span>{' '}
                com Tecnologia de Ponta
              </h1>

              {/* Featured Logo Section */}
              <div className="flex justify-center items-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-sky-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/20">
                    <img
                      src="/assets/logo.png"
                      alt="Boi na Nuvem Logo"
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-contain shadow-lg group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-sky-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>
              </div>


              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link to="/planos">
                  <Button
                    config={{
                      variant: 'success',
                      size: 'lg',
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Começar Teste Gratuito
                    </span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    config={{
                      variant: 'primary',
                      size: 'lg',
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
                  >
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Acessar Sistema
                    </span>
                  </Button>
                </Link>
              </div>

            </div>
          </div>
          <div className="flex items-center justify-center w-full h-80 lg:w-1/2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img
                className="relative object-cover w-full h-full max-w-xl rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                src="https://assets.corteva.com/is/image/Corteva/IMG-ArtigoBlog-Topo-CustosdeProducao-BR?$articleHeader_desktop$"
                alt="Gestão rural moderna com tecnologia"
              />
              <div className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-stone-200/50 dark:border-stone-700/50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <div className="text-xs font-medium text-gray-900 dark:text-white">Produtividade</div>
                    <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">+100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 via-green-600 to-sky-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Resultados que Falam por Si
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Junte-se a centenas de produtores que já transformaram suas fazendas com tecnologia de ponta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Propriedades Ativas', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { number: '50K+', label: 'Animais Cadastrados', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              { number: '35%', label: 'Aumento na Produtividade', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { number: '24/7', label: 'Suporte Disponível', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-green-100 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Showcase Section */}
      <section className="py-16 bg-gradient-to-br from-white via-green-50/50 to-sky-50/50 dark:from-gray-900 dark:via-green-900/20 dark:to-sky-900/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-sky-400/8 to-sky-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container relative z-10 px-6 mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Conheça o{' '}
              <span className="bg-gradient-to-r from-green-600 via-green-600 to-sky-600 bg-clip-text text-transparent">
                Boi na Nuvem
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Nossa marca representa inovação, confiança e excelência em gestão rural.
              Descubra como estamos transformando o agronegócio brasileiro.
            </p>

            {/* Large Logo Display */}
            <div className="flex justify-center items-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-green-400/30 to-sky-400/30 rounded-full blur-2xl group-hover:blur-xl transition-all duration-700"></div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/30">
                  <img
                    src="/assets/logo.png"
                    alt="Boi na Nuvem Logo"
                    className="w-40 h-40 lg:w-48 lg:h-48 rounded-3xl object-contain shadow-xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-500 to-sky-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>
            </div>

            {/* Logo Description */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Inovação</h3>
                <p className="text-gray-600 dark:text-gray-300">Tecnologia de ponta para modernizar sua fazenda</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Confiança</h3>
                <p className="text-gray-600 dark:text-gray-300">Mais de 500 propriedades confiam em nossa solução</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Excelência</h3>
                <p className="text-gray-600 dark:text-gray-300">Resultados comprovados em produtividade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gradient-to-r from-green-100 via-white to-sky-100 dark:from-green-900/30 dark:via-gray-900 dark:to-sky-900/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/15 to-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-sky-400/15 to-sky-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-300/5 to-sky-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-6 py-8 mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore nossos{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                Recursos
              </span>{' '}
              Incríveis
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Sistema completo de gestão rural com todas as ferramentas necessárias para modernizar sua fazenda
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                title: 'Gestão de Propriedades',
                description: 'Controle completo de suas propriedades rurais, com informações detalhadas sobre área, localização, infraestrutura e muito mais',
                gradient: 'from-green-600 to-green-600'
              },
              {
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                title: 'Controle de Rebanho',
                description: 'Cadastro completo de animais com histórico de vacinas, tratamentos, reprodução e rastreabilidade total do rebanho',
                gradient: 'from-sky-600 to-sky-600'
              },
              {
                icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
                title: 'Gestão de Colaboradores',
                description: 'Organize sua equipe rural com controle de funcionários, prestadores de serviço e fornecedores em um só lugar',
                gradient: 'from-sky-600 to-sky-600'
              },
              {
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                title: 'Relatórios Inteligentes',
                description: 'Dashboards e relatórios detalhados para análise de produtividade, custos e tomada de decisões estratégicas',
                gradient: 'from-orange-600 to-orange-600'
              },
              {
                icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
                title: 'Acesso Mobile',
                description: 'Acesse todas as funcionalidades do seu smartphone ou tablet, ideal para uso no campo e gestão remota',
                gradient: 'from-sky-600 to-green-600'
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Dados Seguros',
                description: 'Backup automático na nuvem com criptografia de ponta a ponta, garantindo a segurança total dos seus dados',
                gradient: 'from-sky-600 to-sky-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="relative p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                      </svg>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-t from-sky-50 to-white dark:from-sky-900/20 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-sky-400/20 to-sky-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-green-400/20 to-green-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-sky-300/10 to-green-300/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              O que Nossos{' '}
              <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
                Clientes
              </span>{' '}
              Dizem
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Depoimentos reais de produtores que transformaram suas fazendas com nossa tecnologia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'João Mendes',
                farm: 'Fazenda São José - MG',
                initials: 'JM',
                gradient: 'from-green-600 to-green-600',
                quote: 'O Boi na Nuvem revolucionou a gestão da nossa fazenda. Agora temos controle total do rebanho e conseguimos tomar decisões muito mais assertivas.'
              },
              {
                name: 'Ana Silva',
                farm: 'Fazenda Boa Vista - SP',
                initials: 'AS',
                gradient: 'from-sky-600 to-sky-600',
                quote: 'A facilidade de uso é impressionante. Em poucos dias já estávamos com todos os dados organizados e os relatórios nos ajudam muito na gestão.'
              },
              {
                name: 'Roberto Costa',
                farm: 'Fazenda Esperança - GO',
                initials: 'RC',
                gradient: 'from-sky-600 to-sky-600',
                quote: 'O suporte é excepcional e o sistema é muito confiável. Recomendo para qualquer produtor que queira modernizar sua gestão rural.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="group">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="absolute top-3 right-3">
                    <svg className="w-6 h-6 text-yellow-400 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {testimonial.initials}
                    </div>
                    <div className="ml-3">
                      <div className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.farm}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits/ROI Section */}
      <section className="py-16 bg-gradient-to-l from-orange-100 via-green-100 to-sky-100 dark:from-orange-900/40 dark:via-green-900/40 dark:to-sky-900/40 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-sky-400/8 to-sky-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Por que Escolher o{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                Boi na Nuvem
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Benefícios reais que impactam diretamente na sua produtividade e lucratividade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
                title: 'Redução de Custos',
                description: 'Até 25% de redução nos custos operacionais com melhor controle e planejamento',
                gradient: 'from-green-600 to-green-600',
                percentage: '25%'
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Aumento de Produtividade',
                description: '35% mais produtividade com gestão otimizada e processos automatizados',
                gradient: 'from-sky-600 to-sky-600',
                percentage: '35%'
              },
              {
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Controle Total',
                description: 'Visão completa da fazenda com dados em tempo real e relatórios detalhados',
                gradient: 'from-sky-600 to-sky-600',
                percentage: '100%'
              },
              {
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Economia de Tempo',
                description: 'Até 40% menos tempo gasto com tarefas administrativas e burocráticas',
                gradient: 'from-orange-600 to-orange-600',
                percentage: '40%'
              }
            ].map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-float`}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon} />
                      </svg>
                    </div>

                    <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                      {benefit.percentage}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-b from-stone-100 to-white dark:from-stone-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-stone-400/15 to-stone-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-green-400/15 to-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-r from-stone-300/8 to-green-300/8 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Casos de Sucesso
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Veja como produtores reais transformaram suas fazendas com o Boi na Nuvem
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="mb-6">
                <img
                  src="https://s2-g1.glbimg.com/6EI9awPSG2qTLoyZibLD4NB_IgY=/0x0:4921x3483/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/2/T/5raQyHSQi8a8IytpKx3Q/microsoftteams-image-49-.png"
                  alt="Fazenda moderna com gestão tecnológica"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  FS
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fazenda São José</h3>
                  <p className="text-gray-600 dark:text-gray-300">Minas Gerais - 2.500 hectares</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Desafio:</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Controle manual de 1.200 cabeças de gado, dificuldade para rastrear vacinas e tratamentos,
                  falta de relatórios para tomada de decisão.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Solução:</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Implementação completa do Boi na Nuvem com cadastro de todos os animais,
                  controle de vacinas e tratamentos, e relatórios automatizados.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Resultados:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">40%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Redução de custos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">60%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Menos tempo admin</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg">
              <div className="mb-6">
                <img
                  src="https://nutricaoesaudeanimal.com.br/wp-content/uploads/2021/11/GettyImages-936361154-1-780x450.jpg"
                  alt="Fazenda Boa Vista com gestão de nutrição animal"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  FB
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fazenda Boa Vista</h3>
                  <p className="text-gray-600 dark:text-gray-300">São Paulo - 1.800 hectares</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Desafio:</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Gestão de múltiplas propriedades, controle de colaboradores,
                  necessidade de relatórios para investidores.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Solução:</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sistema centralizado para todas as propriedades, gestão de equipe,
                  dashboards executivos e relatórios personalizados.
                </p>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Resultados:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Mais produtividade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">30%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Aumento lucro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Integrations Section */}
      <section className="py-16 bg-gradient-to-tr from-sky-100 via-white to-green-100 dark:from-sky-900/30 dark:via-gray-900 dark:to-green-900/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-sky-400/20 to-sky-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-400/20 to-green-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-60 h-60 bg-gradient-to-r from-sky-300/12 to-green-300/12 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-r from-sky-200/10 to-green-200/10 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tecnologia de{' '}
              <span className="bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent">
                Ponta
              </span>{' '}
              e Integrações
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Construído com as melhores tecnologias e integrado com as principais ferramentas do mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                title: 'Cloud Computing',
                description: 'Infraestrutura em nuvem escalável e confiável, garantindo alta disponibilidade e performance',
                gradient: 'from-sky-600 to-sky-600'
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Segurança Avançada',
                description: 'Criptografia de ponta a ponta e conformidade com LGPD para máxima proteção dos dados',
                gradient: 'from-green-600 to-green-600'
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'API Integrada',
                description: 'APIs robustas para integração com sistemas de terceiros e automação de processos',
                gradient: 'from-sky-600 to-sky-600'
              }
            ].map((tech, index) => (
              <div key={index} className="group">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tech.gradient} rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tech.icon} />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {tech.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technology Stack */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Stack Tecnológico
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'React', color: 'from-sky-400 to-sky-600' },
                { name: 'TypeScript', color: 'from-sky-500 to-sky-700' },
                { name: 'Tailwind CSS', color: 'from-sky-400 to-sky-600' },
                { name: 'Node.js', color: 'from-green-500 to-green-700' },
                { name: 'PostgreSQL', color: 'from-sky-500 to-sky-700' },
                { name: 'AWS', color: 'from-orange-500 to-orange-700' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tech.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-white font-bold text-xs">{tech.name}</span>
                  </div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-green-600 to-sky-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
            Pronto para{' '}
            <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Modernizar
            </span>{' '}
            sua Fazenda?
          </h3>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Junte-se a centenas de produtores rurais que já utilizam o Boi na Nuvem para
            otimizar a gestão de suas propriedades e aumentar sua produtividade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/planos">
              <Button
                config={{
                  variant: 'ghost',
                  size: 'xl',
                }}
                className="bg-white text-green-600 border-2 border-white hover:bg-green-50 hover:border-green-100 font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 backdrop-blur-sm"
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Cadastrar-se Gratuitamente
                </span>
              </Button>
            </Link>
            <Link to="/login">
              <Button
                config={{
                  variant: 'primary',
                  size: 'xl',
                }}
                className="bg-green-600 text-white border-2 border-green-500 hover:bg-green-700 hover:border-green-600 font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Acessar Sistema
                </span>
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-green-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Teste gratuito de 14 dias</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Sem compromisso</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-stone-50 via-white to-green-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-green-400/10 to-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-sky-400/10 to-sky-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Perguntas{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o Boi na Nuvem e descubra como podemos ajudar sua fazenda
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Como funciona o período de teste gratuito?',
                answer: 'Oferecemos 14 dias de teste gratuito para todos os planos. Você terá acesso completo a todas as funcionalidades sem necessidade de cartão de crédito. Após o período de teste, você pode escolher o plano que melhor se adequa às suas necessidades.'
              },
              {
                question: 'Meus dados estão seguros na nuvem?',
                answer: 'Sim! Utilizamos criptografia de ponta a ponta e fazemos backup automático diário. Seus dados são armazenados em servidores seguros no Brasil, seguindo as melhores práticas de segurança e conformidade com a LGPD.'
              },
              {
                question: 'Posso usar o sistema no celular?',
                answer: 'Absolutamente! O Boi na Nuvem é totalmente responsivo e funciona perfeitamente em smartphones e tablets. Ideal para uso no campo, permitindo que você gerencie sua fazenda de qualquer lugar.'
              },
              {
                question: 'Posso cancelar a qualquer momento?',
                answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Seus dados ficam disponíveis por 30 dias após o cancelamento para que você possa fazer backup ou migrar para outro sistema.'
              },
              {
                question: 'Há suporte técnico disponível?',
                answer: 'Sim! Oferecemos suporte técnico 24/7 via chat, email e telefone. Nossa equipe está sempre disponível para ajudar você a aproveitar ao máximo todas as funcionalidades do sistema.'
              },
              {
                question: 'Posso importar dados de outros sistemas?',
                answer: 'Sim! Oferecemos ferramentas de importação para facilitar a migração de dados de planilhas Excel, sistemas de gestão rural existentes e outros formatos. Nossa equipe também pode ajudar no processo de migração.'
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-green-400/10 to-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-sky-400/10 to-sky-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container p-6 mx-auto relative z-10">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <img
                      src="/assets/logo.png"
                      alt="Boi na Nuvem Logo"
                      className="w-14 h-14 rounded-xl object-contain shadow-lg"
                    />
                  </div>
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    Boi na Nuvem
                  </h4>
                </div>

                <p className="max-w-sm mt-3 text-gray-300 text-sm leading-relaxed">
                  Junte-se a centenas de produtores rurais que já utilizam o Boi na Nuvem para
                  modernizar a gestão de suas propriedades e aumentar sua produtividade.
                </p>

                <div className="flex mt-6 -mx-2">
                  {[
                    { name: 'Facebook', icon: 'M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z' },
                    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="mx-2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 transition-all duration-300 hover:text-white hover:bg-white/20 hover:scale-110"
                      aria-label={social.name}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    title: 'Sobre',
                    links: ['Empresa', 'Comunidade', 'Carreiras']
                  },
                  {
                    title: 'Recursos',
                    links: ['Propriedades', 'Animais', 'Colaboradores']
                  },
                  {
                    title: 'Produtos',
                    links: ['Gestão Rural', 'Controle de Rebanho', 'Relatórios']
                  },
                  {
                    title: 'Contato',
                    links: ['+55 (11) 99999-9999', 'contato@boinanuvem.com.br']
                  }
                ].map((section, index) => (
                  <div key={index}>
                    <h3 className="text-white font-bold text-base mb-3">{section.title}</h3>
                    <div className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href="#"
                          className="block text-gray-300 text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gradient-to-r from-transparent via-stone-600 to-transparent border-none" />

          <div className="text-center">
            <p className="text-gray-400">
              © Boi na Nuvem {new Date().getFullYear()} - Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


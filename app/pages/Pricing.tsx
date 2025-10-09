import type { Route } from '../routes/+types/pricing';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { PricingPlans } from '../components/pricing-plans';
import { Button } from '../components/button';
import { PlanService } from '~/services/planService';
import type { Plan } from '~/types/plan';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `Planos - ${import.meta.env.VITE_TITLE || 'Boi na Nuvem'}` },
    {
      name: 'description',
      content: 'Escolha o plano ideal para sua propriedade rural. Preços transparentes e sem surpresas.',
    },
    { name: 'keywords', content: 'planos, preços, gestão rural, fazenda, propriedades, assinatura' },
    { property: 'og:title', content: 'Planos - Boi na Nuvem' },
    {
      property: 'og:description',
      content: 'Escolha o plano ideal para sua propriedade rural. Preços transparentes e sem surpresas.',
    },
    { property: 'og:type', content: 'website' },
  ];
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await PlanService.getAll();
        if (mounted) setPlans(data);
      } catch (e) {
        setError('Não foi possível carregar os planos. Tente novamente.');
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const handlePlanSelect = (planId: string) => {
    // Redirecionar para o cadastro de usuário
    // Todos os usuários começam com trial do plano Enterprise
    console.log('Iniciando cadastro com trial do plano Enterprise');
    window.location.href = '/cadastro';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/assets/angus.png"
                  alt="Boi na Nuvem Logo"
                  className="w-10 h-10 rounded-xl object-cover shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Boi na Nuvem
              </h1>
            </Link>
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button
                  config={{
                    variant: 'secondary',
                    size: 'lg',
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Voltar ao Início
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  config={{
                    variant: 'primary',
                    size: 'lg',
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
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
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container relative z-10 flex flex-col px-6 py-12 mx-auto space-y-4 lg:py-16">
          <div className="w-full">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full text-green-800 dark:text-green-200 text-sm font-medium shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Planos transparentes e sem surpresas
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl mb-4 leading-tight">
                Conheça nossos{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                  Planos
                </span>{' '}
                e comece grátis
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                Todos os novos usuários recebem 14 dias grátis do plano Enterprise.
                <span className="font-semibold text-green-600 dark:text-green-400"> Sem compromisso</span>, sem cartão de crédito.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 text-red-600 dark:text-red-400">{error}</div>
      )}
      <PricingPlans plans={plans} onPlanSelect={handlePlanSelect} />

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Perguntas{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossos planos e descubra como podemos ajudar sua fazenda
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Posso cancelar a qualquer momento?',
                answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Seus dados ficam disponíveis por 30 dias após o cancelamento para que você possa fazer backup ou migrar para outro sistema.'
              },
              {
                question: 'Há período de teste gratuito?',
                answer: 'Sim! Todos os novos usuários recebem automaticamente 14 dias grátis do plano Enterprise. Você terá acesso completo a todas as funcionalidades sem necessidade de cartão de crédito. Após o período de teste, você pode escolher o plano que melhor se adequa às suas necessidades.'
              },
              {
                question: 'Posso alterar meu plano depois?',
                answer: 'Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas imediatamente e você só paga a diferença proporcional.'
              },
              {
                question: 'Meus dados estão seguros?',
                answer: 'Sim! Utilizamos criptografia de ponta a ponta e fazemos backup automático diário. Seus dados são armazenados em servidores seguros no Brasil, seguindo as melhores práticas de segurança e conformidade com a LGPD.'
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
            Ainda tem{' '}
            <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Dúvidas
            </span>?
          </h3>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Nossa equipe está pronta para ajudar você a escolher o plano ideal para sua propriedade.
            Fale conosco e tire todas as suas dúvidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contato@boinanuvem.com.br">
              <Button
                config={{
                  variant: 'success',
                  size: 'xl',
                }}
                className="bg-white text-green-600 border-2 border-white hover:bg-emerald-50 hover:border-emerald-100 font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Falar com Especialista
                </span>
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-emerald-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Resposta em até 2 horas</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Suporte especializado</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Consultoria gratuita</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

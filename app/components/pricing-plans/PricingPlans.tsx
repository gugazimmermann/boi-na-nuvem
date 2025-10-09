import { useState } from 'react';
import { Button } from '../button';
import type { Plan } from '~/types/plan';

interface PricingPlansProps {
    plans: Plan[];
    onPlanSelect?: (planId: string) => void;
    className?: string;
}

export function PricingPlans({ plans, onPlanSelect, className = '' }: PricingPlansProps) {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const handlePlanSelect = (planId: string) => {
        if (onPlanSelect) {
            onPlanSelect(planId);
        }
    };

    const getPrice = (price: number, period: string) => {
        if (price === 0) return 0;
        const finalPrice = billingPeriod === 'yearly' ? price * 12 * 0.75 : price;

        // Format with Brazilian number format: thousands separator (.) and decimal separator (,)
        return finalPrice.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const getPeriod = (period: string) => {
        if (period === 'Gratuito') return 'Gratuito';
        return billingPeriod === 'yearly' ? 'Ano' : 'Mês';
    };

    return (
        <section className={`bg-white dark:bg-gray-900 ${className}`}>
            <div className="container px-6 py-8 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-gray-100">
                            Preços simples e transparentes
                        </h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Sem contratos. Sem taxas surpresa.
                        </p>
                    </div>

                    <div className="overflow-hidden p-0.5 mt-6 border rounded-lg dark:border-gray-700">
                        <div className="sm:-mx-0.5 flex">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 rounded-lg transition-colors duration-300 ${billingPeriod === 'monthly'
                                    ? 'text-white bg-blue-500'
                                    : 'text-gray-800 dark:text-gray-200 dark:hover:bg-gray-800 bg-transparent hover:bg-gray-200'
                                    }`}
                            >
                                Mensal
                            </button>
                            <button
                                onClick={() => setBillingPeriod('yearly')}
                                className={`focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 rounded-lg transition-colors duration-300 ${billingPeriod === 'yearly'
                                    ? 'text-white bg-blue-500'
                                    : 'text-gray-800 dark:text-gray-200 dark:hover:bg-gray-800 bg-transparent hover:bg-gray-200'
                                    }`}
                            >
                                Anual
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`px-6 py-4 transition-colors duration-300 transform rounded-lg ${plan.isPopular
                                ? 'bg-gray-700 dark:bg-gray-800'
                                : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                        >
                            <p className={`text-lg font-medium ${plan.isPopular
                                ? 'text-gray-100'
                                : 'text-gray-800 dark:text-gray-100'
                                }`}>
                                {plan.name}
                            </p>

                            <h4 className={`mt-2 text-3xl font-semibold ${plan.isPopular
                                ? 'text-gray-100'
                                : 'text-gray-800 dark:text-gray-100'
                                }`}>
                                {plan.price === 0 ? 'Gratuito' : `R$ ${getPrice(plan.price, 'Mês')}`}{' '}
                                <span className={`text-base font-normal ${plan.isPopular
                                    ? 'text-gray-400'
                                    : 'text-gray-600 dark:text-gray-400'
                                    }`}>
                                    {plan.price === 0 ? '' : ` / ${getPeriod('Mês')}`}
                                </span>
                            </h4>

                            <p className={`mt-4 ${plan.isPopular
                                ? 'text-gray-300'
                                : 'text-gray-500 dark:text-gray-300'
                                }`}>
                                {plan.description}
                            </p>

                            <div className="mt-8 space-y-8">
                                {plan.features.map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className={`mx-4 ${plan.isPopular
                                            ? 'text-gray-300'
                                            : 'text-gray-700 dark:text-gray-300'
                                            }`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {plan.isPopular ? 'Plano recomendado' : 'Disponível após o trial'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Comece seu teste gratuito hoje!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Experimente o plano Enterprise por 14 dias grátis. Sem compromisso, sem cartão de crédito.
                        </p>
                        <Button
                            config={{
                                variant: 'primary',
                                size: 'xl',
                            }}
                            onClick={() => handlePlanSelect('enterprise-trial')}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Começar Teste Gratuito - 14 dias
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

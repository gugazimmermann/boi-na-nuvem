import { Link } from 'react-router';
import { Button } from '../components/button';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src="/assets/logo.png"
                                    alt="Boi na Nuvem Logo"
                                    className="w-14 h-14 rounded-xl object-contain"
                                />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                Boi na Nuvem
                            </h1>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <Link to="/planos">
                                <Button
                                    config={{
                                        variant: 'secondary',
                                        size: 'lg',
                                    }}
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Ver Planos
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
                                    Fazer Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 lg:p-12">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-full text-green-800 dark:text-green-200 text-sm font-medium shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                                <svg className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Proteção de Dados
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Política de Privacidade
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Última atualização: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="space-y-8">
                                {/* 1. Introdução */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                                        1. Introdução
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Esta Política de Privacidade descreve como o Boi na Nuvem coleta, usa, armazena e protege suas informações pessoais. Estamos comprometidos em proteger sua privacidade e cumprir com a Lei Geral de Proteção de Dados (LGPD) e outras regulamentações aplicáveis.
                                        </p>
                                    </div>
                                </section>

                                {/* 2. Informações Coletadas */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                        2. Informações que Coletamos
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">2.1 Informações Pessoais</h3>
                                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                                <li>Nome completo</li>
                                                <li>Endereço de email</li>
                                                <li>Número de telefone</li>
                                                <li>CPF/CNPJ</li>
                                                <li>Endereço residencial/comercial</li>
                                            </ul>

                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6">2.2 Informações de Uso</h3>
                                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                                <li>Dados de acesso e navegação</li>
                                                <li>Informações sobre propriedades rurais</li>
                                                <li>Dados de animais e rebanhos</li>
                                                <li>Informações de colaboradores</li>
                                                <li>Dados de fornecedores e compradores</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* 3. Como Usamos suas Informações */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                                        3. Como Usamos suas Informações
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            Utilizamos suas informações para:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                            <li>Fornecer e melhorar nossos serviços</li>
                                            <li>Processar transações e pagamentos</li>
                                            <li>Comunicar-nos com você sobre o serviço</li>
                                            <li>Gerar relatórios e análises</li>
                                            <li>Cumprir obrigações legais</li>
                                            <li>Proteger contra fraudes e abusos</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* 4. Compartilhamento de Informações */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                                        4. Compartilhamento de Informações
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            Não vendemos, alugamos ou compartilhamos suas informações pessoais, exceto nas seguintes situações:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                            <li>Com seu consentimento explícito</li>
                                            <li>Para cumprir obrigações legais</li>
                                            <li>Com prestadores de serviços confiáveis (sob acordos de confidencialidade)</li>
                                            <li>Em caso de fusão, aquisição ou venda de ativos</li>
                                            <li>Para proteger nossos direitos e segurança</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* 5. Segurança dos Dados */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                                        5. Segurança dos Dados
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                            <li>Criptografia de dados em trânsito e em repouso</li>
                                            <li>Controles de acesso rigorosos</li>
                                            <li>Monitoramento contínuo de segurança</li>
                                            <li>Backups regulares e seguros</li>
                                            <li>Treinamento de equipe em proteção de dados</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* 6. Seus Direitos */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                                        6. Seus Direitos
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            De acordo com a LGPD, você tem os seguintes direitos:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                            <li>Confirmar a existência de tratamento de dados</li>
                                            <li>Acessar seus dados pessoais</li>
                                            <li>Corrigir dados incompletos ou inexatos</li>
                                            <li>Solicitar anonimização ou eliminação de dados</li>
                                            <li>Solicitar portabilidade de dados</li>
                                            <li>Revogar consentimento a qualquer momento</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* 7. Retenção de Dados */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                                        7. Retenção de Dados
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei. Após esse período, excluiremos ou anonimizaremos seus dados.
                                        </p>
                                    </div>
                                </section>

                                {/* 8. Cookies e Tecnologias Similares */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
                                        8. Cookies e Tecnologias Similares
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do serviço e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
                                        </p>
                                    </div>
                                </section>

                                {/* 9. Alterações na Política */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
                                        9. Alterações nesta Política
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do serviço ou por email. Recomendamos revisar esta política regularmente.
                                        </p>
                                    </div>
                                </section>

                                {/* 10. Contato */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">10</span>
                                        10. Contato
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato conosco:
                                        </p>
                                        <div className="mt-4 space-y-2">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <strong>Email:</strong> <a href="mailto:privacidade@boinanuvem.com" className="text-green-600 dark:text-green-400 hover:underline">privacidade@boinanuvem.com</a>
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <strong>Encarregado de Dados (DPO):</strong> dpo@boinanuvem.com
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-12 text-center">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <Link to="/" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors">
                                        ← Voltar ao início
                                    </Link>
                                </p>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        © {new Date().getFullYear()} Boi na Nuvem. Todos os direitos reservados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

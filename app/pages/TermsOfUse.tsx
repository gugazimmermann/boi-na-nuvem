import { Link } from 'react-router';
import { Button } from '../components/button';

export default function TermsOfUse() {
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
                            <div className="inline-flex items-center px-3 py-1.5 mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                                <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Documento Legal
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Termos de Uso
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Última atualização: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="space-y-8">
                                {/* 1. Aceitação dos Termos */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                                        1. Aceitação dos Termos
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Ao acessar e utilizar o sistema Boi na Nuvem, você concorda em cumprir e estar vinculado aos termos e condições de uso estabelecidos neste documento. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                                        </p>
                                    </div>
                                </section>

                                {/* 2. Descrição do Serviço */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                        2. Descrição do Serviço
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            O Boi na Nuvem é uma plataforma de gestão rural que oferece ferramentas para:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                            <li>Gestão de propriedades rurais</li>
                                            <li>Controle de animais e rebanhos</li>
                                            <li>Administração de colaboradores</li>
                                            <li>Gestão de fornecedores e compradores</li>
                                            <li>Controle de localizações e movimentações</li>
                                            <li>Relatórios e análises</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* 3. Conta de Usuário */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                                        3. Conta de Usuário
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <div className="space-y-4">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                Para utilizar nossos serviços, você deve criar uma conta fornecendo informações precisas e atualizadas. Você é responsável por:
                                            </p>
                                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                                <li>Manter a confidencialidade de sua senha</li>
                                                <li>Todas as atividades que ocorrem em sua conta</li>
                                                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                                                <li>Fornecer informações verdadeiras e precisas</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* 4. Uso Aceitável */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                                        4. Uso Aceitável
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            Você concorda em não utilizar o sistema para:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                                            <li>Atividades ilegais ou não autorizadas</li>
                                            <li>Violar direitos de propriedade intelectual</li>
                                            <li>Transmitir vírus ou códigos maliciosos</li>
                                            <li>Interferir no funcionamento do sistema</li>
                                            <li>Tentar acessar contas de outros usuários</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* 5. Propriedade Intelectual */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                                        5. Propriedade Intelectual
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Todo o conteúdo do Boi na Nuvem, incluindo software, design, textos, gráficos e logotipos, é propriedade da empresa e está protegido por leis de direitos autorais e outras leis de propriedade intelectual. Você não pode copiar, modificar ou distribuir nosso conteúdo sem autorização expressa.
                                        </p>
                                    </div>
                                </section>

                                {/* 6. Limitação de Responsabilidade */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                                        6. Limitação de Responsabilidade
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            O Boi na Nuvem é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar nossos serviços.
                                        </p>
                                    </div>
                                </section>

                                {/* 7. Modificações */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                                        7. Modificações dos Termos
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. O uso continuado do serviço após as modificações constitui aceitação dos novos termos.
                                        </p>
                                    </div>
                                </section>

                                {/* 8. Contato */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
                                        8. Contato
                                    </h2>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: <a href="mailto:contato@boinanuvem.com" className="text-blue-600 dark:text-blue-400 hover:underline">contato@boinanuvem.com</a>
                                        </p>
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

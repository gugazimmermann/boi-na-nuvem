import React, { useState } from 'react';

// Ícones SVG customizados
const XIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MapPinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ExternalLinkIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const CopyIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function HelpModal({ isOpen, onClose, title, children }: HelpModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface CoordinatesHelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CoordinatesHelpModal({ isOpen, onClose }: CoordinatesHelpModalProps) {
    const [copiedStep, setCopiedStep] = useState<number | null>(null);

    const copyToClipboard = async (text: string, step: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedStep(step);
            setTimeout(() => setCopiedStep(null), 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    const steps = [
        {
            title: "1. Acesse o Google Maps",
            description: "Abra o Google Maps no seu navegador",
            action: "Clique no link para abrir o Google Maps",
            link: "https://maps.google.com",
            code: "https://maps.google.com"
        },
        {
            title: "2. Pesquise o endereço",
            description: "Digite o endereço completo no campo de pesquisa",
            action: "Exemplo: Rua das Flores, 123, Centro, São Paulo, SP",
            code: "Rua das Flores, 123, Centro, São Paulo, SP"
        },
        {
            title: "3. Clique no local exato",
            description: "Clique no ponto exato do endereço no mapa",
            action: "O marcador vermelho aparecerá no local",
            code: "Clique no mapa"
        },
        {
            title: "4. Copie as coordenadas",
            description: "As coordenadas aparecerão na parte inferior da tela",
            action: "Clique nas coordenadas para copiá-las",
            code: "-23.5505, -46.6333"
        }
    ];

    return (
        <HelpModal isOpen={isOpen} onClose={onClose} title="Como obter Latitude e Longitude">
            <div className="space-y-6">
                {/* Introdução */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                        <MapPinIcon className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0 w-5 h-5" />
                        <div>
                            <h3 className="font-medium text-blue-900 dark:text-blue-100">
                                O que são Latitude e Longitude?
                            </h3>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                São coordenadas geográficas que indicam a localização exata de um lugar na Terra.
                                A latitude indica a distância do Equador, e a longitude indica a distância do Meridiano de Greenwich.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Passo a passo */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Passo a passo para obter as coordenadas:
                    </h3>

                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {step.description}
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                            {step.action}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-4">
                                        {step.link ? (
                                            <a
                                                href={step.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                            >
                                                <ExternalLinkIcon className="mr-1 w-3.5 h-3.5" />
                                                Abrir
                                            </a>
                                        ) : null}

                                        <button
                                            onClick={() => copyToClipboard(step.code, index)}
                                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            {copiedStep === index ? (
                                                <>
                                                    <CheckIcon className="mr-1 w-3.5 h-3.5" />
                                                    Copiado!
                                                </>
                                            ) : (
                                                <>
                                                    <CopyIcon className="mr-1 w-3.5 h-3.5" />
                                                    Copiar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {step.code && (
                                    <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded border">
                                        <code className="text-xs text-gray-800 dark:text-gray-200 font-mono">
                                            {step.code}
                                        </code>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dicas adicionais */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                        💡 Dicas importantes:
                    </h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                        <li>• A latitude varia de -90° a +90° (negativo = Sul, positivo = Norte)</li>
                        <li>• A longitude varia de -180° a +180° (negativo = Oeste, positivo = Leste)</li>
                        <li>• Use ponto (.) como separador decimal, não vírgula</li>
                        <li>• Exemplo: -23.5505, -46.6333 (São Paulo, SP)</li>
                    </ul>
                </div>

                {/* Botão de fechar */}
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </HelpModal>
    );
}

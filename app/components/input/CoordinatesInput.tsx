import React, { useState } from 'react';
import { Input } from './Input';
import { CoordinatesHelpModal } from '../modal/HelpModal';
import type { InputProps } from './types';

// Ícone SVG customizado
const HelpCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface CoordinatesInputProps extends InputProps {
    value: string | number;
    onChange: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export function CoordinatesInput({
    value,
    onChange,
    onBlur,
    onFocus,
    ...inputProps
}: CoordinatesInputProps) {
    const [showHelpModal, setShowHelpModal] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <>
            <div className="relative">
                <Input
                    {...inputProps}
                    config={{
                        ...inputProps.config,
                        value: value?.toString() || '',
                    }}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className={`${inputProps.className || ''} pr-14`}
                />

                {/* Botão de ajuda */}
                <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Como obter latitude e longitude"
                >
                    <HelpCircleIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Modal de ajuda */}
            <CoordinatesHelpModal
                isOpen={showHelpModal}
                onClose={() => setShowHelpModal(false)}
            />
        </>
    );
}

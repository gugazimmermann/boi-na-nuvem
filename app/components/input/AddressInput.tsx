import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Input } from './Input';
import { FormContext } from '../form/Form';
import { BRAZILIAN_STATES } from '~/utils/constants/location';
import type { InputProps } from './types';

interface AddressSuggestion {
    place_id: string;
    display_name: string;
    lat: string;
    lon: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        suburb?: string;
        neighbourhood?: string;
        postcode?: string;
    };
}

interface AddressInputProps extends Omit<InputProps, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    onAddressSelect: (address: AddressSuggestion) => void;
}

// Função para mapear nome do estado para código
const mapStateNameToCode = (stateName: string): string => {
    const stateMap: Record<string, string> = {
        'Acre': 'AC',
        'Alagoas': 'AL',
        'Amapá': 'AP',
        'Amazonas': 'AM',
        'Bahia': 'BA',
        'Ceará': 'CE',
        'Distrito Federal': 'DF',
        'Espírito Santo': 'ES',
        'Goiás': 'GO',
        'Maranhão': 'MA',
        'Mato Grosso': 'MT',
        'Mato Grosso do Sul': 'MS',
        'Minas Gerais': 'MG',
        'Pará': 'PA',
        'Paraíba': 'PB',
        'Paraná': 'PR',
        'Pernambuco': 'PE',
        'Piauí': 'PI',
        'Rio de Janeiro': 'RJ',
        'Rio Grande do Norte': 'RN',
        'Rio Grande do Sul': 'RS',
        'Rondônia': 'RO',
        'Roraima': 'RR',
        'Santa Catarina': 'SC',
        'São Paulo': 'SP',
        'Sergipe': 'SE',
        'Tocantins': 'TO',
    };

    return stateMap[stateName] || stateName;
};

export function AddressInput({
    value,
    onChange,
    onAddressSelect,
    ...inputProps
}: AddressInputProps) {
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasUserTyped, setHasUserTyped] = useState(false);
    const initialValueRef = useRef(value);
    const formContext = useContext(FormContext);

    // Debounce simples
    useEffect(() => {
        if (value.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value + ', Brasil')}&countrycodes=br&limit=5&addressdetails=1`;
                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'BoiNaNuvem/1.0',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const processedResults = data
                        .filter((item: any) => item.display_name && item.address)
                        .map((item: any) => ({
                            place_id: item.place_id,
                            display_name: item.display_name,
                            lat: item.lat,
                            lon: item.lon,
                            address: {
                                city: item.address.city || item.address.town || item.address.village,
                                state: item.address.state,
                                suburb: item.address.suburb || item.address.neighbourhood,
                                postcode: item.address.postcode
                            }
                        }))
                        .slice(0, 5);

                    setAddressSuggestions(processedResults);
                    // Only show suggestions if user has typed something
                    if (hasUserTyped) {
                        setShowSuggestions(true);
                    }
                }
            } catch (error) {
                console.warn('Erro na busca de endereços:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [value, hasUserTyped]);

    const selectAddress = useCallback((address: AddressSuggestion) => {
        const addressDetails = address.address;
        const streetValue = address.display_name.split(',')[0] || '';
        const cityValue = addressDetails.city || addressDetails.town || addressDetails.village || '';
        const stateName = addressDetails.state || '';
        const stateValue = mapStateNameToCode(stateName); // Mapear nome para código
        const neighborhoodValue = addressDetails.suburb || addressDetails.neighbourhood || '';
        const zipCodeValue = addressDetails.postcode || '';
        const latitude = parseFloat(address.lat);
        const longitude = parseFloat(address.lon);

        // Preencher os campos usando o FormContext
        if (formContext?.setFieldValue) {
            formContext.setFieldValue('street', streetValue);
            formContext.setFieldValue('city', cityValue);
            formContext.setFieldValue('state', stateValue);
            formContext.setFieldValue('neighborhood', neighborhoodValue);
            formContext.setFieldValue('zipCode', zipCodeValue);
            formContext.setFieldValue('country', 'Brasil');
            formContext.setFieldValue('latitude', latitude);
            formContext.setFieldValue('longitude', longitude);
        }

        // Fechar sugestões imediatamente
        setShowSuggestions(false);
        setAddressSuggestions([]);

        // Mover foco para o próximo campo (número)
        setTimeout(() => {
            const numberInput = document.querySelector('input[name="number"]') as HTMLInputElement;
            if (numberInput) {
                numberInput.focus();
            }
        }, 100);
    }, [formContext]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        // Only mark as user typed if value is different from initial value
        if (newValue !== initialValueRef.current) {
            setHasUserTyped(true);
        }
        onChange(newValue);
    };

    const handleFocus = () => {
        // Only show suggestions if user has typed something (not just focused on existing value)
        if (addressSuggestions.length > 0 && value.length >= 3 && hasUserTyped) {
            setShowSuggestions(true);
        }
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 150);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Previne o blur do input
    };

    return (
        <div className="relative address-suggestions-container">
            <Input
                {...inputProps}
                config={{
                    ...inputProps.config,
                    value,
                }}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {loading && (
                <div className="absolute right-3 top-9">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                </div>
            )}

            {showSuggestions && addressSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {addressSuggestions.map((address, index) => (
                        <div
                            key={`${address.place_id || index}-${address.display_name}`}
                            onMouseDown={handleMouseDown}
                            onClick={() => selectAddress(address)}
                            className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-colors duration-150"
                        >
                            <div className="text-sm text-gray-900 dark:text-white font-medium">
                                {address.display_name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {address.address?.city || address.address?.town || ''} - {address.address?.state || ''}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import { useState, useEffect, useCallback } from 'react';

interface AddressSuggestion {
    place_id: string;
    display_name: string;
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

interface UseAddressAutocompleteReturn {
    addressSuggestions: AddressSuggestion[];
    showSuggestions: boolean;
    loadingCEP: boolean;
    isFromCache: boolean;
    searchAddresses: (query: string) => Promise<void>;
    selectAddress: (address: AddressSuggestion) => void;
    setShowSuggestions: (show: boolean) => void;
}

// Hook para debounce
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useAddressAutocomplete = (
    streetValue: string,
    onAddressSelect: (address: AddressSuggestion) => void
): UseAddressAutocompleteReturn => {
    const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingCEP, setLoadingCEP] = useState(false);
    const [searchCache, setSearchCache] = useState<Map<string, AddressSuggestion[]>>(new Map());
    const [isFromCache, setIsFromCache] = useState(false);

    // Debounce para o campo de rua
    const debouncedStreetValue = useDebounce(streetValue, 300);

    // Função otimizada para buscar endereços
    const searchAddresses = useCallback(async (query: string) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();

        // Verificar cache primeiro
        if (searchCache.has(normalizedQuery)) {
            const cachedResults = searchCache.get(normalizedQuery);
            setAddressSuggestions(cachedResults || []);
            setShowSuggestions(true);
            setIsFromCache(true);
            return;
        }

        setLoadingCEP(true);
        try {
            // URL otimizada do Nominatim
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Brasil')}&countrycodes=br&limit=5&addressdetails=1&dedupe=1`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5s

            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'BoiNaNuvem/1.0',
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();

                // Filtrar e processar resultados
                const processedResults = data
                    .filter((item: any) => item.display_name && item.address)
                    .map((item: any) => ({
                        place_id: item.place_id,
                        display_name: item.display_name,
                        address: {
                            city: item.address.city || item.address.town || item.address.village,
                            state: item.address.state,
                            suburb: item.address.suburb || item.address.neighbourhood,
                            postcode: item.address.postcode
                        }
                    }))
                    .slice(0, 5);

                // Cachear resultados
                setSearchCache(prev => new Map(prev).set(normalizedQuery, processedResults));

                setAddressSuggestions(processedResults);
                setShowSuggestions(true);
                setIsFromCache(false);
            } else {
                console.warn('Erro na busca de endereços:', response.status);
                setAddressSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
                console.warn('Erro na busca de endereços:', error.message);
            }
            setAddressSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setLoadingCEP(false);
        }
    }, [searchCache]);

    // Função para selecionar endereço
    const selectAddress = useCallback((address: AddressSuggestion) => {
        onAddressSelect(address);
        setShowSuggestions(false);
        setAddressSuggestions([]);
    }, [onAddressSelect]);

    // Efeito para buscar endereços com debounce
    useEffect(() => {
        if (debouncedStreetValue.length >= 3) {
            searchAddresses(debouncedStreetValue);
        } else if (debouncedStreetValue.length < 3) {
            setShowSuggestions(false);
            setAddressSuggestions([]);
        }
    }, [debouncedStreetValue, searchAddresses]);

    // Fechar sugestões quando clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.address-suggestions-container')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        addressSuggestions,
        showSuggestions,
        loadingCEP,
        isFromCache,
        searchAddresses,
        selectAddress,
        setShowSuggestions
    };
};

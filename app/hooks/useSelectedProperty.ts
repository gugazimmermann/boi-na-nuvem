import { useEffect, useMemo, useState, useCallback } from 'react';
import { SelectedPropertyService } from '~/services/selectedPropertyService';
import { PropertyService } from '~/services/propertyService';

interface UseSelectedPropertyReturn {
  selectedPropertyId: string | null;
  isAllSelected: boolean;
  setSelectedPropertyId: (id: string) => void;
}

export function useSelectedProperty(): UseSelectedPropertyReturn {
  const [selectedPropertyId, setSelectedPropertyIdState] = useState<string | null>(
    SelectedPropertyService.getSelectedPropertyId(),
  );
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const setSelectedPropertyId = useCallback((id: string) => {
    SelectedPropertyService.setSelectedPropertyId(id);
    setSelectedPropertyIdState(id);
  }, []);

  useEffect(() => {
    const onSelectionChange = (e: Event) => {
      const id =
        (e as CustomEvent<string>).detail || SelectedPropertyService.getSelectedPropertyId();
      setSelectedPropertyIdState(id);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'bnn:selectedPropertyId') {
        setSelectedPropertyIdState(e.newValue);
      }
    };
    window.addEventListener('bnn:selectedPropertyChanged', onSelectionChange as EventListener);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('bnn:selectedPropertyChanged', onSelectionChange as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const resolveAll = async () => {
      try {
        if (!selectedPropertyId) {
          if (isActive) setIsAllSelected(false);
          return;
        }
        const property = await PropertyService.getPropertyById(selectedPropertyId);
        if (!isActive) return;
        setIsAllSelected(!!property && property.code === 'ALL');
      } catch {
        if (!isActive) return;
        setIsAllSelected(false);
      }
    };
    resolveAll();
    return () => {
      isActive = false;
    };
  }, [selectedPropertyId]);

  return useMemo(
    () => ({ selectedPropertyId, isAllSelected, setSelectedPropertyId }),
    [selectedPropertyId, isAllSelected, setSelectedPropertyId],
  );
}

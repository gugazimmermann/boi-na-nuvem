import { useState, useEffect, useCallback } from 'react';
import { BUYERS } from '~/mocks/buyer-mock';
import type { Buyer } from '~/types/buyer';

export const useBuyers = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBuyers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setBuyers(BUYERS);
    } catch (err) {
      setError('Erro ao carregar compradores');
      console.error('Error fetching buyers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBuyer = useCallback(async (buyer: Omit<Buyer, 'id' | 'createdAt' | 'deletedAt'>) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const newBuyer: Buyer = {
        ...buyer,
        id: `buyer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        deletedAt: null,
      };

      setBuyers((prev) => [newBuyer, ...prev]);
      return newBuyer;
    } catch (err) {
      setError('Erro ao adicionar comprador');
      console.error('Error adding buyer:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBuyer = useCallback(async (id: string, updates: Partial<Buyer>) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setBuyers((prev) =>
        prev.map((buyer) => (buyer.id === id ? { ...buyer, ...updates } : buyer)),
      );

      return true;
    } catch (err) {
      setError('Erro ao atualizar comprador');
      console.error('Error updating buyer:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBuyer = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setBuyers((prev) =>
        prev.map((buyer) =>
          buyer.id === id ? { ...buyer, deletedAt: new Date().toISOString() } : buyer,
        ),
      );

      return true;
    } catch (err) {
      setError('Erro ao excluir comprador');
      console.error('Error deleting buyer:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchBuyers();
  }, [fetchBuyers]);

  useEffect(() => {
    fetchBuyers();
  }, [fetchBuyers]);

  return {
    buyers,
    loading,
    error,
    refetch,
    addBuyer,
    updateBuyer,
    deleteBuyer,
  };
};

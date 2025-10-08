import { useState, useEffect, useCallback } from 'react';
import { SUPPLIERS } from '~/mocks/supplier-mock';
import type { Supplier } from '~/types/supplier';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuppliers(SUPPLIERS);
    } catch (err) {
      setError('Erro ao carregar fornecedores');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSupplier = useCallback(
    async (supplier: Omit<Supplier, 'id' | 'createdAt' | 'deletedAt'>) => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const newSupplier: Supplier = {
          ...supplier,
          id: `supplier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          deletedAt: null,
        };

        setSuppliers((prev) => [newSupplier, ...prev]);
        return newSupplier;
      } catch (err) {
        setError('Erro ao adicionar fornecedor');
        console.error('Error adding supplier:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateSupplier = useCallback(async (id: string, updates: Partial<Supplier>) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuppliers((prev) =>
        prev.map((supplier) => (supplier.id === id ? { ...supplier, ...updates } : supplier)),
      );

      return true;
    } catch (err) {
      setError('Erro ao atualizar fornecedor');
      console.error('Error updating supplier:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSupplier = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier.id === id ? { ...supplier, deletedAt: new Date().toISOString() } : supplier,
        ),
      );

      return true;
    } catch (err) {
      setError('Erro ao excluir fornecedor');
      console.error('Error deleting supplier:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    loading,
    error,
    refetch,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  };
};

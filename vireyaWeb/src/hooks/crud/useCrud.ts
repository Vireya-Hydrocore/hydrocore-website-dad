import { useEffect, useState, useCallback } from "react";

type Service<T, CreateData = Omit<T, "id">> = {
  listar: () => Promise<T[]>;
  criar: (data: CreateData) => Promise<T>;
  atualizar: (id: number, data: CreateData) => Promise<T>;
  deletar: (id: number) => Promise<void>;
};

export default function useCrud<
  T extends { id: number },
  CreateData = Omit<T, "id">
>(service: Service<T, CreateData>) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await service.listar();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao listar itens:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [service]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await service.listar();
      setItems(data);
    } catch (err) {
      setError(err);
      console.error("Erro ao listar itens:", err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const criar = async (data: CreateData) => {
    try {
      const novo = await service.criar(data);
      setItems((prev) => [...prev, novo]);
    } catch (err) {
      setError(err);
      console.error("Erro ao criar item:", err);
    }
  };

  const atualizar = async (id: number, data: CreateData) => {
    try {
      const atualizado = await service.atualizar(id, data);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? atualizado : item))
      );
    } catch (err) {
      setError(err);
      console.error("Erro ao atualizar item:", err);
    }
  };

  const deletar = async (id: number) => {
    try {
      await service.deletar(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err);
      console.error("Erro ao deletar item:", err);
    }
  };

  return {
    items,
    loading,
    error,
    refetch: fetchData,
    criar,
    atualizar,
    deletar,
  };
}

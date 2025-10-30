import useCrud from "./useCrud";

type Service<T, CreateData = Omit<T, "id">> = {
  listar: () => Promise<T[]>;
  criar: (data: CreateData) => Promise<T>;
  atualizar: (id: number, data: CreateData) => Promise<T>;
  deletar: (id: number) => Promise<void>;
};

export function useCrudEntity<T extends { id: number }>(service: Service<T>) {
  const {
    items,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  } = useCrud<T>(service);

  return { items, loading, error, refetch, criar, atualizar, deletar };
}

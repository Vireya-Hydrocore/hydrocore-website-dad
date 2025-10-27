import ProdutoService from "../../services/ProdutoService";
import type { Produto } from "../../types/Produto";
import useCrud from "./useCrud";

const useProdutos = () => {
  const {
    items: produtos,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  } = useCrud<Produto>(ProdutoService);

  return {
    produtos,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  };
};

export default useProdutos;

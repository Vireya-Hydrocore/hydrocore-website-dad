import FuncionarioService from "../../services/FuncionarioService";
import type { Funcionario } from "../../types/Funcionario";
import useCrud from "./useCrud";

const useFuncionarios = () => {
  const {
    items: funcionarios,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  } = useCrud<Funcionario>(FuncionarioService);

  return {
    funcionarios,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  };
};

export default useFuncionarios;

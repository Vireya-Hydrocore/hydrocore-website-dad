import TarefaService from "../../services/TarefaService";
import type { Tarefa } from "../../types/Tarefa";
import useCrud from "./useCrud";

const useTarefas = () => {
  const {
    items: tarefas,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  } = useCrud<Tarefa>(TarefaService);

  return {
    tarefas,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  };
};

export default useTarefas;

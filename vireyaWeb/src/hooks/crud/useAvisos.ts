import AvisoService from "../../services/AvisoService";
import type { Aviso } from "../../types/Aviso";
import useCrud from "./useCrud";

const useAvisos = () => {
  const {
    items: avisos,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  } = useCrud<Aviso>(AvisoService);

  return {
    avisos,
    loading,
    error,
    refetch,
    criar,
    atualizar,
    deletar,
  };
};

export default useAvisos;

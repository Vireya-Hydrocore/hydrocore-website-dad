import { useState, useEffect } from "react";
import FuncionarioService from "../services/FuncionarioService";

const useGetOrganograma = (funcionarioId: number, idEta: number) => {
  const [data, setData] = useState<({ id: number; nome: string; cargo: string } | null)>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganograma = async () => {
      try {
        const organogramaData = await FuncionarioService.getOrganograma(funcionarioId, idEta);
        setData(organogramaData);
      } catch {
        setError("Erro ao carregar o organograma");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganograma();

  }, [funcionarioId, idEta]); 
  
  return { data, loading, error };
};

export default useGetOrganograma;

import { useState, useEffect } from "react";
import FuncionarioService from "../services/FuncionarioService";
import type { FuncionarioCardTipo } from "../types/FuncionarioCardTipo";

const useGetOrganograma = () => {
  const [data, setData] = useState<FuncionarioCardTipo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganograma = async () => {
      setLoading(true);
      setError(null);
      try {
        const organogramaData = await FuncionarioService.getOrganograma();
        setData(
          Array.isArray(organogramaData) ? organogramaData : [organogramaData]
        );
      } catch {
        setError("Erro ao carregar o organograma.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganograma();
  }, []);

  return { data, loading, error };
};

export default useGetOrganograma;

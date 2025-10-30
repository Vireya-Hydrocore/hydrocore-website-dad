import { useState, useEffect } from "react";
import AvisoService from "../services/AvisoService";
import type { Aviso } from "../types/Aviso";

const useAvisos = () => {
  const [ultimosAvisos, setUltimosAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUltimosAvisos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await AvisoService.getUltimosAvisos();
        setUltimosAvisos(Array.isArray(data) ? data : data ? [data] : []);
      } catch {
        setError("Erro ao carregar avisos.");
      } finally {
        setLoading(false);
      }
    };

    fetchUltimosAvisos();
  }, []);

  return { ultimosAvisos, loading, error };
};

export default useAvisos;

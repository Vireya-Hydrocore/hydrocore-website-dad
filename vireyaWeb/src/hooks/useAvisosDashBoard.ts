import { useState, useEffect } from "react";
import AvisoService from "../services/AvisoService";
import type { Aviso } from "../types/Aviso";

const useAvisos = () => {
  const [ultimosAvisos, setUltimosAvisos] = useState<Aviso[] | null>(null);
  const [loadingUltimos, setLoadingUltimos] = useState<boolean>(false);
  const [errorUltimos, setErrorUltimos] = useState<string | null>(null);

  useEffect(() => {
    const fetchUltimosAvisos = async () => {
      setLoadingUltimos(true);
      try {
        const data = await AvisoService.getUltimosAvisos();
        setUltimosAvisos(data);
      } catch {
        setErrorUltimos("Erro ao buscar os últimos avisos.");
      } finally {
        setLoadingUltimos(false);
      }
    };

    fetchUltimosAvisos();
  }, []);

  return {
    ultimosAvisos,
    loadingUltimos,
    errorUltimos,
  };
};

export default useAvisos;

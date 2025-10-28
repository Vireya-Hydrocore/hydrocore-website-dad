import { useEffect, useState } from "react";
import { listarUnidadesMedida } from "../../services/UnidadeMedidaService";

export function useUnidadeMedidaDropdown() {
  const [unidades, setUnidades] = useState<{ id: number; nome: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await listarUnidadesMedida();
        setUnidades(data);
      } catch {
        setError("Erro ao carregar unidades de medida");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { unidades, loading, error };
}

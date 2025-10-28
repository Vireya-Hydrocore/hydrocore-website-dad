import { useEffect, useState } from "react";
import { listarCargo } from "../../services/CargoService";

export function useCargoDropdown() {
  const [cargos, setCargos] = useState<{ id: number; nome: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await listarCargo();
        setCargos(data);
      } catch {
        setError("Erro ao carregar cargos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { cargos, loading, error };
}

import { useState, useEffect } from "react";
import FuncionarioService from "../services/FuncionarioService"; 

const useGetUserData = (email: string) => {
  const [nome, setNome] = useState<string | null>(null);
  const [cargo, setCargo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await FuncionarioService.getUserDataByEmail(email);
        setNome(userData.nome);
        setCargo(userData.cargo);
        setLoading(false);
      } catch {
        setError("Erro ao carregar dados do usuário");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  return { nome, cargo, loading, error };
};

export default useGetUserData;

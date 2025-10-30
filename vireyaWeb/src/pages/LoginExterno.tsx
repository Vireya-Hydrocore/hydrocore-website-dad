import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import FuncionarioService from "../services/FuncionarioService";

const LoginExterno = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(true);

  const funcionarioId = params.get("funcionarioId");
  const token = params.get("token");

  const [, setNome] = useState<string | null>(null);
  const [, setCargo] = useState<string | null>(null);
  const [, setEmail] = useState<string | null>(null);
  const [, setIdETA] = useState<string | null>(null);

  useEffect(() => {
    if (!funcionarioId || !token) {
      navigate("/acesso-negado");
      return;
    }

    const validarFuncionario = async () => {
      try {
        const funcionarios = await FuncionarioService.listar();
        const funcionario = funcionarios.find(
          (f) => f.id.toString() === funcionarioId
        );

        if (!funcionario) {
          navigate("/acesso-negado");
          return;
        }

        if (token !== import.meta.env.VITE_TOKEN_LOGIN_EXTERNO) {
          navigate("/acesso-negado");
          return;
        }

        setNome(funcionario.nome);
        setCargo(funcionario.cargo);
        setEmail(funcionario.email);
        setIdETA(funcionario.idEta);

        login(funcionario.nome, funcionario.cargo);

        localStorage.setItem("funcionarioId", funcionario.id.toString());
        localStorage.setItem("nome", funcionario.nome);
        localStorage.setItem("cargo", funcionario.cargo);
        localStorage.setItem("email", funcionario.email);
        localStorage.setItem("idEta", funcionario.idEta);

        // Remove o token e o ID da URL
        window.history.replaceState({}, document.title, "/");

        navigate("/dashboard");
      } catch {
        navigate("/acesso-negado");
      } finally {
        setLoading(false);
      }
    };

    validarFuncionario();
  }, [funcionarioId, token, navigate, login]);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return <p>Autenticando acesso externo...</p>;
};

export default LoginExterno;

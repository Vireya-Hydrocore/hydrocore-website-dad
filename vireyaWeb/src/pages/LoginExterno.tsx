import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import FuncionarioService from "../services/FuncionarioService"; // Serviço de funcionários

const LoginExterno = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const funcionarioId = params.get("funcionarioId");
  const token = params.get("token");

const [, setNome] = useState<string | null>(null);
const [, setCargo] = useState<string | null>(null);

  useEffect(() => {
    console.log("Parâmetros recebidos:", { funcionarioId, token });

    // Verificação inicial de acesso
    if (!funcionarioId || !token) {
      console.log("Acesso negado: Falta funcionarioId ou token.");
      setError("Faltando parâmetros obrigatórios.");
      navigate("/acesso-negado");
      return;
    }

    // Função para validar se o acesso é válido
    const validarFuncionario = async () => {
      try {
        console.log("Iniciando validação do funcionário...");

        // Chama o listar() para pegar todos os funcionários
        const funcionarios = await FuncionarioService.listar();
        console.log("Funcionários retornados: ", funcionarios);

        // Busca o funcionário com o ID correspondente
        const funcionario = funcionarios.find(
          (f) => f.id.toString() === funcionarioId
        );

        if (!funcionario) {
          setError("Funcionário não encontrado.");
          console.log("Funcionário não encontrado para o ID:", funcionarioId);
          navigate("/acesso-negado");
          return;
        }

        // Log do funcionário encontrado
        console.log("Funcionário encontrado:", funcionario);

        // Verifica o token com o valor armazenado nas variáveis de ambiente
        if (token !== import.meta.env.VITE_TOKEN_LOGIN_EXTERNO) {
          setError("Token inválido.");
          console.log("Token inválido. Esperado:", import.meta.env.VITE_TOKEN_LOGIN_EXTERNO, "Recebido:", token);
          navigate("/acesso-negado");
          return;
        }

        // Se o ID e o token forem válidos, pega os dados do funcionário
        setNome(funcionario.nome);
        setCargo(funcionario.cargo);

        // Realiza o login com os dados do funcionário
        login(funcionario.id.toString(), funcionario.nome, funcionario.cargo);

        // Remove o token e o ID da URL
        window.history.replaceState({}, document.title, "/");

        console.log("Redirecionando para o dashboard...");
        navigate("/dashboard");
      } catch (err) {
        setError("Erro ao validar o funcionário: " + err);
        console.error("Erro ao tentar validar o funcionário:", err);
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

  if (error) {
    return <p>{error}</p>;
  }

  return <p>Autenticando acesso externo...</p>;
};

export default LoginExterno;

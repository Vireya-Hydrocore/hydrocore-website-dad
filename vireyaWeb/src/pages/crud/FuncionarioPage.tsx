import CrudPage from "./CrudPage";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";
import type { Funcionario } from "../../types/Funcionario";
import { CircularProgress, Button } from "@mui/material";
import FuncionarioService from "../../services/FuncionarioService";
import { listarCargo } from "../../services/CargoService";
import { useDropdown } from "../../hooks/crud/useDropDown";
import axios from "axios";

const FuncionarioPage: React.FC = () => {
  const {
    items: funcionarios,
    criar,
    atualizar,
    deletar,
    loading,
    refetch,
    error,
  } = useCrudEntity<Funcionario>(FuncionarioService);
  const cargos = useDropdown(listarCargo);

  const criarFuncionario = async (data: Omit<Funcionario, "id">) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Email inválido");
    }

    const hoje = new Date();
    const dataAdmissao = new Date(data.dataAdmissao);
    const dataNascimento = new Date(data.dataNascimento);

    if (dataAdmissao > hoje)
      throw new Error("A data de admissão não pode ser futura.");
    if (dataNascimento > hoje)
      throw new Error("A data de nascimento não pode ser futura.");

    const idEta = localStorage.getItem("idEta");
    const funcionarioComEta = { ...data, idEta };

    await criar(funcionarioComEta);

    const baseURL = import.meta.env.VITE_MONGOLOGIN_API_URL

    try {
      await axios.post(`${baseURL}/auth/login`, {
        email: data.email,
        password: data.senha,
        codigoEmpresa: localStorage.getItem("idEta"),
      });
    } catch (err) {
      console.error("Erro ao logar funcionário:", err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div>
        Erro ao carregar dados.
        <Button onClick={refetch}>Tentar novamente</Button>
      </div>
    );

  return (
    <CrudPage<Funcionario>
      title="Funcionários"
      items={funcionarios}
      loading={loading}
      error={error}
      criar={criarFuncionario} // usa nossa função com validação e login
      atualizar={atualizar}
      deletar={deletar}
      refetch={refetch}
      modal={{
        nome: { label: "Nome", type: "string" },
        email: { label: "Email", type: "string" },
        idCargo: { label: "Cargo", type: "dropdown", options: cargos },
        senha: { label: "Senha", type: "string" },
        dataAdmissao: { label: "Data de Admissão", type: "date" },
        dataNascimento: { label: "Data de Nascimento", type: "date" },
      }}
      displayFields={{
        nome: "Nome",
        email: "Email",
        cargo: "Cargo",
        dataAdmissao: "Admissão",
        dataNascimento: "Nascimento",
      }}
    />
  );
};

export default FuncionarioPage;

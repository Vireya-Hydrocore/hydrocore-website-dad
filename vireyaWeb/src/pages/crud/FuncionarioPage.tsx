import CrudPage from "./CrudPage";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";
import type { Funcionario } from "../../types/Funcionario";
import { CircularProgress, Button } from "@mui/material";
import FuncionarioService from "../../services/FuncionarioService";
import { listarCargo } from "../../services/CargoService";
import { useDropdown } from "../../hooks/crud/useDropDown";

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
      criar={criar}
      atualizar={atualizar}
      deletar={deletar}
      refetch={refetch}
      modal={{
        nome: {
          label: "Nome",
          type: "string",
        },
        email: {
          label: "Email",
          type: "string",
        },
        idCargo: {
          label: "Cargo",
          type: "dropdown",
          options: cargos,
        },
        senha: {
          label: "Senha",
          type: "string",
        },
        dataAdmissao: {
          label: "Data de Admissão",
          type: "date",
        },
        dataNascimento: {
          label: "Data de Nascimento",
          type: "date",
        },
      }}
      displayFields={{
        nome: "Nome",
        email: "Email",
        idCargo: "Cargo",
        senha: "Senha",
        dataAdmissao: "Admissão",
        dataNascimento: "Nascimento",
      }}
    />
  );
};

export default FuncionarioPage;

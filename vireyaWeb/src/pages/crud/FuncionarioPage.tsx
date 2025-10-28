import useFuncionarios from "../../hooks/crud/useFuncionarios";
import { useCargoDropdown } from "../../hooks/crud/useCargoDropdown";
import CrudPage from "./CrudPage";
import type { Funcionario } from "../../types/Funcionario";

const FuncionarioPage: React.FC = () => {
  const { funcionarios, loading, error, criar, atualizar, deletar, refetch } =
    useFuncionarios();
  const { cargos } = useCargoDropdown();

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
          options: cargos, // Passando os cargos como opções
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

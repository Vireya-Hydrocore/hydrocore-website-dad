import CrudPage from "./CrudPage";
import { useCallback } from "react";
import { useDropdown } from "../../hooks/crud/useDropDown";
import { listarPrioridades } from "../../services/PrioridadeService";
import { type Tarefa } from "../../types/Tarefa";
import { CircularProgress, Button } from "@mui/material";
import TarefaService from "../../services/TarefaService";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";
import FuncionarioService from "../../services/FuncionarioService";

const TarefaPage: React.FC = () => {
  const {
    items: tarefas,
    criar,
    atualizar,
    deletar,
    loading,
    refetch,
    error,
  } = useCrudEntity<Tarefa>(TarefaService);

  const prioridadesRaw = useDropdown(listarPrioridades);
  const prioridades = prioridadesRaw.map((p) => ({ id: p.id, nome: p.nivel }));

  const listarFuncionarios = useCallback(() => FuncionarioService.listar(), []);
  const funcionariosRaw = useDropdown(listarFuncionarios);
  const funcionarios = funcionariosRaw.map((f) => ({
    id: f.id,
    nome: f.nome,
  }));

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div>
        Erro ao carregar dados.
        <Button onClick={refetch}>Tentar novamente</Button>
      </div>
    );

  const modalConfig = {
    descricao: { label: "Descrição", type: "string" },
    prioridade: { label: "Prioridade", type: "dropdown", options: prioridades },
    status: { label: "Status", type: "string" },
    idFuncionario: {
      label: "Funcionário",
      type: "dropdown",
      options: funcionarios,
    },
  } as const;

  const criarTarefa = async (data: Omit<Tarefa, "id">) => {
    const tarefaComData = {
      ...data,
      dataCriacao: new Date().toISOString(),
      dataConclusao: null,
      prioridade:
        prioridadesRaw.find((p) => p.id === Number(data.prioridade))?.nome ||
        "",
    };
    await criar(tarefaComData);
  };

  return (
    <div>
      <CrudPage<Tarefa>
        title="Tarefas"
        items={tarefas}
        loading={loading}
        error={error}
        criar={criarTarefa}
        atualizar={atualizar}
        deletar={deletar}
        refetch={refetch}
        modal={modalConfig}
        displayFields={{
          descricao: "Descrição",
          dataCriacao: "Data de Criação",
          dataConclusao: "Data de Conclusão",
          nome: "Funcionário",
          prioridade: "Prioridade",
          status: "Status",
        }}
      />
    </div>
  );
};

export default TarefaPage;

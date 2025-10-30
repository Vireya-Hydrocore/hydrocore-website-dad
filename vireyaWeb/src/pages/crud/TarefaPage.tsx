import CrudPage from "./CrudPage";
import { useDropdown } from "../../hooks/crud/useDropDown";
import { listarPrioridades } from "../../services/PrioridadeService";
import { type Tarefa } from "../../types/Tarefa";
import { CircularProgress, Button } from "@mui/material";
import TarefaService from "../../services/TarefaService";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";

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
  const prioridades = useDropdown(listarPrioridades);

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <div>
        Erro ao carregar dados.
        <Button onClick={refetch}>Tentar novamente</Button>
      </div>
    );
  }

  const modalConfig = {
    descricao: { label: "Descrição", type: "string" },
    dataCriacao: { label: "Data de Criação", type: "date" },
    dataConclusao: { label: "Data de Conclusão", type: "date" },
    prioridade: {
      label: "Prioridade",
      type: "dropdown",
      options: prioridades,
    },
    status: { label: "Status", type: "string" },
  } as const;

  return (
    <div>
      <CrudPage<Tarefa>
        title="Tarefas"
        items={tarefas}
        loading={loading}
        error={error}
        criar={criar}
        atualizar={atualizar}
        deletar={deletar}
        refetch={refetch}
        modal={modalConfig}
        displayFields={{
          descricao: "Descrição",
          dataCriacao: "Data de Criação",
          dataConclusao: "Data de Conclusão",
          prioridade: "Prioridade",
          status: "Status",
        }}
      />
    </div>
  );
};

export default TarefaPage;

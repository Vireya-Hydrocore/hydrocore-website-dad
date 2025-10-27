import React from "react";
import { type Tarefa } from "../../types/Tarefa"; // Defina o tipo Tarefa
import CrudPage from "./CrudPage"; // Componente genérico de CRUD
import useTarefas from "../../hooks/crud/useTarefas";
// import { usePrioridades } from "../../hooks/usePrioridades"; // Hook para obter as prioridades
import { CircularProgress, Button } from "@mui/material";

const TarefaPage: React.FC = () => {
  const { tarefas, loading, error, refetch, criar, atualizar, deletar } = useTarefas(); // Hook para tarefas
  // const { prioridades, loading: loadingPrioridades, error: errorPrioridades } = usePrioridades();

  // if (loading || loadingPrioridades) return <CircularProgress />;
  // if (error || errorPrioridades) {
  //   return (
  //     <div>
  //       Erro ao carregar dados.
  //       <Button onClick={refetch}>Tentar novamente</Button>
  //     </div>
  //   );
  // }

  // Configuração do modal para Tarefa
  const modalConfig = {
    descricao: { label: "Descrição", type: "string" },
    dataCriacao: { label: "Data de Criação", type: "date" },
    dataConclusao: { label: "Data de Conclusão", type: "date" },
    // prioridade: {
    //   label: "Prioridade",
    //   type: "dropdown",
    //   options: prioridades, // Supondo que `prioridades` seja um array de objetos com id e nome
    // },
    status: { label: "Status", type: "string" },
  };

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
        titleField="descricao"
      />
    </div>
  );
};

export default TarefaPage;

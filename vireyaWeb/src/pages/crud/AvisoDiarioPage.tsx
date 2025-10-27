import React from "react";
import { type Aviso } from "../../types/Aviso"; // Defina o tipo AvisoDiario
import CrudPage from "./CrudPage"; // Reutilizando o componente genérico CrudPage
import useAvisos from "../../hooks/crud/useAvisos";
// import { usePrioridades } from "../../hooks/usePrioridades"; // Hook para obter informações de prioridades
// import { CircularProgress, Button } from "@mui/material";

const AvisoPage: React.FC = () => {
  const { avisos, loading, error, refetch, criar, atualizar, deletar } =
    useAvisos();
  // const { prioridades, loading: loadingPrioridades, error: errorPrioridades } = usePrioridades();

  // if (loading || loadingEtas || loadingPrioridades) return <CircularProgress />;
  // if (error || errorEtas || errorPrioridades) {
  //   return (
  //     <div>
  //       Erro ao carregar dados.
  //       <Button onClick={refetch}>Tentar novamente</Button>
  //     </div>
  //   );
  // }

  // Configuração do modal para AvisoDiario
  const modalConfig = {
    descricao: { label: "Descrição", type: "string" },
    dataOcorrencia: { label: "Data de Ocorrência", type: "date" },
    // idPrioridade: {
    //   label: "Prioridade",
    //   type: "dropdown",
    //   options:
    //   // options: prioridades, // Supondo que `prioridades` seja um array de objetos com id e nome
    // },
    status: { label: "Status", type: "string" },
  };

  return (
    <div>
      <CrudPage<Aviso>
        title="Avisos Diários"
        items={avisos}
        loading={loading}
        error={error}
        criar={criar}
        atualizar={atualizar}
        deletar={deletar}
        refetch={refetch}
        modal={modalConfig}
        displayFields={{
          descricao: "Descrição",
          dataOcorrencia: "Data de Ocorrência",
          nomeEta: "ETA",
          prioridade: "Prioridade",
          status: "Status",
        }}
        titleField="descricao"
      />
    </div>
  );
};

export default AvisoPage;

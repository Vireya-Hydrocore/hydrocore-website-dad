import CrudPage from "./CrudPage";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";
import { useDropdown } from "../../hooks/crud/useDropDown";
import AvisoService from "../../services/AvisoService";
import { type Aviso } from "../../types/Aviso";
import { CircularProgress } from "@mui/material";
import { listarPrioridades } from "../../services/PrioridadeService";

const AvisoPage: React.FC = () => {
  const { items: avisos, criar, atualizar, deletar, loading, refetch } = useCrudEntity<Aviso>(AvisoService);
  const prioridades = useDropdown(listarPrioridades);

  if (!avisos || !prioridades) return <CircularProgress />;

  const modalConfig = {
    descricao: { label: "Descrição", type: "string" },
    dataOcorrencia: { label: "Data de Ocorrência", type: "date" },
    idPrioridade: {
      label: "Prioridade",
      type: "dropdown",
      options: prioridades,
    },
    status: { label: "Status", type: "string" },
  } as const;

  return (
    <CrudPage<Aviso>
      title="Avisos Diários"
      items={avisos}
      criar={criar}
      atualizar={atualizar}
      deletar={deletar}
      refetch={refetch}
      loading={loading}
      modal={modalConfig}
      displayFields={{
        descricao: "Descrição",
        dataOcorrencia: "Data de Ocorrência",
        nomeEta: "ETA",
        prioridade: "Prioridade",
        status: "Status",
      }}
    />
  );
};

export default AvisoPage;

import CrudPage from "./CrudPage";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";
import { useDropdown } from "../../hooks/crud/useDropDown";
import AvisoService from "../../services/AvisoService";
import { type Aviso } from "../../types/Aviso";
import { CircularProgress } from "@mui/material";
import { listarPrioridades } from "../../services/PrioridadeService";

const AvisoPage: React.FC = () => {
  const {
    items: avisos,
    criar,
    atualizar,
    deletar,
    loading,
    refetch,
  } = useCrudEntity<Aviso>(AvisoService);

  const prioridadesRaw = useDropdown(listarPrioridades);
  const prioridades = prioridadesRaw.map((p) => ({ id: p.id, nome: p.nivel }));

  const criarAviso = async (data: Omit<Aviso, "id">) => {
    const idEta = Number(localStorage.getItem("idEta"));
    if (!idEta) {
      throw new Error("ID da ETA não encontrado no armazenamento local.");
    }

    const avisoComEta = { ...data, idEta };
    await criar(avisoComEta);
  };

  if (loading) return <CircularProgress />;

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
      criar={criarAviso}
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

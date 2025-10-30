import CrudPage from "./CrudPage";
import { useDropdown } from "../../hooks/crud/useDropDown";
import { type Produto } from "../../types/Produto";
import { CircularProgress, Button } from "@mui/material";
import { listarUnidadesMedida } from "../../services/UnidadeMedidaService";
import { useCrudEntity } from "../../hooks/crud/useCrudEntity";
import ProdutoService from "../../services/ProdutoService";

const ProdutoPage: React.FC = () => {
  const {
    items: produtos,
    criar,
    atualizar,
    deletar,
    loading,
    refetch,
    error,
  } = useCrudEntity<Produto>(ProdutoService);
  const unidades = useDropdown(listarUnidadesMedida);

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div>
        Erro ao carregar dados.
        <Button onClick={refetch}>Tentar novamente</Button>
      </div>
    );

  const modalConfig = {
    nome: { label: "Nome", type: "string" },
    tipo: { label: "Tipo", type: "string" },
    idUnidadeMedida: {
      label: "Unidade de Medida",
      type: "dropdown",
      options: unidades,
    },
  } as const;

  return (
    <div>
      <CrudPage<Produto>
        title="Produtos"
        items={produtos}
        loading={loading}
        error={error}
        criar={criar}
        atualizar={atualizar}
        deletar={deletar}
        refetch={refetch}
        modal={modalConfig}
        displayFields={{
          nome: "Nome",
          tipo: "Tipo",
          unidadeMedida: "Unidade de Medida",
        }}
      />
    </div>
  );
};

export default ProdutoPage;

import { type Produto } from "../../types/Produto";
import CrudPage from "./CrudPage";
import useProdutos from "../../hooks/crud/useProdutos";
import { useUnidadeMedidaDropdown } from "../../hooks/crud/useUnidadeMedidaDropdown";
import { CircularProgress, Button } from "@mui/material";

const ProdutoPage: React.FC = () => {
  const { produtos, loading, error, refetch, criar, atualizar, deletar } =
    useProdutos();
  const {
    unidades,
    loading: loadingUnidades,
    error: errorUnidades,
  } = useUnidadeMedidaDropdown();

  if (loading || loadingUnidades) return <CircularProgress />;
  if (error || errorUnidades)
    return (
      <div>
        Erro ao carregar dados.{" "}
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

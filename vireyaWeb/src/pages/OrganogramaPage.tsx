import "../styles/organograma.css";
import { CircularProgress } from "@mui/material";
import useGetOrganograma from "../hooks/useOrganograma";
import FuncionarioCard from "../components/FuncionarioCard";
import type { FuncionarioCardTipo } from "../types/FuncionarioCardTipo";

const montarHierarquia = (funcionarios: FuncionarioCardTipo[]) => {
  const mapa = new Map<number, FuncionarioCardTipo>(
    funcionarios.map((f) => [
      f.id,
      { ...f, subordinados: [] as FuncionarioCardTipo[] },
    ])
  );

  const raiz: FuncionarioCardTipo[] = [];

  mapa.forEach((f) => {
    const supervisor = f.idSupervisor ? mapa.get(f.idSupervisor) : null;
    if (supervisor) {
      supervisor.subordinados!.push(f);
    } else {
      raiz.push(f);
    }
  });

  return raiz;
};

// Componente recursivo para renderizar a hierarquia
const Hierarquia: React.FC<{ funcionario: FuncionarioCardTipo }> = ({
  funcionario,
}) => (
  <div className="node">
    <FuncionarioCard funcionario={funcionario} />
    {funcionario.subordinados && funcionario.subordinados.length > 0 && (
      <div className="children">
        {funcionario.subordinados.map((sub) => (
          <Hierarquia key={sub.id} funcionario={sub} />
        ))}
      </div>
    )}
  </div>
);

const OrganogramaPage: React.FC = () => {
  const { data, loading, error } = useGetOrganograma();

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;
  if (!data || data.length === 0) return <p>Nenhum dado disponível.</p>;

  const hierarquia = montarHierarquia(data);

  return (
    <div className="organogramaContainer">
      {hierarquia.map((gerente) => (
        <Hierarquia key={gerente.id} funcionario={gerente} />
      ))}
    </div>
  );
};

export default OrganogramaPage;

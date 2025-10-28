import useGetOrganograma from "../hooks/useOrganograma";
import FuncionarioCard from "../components/FuncionarioCard";
import "../styles/organograma.css";
import type { FuncionarioCardTipo } from "../types/FuncionarioCardTipo";

const montarHierarquia = (funcionarios: FuncionarioCardTipo[]) => {
  const mapa = new Map<number, FuncionarioCardTipo>();

  funcionarios.forEach((f) => mapa.set(f.id, { ...f, subordinados: [] }));

  // Associar subordinados aos supervisores
  const raiz: FuncionarioCardTipo[] = [];
  mapa.forEach((f) => {
    if (f.idSupervisor) {
      const supervisor = mapa.get(f.idSupervisor);
      if (supervisor) supervisor.subordinados!.push(f);
    } else {
      raiz.push(f);
    }
  });

  return raiz;
};

const Hierarquia: React.FC<{ funcionario: FuncionarioCardTipo }> = ({ funcionario }) => (
  <div className="node">
    <FuncionarioCard funcionario={funcionario} destaque={!funcionario.idSupervisor} />
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
  const { data, loading, error } = useGetOrganograma(1, 1);

  if (loading) return <p>Carregando organograma...</p>;
  if (error) return <p>{error}</p>;
  if (!data || !Array.isArray(data) || data.length === 0) return <p>Nenhum dado disponível.</p>;

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

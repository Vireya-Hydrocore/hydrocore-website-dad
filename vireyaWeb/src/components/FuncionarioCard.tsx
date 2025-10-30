import "../styles/organograma.css";
import type { FuncionarioCardTipo } from "../types/FuncionarioCardTipo";

const FuncionarioCard: React.FC<{funcionario: FuncionarioCardTipo}> = ({ funcionario}) => (
  <div className="card">
    <div className="cardText">
      <span className="name">{funcionario.nome || "Sem nome"}</span>
      <small className="position">{funcionario.cargo || "Sem cargo"}</small>
    </div>
  </div>
);

export default FuncionarioCard;

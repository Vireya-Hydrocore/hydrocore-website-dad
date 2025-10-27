import "../styles/organograma.css";
import type { FuncionarioCardTipo } from "../types/FuncionarioCardTipo";

const FuncionarioCard: React.FC<{funcionario: FuncionarioCardTipo, destaque?: boolean}> = ({ funcionario, destaque = false }) => (
  <div className={`card ${destaque ? "destaque" : ""}`}>
    <div className="cardText">
      <span className="name">{funcionario.nome || "Sem nome"}</span>
      <small className="position">{funcionario.cargo || "Sem cargo"}</small>
    </div>
  </div>
);

export default FuncionarioCard;

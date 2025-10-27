import { Link } from "react-router-dom";

const AcessoNegadoPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "red" }}>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <Link to="/">Voltar à página inicial</Link>
    </div>
  );
};

export default AcessoNegadoPage;

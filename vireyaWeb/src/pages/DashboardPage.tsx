import "../styles/dashBoardPage.css";
import { CircularProgress } from "@mui/material";
import useAvisos from "../hooks/useAvisosDashBoard";
import type { Aviso } from "../types/Aviso";

const DashBoardPage: React.FC = () => {
  const powerBILink = import.meta.env.VITE_PBI_GRAPH;
  const { ultimosAvisos, loading, error } = useAvisos();

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;
  if (!ultimosAvisos?.length) return <p>Nenhuma atividade recente.</p>;

  const avisosPorData = ultimosAvisos.reduce<Record<string, Aviso[]>>(
    (acc, aviso) => {
      const dataKey = aviso.dataOcorrencia?.split("T")[0];
      if (!acc[dataKey]) acc[dataKey] = [];
      acc[dataKey].push(aviso);
      return acc;
    },
    {}
  );

  return (
    <div className="dashboard-page">
      <div className="iframe-container">
        <iframe
          title="Power BI Dashboard"
          src={powerBILink}
          width="100%"
          height="600px"
          allowFullScreen
        />
      </div>

      <div className="activities-card">
        <h3>Atividades Recentes</h3>
        <div className="activities-list">
          {Object.entries(avisosPorData).map(([data, avisos]) => (
            <div key={data} className="activity-date-group">
              <h4>{data}</h4>
              {avisos.map((aviso) => (
                <div key={aviso.id} className="activity-item">
                  <p>
                    {aviso.descricao} - Prioridade{" "}
                    <strong>{aviso.prioridade}</strong> - Status{" "}
                    <strong>{aviso.status}</strong>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;

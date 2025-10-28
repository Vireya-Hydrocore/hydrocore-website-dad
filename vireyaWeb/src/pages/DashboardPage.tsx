import "../styles/dashBoardPage.css";
import useAvisosDashBoard from "../hooks/useAvisosDashBoard";
import type { Aviso } from "../types/Aviso";

function DashBoardPage() {
  const powerBILink = import.meta.env.VITE_PBI_GRAPH;

  const { ultimosAvisos, loadingUltimos, errorUltimos } = useAvisosDashBoard();

  if (loadingUltimos) return <div>Carregando...</div>;
  if (errorUltimos) return <div>Erro ao carregar avisos</div>;

  // Agrupar avisos por data
  const avisosPorData: Record<string, Aviso[]> = {};
  ultimosAvisos?.forEach((aviso) => {
    const dataKey = aviso.dataOcorrencia.toISOString().split("T")[0];

    if (!avisosPorData[dataKey]) {
      avisosPorData[dataKey] = [];
    }
    avisosPorData[dataKey].push(aviso);
  });

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
          {ultimosAvisos && ultimosAvisos.length > 0 ? (
            Object.entries(avisosPorData).map(([data, avisos]) => (
              <div key={data} className="activity-date-group">
                <h4>{data}</h4>
                {avisos.map((aviso) => (
                  <div key={aviso.id} className="activity-item">
                    <p>
                      {aviso.descricao} - Prioridade {aviso.prioridade} - Status{" "}
                      {aviso.status}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>Nenhuma atividade recente.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;

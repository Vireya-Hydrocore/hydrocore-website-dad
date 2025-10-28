import { CrudService } from "./CrudService";
import type { Aviso } from "../types/Aviso";
import api from "../axios/api";

class AvisoDiarioService extends CrudService<Aviso> {
  protected basePath = "/avisos";

  async getUltimosAvisos() {
  try {
      const dataHeader = new Date().toISOString().split("T")[0];

      const response = await api.get(`/avisos/ultimos-avisos`, {
        headers: {
          dataReferencia: dataHeader,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar últimos avisos:", error);
      throw new Error("Erro ao buscar últimos avisos");
    }
  }
}

export default new AvisoDiarioService();

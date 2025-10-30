import api from "../axios/api";
import { CrudService } from "./CrudService";
import type { Aviso } from "../types/Aviso";

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
    } catch {
      return [];
    }
  }
}

export default new AvisoDiarioService();

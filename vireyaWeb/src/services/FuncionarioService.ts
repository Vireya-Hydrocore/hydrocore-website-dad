import { CrudService } from "./CrudService";
import type { Funcionario } from "../types/Funcionario";
import api from "../axios/api";

class FuncionarioService extends CrudService<Funcionario> {
  protected basePath = "/funcionario";

  async getOrganograma() {
    try {
      const funcionarioId = Number(localStorage.getItem("funcionarioId"));
      const idEta = Number(localStorage.getItem("idEta"));

      if (!funcionarioId || !idEta) return [];

      const response = await api.get(
        `/funcionario/organograma/${funcionarioId}?idEta=${idEta}`
      );
      return response.data;
    } catch {
      return [];
    }
  }
}

export default new FuncionarioService();

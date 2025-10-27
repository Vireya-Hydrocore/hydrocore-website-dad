import { CrudService } from "./CrudService";
import type { Funcionario } from "../types/Funcionario";
import api from "../axios/api";
import axios from "axios";

class FuncionarioService extends CrudService<Funcionario> {
  protected basePath = "/funcionario";

  async getOrganograma(funcionarioId: number, idEta: number) {
    try {
      const response = await api.get(`/funcionario/organograma/${funcionarioId}?idEta=${idEta}`);
      return response.data;
    } catch {
      throw new Error("Erro ao buscar dados do organograma");
    }
  }

  async getUserDataByEmail(email: string) {
    try {
      const response = await axios.get(`/funcionario/email`, {
        headers: {
          "email": email,
        },
      });

      return response.data; // nome, cargo
    } catch {
      throw new Error("Erro na coleta de dados do usuário na requisição ao servidor");
    }
  }

    async login(email: string) {
    const senhaAleatoria = "123456"; // Você pode gerar uma senha aleatória ou deixar fixa por enquanto
    const codigoEmpresa = "123456789"; // Código da empresa fixo ou gerado dinamicamente, conforme necessário

    try {
      // Realizando a requisição de login
      const response = await api.post(`/auth/login`, {
        email,
        password: senhaAleatoria,
        codigoEmpresa,
      });

      return response.data; // Dados do login (token ou usuário)
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      throw new Error("Falha ao tentar fazer login.");
    }
  }

}

export default new FuncionarioService();

import api from "../axios/api";

export async function listarCargo() {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar cargos:", error);
    return [];
  }
}

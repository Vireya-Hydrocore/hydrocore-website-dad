import api from "../axios/api";

export async function listarUnidadesMedida() {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar unidades de medida:", error);
    return [];
  }
}

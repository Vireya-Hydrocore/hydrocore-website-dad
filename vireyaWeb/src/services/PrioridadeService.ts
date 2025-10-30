import api from "../axios/api";

export async function listarPrioridades() {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/prioridade/listar`
    );
    return response.data;
  } catch {
    return [];
  }
}

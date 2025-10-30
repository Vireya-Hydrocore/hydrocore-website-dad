import api from "../axios/api";

export async function listarUnidadesMedida() {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_API_URL}/unidade-medida/listar`
    );
    return response.data;
  } catch {
    return [];
  }
}

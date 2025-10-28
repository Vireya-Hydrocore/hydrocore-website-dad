import api from "../axios/api";

export abstract class CrudService<T extends { id: number }> {
  protected abstract basePath: string;

  async listar(): Promise<T[]> {
    const { data } = await api.get<T[]>(`${this.basePath}/listar`);
    return data;
  }

  async listarId(id: number): Promise<T> {
    const { data } = await api.get<T>(`${this.basePath}/${id}`);
    return data;
  }

  async criar(payload: Omit<T, "id">): Promise<T> {
    const { data } = await api.post<T>(this.basePath, payload);
    return data;
  }

  async atualizar(id: number, payload: Omit<T, "id">): Promise<T> {
    const { data } = await api.put<T>(`${this.basePath}/atualizar/${id}`, payload);
    return data;
  }

  async deletar(id: number): Promise<void> {
    await api.delete(`${this.basePath}/deletar/${id}`);
  }
}

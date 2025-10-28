import { CrudService } from "./CrudService";
import type { Tarefa } from "../types/Tarefa";

class TarefaService extends CrudService<Tarefa> {
  protected basePath = "/tarefas";
}

export default new TarefaService();

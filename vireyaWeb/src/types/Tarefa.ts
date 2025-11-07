export type Tarefa = {
  id: number;
  descricao: string;
  dataCriacao: string;
  dataConclusao: string | null;
  status: string;
  nome: string;
  prioridade: string;
};

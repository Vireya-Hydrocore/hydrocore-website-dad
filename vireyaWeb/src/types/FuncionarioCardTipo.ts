export type FuncionarioCardTipo = {
  id: number;
  nome: string;
  cargo: string;
  idSupervisor?: number | null;
  subordinados?: FuncionarioCardTipo[];
};
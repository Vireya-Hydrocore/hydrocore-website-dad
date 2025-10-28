import { CrudService } from "./CrudService";
import type { Produto } from "../types/Produto";

class ProdutoService extends CrudService<Produto> {
  protected basePath = "/produto";
}

export default new ProdutoService();

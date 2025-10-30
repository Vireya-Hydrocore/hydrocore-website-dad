# Services

Este documento descreve os serviços utilizados no projeto, incluindo parâmetros, retorno e exemplos de uso.

Todos os serviços utilizam a instância [api](../vireyaWeb/src/axios/api.ts) do Axios para realizar requisições HTTP, garantindo consistência de headers e tratamento de erros.

### [AvisoService.ts](../vireyaWeb/src/services/AvisoService.ts)

Serviço responsável pelas operações relacionadas a avisos.

#### Funcionalidades:
  - Herda métodos CRUD do `CrudService`.
  - Método adicional `getUltimosAvisos` para buscar os últimos avisos, a fim de mostar no dashboard (passando a data de hoje).
```ts
import AvisoService from './AvisoService';

const avisos = await AvisosService.listar();
```

### [CargoService.ts](../vireyaWeb/src/services/CargoService.ts)

Serviço responsável por listar os cargos. (Serviço unicamente usado para dropdown)

```ts
import { listarCargo } from './CargoService';

const cargos = await listarCargo();
```

### [FuncionarioService.ts](../vireyaWeb/src/services/FuncionarioService.ts)

Serviço responsável pelas operações relacionadas a funcionários.

#### Funcionalidades:
  - Herda métodos CRUD do `CrudService`.
  - Método adicional `getOrganograma` para buscar a estrutura de organograma (utilizando localStorage para o idEta).

```ts
import FuncionarioService from './FuncionarioService';

const organograma = await FuncionarioService.getOrganograma();
```

### [PrioridadeService.ts](../vireyaWeb/src/services/PrioridadeService.ts)

Serviço responsável por listar as prioridades. (Serviço unicamente usado para dropdown)

```ts
import { listarPrioridade } from './PrioridadeService';

const prioridades = await listarPrioridade();
```

### [ProdutoService.ts](../vireyaWeb/src/services/ProdutoService.ts)

Serviço responsável pelas operações relacionadas a produtos.

#### Funcionalidades:
  - Herda métodos CRUD do `CrudService`.

```ts
import ProdutoService from './ProdutoService';

const produtos = await ProdutoService.listar();
```

### [TarefaService.ts](../vireyaWeb/src/services/TarefaService.ts)

Serviço responsável pelas operações relacionadas a tarefas.

#### Funcionalidades:
  - Herda métodos CRUD do `CrudService`.

```ts
import TarefaService from './TarefaService';

const tarefas = await TarefaService.listar();
```

### [UnidadeMedidaService.ts](../vireyaWeb/src/services/UnidadeMedidaService.ts)

Serviço responsável por listar as unidades de medida. (Serviço unicamente usado para dropdown)

```ts
import { listarUnidadesMedida } from './UnidadeMedidaService';

const unidades = await listarUnidadesMedida();
```
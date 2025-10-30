# Hooks

Este documento descreve os hooks utilizados no projeto, incluindo parâmetros, retorno e exemplos de uso.

### [useDropdown.ts](../vireyaWeb/src/hooks/crud/useDropDown.ts)

Hook genérico para popular dropdowns a partir de uma função que retorna uma lista.

```ts
import { useDropdown } from '../hooks/useDropdown';
import { listarCargo } from '../services/CargoService';

const cargos = useDropdown(listarCargo);
```

### [useCrud.ts](../vireyaWeb/src/hooks/crud/useCrud.ts)

Hook genérico para operações CRUD com qualquer serviço que implemente.

#### Uso
```ts
import useCrud from '../hooks/useCrud';
import FuncionarioService from '../services/FuncionarioService';
import type { Funcionario } from '../types/Funcionario';

const { items, criar, atualizar, deletar, refetch } = useCrud<Funcionario>(FuncionarioService);
```

#### Retorno

- items: T[] - Lista de itens.

- loading: boolean - Indica se está carregando.

- error: unknown - Erro ocorrido na operação, se houver.

- refetch: () => Promise<void> - Recarrega a lista.

- criar(data) - Cria um novo item.

- atualizar(id, data) - Atualiza um item existente.

- deletar(id) - Remove um item pelo id.

### [useCrudEntity.ts](../vireyaWeb/src/hooks/crud/useCrudEntity.ts)

Hook de conveniência que utiliza useCrud e retorna os mesmos dados, mas tipado para entidades específicas. (Dica: USE ESSE, não tente usar o outro diretamente)

```ts
import { useCrudEntity } from '../hooks/useCrudEntity';
import AvisoService from '../services/AvisoService';
import type { Aviso } from '../types/Aviso';

const { items: avisos, criar, atualizar, deletar } = useCrudEntity<Aviso>(AvisoService);
```

### Hooks Específicos de Entidade

Baseados em useCrudEntity, estes hooks facilitam o consumo de dados das entidades.

#### Exemplo:

useAvisos
```ts
const { avisos, criar, atualizar, deletar } = useAvisos();
```

#### Retorno

{
  items,
  loading,
  error,
  refetch,
  criar,
  atualizar,
  deletar
}

### [useGetOrganograma.ts](../vireyaWeb/src/hooks/crud/useOrganograma.ts)

Hook para buscar organograma da ETA. (Id da Eta já é pega do local storage quando o usuário se loga)

```ts
const { data: organograma } = useGetOrganograma(funcionarioId, idEta);
```

#### Retorno

FuncionarioCardTipo[] - Lista de funcionários do organograma.


### [useAvisosDashBoard.ts](../vireyaWeb/srcc/hooks/crud/useAvisosDashBoard.ts)

Hook para buscar últimos avisos para a página de dashboard (endpoint específico na api).

```ts
const { ultimosAvisos } = useAvisos();
```

Retorna apenas ultimosAvisos: Aviso[] | null.

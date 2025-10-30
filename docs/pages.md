# Pages

Este documento descreve as páginas utilizadas no projeto.

Todas as páginas apresentam responsividade, sistema de verificação de autenticação e a maioria possui estilos personalizados (da pasta styles)

## Autenticação

### [AuthContext.tsx](../vireyaWeb/src/pages/context/AuthContext.tsx)

Essa página serve para compartilhar entre as páginas e componentes o contexto de autenticação. Após o login ele pode compartilhar o nome e cargo do funcionário para o header, por exemplo.

interface AuthData {
nome: string | null;
cargo: string | null;
login: (nome: string, cargo: string) => void;
logout: () => void;
isAuthenticated: boolean;
}
Retorno

    <AuthContext.Provider
      value={{
        nome,
        cargo,
        login,
        logout,
        isAuthenticated: !!nome,
      }}
    >
      {children}
    </AuthContext.Provider>

exemplo de uso

### [LoginExterno.tsx](../vireyaWeb/src/pages/LoginExterno.tsx)

Essa página serve para autenticar o usuário, assim que ele entra no /login-externo ele passa na url o funcionarioId e o token (ela serve para deixar apenas os gerentes poderem acessar o site (e pelo link na landing page))

Exemplo de url `http://localhost:5173/login-externo?funcionarioId=2&token=TOKEN`
(token é o .env VITE_AUTH_TOKEN)

### [PrivateRoute.tsx](../vireyaWeb/src/pages/PrivateRoute.tsx)

Essa página serve para verificar com base no useAuth para verifcar se o usuário está logado, caso contrário redireciona ele para o acesso-negado

Uso no [Routes.tsx](../vireyaWeb/src/Routes/Routes.tsx):

```ts
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <DashboardPage />
    </PrivateRoute>
  }
/>
```

### [AcessoNegadoPage.tsx](../vireyaWeb/src/pages/AcessoNegadoPage.tsx)

Essa página serve para barrar o usuário caso ele não esteja loggado e autenticado.

Mostra uma mensagem dizendo que não tem acesso ao site.

## Páginas Gerais

### [DashboardPage.tsx](../vireyaWeb/src/pages/AcessoNegadoPage.tsx)

Essa página serve para mostrar informação

É a página que o usuário ve primeiro (default) ao entrar no site.

#### Funcionalidades:

Integração com o PowerBI, mostrando os gráficos para o gerente.
Uso do hook [useAvisosDashBoard.ts](../vireyaWeb/srcc/hooks/crud/useAvisosDashBoard.ts) para mostrar os últimos avisos da sua ETA para o gerente.

### [ChatBotPage.tsx](../vireyaWeb/src/pages/ChatBotPage.tsx)

Essa página serve para o gerente conseultar o chatbot IA

#### Funcionalidades:

Integração com api para acessar o chatbot, utilizando contexto por funcionário

## Páginas de CRUD

### [CrudPage.tsx](../vireyaWeb/src/pages/crud/CrudPage.tsx)

FAZER

#### Funcionalidades:

### [AvisoPage.tsx](../vireyaWeb/src/pages/crud/AvisoPage.tsx)

Página para o gerente fazer o CRUD dos avisos

Utiliza a [CrudPage.tsx](../vireyaWeb/src/pages/crud/CrudPage.tsx)
Utiliza o dropdown de prioridades

```ts
const prioridades = useDropdown(listarPrioridades);
```

```ts
export type Aviso = {
  id: number;
  descricao: string;
  dataOcorrencia: string;
  idEta: number;
  idPrioridade: number;
  prioridade: string;
  status: string;
  nomeEta: string;
};
```

#### Funcionalidades:

- Listar avisos
- Filtrar avisos
- Modal para crirar, editar e excluir avisos

### [FuncionarioPage.tsx](../vireyaWeb/src/pages/crud/FuncionarioPage.tsx)

Página para o gerente fazer o CRUD dos funcionários

Utiliza a [CrudPage.tsx](../vireyaWeb/src/pages/crud/CrudPage.tsx)
Utiliza o dropdown de cargos

```ts
const cargos = useDropdown(listarCargos);
```

```ts
export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  dataAdmissao: Date;
  dataNascimento: Date;
  eta: string;
  cargo: string;
  senha: string;
  idEta: string;
  idCargo: string;
}
```

#### Funcionalidades:

- Listar funcionários
- Filtrar funcionários
- Modal para criar, editar e excluir funcionários

### [ProdutoPage.tsx](../vireyaWeb/src/pages/crud/ProdutoPage.tsx)

Página para o gerente fazer o CRUD dos produtos

Utiliza a [CrudPage.tsx](../vireyaWeb/src/pages/crud/CrudPage.tsx)
Utiliza o dropdown de unidades de medidas

```ts
const unidades = useDropdown(listarUnidadesMedida);
```

```ts
export type Produto = {
  id: number;
  nome: string;
  tipo: string;
  unidadeMedida: string;
  idUnidadeMedida: number;
};
```

#### Funcionalidades:

- Listar produtos
- Filtrar produtos
- Modal para criar, editar e excluir produtos

### [TarefaPage.tsx](../vireyaWeb/src/pages/crud/TarefaPage.tsx)

Página para o gerente fazer o CRUD dos produtos

Utiliza a [CrudPage.tsx](../vireyaWeb/src/pages/crud/CrudPage.tsx)
Utiliza o dropdown de prioridades

```ts
const prioridades = useDropdown(listarPrioridades);
```

```ts
export type Tarefa = {
  id: number;
  descricao: string;
  dataCriacao: string;
  dataConclusao: string;
  status: string;
  nome: string;
  prioridade: string;
};
```

#### Funcionalidades:

- Listar tarefas
- Filtrar tarefas
- Modal para criar, editar e excluir tarefas

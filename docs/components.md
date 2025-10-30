# Components

Este documento descreve os componentes utilizados no projeto, incluindo parâmetros, retorno e exemplos de uso.

## Componentes de Layout

### [Header.tsx](../vireyaWeb/src/components/layout/Header.tsx)
Componente de cabeçalho da aplicação, exibindo foto, nome e cargo do usuário, título da página, data e alternador de tema.

Funcionalidades:

O usuário pode trocar sua foto (salva a string64 na localStorage)

Responsiva

Está presente em todas as páginas. (Colocado no App.tsx)

#### Uso:

```tsx
import Header from './layout/Header';

<Header />
```

### [Sidebar.tsx](../vireyaWeb/src/components/layout/Sidebar.tsx)

Componente de barra lateral, responsável pela navegação entre as páginas da aplicação.

Funcionalidades:

Usuário clicla nos links com ícones e navega

Responsiva

#### Uso:

```tsx
import Sidebar from './layout/Sidebar';

<Sidebar />
```

## Componentes Gerais

### [FuncionarioCard.tsx](../vireyaWeb/src/components/FuncionarioCard.tsx)

Componente que exibe as informações de um funcionário em um card.

#### Parâmetros:
  - funcionario: FuncionarioCardTipo - objeto contendo nome, cargo, e outras informações do funcionário.


Exemplo de uso:

```tsx
import FuncionarioCard from './FuncionarioCard';

<FuncionarioCard funcionario={meuFuncionario} />
```

### [Tema.tsx](../vireyaWeb/src/components/Tema.tsx)

Componente responsável por alternar entre temas (claro/escuro) e salvar a preferência no localStorage.

O tema claro é representado por um sol e aparece quando o tema já é escuro para alterar, o escuro é uma lua. (ambos svg)

Adiciona a classe .dark-mode para o css estilizar (o css usa variáveis para trocar dependendo do tema, veja [aqui](../vireyaWeb/src/styles/temas.css))

#### Uso:
```tsx
import ThemeToggler from './ThemeToggler';

<ThemeToggler />
```
# Vireya Hydrocore - Site

Esse projeto foi desenvolvido por alunos do Instituto J&F, do curso Germinare Tech. Vireya é um projeto que tem a proposta de simplificar e ajudar no gerenciamento de ETAs (Empresas de Tratamento de Água) e diminuir erros humanos. Trazendo soluções a problemas reais dentro de ETAs desde superdosagem ou subdosagem até o gerenciamento de estoque e geração de relatórios exigidos por lei e periódicos.

O site é usado por **gerentes** da ETA, ondem eles podem executar algumas tarefas como:

- Gerenciamentos de funcionários, tarefas, produtos e avisos
- Visualização de dashboards
- Organograma da ETA
- ChatBot IA personalizada com as informações da ETA

## Como configurar o projeto

Configurações necessárias para inicializar o projeto:

- **Node.js** (versão >= 14.0.0) e **npm**
- **Git**

#### Para inicializar o projeto

```bash
$ git clone https://github.com/seu-usuario/seu-repositorio.git

$ cd hydrocore-website-dad/vireyaWeb

$ npm install

$ npm run dev
```

#### Ao iniciar, o projeto estará rodando em http://localhost:5173

### Variáveis de ambiente

*Importante*: crie um arquivo .env na raiz do projeto com as variáveis necessárias.

```env
VITE_API_URL=
VITE_PBI_GRAPH=
VITE_CHATBOT_API_URL=
VITE_CHATBOT_API_PASSWORD=
VITE_MONGOLOGIN_API_URL=
VITE_TOKEN_LOGIN_EXTERNO=
VITE_AUTH_TOKEN=
```

## Dependências do projeto

- **@emotion/react**: Biblioteca para estilos CSS-in-JS, usada junto com MUI.
- **@emotion/styled**: Extensão do Emotion.
- **@mui/material**: Biblioteca de componentes React prontos.
- **@mui/icons-material**: Conjunto de ícones do Material Design.
- **axios**: Biblioteca para realizar requisições HTTP.
- **react**
- **react-dom**
- **react-hook-form**: Biblioteca para manipulação de formulários em React de forma simples, performática e com validação.
- **react-icons**: Biblioteca de ícones.
- **react-router-dom**: Biblioteca para gerenciar rotas e navegação.

### Linguagens e tecnologias Utilizadas

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" height="40" alt="vite logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo" />

## Documentação
- [Pages](./docs/pages.md)
- [Componentes](./docs/components.md)
- [Services](./docs/services.md)
- [Hooks](./docs/hooks.md)

Este projeto está sob a licença <a href="https://opensource.org/licenses/MIT">MIT</a>. Veja o arquivo LICENSE para detalhes.

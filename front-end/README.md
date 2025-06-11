# Front-end - Gerenciador de Tarefas

Este é o front-end de uma aplicação de gerenciamento de tarefas, desenvolvido com React. A aplicação permite aos usuários criar e visualizar tarefas.

## Funcionalidades

- Cadastro de novas tarefas
- Visualização de todas as tarefas
- Interface responsiva e moderna

## Pré-requisitos

- Node.js (versão 20 ou superior)
- npm ou yarn

## Como Executar o Projeto

1. Clone o repositório
2. Navegue até a pasta do front-end:

```bash
cd front-end
```

3. Instale as dependências:

```bash
npm install
# ou
yarn
```

4. Crie um arquivo `firebase-config.json` na raiz do projeto back-end com as credenciais do seu projeto firebase.

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

6. Acesse a aplicação em `http://localhost:5173`

## Estrutura do Projeto

```
front-end/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Serviços e integrações com API
│   └── lib/            # Funções utilitárias de bibliotecas
├── public/             # Arquivos estáticos
└── ...
```

## Scripts Disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn test` - Roda os testes unitários

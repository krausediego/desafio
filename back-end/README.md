# Back-end - Gerenciador de Tarefas

Este é o back-end de uma aplicação de gerenciamento de tarefas, desenvolvido com Node.js e Express. A API fornece endpoints para criação e visualização de tarefas.

## Funcionalidades

- API RESTful para gerenciamento de tarefas
- Endpoints para criação de tarefas
- Endpoints para visualização de tarefas
- Integração com Firebase

## Pré-requisitos

- Node.js (versão 20 ou superior)
- npm ou yarn
- Conta no Firebase

## Como Executar o Projeto

1. Clone o repositório
2. Navegue até a pasta do back-end:

```bash
cd back-end
```

3. Instale as dependências:

```bash
npm install
# ou
yarn
```

4. Crie o arquivo `firebase-config.json` e insira as credenciais do seu projeto.

5. Inicie o servidor:

```bash
npm run dev
# ou
yarn dev
```

6. O servidor estará rodando em `http://localhost:3000`

## Estrutura do Projeto

```
back-end/
├── src/
│   ├── modules/        # Controllers e services das funcionalidades
│   ├── routes/         # Definição das rotas
│   ├── infra/          # Integração direta com a infraestrutura do projeto
├── tests/              # Testes unitários
└── ...
```

## Endpoints da API

### Tarefas

- `GET /get-tasks` - Lista todas as tarefas
- `POST /insert-tasks` - Cria uma nova tarefa

## Scripts Disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn test` - Roda os testes unitários

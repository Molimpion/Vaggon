# Repositório do Projeto Vaggon

*Desafio Técnico para a vaga de Estágio Desenvolvedor Node.js.*

### Frontend e Interface
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

### Backend e Banco de Dados
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

### Ferramentas e Documentação
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white) ![Scalar](https://img.shields.io/badge/Scalar-101827?style=for-the-badge&logo=openapiinitiative&logoColor=white)

-----

## 1. Visão Geral

Este repositório contém a solução completa (**Frontend + Backend**) para o desafio da **Agenda Eletrônica Vaggon**.
O sistema consiste em uma API RESTful robusta e uma interface web moderna para gerenciamento de compromissos, garantindo segurança e isolamento de dados por usuário.

**Aplicação Web:** [http://localhost:5173](http://localhost:5173)
**Documentação da API:** [http://localhost:3000/docs](http://localhost:3000/docs)

## 2. Estado do Projeto

Todos os requisitos funcionais e técnicos foram implementados:

* [x] **Autenticação:** Sistema de Login e Cadastro com JWT e proteção de rotas.
* [x] **Backend:** Arquitetura em camadas (Controller/Service), validação com Zod e ORM Sequelize.
* [x] **Frontend:** Interface responsiva construída com React e Material UI.
* [x] **Agenda:** Visualização interativa (Mês, Semana, Dia) utilizando `react-big-calendar`.
* [x] **CRUD:** Gestão completa de atividades (Criar, Editar, Excluir) via Modais.

## 3. Arquitetura

O projeto opera como duas aplicações distintas que se comunicam:

1.  **Backend (Porta 3000):** Servidor Node.js que gerencia o Banco de Dados MySQL e fornece a API.
2.  **Frontend (Porta 5173):** Aplicação React (SPA) que consome a API para desenhar a interface.

## 4. Como Executar o Projeto Localmente

⚠️ **Importante:** Para o sistema funcionar, você precisa rodar o Backend e o Frontend simultaneamente. Siga os passos abaixo utilizando **dois terminais**.

### Pré-requisitos
* Node.js instalado.
* Banco de Dados MySQL rodando localmente.

### Passo 1: Inicializando o Backend (Terminal 1)

1.  Acesse a pasta do backend:
    ```bash
    cd backend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente. Crie um arquivo `.env` na pasta `backend` com seus dados:
    ```env
    PORT=3000
    DB_NAME=vaggon_db
    DB_USER=seu_usuario_mysql
    DB_PASS=sua_senha_mysql
    DB_HOST=localhost
    DB_PORT=3306
    JWT_SECRET=chave_secreta_segura
    ```

4.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    > O terminal deve exibir: *"Servidor rodando em http://localhost:3000"* e *"Conexão com Banco de Dados estabelecida!"*

---

### Passo 2: Inicializando o Frontend (Terminal 2)

**Abra uma nova janela ou aba do terminal** (não feche a anterior) e siga os passos:

1.  Acesse a pasta do frontend:
    ```bash
    cd frontend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie a interface web:
    ```bash
    npm run dev
    ```

4.  O terminal exibirá um link local:
    >  ➜  Local:   http://localhost:5173/

**Pronto!** Agora basta abrir o link no seu navegador para utilizar o sistema.

## 5. Documentação da API (Endpoints)

A API possui documentação automática gerada pelo Scalar/Swagger.

### Autenticação (`/auth`)
| Método | Endpoint    | Descrição                        |
| :----- | :---------- | :------------------------------- |
| `POST` | `/register` | Cadastrar novo usuário           |
| `POST` | `/login`    | Fazer login e receber token JWT  |

### Atividades (`/activities`)
> Requer Header: `Authorization: Bearer <TOKEN>`

| Método   | Endpoint | Descrição                                    |
| :------- | :------- | :------------------------------------------- |
| `GET`    | `/`      | Listar atividades do usuário                 |
| `POST`   | `/`      | Criar nova atividade                         |
| `PUT`    | `/:id`   | Atualizar atividade                          |
| `DELETE` | `/:id`   | Remover atividade                            |

Para ver os detalhes de cada endpoint (parâmetros, respostas, etc), acesse:
**http://localhost:3000/docs**

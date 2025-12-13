*Desafio Técnico para a vaga de Estágio Desenvolvedor Node.js.*

### Framework e Ambiente Principal
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Banco de Dados e ORM
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

### Validação, Ferramentas e Documentação
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black) ![Scalar](https://img.shields.io/badge/Scalar-101827?style=for-the-badge&logo=openapiinitiative&logoColor=white)

-----

## 1. Visão Geral

Este repositório contém o código-fonte do backend da **Agenda Eletrônica Vaggon**.
Trata-se de uma **API RESTful** desenvolvida para gerenciar usuários e suas respectivas atividades (compromissos), garantindo que cada usuário tenha acesso apenas aos seus próprios dados.

* **Documentação Visual (Scalar):** [http://localhost:3000/docs](http://localhost:3000/docs)
* **Documentação JSON (Swagger):** [http://localhost:3000/docs/json](http://localhost:3000/docs/json)

## 2. Estado do Projeto

A implementação dos requisitos funcionais do backend foi **concluída**.

* [x] **Autenticação:** Cadastro e Login de usuários com JWT.
* [x] **Gestão de Atividades:** CRUD completo (Criar, Listar, Atualizar, Deletar).
* [x] **Segurança:** Senhas criptografadas e proteção de rotas privadas.
* [x] **Documentação:** Rotas documentadas automaticamente.

## 3. Arquitetura e Decisões de Design

A aplicação segue o padrão **Monólito em Camadas (Layered Monolith)**.
O design foi modularizado para facilitar a manutenção e escalabilidade, separando responsabilidades.

* **Framework Web:** Express.js
* **Banco de Dados:** MySQL
* **ORM:** Sequelize (facilita a interação com o banco e migrações)
* **Pattern:** Service Layer (Controladores delegam a lógica de negócio para Serviços).
* **Segurança (Autenticação):** Tokens JWT (`jsonwebtoken`) e criptografia com `bcryptjs`.
* **Validação:** Validação robusta de dados de entrada com `zod`.
* **Documentação:** Interface moderna e interativa com **Scalar** baseada em especificações **Swagger/OpenAPI**.
* **Tratamento de Erros:** Sistema centralizado com classe `AppError` e middleware global.

## 4. Como Executar o Projeto Localmente

### 1. Pré-requisitos
* Node.js
* Banco de Dados MySQL

### 2. Instalação e Execução

1.  Clone este repositório.
2.  Acesse a pasta `backend`.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Crie um arquivo `.env` na raiz do `backend` com as seguintes variáveis de ambiente (ajuste conforme suas credenciais do banco MySQL local):
    ```env
    PORT=3000
    DB_NAME=vaggon_db
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_HOST=localhost
    DB_PORT=3306
    JWT_SECRET=sua_chave_secreta_jwt
    ```
5.  Execute o projeto:
    ```bash
    npm run dev
    ```
    O servidor iniciará (com `nodemon`) e tentará conectar ao banco de dados e sincronizar as tabelas automaticamente.

### 3. Como Usar e Testar Localmente

Após iniciar o servidor, você tem três formas principais de interagir com a API:

1.  **Via Documentação Interativa (Recomendado):**
    * Abra o navegador em [http://localhost:3000/docs](http://localhost:3000/docs).
    * Utilize a interface do **Scalar** para explorar os endpoints.
    * Você pode disparar requisições reais diretamente pela interface (botão "Test Request").

2.  **Via API Client (Insomnia/Postman):**
    * Configure a URL base para `http://localhost:3000`.
    * Para rotas protegidas (Atividades), adicione o header `Authorization` com o valor `Bearer <SEU_TOKEN_JWT>` obtido na rota de `/login`.

3.  **Fluxo de Teste Sugerido:**
    * **Passo 1:** Use a rota `POST /auth/register` para criar um usuário.
    * **Passo 2:** Use a rota `POST /auth/login` para receber seu Token JWT.
    * **Passo 3:** Copie o Token e use nas rotas de `/activities` para criar e listar seus agendamentos.

## 5. Documentação da API (Endpoints)

### Autenticação (`/auth`)


| Método | Endpoint    | Descrição                        | Acesso  |
| :----- | :---------- | :------------------------------- | :------ |
| `POST` | `/register` | Cadastrar novo usuário           | Público |
| `POST` | `/login`    | Fazer login e receber token JWT  | Público |

### Atividades (`/activities`)


> **Nota:** Todas as rotas abaixo requerem o header `Authorization: Bearer <token>`.

| Método   | Endpoint | Descrição                                    |
| :------- | :------- | :------------------------------------------- |
| `GET`    | `/`      | Listar atividades do usuário logado          |
| `POST`   | `/`      | Criar nova atividade                         |
| `PUT`    | `/:id`   | Atualizar atividade (nome, datas, status)    |
| `DELETE` | `/:id`   | Remover atividade                            |

**Modelos de Dados:**
* **Usuário:** `id`, `login`, `password`.
* **Atividade:** `id`, `nome`, `descricao`, `data_inicio`, `data_termino`, `status` (pendente, concluida, cancelada), `user_id`.

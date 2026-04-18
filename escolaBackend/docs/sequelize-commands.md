# 🗄️ Guia de Referência: Sequelize & API REST

Este documento serve como um guia rápido para os comandos e padrões de desenvolvimento utilizados nesta API com **Node.js**, **Sequelize** e **Express**.

---

## 🚀 Comandos Essenciais (Sequelize CLI)

O CLI é fundamental para gerenciar a evolução do banco de dados sem escrever SQL manualmente.

| Comando | Descrição |
| :--- | :--- |
| `npx sequelize migration:generate --name=nome` | Cria um novo arquivo de migration para estruturar tabelas. |
| `npx sequelize db:migrate` | Aplica as alterações (migrations) ao banco de dados. |
| `npx sequelize db:migrate:undo` | Reverte a última alteração feita no banco. |
| `npx sequelize db:seed:all` | Alimenta o banco com dados de teste (Seeds). |
| `npx sequelize db:seed:undo:all` | Remove todos os dados inseridos pelas seeds. |

---

## 🏗️ Arquitetura do Model (Camada de Dados)

O **Model** representa a tabela e contém as regras de validação e segurança.

* **Validações Internas**: O Sequelize valida campos (como e-mail e tamanho de nome) antes de tentar salvar no MySQL.
* **Campos Virtuais**: O campo `password` é virtual; ele existe apenas para receber a senha bruta e não é salvo no banco.
* **Segurança com Hooks**: Utilizamos o hook `beforeSave` para interceptar a senha e gerar um hash seguro via `bcryptjs` antes do armazenamento.
* **Métodos de Instância**: Podemos criar métodos como `passwordIsValid` para comparar senhas durante o login de forma assíncrona.

---

## 🎮 Camada de Controller (Lógica de Negócio)

Os Controllers gerenciam o fluxo de dados entre as rotas e os Models.

### Padrão de Métodos REST:
1.  **index**: Lista todos os registros (ex: `Aluno.findAll()`).
2.  **store**: Cria um novo registro usando `req.body`.
3.  **show**: Exibe um registro específico via ID (`req.params.id`).
4.  **update**: Localiza e atualiza os dados de um registro existente.
5.  **delete**: Remove um registro permanentemente do banco.

---

## ⚠️ Erros Comuns e Boas Práticas

### 1. O Problema da "Promise Pending"
Sempre que realizar operações no banco (como `create`, `update`, `findAll`), você **deve** usar `await`. Caso contrário, o JavaScript retornará uma promessa pendente em vez dos dados.

### 2. Retornos Consistentes (ESLint)
Para evitar erros de `consistent-return`, utilize sempre `return res.json(...)`. Isso garante que a função encerre imediatamente após enviar a resposta ao cliente.

### 3. Seeds vs Hooks
Lembre-se: **Seeds não disparam Hooks** do Model. Ao criar usuários via Seed, você deve gerar o hash da senha manualmente (ex: `bcryptjs.hashSync`) dentro do arquivo de semente.

### 4. Modo Seguro do MySQL
Se o erro `Code: 1175` aparecer ao tentar deletar registros no Workbench, desative o "Safe Update Mode" com o comando:
`SET SQL_SAFE_UPDATES = 0;`.

---

## 🛠️ Ferramentas Utilizadas
* **Nodemon/Sucrase**: Para desenvolvimento rápido com sintaxe moderna (`import/export`).
* **BcryptJS**: Criptografia de senhas.
* **Insomnia**: Testes de rotas da API.

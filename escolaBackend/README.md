# 🚀 Arquitetura da API Rest - Sequelize & Node.js

Este guia explica como os componentes do projeto se conectam e a responsabilidade de cada pasta e arquivo dentro da arquitetura utilizada.

---

## 📂 Estrutura de Pastas e Conexões

### 1. ⚙️ Configuração e Ambiente
* **.env**: Armazena variáveis sensíveis como credenciais do banco de dados (usuário, senha, host). É o primeiro arquivo lido pelo sistema para garantir que o Sequelize saiba onde se conectar.
* **src/config/database.js**: Traduz as variáveis do `.env` para um formato que o Sequelize entenda, definindo o dialeto (MySQL) e configurações de fuso horário e padrões de nome de coluna (`underscored: true`).

### 2. 🏛️ Camada de Dados (Database & Migrations)
* **src/database/migrations/**: Contém o histórico de alterações do banco de dados.
    * **Função**: O arquivo `20260222185407-alunos.js` funciona como uma "versão" da tabela. O método `up` cria a tabela e o `down` a remove.
    * **Por que usar Migrations?:**
      * **Controle de Versão:** Assim como o Git rastreia mudanças no código, as migrations rastreiam mudanças no banco. Se você mudar de computador ou um colega entrar no projeto, basta rodar um comando para ter o banco idêntico ao original.
      * **Segurança e Padronização:** Elas evitam o erro humano de esquecer de criar uma coluna ou configurar um tipo de dado errado manualmente no MySQL Workbench.
      * **Automação:** Permitem que o banco de dados seja criado do zero em segundos, garantindo que o ambiente de desenvolvimento seja exatamente igual ao de produção.
* **src/database/index.js**: É o "centralizador" da conexão.
    * **Função**: Ele importa a configuração, percorre todos os Models (como o `Aluno`) e executa o método `init()`, estabelecendo a ligação real entre o código JavaScript e o banco de dados MySQL.

### 3. 🧠 Models (O Coração da Entidade)
* **src/models/Aluno.js**: Define a estrutura do objeto "Aluno" dentro da aplicação.
    * **Função**: Mapeia quais campos (nome, email, peso, altura) podem ser manipulados e seus tipos de dados. É através dele que realizamos operações como `Aluno.create()` ou `Aluno.findAll()`.

### 4. 🎮 Controllers (A Lógica de Negócio)
* **src/controllers/HomeController.js**: Intermedia a requisição do usuário e o acesso aos dados.
    * **Função**: Recebe a chamada da rota, usa o Model `Aluno` para salvar ou buscar dados e retorna uma resposta JSON para o cliente (Insomnia/Frontend).

### 5. 🛣️ Routes (Os Caminhos)
* **src/routes/homeRoutes.js**: Define os endereços (URLs) da API.
    * **Função**: Conecta um método HTTP (GET, POST, etc.) a uma função específica dentro de um Controller.

### 6. 🛠️ Inicialização do App
* **app.js**: Configura a aplicação Express.
    * **Função**: Carrega os middlewares (parse de JSON), as rotas e, crucialmente, importa a conexão com o banco de dados (`import './src/database'`) para que tudo funcione assim que o servidor subir.
* **server.js**: O ponto de partida que coloca o servidor para "ouvir" em uma porta específica (ex: 3001).

---

## 🔄 Fluxo de uma Requisição

1. O **Insomnia** faz uma chamada para `GET /`.
2. O **Express** recebe a chamada no `app.js` e a envia para o `homeRoutes.js`.
3. O **Router** identifica que o caminho `/` pertence ao `HomeController.index`.
4. O **Controller** executa o comando `Aluno.create({...})`.
5. O **Model** (já inicializado pelo `database/index.js`) envia o comando SQL para o **MySQL**.
6. O **Controller** recebe a confirmação e envia o objeto criado de volta para o **Insomnia** como JSON.

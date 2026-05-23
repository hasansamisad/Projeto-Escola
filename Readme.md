# 🎓 Sistema de Gestão Escolar Full-Stack

Este projeto é uma aplicação robusta para gestão de alunos, desenvolvida com uma arquitetura moderna dividida entre uma API REST escalável e um ecossistema frontend reativo. Toda a aplicação é orquestrada via **Docker**, garantindo consistência entre os ambientes de desenvolvimento e produção sob **WSL2 (Ubuntu)**.

---

<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/e6adda60-71a3-43a2-a387-037dd0ad4e56" />


## 🛠️ Tecnologias Principais

### **Backend (API REST)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Sequelize (MySQL)
* **Segurança:** JWT (JSON Web Tokens), Helmet e CORS
* **Uploads:** Multer para gerenciamento de arquivos (Fotos de alunos)

### **Frontend (Single Page Application)**
* **Biblioteca:** React.js (Vite)
* **Gerenciamento de Estado:** Redux & Redux-Saga (Assincronismo)
* **Persistência:** Redux-Persist (LocalStorage)
* **Estilização:** Styled Components
* **Navegação:** React Router Dom v5
* **Feedback:** React-Toastify

### **Infraestrutura**
* **Containerização:** Docker & Docker-Compose
* **Banco de Dados:** MySQL 8.0
* **Ambiente de Dev:** WSL2 com Ubuntu

---

## 🏗️ Arquitetura do Sistema

O projeto utiliza o conceito de containers isolados que se comunicam através de uma rede bridge interna do Docker:

1.  **Container de Dados (`apirest_db`):** Banco de dados persistente utilizando volumes Docker para integridade dos dados.
2.  **Container Backend (`apirest_node`):** API servindo na porta `3001`, com suporte a arquivos estáticos para exibição de fotos.
3.  **Container Frontend (`escola_front`):** SPA servindo na porta `5173` via Vite, consumindo a API de forma assíncrona.

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Docker** e o **Docker Compose** instalados no seu ambiente WSL2.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
```

## Configurar Variáveis de Ambiente

Crie um arquivo .env na pasta escolaBackend seguindo o modelo: 
```
DATABASE=escola
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
TOKEN_SECRET=seu_token_secreto
TOKEN_EXPIRATION=7d
```

## Subir a Aplicação (Docker)
Na raiz do projeto (onde está o docker-compose.yml), execute:
```Bash
docker-compose up --build
```

## Funcionalidades Implementadas

* **Autenticação JWT:** Sistema de login seguro com geração e validação de tokens.

* **Gestão de Alunos:** CRUD completo com validações de backend e frontend.

* **Upload de Fotos:** Upload de imagens vinculado ao ID do aluno com armazenamento persistente.

* **Persistência de Estado:** Recuperação automática de token e dados do usuário via Redux-Persist (Rehydrate).

* **Segurança:** Configuração de Headers, tratamento de CORS e rotas protegidas por Middlewares.

## Estrutura de Pastas

```PlainText
.
├── escolaBackend/       # API Node.js, Sequelize Models e Migrations
├── escolaFrontend/      # React SPA, Redux-Saga e Styled Components
└── docker-compose.yml   # Orquestração de serviços e redes
```

**Nota Técnica:** Este projeto utiliza volumes sincronizados para permitir Hot Reload mesmo dentro dos containers, otimizando o fluxo de desenvolvimento no ambiente WSL2.

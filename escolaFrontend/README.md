# 🚀 Documentação da Arquitetura: React Router, Redux Saga & Persistence

Este projeto utiliza uma arquitetura robusta baseada no ecossistema de **React v16/17**, focada em escalabilidade, gerenciamento de efeitos colaterais e persistência de dados. Abaixo estão detalhados os pilares desta aplicação.

---

## 🛣️ 1. React Router Dom (v5)

O roteamento é o coração da navegação. Nesta versão, utilizamos o controle manual do histórico de navegação.

### `Router` & `history`

Diferente do `BrowserRouter` comum, utilizamos o componente `<Router>` passando uma instância customizada de `history`.

- **Por que?** Isso nos permite navegar programaticamente de **fora** dos componentes React (como dentro de um Redux Saga), facilitando redirecionamentos após chamadas de API.

### `Switch` & `Routes`

- **`<Switch>`**: Garante o roteamento exclusivo. Ele percorre as rotas filhas e renderiza apenas a primeira que der "match" com a URL atual.
- **`exact`**: Necessário na rota raiz (`/`) para que o React Router não renderize o Login em todas as URLs que comecem com barra.

### `MyRoute.jsx` (Custom Route)

Este é um **Higher-Order Component (HOC)** criado para gerenciar permissões:

- **Rotas Privadas (`isClosed={true}`)**: Verifica se o usuário está autenticado. Caso contrário, redireciona para `/login` salvando a rota anterior para retorno.
- **Flexibilidade**: Centraliza a lógica de proteção de rotas em um único lugar.

---

## ⚡ 2. Redux & Redux Saga

Gerenciamento de estado global e operações assíncronas.

### `Provider`

O componente `<Provider>` do `react-redux` envolve toda a aplicação, injetando o `store`. Isso permite que qualquer componente acesse o estado global via `useSelector` ou dispare ações via `useDispatch`.

### Redux Saga

O Saga atua como um middleware (intermediário).

- **Intercepção**: Ele ouve as Actions de tipo `_REQUEST`.
- **Efeitos Colaterais**: Realiza as chamadas à API (geralmente com Axios) usando funções geradoras (`function*`).
- **Fluxo**: Após a resposta da API, ele dispara uma nova Action de `_SUCCESS` ou `_FAILURE`, atualizando o estado e disparando notificações.

---

## 💾 3. Redux Persist (LocalStorage)

Garante que os dados não sejam perdidos ao recarregar a página (F5).

### `PersistGate`

- **Funcionamento**: Ele atrasa a renderização da interface até que o estado salvo no `localStorage` do navegador seja recuperado e reidratado no Redux.
- **Uso**: Fundamental para manter Tokens de Autenticação e preferências do usuário persistentes.

---

## 🔔 4. React Toastify & Estilos

Ferramentas de UX (User Experience).

- **`ToastContainer`**: Componente central que gerencia as notificações flutuantes (toasts). Está configurado no `App.jsx` para ouvir chamadas de sucesso ou erro vindas de qualquer parte do app (especialmente do Saga).
- **`GlobalStyle`**: Implementação de estilos globais (CSS Reset e fontes) utilizando `styled-components`, garantindo consistência visual em toda a aplicação.

---

## 🛠️ Resumo do Fluxo de Dados

1. O usuário clica em um botão (**Componente**).
2. Uma Action de **REQUEST** é disparada (**Dispatch**).
3. O **Saga** intercepta essa ação, faz a chamada à API e mostra um **Toast**.
4. O **Saga** dispara uma Action de **SUCCESS**.
5. O **Reducer** atualiza o **Store**.
6. O **Redux Persist** salva essa mudança no **LocalStorage**.
7. O **Componente** reage à mudança de estado e exibe os novos dados.

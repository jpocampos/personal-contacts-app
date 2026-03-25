# 📒 Agenda de Contatos Pessoal

Aplicação web full-stack para gerenciamento de contatos pessoais, com sistema completo de autenticação de usuários.

---

## 🚀 Funcionalidades

- **Autenticação de usuários** — cadastro, login e logout com senhas criptografadas
- **Gerenciamento de contatos** — criar, visualizar, editar e excluir contatos
- **Sessões persistentes** — sessão armazenada no MongoDB com expiração configurável
- **Proteção CSRF** — tokens de segurança em todos os formulários
- **Mensagens flash** — feedback visual para ações do usuário
- **Página 404 personalizada** — tratamento de rotas não encontradas

---

## 🛠️ Tecnologias e Dependências

### 🔙 Backend

* **Node.js** (v18.19.1) — ambiente de execução JavaScript no servidor
* **Express.js** (v5.2.1) — framework para criação de aplicações web
* **MongoDB + Mongoose** (v9.3.0) — banco de dados NoSQL e ODM para modelagem dos dados
* **express-session** (v1.19.0) — gerenciamento de sessões de usuário
* **connect-mongo** (v6.0.0) — armazenamento de sessões no MongoDB
* **bcryptjs** (v3.0.3) — criptografia de senhas
* **csurf** (v1.11.0) — proteção contra ataques CSRF
* **connect-flash** (v0.1.1) — mensagens temporárias (feedback ao usuário)
* **dotenv** (v17.3.1) — gerenciamento de variáveis de ambiente
* **validator** (v13.15.26) — validação de dados (email, senha, etc.)

### 🎨 Frontend

* **EJS** (v5.0.1) — template engine para renderização de páginas
* **css-loader** (v7.1.4) — interpretação de arquivos CSS no JavaScript
* **style-loader** (v4.0.0) — injeção de estilos CSS no DOM
* **core-js** (v3.48.0) — polyfills para compatibilidade com navegadores antigos
* **regenerator-runtime** (v0.14.1) — suporte a async/await em ambientes antigos

### ⚙️ Ferramentas de Desenvolvimento

* **Nodemon** (v3.1.14) — reinicialização automática do servidor durante o desenvolvimento
* **Webpack** (v5.105.4) — empacotador de módulos (bundler)
* **webpack-cli** (v6.0.1) — interface de linha de comando do Webpack

### 🧠 Transpilação com Babel

* **@babel/core** (v7.29.0) — núcleo do Babel
* **@babel/cli** (v7.28.6) — execução via terminal
* **@babel/preset-env** (v7.29.0) — compatibilidade com diferentes ambientes
* **babel-loader** (v10.1.1) — integração do Babel com Webpack

## 📦 Observações

* As versões listadas correspondem às utilizadas no desenvolvimento do projeto
* O uso de ferramentas como **Webpack** e **Babel** garante maior compatibilidade e otimização do código frontend
* A aplicação segue boas práticas de segurança, incluindo uso de sessões, criptografia e proteção contra CSRF

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) **v18 ou superior** (recomendado: 18 LTS)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)
- npm

---

## ⚙️ Instalação e Configuração

**1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd projeto-agenda
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
CONNECTIONSTRING=mongodb://localhost:27017/agenda
```

> Para usar o MongoDB Atlas, substitua pela sua connection string.

---

## ▶️ Executando o Projeto

**Iniciar o servidor (com hot-reload via Nodemon)**

```bash
npm run dev
```

**Compilar o frontend (em modo watch)**

```bash
npm run build
```

**Iniciar o servidor**

```bash
npm run server
```

Para desenvolvimento, execute os dois comandos em terminais separados.

O servidor estará disponível em: **http://localhost:3000**

---

## 🏗️ Arquitetura

O projeto segue o padrão MVC (Model-View-Controller):

- Models → acesso e manipulação de dados
- Views → interface com o usuário (EJS)
- Controllers → lógica da aplicação

---

## 📁 Estrutura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)**.

```
projeto-agenda/
├── server.js                  # Ponto de entrada da aplicação
├── routes.js                  # Definição de todas as rotas
├── webpack.config.js          # Configuração do Webpack
├── .env                       # Variáveis de ambiente (não versionado)
├── public/
│   └── assets/js/
│       └── bundle.js          # JS compilado pelo Webpack
├── frontend/
│   ├── main.js                # Ponto de entrada do frontend
│   └── assets/css/
│       └── style.css          # Estilos globais
└── src/                       # Código principal (MVC)
    ├── controllers/
    │   ├── homeController.js
    │   ├── contactController.js
    │   └── registerController.js
    ├── models/
    │   ├── contactModel.js
    │   └── RegisterModel.js
    ├── middleware/
    │   └── middleware.js
    └── views/
        ├── homeView.ejs
        ├── guestHomeView.ejs
        ├── loginView.ejs
        ├── contactCreateView.ejs
        ├── contactEditView.ejs
        ├── 404.ejs
        └── includes/
            ├── head.ejs
            ├── nav.ejs
            ├── guestNav.ejs
            ├── footer.ejs
            └── message.ejs
```

---

## 🔐 Rotas da Aplicação

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/` | Página inicial com lista de contatos | ✅ |
| GET | `/login` | Página de login/cadastro | ❌ |
| POST | `/register` | Cadastro de novo usuário | ❌ |
| POST | `/login` | Autenticação do usuário | ❌ |
| GET | `/login/logout` | Encerrar sessão | ✅ |
| GET | `/contact` | Formulário de novo contato | ✅ |
| POST | `/contact/create` | Criar contato | ✅ |
| GET | `/contact/edit/index/:id` | Formulário de edição | ✅ |
| POST | `/contact/edit/update/:id` | Atualizar contato | ✅ |
| GET | `/contact/delete/:id` | Excluir contato | ✅ |

---

## 🔒 Segurança

- Senhas armazenadas com hash via **bcryptjs**
- Proteção contra ataques **CSRF** em todos os formulários
- Sessões com **expiração de 7 dias** e armazenamento no MongoDB
- Rotas protegidas por middleware de autenticação (`isLogged`)


## 👨‍💻 Autor

**João Pedro de Oliveira Campos**

- GitHub: https://github.com/jpocampos
- LinkedIn: https://linkedin.com/in/jpocampos

---

## 📄 Licença

Este projeto está sob a licença MIT.  
Veja o arquivo LICENSE para mais detalhes.
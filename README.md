# 📚 Sistema de Gestão de Assinaturas Digitais

Sistema backend desenvolvido em Node.js para gerenciar usuários e suas assinaturas de revistas. Utiliza Express, Sequelize e PostgreSQL com autenticação JWT. Estrutura modular, validação de dados e controle de acesso por token.

---

## ✅ Fluxo de Funcionamento

1. **Cadastro de Usuário:**
   O primeiro passo é cadastrar um usuário informando:

   * nome

   * e-mail

   * senha

   > O `codigo_usuario` é gerado automaticamente pelo sistema como chave primária.

2. **Validação de Dados:**
   O sistema valida o formato do e-mail e a força da senha (com regex).

3. **Login:**
   O usuário realiza login com e-mail e senha cadastrados.
   Se os dados estiverem corretos, o sistema gera um **token JWT**.

4. **Uso do Token:**
   Com o token, o usuário pode:

   * acessar os dados da própria conta (usuários)
   * realizar operações de CRUD nas assinaturas vinculadas ao seu código de usuário

   ⚠️ **Importante:** Só é possível cadastrar uma assinatura com um `codigo_usuario` já existente no banco.

---

## 🚀 Como iniciar o projeto

### 1. Criar a pasta e abrir no VS Code

```bash
mkdir assinaturas-digitais && cd assinaturas-digitais
code .
```

### 2. Inicializar o projeto Node

```bash
npm init -y
```

### 3. Instalar dependências

```bash
npm install express pg pg-hstore sequelize bcryptjs dotenv jsonwebtoken cors
```

### 4. Inicializar o repositório Git

```bash
git init
```

### 5. Criar `.gitignore`

```
node_modules
.env
```

### 6. Criar arquivos raiz

* `.env`
* `.envExample.md`
* `README.md`
* `index.js`

### 7. Criar estrutura de pastas e arquivos:

```bash
📁 assinaturas-digitais
│
├── node_modules/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── modules/
│   │   ├── usuario/
│   │   │   ├── controllers/
│   │   │   │   └── usuario.controller.js
│   │   │   ├── middleware/
│   │   │   │   └── usuario.middleware.js
│   │   │   ├── models/
│   │   │   │   └── usuario.model.js
│   │   │   └── routes/
│   │   │       └── usuario.route.js
│   │   │
│   │   ├── autenticacao/
│   │   │   ├── controllers/
│   │   │   │   └── autenticacao.controller.js
│   │   │   ├── middleware/
│   │   │   │   └── auth.middleware.js
│   │   │   └── routes/
│   │   │       └── autenticacao.route.js
│   │   │
│   │   └── assinatura/
│   │       ├── controllers/
│   │       │   └── assinatura.controller.js
│   │       ├── middleware/
│   │       │   └── assinatura.middleware.js
│   │       ├── models/
│   │       │   └── assinatura.model.js
│   │       └── routes/
│   │           └── assinatura.route.js
│   │
│   ├── utils/
│   │   └── validarCampos.js
│   │
│   └── relacionamento.js
│
├── .env
├── .envExample.md
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

---

## ✅ Campos e Regras dos Módulos

### 👤 1. Usuário

```diff
+ codigo_usuario ...... INTEGER, PK, AUTO INCREMENT, obrigatório
+ nome ................ STRING (10 a 50 caracteres), obrigatório
+ email ............... STRING (10 a 100 caracteres), obrigatório, único, formato válido
+ senha ............... STRING (6 a 10 caracteres, com 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial), obrigatório
```

---

### 📝 2. Assinatura

```diff
+ codigo_assinatura ... INTEGER, PK, AUTO INCREMENT, obrigatório
+ codigo_usuario ...... INTEGER, FK → usuarioDigital.codigo_usuario
+ revista_nome ........ STRING (3 a 50 caracteres), obrigatório
+ data_inicio ......... DATEONLY, obrigatório
+ data_fim ............ DATEONLY, obrigatório, maior que data_inicio
+ status .............. ENUM [ativa, cancelada, expirada], padrão: ativa
```

> ⚠️ Cada assinatura pertence obrigatoriamente a um usuário já cadastrado.

---

## 🔐 Rotas e Autenticação

### 👤 Usuários

| Método | Rota      | Ação            | Autenticação |
| ------ | --------- | --------------- | ------------ |
| POST   | /usuarios | Cadastro        | ❌ Não        |
| GET    | /usuarios | Listar usuários | ✅ Sim (JWT)  |

---

### 🔑 Autenticação

| Método | Rota   | Ação               | Autenticação |
| ------ | ------ | ------------------ | ------------ |
| POST   | /login | Autenticar usuário | ❌ Não        |

---

### 📄 Assinaturas

| Método | Rota              | Ação                  | Autenticação |
| ------ | ----------------- | --------------------- | ------------ |
| GET    | /assinaturas      | Listar todas          | ✅ Sim (JWT)  |
| GET    | /assinaturas/\:id | Detalhar por ID       | ✅ Sim (JWT)  |
| POST   | /assinaturas      | Criar nova assinatura | ✅ Sim (JWT)  |
| PUT    | /assinaturas/\:id | Atualizar assinatura  | ✅ Sim (JWT)  |
| DELETE | /assinaturas/\:id | Excluir assinatura    | ✅ Sim (JWT)  |

---

## 🛠️ Autor e Contribuição

Este projeto é parte de um estudo prático para aprendizado de:

* Estruturação de API REST
* Sequelize e relacionamentos
* Middleware e validações
* Autenticação com JWT
* Boas práticas com Express.js

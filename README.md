# Atividade Prática – Controle de Check-in/out de Academia

## Objetivo

Desenvolver um sistema completo de controle de check-in e check-out de alunos em uma academia, utilizando **Express.js**, **Sequelize**, **PostgreSQL**, autenticação **JWT** e boas práticas de código em **JavaScript**.

---

## Funcionalidades Obrigatórias

### Usuários

- **Aluno** e **Instrutor** (módulos separados)
- Cadastro, autenticação (JWT), consulta de perfil
- Aluno faz check-in/check-out
- Instrutor pode visualizar e editar registros de qualquer aluno
- Autorização nas rotas via middleware

### Check-in/out

- CRUD completo de check-ins/check-outs
- Cada registro pertence a um aluno
- Instrutor pode corrigir check-in/out de qualquer aluno

---

## Tecnologias

- Express.js
- Sequelize (PostgreSQL)
- bcrypt
- jsonwebtoken (JWT)
- express-validator
- dotenv

---

## Estrutura de Diretórios

```
2024.10.115-UC8
│
├── node_modules
├── src
│   ├── config
│   │   └── configDB.js
│   ├── middleware
│   │   ├── autenticacao.middleware.js
│   │   └── autorizacao.middleware.js
│   ├── modulos
│   │   ├── aluno
│   │   │   ├── controllers
│   │   │   │   └── aluno.controller.js
│   │   │   ├── models
│   │   │   │   └── aluno.model.js
│   │   │   └── routes
│   │   │       └── aluno.route.js
│   │   ├── instrutor
│   │   │   ├── controllers
│   │   │   │   └── instrutor.controller.js
│   │   │   ├── models
│   │   │   │   └── instrutor.model.js
│   │   │   └── routes
│   │   │       └── instrutor.route.js
│   │   └── checkin
│   │       ├── controllers
│   │       │   └── checkin.controller.js
│   │       ├── models
│   │       │   └── checkin.model.js
│   │       └── routes
│   │           └── checkin.route.js
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

## Modelos e Relacionamentos

### Aluno

- `nome`
- `email` (único)
- `senha` (hash)
- `matricula` (única)
- `plano`

### Instrutor

- `nome`
- `email` (único)
- `senha` (hash)
- `cref`

### Checkin

- `alunoId` (FK)
- `data_hora_entrada` (Date)
- `data_hora_saida` (Date, opcional no check-in)
- `plano` (string, cópia do aluno/plano na data)

---

## Rotas Obrigatórias

### Alunos

| Método | Rota           | Descrição         | Autenticação |
|--------|----------------|-------------------|--------------|
| POST   | /alunos        | Cadastro          | Não          |
| POST   | /alunos/login  | Login (JWT)       | Não          |
| GET    | /alunos/me     | Perfil do aluno   | Sim (JWT)    |

### Instrutores

| Método | Rota               | Descrição             | Autenticação |
|--------|--------------------|-----------------------|--------------|
| POST   | /instrutores       | Cadastro              | Não          |
| POST   | /instrutores/login | Login (JWT)           | Não          |
| GET    | /instrutores/me    | Perfil do instrutor   | Sim (JWT)    |

### Check-ins

| Método | Rota           | Descrição                | Autenticação | Permissão                        |
|--------|----------------|--------------------------|--------------|----------------------------------|
| GET    | /checkins      | Listar check-ins         | Sim (JWT)    | Aluno vê seus, instrutor vê todos|
| GET    | /checkins/:id  | Detalhe do check-in      | Sim (JWT)    | Dono do registro ou instrutor    |
| POST   | /checkins      | Registrar check-in       | Sim (JWT)    | Apenas aluno próprio             |
| PUT    | /checkins/:id  | Atualizar registro       | Sim (JWT)    | Aluno (próprio), instrutor       |
| DELETE | /checkins/:id  | Excluir registro         | Sim (JWT)    | Apenas instrutor                 |

---

## Validações Obrigatórias

- E-mail único para cada tipo de usuário
- Senha: mínimo 6 caracteres, obrigatoriamente criptografada
- Nenhum campo obrigatório pode ser nulo/vazio
- Matrícula única para aluno
- Ao fazer check-in: `data_hora_entrada` obrigatória, `data_hora_saida` pode ser nula
- Apenas instrutor pode excluir qualquer registro
- Aluno só pode registrar e atualizar seus próprios check-ins

---

## Exemplo de `.env.example`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=academia
DB_USER=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=umsegredoseguro
```

---

## Critérios de Avaliação

- Estrutura de pastas exatamente como descrita
- Models e relacionamentos corretos
- Controllers finos (regras em services)
- Validações, autenticação e autorização funcionando
- Senhas criptografadas
- Middlewares aplicados corretamente
- Projeto funcionando de ponta a ponta
- Código limpo e padronizado

---

## Fontes Oficiais

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [express-validator](https://express-validator.github.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Nome do Repositório

**2024.10.115-UC8-checkin-academia**
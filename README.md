# 🧩 Sistema de Autenticação – Teste Técnico Affinity Prime

Projeto desenvolvido como parte do **teste técnico para vaga de Desenvolvedor(a) Fullstack na Affinity Prime**, com o objetivo de construir um sistema completo de autenticação utilizando **Next.js 14**, **TypeScript**, **Prisma**, **JWT**, **Zod**, **BcryptJS** e **Tailwind CSS**.

---

## 🚀 Funcionalidades

### ✅ Registro de Usuário

* Campos: nome completo, e-mail, senha e confirmação de senha
* Validação no **cliente e servidor** com Zod
* Verificação de e-mail já existente
* Senhas criptografadas com **bcryptjs**
* Mensagens de erro e sucesso dinâmicas
* Redirecionamento automático para login após o cadastro

### ✅ Login

* Validação de credenciais no backend
* Criação e armazenamento de sessão com **JWT (cookie httpOnly)**
* Mensagens claras de erro e redirecionamento para o Dashboard

### ✅ Dashboard (Página Protegida)

* Acesso apenas para usuários autenticados
* Exibe o nome do usuário logado
* Botão de logout que limpa o cookie de autenticação

### ✅ Logout

* Remove o cookie e redireciona automaticamente para a tela de login

---

## 🧠 Stack Utilizada

| Tecnologia                  | Função                       |
| --------------------------- | ---------------------------- |
| **Next.js 14 (App Router)** | Framework principal          |
| **TypeScript**              | Tipagem estática e segurança |
| **Prisma ORM + SQLite**     | Banco de dados relacional    |
| **Zod**                     | Validação de dados           |
| **JWT (jsonwebtoken)**      | Autenticação segura          |
| **BcryptJS**                | Criptografia de senhas       |
| **Tailwind CSS**            | Estilização responsiva       |
| **Next Middleware**         | Proteção de rotas privadas   |

---

## ⚙️ Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/PaollaDionisio/nextjs-auth-affinity-test.git

# 2. Acesse a pasta
cd nextjs-auth-affinity-test

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
cp .env.example .env
```

### Exemplo de `.env`

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=uma_chave_secreta_qualquer_32caracteres
JWT_EXPIRES_IN=7d
COOKIE_NAME=auth
COOKIE_SECURE=false
CSRF_SECRET=chave_unica_csrf
```

```bash
# 5. Execute as migrações do banco de dados
npx prisma migrate dev --name init

# 6. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧩 Estrutura do Projeto

```
.
├── app/
│   ├── auth/
│   │   ├── register/
│   │   └── login/
│   ├── dashboard/
│   ├── api/
│   │   └── auth/
│   │       ├── register/
│   │       ├── login/
│   │       └── logout/
│   └── layout.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── validation.ts
├── prisma/
│   └── schema.prisma
├── middleware.ts
├── .env.example
├── package.json
└── README.md
```

---

## 🧠 Conceitos e Boas Práticas Utilizadas

* Separação clara entre **camada de API** e **interface**
* Uso de **cookies httpOnly** para segurança do JWT
* **Validação dupla** (cliente + servidor)
* **Proteção de rotas privadas** via `middleware.ts`
* **Senhas criptografadas** com bcrypt
* **Feedbacks amigáveis** para o usuário

---

## 👩‍💻 Desenvolvido por

**Mykoll Daniel**
🎥 Desenvolvedor Fullstack 
📍 São Paulo, SP
🔗 [LinkedIn](https://www.linkedin.com/in/mykolldaniel/)
---

🧩 *Teste Técnico desenvolvido para o processo seletivo da Affinity Prime.*

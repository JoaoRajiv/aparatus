# ✂️ Aparatus

**Aparatus** é uma plataforma SaaS full-stack para agendamento e gestão de barbearias. O sistema permite que os clientes façam login seguro, naveguem por serviços, realizem pagamentos antecipados, gerenciem seus agendamentos e até mesmo marquem horários conversando com um assistente de Inteligência Artificial.

---

## ✨ Funcionalidades Principais

- **Autenticação:** Login social rápido via Google.
- **Gestão de Agendamentos:** Escolha de barbearia, serviço, data e horário, com opções dinâmicas de cancelamento.
- **Integração de Pagamentos:** Checkout de serviços e processamento financeiro integrado via **Stripe**.
- **Assistente Virtual (IA):** Chat inteligente integrado capaz de entender a intenção do usuário e realizar pré-agendamentos.
- **Interface:** UI moderna e responsiva focada na experiência do usuário (UX).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando um ecossistema Javascript/Typescript moderno:

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (Componentes acessíveis)
- [Prisma ORM](https://www.prisma.io/) (com PostgreSQL)
- [Better Auth](https://better-auth.com/) (Gerenciamento de Sessões e Autenticação)
- [Stripe](https://stripe.com/) (Gateway de Pagamentos)
- [Vercel AI SDK](https://sdk.vercel.ai/) (Integração com LLMs)

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (versão 20 ou superior)
- Gerenciador de pacotes **npm**, **yarn** ou **pnpm** (recomendado)
- Um banco de dados PostgreSQL
- Contas configuradas nos serviços de terceiros (Stripe, Google Cloud, Provedor de IA).

### Passo a Passo

**1. Clone o repositório:**

```bash
git clone [https://github.com/SEU_USUARIO/aparatus.git](https://github.com/SEU_USUARIO/aparatus.git)
cd aparatus
2. Instale as dependências:

Bash
# Recomendado usar pnpm
pnpm install
3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto utilizando o arquivo .env.example como base. Preencha com as suas próprias chaves de desenvolvimento.

4. Inicialize o Banco de Dados:
Sincronize o schema do Prisma com o seu banco de dados:

Bash
pnpm prisma generate
pnpm prisma db push
5. Inicie o servidor de desenvolvimento:

Bash
pnpm dev
Acesse a aplicação no seu navegador padrão.

🔐 Variáveis de Ambiente (.env.example)
Para rodar a aplicação, você precisará configurar as seguintes variáveis de ambiente no seu arquivo .env:

Snippet de código
# ==========================================
# DATABASE
# ==========================================
DATABASE_URL="sua_string_de_conexao_postgresql"

# ==========================================
# AUTENTICAÇÃO
# ==========================================
BETTER_AUTH_URL="url_base_da_aplicacao"
BETTER_AUTH_SECRET="secret_gerado_aleatoriamente"

GOOGLE_CLIENT_ID="seu_client_id_do_google"
GOOGLE_CLIENT_SECRET="seu_client_secret_do_google"

# ==========================================
# PAGAMENTOS (Stripe)
# ==========================================
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="sua_chave_publica_do_stripe"
STRIPE_SECRET_KEY="sua_chave_secreta_do_stripe"
STRIPE_WEBHOOK_SECRET="seu_webhook_secret_do_stripe"

# ==========================================
# INTELIGÊNCIA ARTIFICIAL
# ==========================================
# Chave de API do seu provedor de IA (Google Gemini ou OpenAI)
GOOGLE_GENERATIVE_AI_API_KEY="sua_chave_api_do_google"
```

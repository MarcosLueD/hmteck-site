# HM TECH — Assistência Técnica Premium

Site completo de assistência técnica com painel administrativo integrado.

---

## 🚀 Como Acessar o Painel Administrativo

### Método Secreto (recomendado)
1. Abra o site normalmente
2. **Clique 5 vezes na logo "HM TECH"** no canto superior esquerdo
3. Um modal de login será exibido
4. Use as credenciais abaixo para entrar

### Credenciais Padrão
| Campo   | Valor        |
|---------|-------------|
| Usuário | `admin`      |
| Senha   | `hmtech2024` |

> ⚠️ **Altere a senha imediatamente após o primeiro acesso!**
> Acesse: Painel → Configurações → Alterar Credenciais

---

## 📋 Funcionalidades Implementadas

### Site Público
- ✅ Carrossel principal melhorado (autoplay, swipe, pause no hover)
- ✅ Design moderno com Poppins + tema preto/ciano
- ✅ Bio editável carregada do banco de dados
- ✅ Seção de serviços dinâmica
- ✅ Seção de depoimentos dinâmica
- ✅ Formulário de orçamento integrado ao banco de dados
- ✅ Seção de estatísticas com animação de contagem
- ✅ Seção "Por que escolher"
- ✅ Seção de contato
- ✅ Footer completo
- ✅ Botão WhatsApp flutuante com efeito pulse
- ✅ Animações de scroll reveal
- ✅ Loader de entrada elegante
- ✅ Navbar responsiva com smooth scroll
- ✅ Login secreto (5 cliques na logo)
- ✅ Botão voltar ao topo

### Painel Administrativo
- ✅ Dashboard com estatísticas em tempo real
- ✅ Gerenciar Carrossel (adicionar, editar, ativar/desativar, excluir)
- ✅ Editar Bio e WhatsApp do site
- ✅ Gerenciar Serviços (CRUD completo)
- ✅ Gerenciar Orçamentos (visualizar, mudar status, notas)
- ✅ Gerenciar Clientes (CRUD, filtro por pagamento, resumo financeiro)
- ✅ Gerenciar Depoimentos (CRUD, ativar/ocultar)
- ✅ Configurações (alterar usuário e senha)
- ✅ Design responsivo para mobile e desktop
- ✅ Sidebar com overlay no mobile

---

## 🗂️ Estrutura do Projeto

```
/
├── index.html              ← Site principal
├── admin/
│   └── index.html          ← Painel administrativo
├── css/
│   ├── style.css           ← Estilos do site público
│   └── admin.css           ← Estilos do painel
├── js/
│   ├── main.js             ← JS do site público
│   └── admin.js            ← JS do painel administrativo
└── README.md
```

---

## 🗄️ Tabelas de Dados (RESTful Table API)

| Tabela         | Descrição                          |
|----------------|------------------------------------|
| `banners`      | Slides do carrossel principal      |
| `site_config`  | Configurações gerais (bio, senha)  |
| `services`     | Serviços oferecidos                |
| `quotes`       | Solicitações de orçamento          |
| `clients`      | Cadastro de clientes               |
| `testimonials` | Depoimentos dos clientes           |

---

## 📱 Como Usar o Painel

### Gerenciar Banners (Carrossel)
1. Acesse o painel → **Carrossel**
2. Clique em **"Novo Banner"**
3. Preencha: Título, Subtítulo, URL da imagem, Botão
4. Use imagens de alta resolução (mínimo 1400x600px)
5. Recomendado: Unsplash, Pexels ou imagens próprias
6. Salve e o banner aparece imediatamente no site

### Editar Bio do Site
1. Acesse o painel → **Bio do Site**
2. Edite as 3 linhas de texto (pode usar emojis!)
3. Salve — o site atualiza em tempo real

### Cadastrar Clientes
1. Acesse o painel → **Clientes**
2. Clique em **"Novo Cliente"**
3. Preencha: nome, telefone, aparelho, serviço, valor, data
4. Escolha o status de pagamento: **Pagou / Não pagou / Pendente**
5. Use os filtros para ver quem pagou ou não

### Ver Orçamentos
1. Acesse o painel → **Orçamentos**
2. Clique no ícone de olho para ver os detalhes
3. Altere o status: Pendente → Em análise → Respondido → Finalizado
4. Adicione notas internas sobre o orçamento

### Alterar Usuário e Senha
1. Acesse o painel → **Configurações**
2. Preencha novo usuário e nova senha
3. Confirme a senha e salve

---

## 🎨 Design

- **Fonte:** Poppins (Google Fonts)
- **Cores:** Preto (#0a0a0f), Ciano (#00c6ff), Azul (#0072ff), Branco
- **Ícones:** Font Awesome 6
- **Layout:** CSS Grid + Flexbox
- **Responsivo:** Mobile First

---

## 🔧 Tecnologias

- HTML5 semântico
- CSS3 moderno (variáveis, grid, animações)
- JavaScript ES6+ (async/await, fetch API)
- RESTful Table API (banco de dados integrado)
- Font Awesome 6
- Google Fonts (Poppins)

---

## 📊 URIs Principais

| Rota              | Descrição                    |
|-------------------|------------------------------|
| `/`               | Site público (index.html)    |
| `/admin/`         | Painel administrativo        |
| `tables/banners`  | API de banners               |
| `tables/services` | API de serviços              |
| `tables/quotes`   | API de orçamentos            |
| `tables/clients`  | API de clientes              |

---

## ✅ Checklist Pós-Deploy

- [ ] Acessar painel e alterar a senha padrão
- [ ] Adicionar seus banners reais com suas imagens
- [ ] Editar a bio com seu texto personalizado
- [ ] Conferir os serviços e ajustar descrições/preços
- [ ] Testar formulário de orçamento
- [ ] Verificar o número do WhatsApp no painel → Bio

---

*HM TECH — Assistência Técnica Premium | Desenvolvido com ❤️*

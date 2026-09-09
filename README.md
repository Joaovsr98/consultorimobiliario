# Corretor Prime — Plataforma Imobiliária Configurável

Plataforma web para **apresentação de empreendimentos, captação e qualificação de potenciais compradores de imóveis**, desenvolvida com uma arquitetura configurável e preparada para reutilização em diferentes operações imobiliárias.

Construída com **React + TypeScript**, a aplicação combina experiência responsiva, catálogo de imóveis, conteúdo informativo, formulários e uma arquitetura que separa identidade, dados e regras de configuração dos componentes da interface.

## 🌐 Projeto online

### ➜ https://consultorimobiliario.vercel.app/

> Acesse a versão publicada para conhecer a experiência completa.  
> O projeto foi desenvolvido para desktop, tablet e dispositivos móveis.

---

## Sobre o projeto

O Corretor Prime foi desenvolvido com uma proposta diferente de um site imobiliário convencional.

Em vez de criar uma aplicação totalmente vinculada a um único profissional ou marca, o projeto possui uma **camada central de configuração**, responsável por identidade visual, contatos, navegação, SEO e conteúdo.

Dessa forma, a mesma fundação tecnológica pode ser adaptada para diferentes operações sem espalhar informações específicas pelos componentes React.

A experiência foi estruturada para acompanhar a jornada do visitante:

```text
Descoberta
    ↓
Exploração dos imóveis
    ↓
Detalhes do empreendimento
    ↓
Conteúdo e orientação
    ↓
Qualificação do interesse
    ↓
Contato
```

---

## ✨ Principais funcionalidades

### 🏢 Catálogo de imóveis

Área dedicada à apresentação dos empreendimentos disponíveis, permitindo que o visitante explore as opções antes de avançar para os detalhes de cada imóvel.

### 🏠 Página individual do empreendimento

Cada imóvel possui uma página própria, permitindo organizar informações, características e conteúdos específicos sem sobrecarregar a página principal.

### 🧭 Busca e jornada guiada

A estrutura da aplicação foi pensada para reduzir atrito durante a navegação e conduzir o visitante progressivamente da descoberta ao contato.

### 📚 Conteúdo e guias

O projeto possui estrutura para conteúdos informativos relacionados ao processo de compra de imóveis, ajudando a transformar o site em uma ferramenta de orientação além do catálogo.

### 💬 Conversão e contato

A experiência possui pontos de contato distribuídos estrategicamente pela aplicação para aproximar o visitante da operação comercial.

### 🛣️ Navegação com React Router

A aplicação utiliza rotas próprias para diferentes áreas:

- Home
- Catálogo de imóveis
- Detalhes do imóvel
- Sobre
- Guias
- Contato
- Privacidade
- Página 404

Isso permite uma estrutura muito mais escalável do que uma landing page única.

---

## 🎨 Sistema de personalização

Um dos principais diferenciais técnicos do projeto é a separação entre **interface e identidade da implantação**.

As principais configurações ficam centralizadas:

| Arquivo | Responsabilidade |
|---|---|
| `src/config/broker.ts` | Identidade, contatos, região e informações da operação |
| `src/config/theme.ts` | Paleta e características visuais |
| `src/config/navigation.ts` | Navegação e rodapé |
| `src/config/seo.ts` | Metadados e configurações de SEO |
| `src/data/properties.ts` | Empreendimentos |
| `src/data/faq.ts` | Perguntas frequentes |
| `src/data/testimonials.ts` | Depoimentos autorizados |

Assim, dados específicos não precisam ficar espalhados pelos componentes da aplicação.

---

## 🎨 Design System configurável

A identidade visual utiliza **CSS Custom Properties** aplicadas dinamicamente pelo projeto.

Utilitários como:

```text
bg-brand
text-accent
bg-surface
text-ink
```

consomem as variáveis definidas pelo sistema de temas.

A função `applyTheme()` aplica a configuração visual da implantação, permitindo alterar a identidade sem reconstruir os componentes.

---

## 🧩 Arquitetura

```text
src/
├── components/
│   ├── layout/
│   ├── ui/
│   └── shared/
│
├── config/
│   ├── broker.ts
│   ├── theme.ts
│   ├── navigation.ts
│   └── seo.ts
│
├── data/
│   ├── properties.ts
│   ├── faq.ts
│   └── testimonials.ts
│
├── lib/
│   ├── utils
│   ├── whatsapp
│   └── theme
│
├── pages/
│   ├── Home
│   ├── Properties
│   ├── PropertyDetails
│   ├── About
│   ├── Guides
│   ├── Contact
│   ├── Privacy
│   └── NotFound
│
├── types/
├── App.tsx
└── main.tsx
```

Essa organização mantém responsabilidades separadas e facilita manutenção, reutilização e evolução do projeto.

---

## 🛠️ Tecnologias

- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion
- React Router 7
- React Hook Form
- Zod
- Lucide React
- Git
- GitHub
- Vercel

---

## ⚙️ Decisões técnicas

### Configuração desacoplada

Informações específicas da implantação ficam concentradas principalmente em:

```text
src/config/
src/data/
```

Isso reduz acoplamento e evita componentes preenchidos com informações fixas.

### TypeScript

A aplicação utiliza tipagem para definir contratos de dados e aumentar a previsibilidade durante manutenção e evolução.

### React Hook Form + Zod

A combinação permite estruturar formulários e regras de validação de maneira declarativa, mantendo responsabilidades separadas da apresentação visual.

### Componentização

Elementos compartilhados da interface foram separados dos componentes específicos de páginas, favorecendo reutilização.

### Responsividade

A experiência foi projetada para diferentes tamanhos de tela, incluindo:

- desktop;
- notebook;
- tablet;
- smartphone.

### Animações

Framer Motion é utilizado para criar transições e microinterações sem transformar movimento em elemento puramente decorativo.

---

## 🔎 SEO

A aplicação possui uma camada própria de configuração para metadados.

Isso permite controlar informações relacionadas a SEO de maneira independente dos componentes visuais e facilita futuras implantações da mesma arquitetura.

A estrutura também permite trabalhar páginas específicas para:

- empreendimentos;
- regiões;
- conteúdo informativo;
- páginas institucionais.

---

## 🚀 Visão de produto

A arquitetura foi planejada para permitir uma evolução progressiva:

```text
Site imobiliário configurável
            ↓
      Captação de leads
            ↓
   Qualificação de interesse
            ↓
   Automação de contato
            ↓
      Gestão de leads
            ↓
 Plataforma multi-tenant
            ↓
        White-label
```

O objetivo arquitetural é permitir que novas operações possam utilizar a mesma fundação tecnológica sem reconstruir todo o produto.

---

## 📈 Roadmap

### Fundação

- arquitetura configurável;
- sistema de temas;
- rotas;
- componentes reutilizáveis;
- estrutura responsiva.

### Experiência comercial

- catálogo de empreendimentos;
- páginas individuais;
- conteúdo informativo;
- qualificação de interesse;
- integração com canais de contato.

### Dados e conversão

- eventos de conversão;
- analytics;
- acompanhamento da jornada;
- agendamento;
- evolução da gestão de leads.

### Plataforma

- painel administrativo;
- gestão de imóveis;
- gestão de leads;
- múltiplas operações;
- arquitetura multi-tenant;
- modelo white-label.

---

## 💻 Desenvolvimento local

O projeto online pode ser acessado diretamente pela Vercel. Para desenvolvedores que desejarem executar o código localmente:

### Requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview

```bash
npm run preview
```

---

## 📌 Status

**Projeto funcional, publicado e em evolução.**

A arquitetura atual permite continuar adicionando funcionalidades comerciais e administrativas sem vincular a fundação da aplicação a uma única operação imobiliária.

---

## 👨‍💻 Autor

**João Victor dos Santos Rodrigues**

Análise e Desenvolvimento de Sistemas

**Desenvolvimento Web · React · TypeScript · Arquitetura Front-end · UX/UI**

---

# 🌐 Conheça o projeto

### ➜ https://consultorimobiliario.vercel.app/

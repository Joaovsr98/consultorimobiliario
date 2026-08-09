# Corretor Prime

Plataforma de captacao e qualificacao de compradores de imoveis, **replicavel para corretores**. O primeiro cliente e a demonstracao e a marca configurada em `src/config/broker.ts`.

## Stack

React 19 · Vite 6 · TypeScript · Tailwind CSS v4 · Framer Motion · React Router 7 · React Hook Form · Zod · Lucide React

## Comandos

```bash
npm install     # instala dependencias
npm run dev     # ambiente de desenvolvimento
npm run build   # typecheck + build de producao
npm run lint    # ESLint
npm run preview # serve o build local
```

## Como personalizar para outro corretor

Nenhum dado pessoal vive nos componentes. Para re-tematizar, altere apenas:

| Arquivo | O que muda |
|---|---|
| `src/config/broker.ts` | Nome, marca, telefone, e-mail, regiao, redes, foto |
| `src/config/theme.ts` | Paleta e raio de borda (injetados como CSS vars) |
| `src/config/navigation.ts` | Itens de menu e rodape |
| `src/config/seo.ts` | Titulos e metadados |
| `src/data/properties.ts` | Empreendimentos |
| `src/data/faq.ts` / `testimonials.ts` | FAQ e depoimentos autorizados |

Os utilitarios de cor (`bg-brand`, `text-accent`, `bg-surface`, `text-ink`) leem
as CSS variables definidas por `applyTheme()` — trocar o tema nao exige mexer em
componentes.

## Estrutura

```
src/
├── components/  layout · ui · shared
├── config/      broker · theme · navigation · seo
├── data/        properties · faq · testimonials
├── lib/         utils · whatsapp · theme
├── pages/       Home · Properties · PropertyDetails · About · Guides · Contact · Privacy · NotFound
├── types/       contratos de dados
├── App.tsx      rotas
└── main.tsx     bootstrap + applyTheme()
```

## Roadmap

- **Fase 1 (atual):** fundacao configuravel, layout, rotas, base responsiva.
- **Fase 2:** Home completa, diagnostico rapido, guias, SEO.
- **Fase 3:** formularios em etapas, mensagem para WhatsApp, tracking, agendamento.
- **Fase 4:** painel de leads, cadastro de imoveis, multi-tenant / white-label.

## Conformidade

Enquanto nao houver registro profissional, `role` usa termo neutro e `creci`
fica vazio. Nao usar precos fixos sem ressalva, nem depoimentos ou imagens nao
autorizadas. O site nao solicita documentos sensiveis.

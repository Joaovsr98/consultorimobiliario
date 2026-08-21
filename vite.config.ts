import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { neighborhoods } from "./src/data/neighborhoods";
import { guides } from "./src/data/guides";
import { properties as propsJoaoVictor } from "./src/tenants/joao-victor/properties";
import { properties as propsShelby } from "./src/tenants/shelby/properties";

/**
 * Metadados de SEO por tenant, injetados no HTML/emitidos como arquivos em
 * tempo de build. Precisam existir de forma estatica porque os robos (Google,
 * WhatsApp, e sobretudo os crawlers de IA) nao executam JavaScript de forma
 * confiavel. A imagem OG e uma fachada que existe em ambos os tenants.
 */
type TenantSeo = {
  siteName: string;
  title: string;
  description: string;
  url: string;
  telephone: string;
  areaServed: string;
  creci: string;
};

const OG_BY_TENANT: Record<string, TenantSeo> = {
  "joao-victor": {
    siteName: "Bueno Imóveis",
    title: "Bueno Imóveis — Lançamentos em São Paulo com atendimento personalizado",
    description:
      "Encontre imóveis compatíveis com seu perfil e receba atendimento personalizado do início à entrega das chaves.",
    url: "https://consultorimobiliario.vercel.app",
    telephone: "+5511925272694",
    areaServed: "São Paulo, SP",
    creci: "194198-F",
  },
  shelby: {
    siteName: "Shelby House",
    title: "Shelby House — Lançamentos em São Paulo com atendimento personalizado",
    description:
      "Encontre imóveis compatíveis com seu perfil e receba atendimento personalizado do início à entrega das chaves.",
    url: "https://corretor-shelby.vercel.app",
    telephone: "+5511934510849",
    areaServed: "São Paulo, SP",
    creci: "",
  },
};

const PROPERTY_SLUGS = [
  "vibra-parque-vila-sonia",
  "vibra-estacao-vila-sonia",
  "vibra-estacao-campo-limpo",
  "vibra-jardim-bonfiglioli",
];
const GUIDE_SLUGS = guides.map((g) => g.slug);
const NEIGHBORHOOD_SLUGS = neighborhoods.map((n) => n.slug);
const STATIC_ROUTES = ["/", "/imoveis", "/sobre", "/guias", "/contato", "/privacidade"];

function sitePaths(): string[] {
  return [
    ...STATIC_ROUTES,
    ...NEIGHBORHOOD_SLUGS.map((s) => `/${s}`),
    ...PROPERTY_SLUGS.map((s) => `/imoveis/${s}`),
    ...GUIDE_SLUGS.map((s) => `/guias/${s}`),
  ];
}

function buildSitemap(baseUrl: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = sitePaths()
    .map(
      (path) =>
        `  <url>\n    <loc>${baseUrl}${path === "/" ? "/" : path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots(baseUrl: string): string {
  const aiAgents = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "Google-Extended",
    "Applebot-Extended",
    "Amazonbot",
    "CCBot",
    "Bytespider",
  ];
  const aiBlocks = aiAgents.map((ua) => `User-agent: ${ua}\nAllow: /`).join("\n\n");
  return `User-agent: *\nAllow: /\n\n${aiBlocks}\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
}

// ---- Pre-renderizacao SEM navegador (SSG por template de dados) -------------
// Gera o conteudo SEO-critico (titulo, H1, textos, imoveis, FAQ) em HTML
// estatico para cada rota. O SPA continua carregando por cima e assume o
// controle no navegador (progressive enhancement). Funciona 100% na Vercel
// porque e apenas geracao de string — nao depende de Chromium.

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
const fmtArea = (a: string) =>
  a.replace(/\d+,\d+/g, (m) => String(Math.round(parseFloat(m.replace(",", "."))))).replace(/\s*m2\b/i, " m²");

type Prop = (typeof propsJoaoVictor)[number];

function ul(items: string[]): string {
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

function propItem(p: Prop): string {
  const bits = [p.bedrooms, fmtArea(p.area), p.priceFrom !== undefined ? `a partir de ${fmtBRL(p.priceFrom)}` : ""]
    .filter(Boolean)
    .join(" · ");
  return `<li><a href="/imoveis/${p.slug}"><strong>${esc(p.name)}</strong></a> — ${esc(
    `${p.neighborhood}, ${p.city}`
  )} · ${esc(bits)}</li>`;
}

type Page = { path: string; title: string; description: string; body: string; jsonld?: unknown };

function buildPages(data: TenantSeo, properties: Prop[]): Page[] {
  const S = data.siteName;
  const t = (title: string) => `${title} | ${S}`;
  const neighborhoodLinks = neighborhoods
    .map((n) => `<li><a href="/${n.slug}">Apartamentos em ${esc(n.neighborhood)}</a></li>`)
    .join("");
  const pages: Page[] = [];

  // Home — conteudo em prosa suficiente para extratores de leitura (IA) e SEO.
  const regioesTexto = neighborhoods
    .map((n) => esc(n.neighborhood))
    .join(", ")
    .replace(/, ([^,]*)$/, " e $1");
  pages.push({
    path: "/",
    title: t("Apartamentos em São Paulo"),
    description:
      "Apartamentos e lançamentos em São Paulo, inclusive próximos ao metrô e no Minha Casa Minha Vida. Atendimento imobiliário personalizado do início à entrega das chaves.",
    body: `<h1>Apartamentos e lançamentos em São Paulo</h1>
<p>A ${esc(
      S
    )} ajuda você a encontrar um apartamento em São Paulo compatível com o seu perfil e a sua realidade financeira. Trabalhamos com lançamentos bem localizados, muitos próximos a estações de metrô e com unidades enquadradas no Programa Minha Casa Minha Vida.</p>
<p>O atendimento é personalizado do início à entrega das chaves: entendemos o seu objetivo (morar ou investir), a região de interesse e o seu orçamento, selecionamos opções que fazem sentido para você e acompanhamos cada etapa — simulação, visita, proposta e documentação. Sem empurrar imóvel fora do seu perfil.</p>
<h2>Empreendimentos</h2>
<ul>${properties.map(propItem).join("")}</ul>
<h2>Regiões atendidas</h2>
<p>Atuamos principalmente na Zona Oeste e na Zona Sul de São Paulo, com páginas dedicadas para ${regioesTexto}. Em cada uma você encontra os empreendimentos disponíveis, o transporte da região e o que há por perto.</p>
<ul>${neighborhoodLinks}</ul>
<h2>Como funciona o atendimento</h2>
<ol><li>Entendemos juntos seu objetivo, sua região de interesse e sua realidade financeira.</li><li>Selecionamos opções compatíveis com o que você nos contou — sem empurrar imóvel fora do seu perfil.</li><li>Acompanhamos você nas visitas, na proposta e até a entrega das chaves.</li></ol>
<p>Veja também nossos <a href="/guias">guias sobre financiamento, FGTS e entrada</a>, conheça a <a href="/sobre">proposta de atendimento</a> ou <a href="/contato">fale pelo WhatsApp</a>.</p>`,
  });

  // /imoveis
  pages.push({
    path: "/imoveis",
    title: t("Imóveis"),
    description:
      "Empreendimentos selecionados, organizados por metragem. Valores e disponibilidade sujeitos a alteração.",
    body: `<h1>Empreendimentos selecionados</h1><p>Organizados por metragem para você comparar de um jeito rápido. Valores e disponibilidade sujeitos a alteração.</p><ul>${properties
      .map(propItem)
      .join("")}</ul><h2>Busca por região</h2><ul>${neighborhoodLinks}</ul>`,
  });

  // /sobre
  pages.push({
    path: "/sobre",
    title: t("Sobre"),
    description:
      "Atendimento imobiliário personalizado para encontrar um imóvel compatível com a sua realidade financeira.",
    body: `<h1>${esc(S)}</h1>${
      data.creci ? `<p>CRECI ${esc(data.creci)}</p>` : ""
    }<p>Nosso trabalho é ajudar você a entender as opções disponíveis, organizar as etapas da compra e encontrar um imóvel compatível com a sua realidade financeira. Não acreditamos em empurrar decisão antes do momento certo — acreditamos em explicar cada passo com clareza para que você decida com segurança.</p><p>Atuamos com lançamentos na Zona Oeste e na Zona Sul de São Paulo, muitos próximos a estações de metrô e com unidades no Programa Minha Casa Minha Vida.</p><h2>Como funciona o atendimento</h2><ol><li>Entendemos juntos seu objetivo, sua região de interesse e sua realidade financeira.</li><li>Selecionamos opções compatíveis com o seu perfil.</li><li>Acompanhamos você nas visitas, na proposta e até a entrega das chaves.</li></ol>`,
  });

  // /contato
  pages.push({
    path: "/contato",
    title: t("Contato"),
    description:
      "Faça o diagnóstico do comprador ou fale direto pelo WhatsApp para conversar sobre o seu próximo imóvel.",
    body: `<h1>Vamos conversar sobre o seu próximo imóvel</h1><p>Faça o diagnóstico do comprador ou fale direto pelo WhatsApp para receber um direcionamento inicial, sem compromisso. Em poucos passos você informa seu objetivo, a região de interesse e a sua realidade financeira, e eu retorno com opções compatíveis com o seu perfil.</p><p>O atendimento é personalizado e acompanha você da simulação até a entrega das chaves, com clareza em cada etapa.</p>`,
  });

  // /privacidade
  pages.push({
    path: "/privacidade",
    title: t("Política de privacidade"),
    description:
      "Como os dados informados no site são usados: nada é armazenado em servidor; o diagnóstico só monta uma mensagem que você mesmo envia pelo WhatsApp.",
    body: `<h1>Política de privacidade</h1><p>Como os dados informados no site são usados: nada é armazenado em servidor; o diagnóstico do comprador só monta uma mensagem de WhatsApp que você mesmo revisa e envia.</p>`,
  });

  // Paginas de bairro
  for (const n of neighborhoods) {
    const props = properties.filter((p) => p.neighborhood === n.neighborhood);
    const propList = props.length ? `<h2>Empreendimentos em ${esc(n.neighborhood)}</h2><ul>${props.map(propItem).join("")}</ul>` : "";
    const faqHtml = n.faq
      .map((f) => `<div><h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p></div>`)
      .join("");
    pages.push({
      path: `/${n.slug}`,
      title: t(n.metaTitle),
      description: n.metaDescription,
      body: `<h1>${esc(n.h1)}</h1>${n.intro.map((p) => `<p>${esc(p)}</p>`).join("")}${propList}<h2>Mobilidade</h2>${ul(
        n.transport
      )}<h2>O que tem por perto</h2>${ul(n.highlights)}<h2>Para quem faz sentido</h2>${ul(
        n.buyerProfile
      )}<h2>Perguntas frequentes</h2>${faqHtml}`,
      jsonld: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: n.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    });
  }

  // Imoveis (detalhe)
  for (const p of properties) {
    const facts = [
      p.bedrooms,
      `${fmtArea(p.area)}`,
      p.delivery ? `Entrega ${p.delivery}` : "",
      p.priceFrom !== undefined ? `A partir de ${fmtBRL(p.priceFrom)}` : "",
    ].filter(Boolean);
    pages.push({
      path: `/imoveis/${p.slug}`,
      title: t(p.name),
      description: p.description.slice(0, 160),
      body: `<h1>${esc(p.name)}</h1><p>${esc(`${p.neighborhood}, ${p.city}`)}</p><p>${esc(
        p.description
      )}</p>${ul(facts)}${p.address ? `<p>${esc(p.address)}</p>` : ""}`,
    });
  }

  // Guias (indice)
  pages.push({
    path: "/guias",
    title: t("Guias"),
    description:
      "Conteúdos educativos sobre financiamento, FGTS, entrada, documentação e a compra do primeiro imóvel.",
    body: `<h1>Conteúdos para comprar com segurança</h1><ul>${guides
      .map((g) => `<li><a href="/guias/${g.slug}"><strong>${esc(g.title)}</strong></a> — ${esc(g.summary)}</li>`)
      .join("")}</ul>`,
  });

  // Guias (detalhe)
  for (const g of guides) {
    pages.push({
      path: `/guias/${g.slug}`,
      title: t(g.title),
      description: g.summary,
      body: `<h1>${esc(g.title)}</h1>${g.content.map((p) => `<p>${esc(p)}</p>`).join("")}`,
    });
  }

  return pages;
}

function renderPageHtml(base: string, page: Page, data: TenantSeo, image: string): string {
  const canonical = `${data.url}${page.path === "/" ? "/" : page.path}`;
  let html = base;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = html.replace(
    /<meta name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(page.description)}" />`
  );
  html = html.replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(page.title)}$2`);
  void image;
  if (page.jsonld) {
    html = html.replace(
      "</head>",
      `    <script type="application/ld+json">${JSON.stringify(page.jsonld)}</script>\n  </head>`
    );
  }
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${page.body}</div>`);
  return html;
}

function buildJsonLd(data: TenantSeo): string {
  const json = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: data.siteName,
    url: data.url,
    image: `${data.url}/properties/vibra-estacao-vila-sonia/fachada-torres.jpg`,
    telephone: data.telephone,
    areaServed: data.areaServed,
    description: data.description,
  };
  return `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
}

/**
 * Injeta OG/Twitter + JSON-LD no HTML, emite robots.txt e sitemap.xml, e gera
 * o HTML estatico (SSG) de cada rota a partir dos dados — sem navegador.
 */
function seoPlugin(tenantId: string): Plugin {
  const data = OG_BY_TENANT[tenantId] ?? OG_BY_TENANT["joao-victor"];
  const properties = tenantId === "shelby" ? propsShelby : propsJoaoVictor;
  const image = `${data.url}/properties/vibra-estacao-vila-sonia/fachada-torres.jpg`;
  const tags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${data.siteName}" />`,
    `<meta property="og:title" content="${data.title}" />`,
    `<meta property="og:description" content="${data.description}" />`,
    `<meta property="og:url" content="${data.url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${data.title}" />`,
    `<meta name="twitter:description" content="${data.description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${data.url}/" />`,
    buildJsonLd(data),
  ].join("\n    ");
  return {
    name: "inject-seo",
    transformIndexHtml(html: string) {
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${data.siteName}</title>`)
        .replace(
          /<meta\s+name="description"[\s\S]*?\/>/,
          `<meta name="description" content="${data.description}" />`
        )
        .replace("</head>", `    ${tags}\n  </head>`);
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: buildRobots(data.url) });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap(data.url) });
    },
    // writeBundle roda DEPOIS do index.html ser escrito no disco — assim
    // lemos o HTML base ja pronto e geramos o de cada rota com seguranca.
    async writeBundle(options) {
      const dir = options.dir;
      if (!dir) return;
      const base = await readFile(join(dir, "index.html"), "utf8");
      for (const page of buildPages(data, properties)) {
        const html = renderPageHtml(base, page, data, image);
        const outPath = page.path === "/" ? join(dir, "index.html") : join(dir, page.path.slice(1), "index.html");
        await mkdir(dirname(outPath), { recursive: true });
        await writeFile(outPath, html, "utf8");
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const tenantId = env.VITE_TENANT_ID || "joao-victor";
  return {
    plugins: [react(), tailwindcss(), seoPlugin(tenantId)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});

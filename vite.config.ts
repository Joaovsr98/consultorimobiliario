import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Metadados de SEO e compartilhamento por tenant, injetados no HTML/emitidos
 * como arquivos em tempo de build. Precisam existir de forma estatica porque
 * os robos (Google, WhatsApp, Facebook) nao executam JavaScript de forma
 * confiavel. A imagem OG e uma fachada que existe em ambos os tenants.
 */
type TenantSeo = {
  siteName: string;
  title: string;
  description: string;
  url: string;
  /** Telefone em formato internacional para os dados estruturados (JSON-LD). */
  telephone: string;
  areaServed: string;
};

const OG_BY_TENANT: Record<string, TenantSeo> = {
  "joao-victor": {
    siteName: "Bueno House",
    title: "Bueno House — Lançamentos em São Paulo com atendimento personalizado",
    description:
      "Encontre imóveis compatíveis com seu perfil e receba atendimento personalizado do início à entrega das chaves.",
    url: "https://consultorimobiliario.vercel.app",
    telephone: "+5511925272694",
    areaServed: "São Paulo, SP",
  },
  shelby: {
    siteName: "Shelby House",
    title: "Shelby House — Lançamentos em São Paulo com atendimento personalizado",
    description:
      "Encontre imóveis compatíveis com seu perfil e receba atendimento personalizado do início à entrega das chaves.",
    url: "https://corretor-shelby.vercel.app",
    telephone: "+5511934510849",
    areaServed: "São Paulo, SP",
  },
};

/**
 * Rotas indexaveis do site. Mantidas em sincronia com App.tsx e com os slugs
 * de properties.ts / guides.ts (iguais entre tenants). Ao adicionar uma pagina
 * nova de rota fixa ou um imovel/guia, incluir aqui para entrar no sitemap.
 */
const PROPERTY_SLUGS = [
  "vibra-parque-vila-sonia",
  "vibra-estacao-vila-sonia",
  "vibra-estacao-campo-limpo",
  "vibra-jardim-bonfiglioli",
];
const GUIDE_SLUGS = [
  "como-funciona-o-financiamento-imobiliario",
  "como-usar-o-fgts",
  "quanto-preciso-ter-de-entrada",
  "comprar-imovel-sozinho-ou-compor-renda",
  "documentos-para-analise-de-credito",
  "diferenca-entre-lancamento-e-imovel-pronto",
  "como-escolher-um-apartamento-para-investir",
  "como-funciona-a-compra-do-primeiro-imovel",
];
const STATIC_ROUTES = ["/", "/imoveis", "/sobre", "/guias", "/contato", "/privacidade"];
/** Landing pages de bairro — manter em sincronia com data/neighborhoods.ts. */
const NEIGHBORHOOD_SLUGS = ["apartamentos-vila-sonia"];

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
  return `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
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
 * Injeta OG/Twitter + JSON-LD no HTML e emite robots.txt e sitemap.xml com o
 * dominio correto do tenant ativo.
 */
function seoPlugin(tenantId: string): Plugin {
  const data = OG_BY_TENANT[tenantId] ?? OG_BY_TENANT["joao-victor"];
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

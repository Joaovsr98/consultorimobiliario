import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * Metadados de compartilhamento (Open Graph) injetados no HTML em tempo de build,
 * por tenant. Precisam estar no HTML estatico porque os robos de preview
 * (WhatsApp, Facebook, etc.) nao executam JavaScript. A imagem e uma fachada
 * que existe em ambos os tenants (public/ e compartilhado).
 */
const OG_BY_TENANT: Record<
  string,
  { siteName: string; title: string; description: string; url: string }
> = {
  "joao-victor": {
    siteName: "Bueno House",
    title: "Bueno House — Lançamentos em São Paulo com atendimento personalizado",
    description:
      "Encontre imóveis compatíveis com seu perfil e receba atendimento personalizado do início à entrega das chaves.",
    url: "https://corretorbr.vercel.app",
  },
  shelby: {
    siteName: "Shelby House",
    title: "Shelby House — Lançamentos em São Paulo com atendimento personalizado",
    description:
      "Encontre imóveis compatíveis com seu perfil e receba atendimento personalizado do início à entrega das chaves.",
    url: "https://corretor-shelby.vercel.app",
  },
};

function ogTagsPlugin(tenantId: string) {
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
  ].join("\n    ");
  return {
    name: "inject-og-tags",
    transformIndexHtml(html: string) {
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${data.siteName}</title>`)
        .replace(
          /<meta\s+name="description"[\s\S]*?\/>/,
          `<meta name="description" content="${data.description}" />`
        )
        .replace("</head>", `    ${tags}\n  </head>`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const tenantId = env.VITE_TENANT_ID || "joao-victor";
  return {
    plugins: [react(), tailwindcss(), ogTagsPlugin(tenantId)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});

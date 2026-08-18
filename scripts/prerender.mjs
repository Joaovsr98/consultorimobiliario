/**
 * Pre-renderizacao (SSG por snapshot). Depois do `vite build`, sobe o preview
 * do dist, visita cada rota com um navegador headless e salva o HTML ja
 * renderizado em dist/<rota>/index.html. Assim, crawlers que NAO executam
 * JavaScript (varios bots de IA) recebem o conteudo pronto — titulo, H1,
 * textos, imoveis e JSON-LD — em vez de uma casca vazia. O SPA continua
 * funcionando por cima (progressive enhancement): os <script> seguem no HTML.
 *
 * SEGURANCA DE DEPLOY: este script NUNCA derruba o build. Qualquer erro
 * (Chromium ausente, timeout, etc.) e capturado e o processo sai com codigo 0,
 * deixando o site publicar normalmente como SPA.
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4271;
const ORIGIN = `http://localhost:${PORT}`;

// Mantido em sincronia com o sitemap (vite.config.ts).
const ROUTES = [
  "/",
  "/imoveis",
  "/sobre",
  "/guias",
  "/contato",
  "/privacidade",
  "/apartamentos-vila-sonia",
  "/apartamentos-campo-limpo",
  "/apartamentos-jardim-bonfiglioli",
  "/imoveis/vibra-parque-vila-sonia",
  "/imoveis/vibra-estacao-vila-sonia",
  "/imoveis/vibra-estacao-campo-limpo",
  "/imoveis/vibra-jardim-bonfiglioli",
  "/guias/como-funciona-o-financiamento-imobiliario",
  "/guias/como-usar-o-fgts",
  "/guias/quanto-preciso-ter-de-entrada",
  "/guias/comprar-imovel-sozinho-ou-compor-renda",
  "/guias/documentos-para-analise-de-credito",
  "/guias/diferenca-entre-lancamento-e-imovel-pronto",
  "/guias/como-escolher-um-apartamento-para-investir",
  "/guias/como-funciona-a-compra-do-primeiro-imovel",
];

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* ainda subindo */
    }
    await wait(500);
  }
  return false;
}

async function main() {
  // puppeteer e opcional: se nao estiver instalado, saimos sem quebrar o build.
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.warn("[prerender] puppeteer indisponivel — pulando (site publica como SPA).");
    return;
  }

  // shell: true evita o "spawn EINVAL" do Windows ao iniciar npx e funciona
  // igual no Linux da Vercel.
  const preview = spawn(`npx vite preview --port ${PORT} --strictPort`, {
    cwd: join(__dirname, ".."),
    stdio: "ignore",
    shell: true,
  });

  let browser;
  try {
    const up = await waitForServer(ORIGIN);
    if (!up) throw new Error("preview nao respondeu a tempo");

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    let ok = 0;
    for (const route of ROUTES) {
      const page = await browser.newPage();
      try {
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
        // Garante que o app montou algo dentro de #root.
        await page
          .waitForFunction(() => {
            const root = document.getElementById("root");
            return root && root.innerText && root.innerText.trim().length > 60;
          }, { timeout: 15000 })
          .catch(() => {});

        const html = await page.content();
        const outPath = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
        await mkdir(dirname(outPath), { recursive: true });
        await writeFile(outPath, html, "utf8");
        ok++;
      } catch (err) {
        console.warn(`[prerender] falhou em ${route}: ${err.message}`);
      } finally {
        await page.close().catch(() => {});
      }
    }
    console.log(`[prerender] ${ok}/${ROUTES.length} rotas pre-renderizadas.`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    preview.kill();
  }
}

main()
  .catch((err) => {
    console.warn(`[prerender] ignorado por erro: ${err?.message ?? err}`);
  })
  .finally(() => process.exit(0));

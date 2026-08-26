/**
 * Utilidades de imagem dos empreendimentos, compartilhadas entre a pagina de
 * detalhe e a vitrine de destaque. Casa um diferencial (ex.: "Piscina") com a
 * foto da galeria pelo nome do arquivo, e separa galeria/plantas/localizacao.
 */

const STOPWORDS = new Set(["e", "de", "do", "da", "com", "a", "o", "para", "em"]);

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Unifica variantes de grafia entre o diferencial e o nome do arquivo. */
const SYNONYMS: Record<string, string> = { paddle: "padel", tenis: "tennis" };
const canon = (t: string) => SYNONYMS[t] ?? t;

const tokensOf = (s: string) =>
  normalize(s)
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !STOPWORDS.has(t))
    .map(canon);

/** Casa um diferencial com a foto da galeria (maior sobreposicao de palavras). Retorna -1 se nao houver. */
export function matchFeatureImage(feature: string, galeria: string[]): number {
  const ftokens = tokensOf(feature);
  let best = -1;
  let bestScore = 0;
  galeria.forEach((src, i) => {
    const base = (src.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/, "");
    const btokens = tokensOf(base);
    const score = ftokens.filter((t) => btokens.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  });
  return bestScore > 0 ? best : -1;
}

/**
 * Rotulo de uma PLANTA a partir do nome do arquivo (ex.:
 * "planta-248m-3suites-living.jpg" -> "248 m² · 3 suítes";
 * "planta-2-quartos-37m.jpg" -> "37 m² · 2 quartos"). Retorna null se nao houver
 * metragem no nome. Convencao: sempre incluir a metragem no nome da planta.
 */
export function plantaLabel(src: string): string | null {
  const base = src.split("/").pop() ?? "";
  const area = base.match(/(\d+)\s*m(?:2|²)?(?=[-_.]|$)/i);
  if (!area) return null;
  const suites = base.match(/(\d+)\s*su[ií]tes?/i);
  const quartos = base.match(/(\d+)[-_\s]?quartos?/i);
  const parts = [`${area[1]} m²`];
  if (suites) parts.push(`${suites[1]} suíte${suites[1] === "1" ? "" : "s"}`);
  else if (quartos) parts.push(`${quartos[1]} quarto${quartos[1] === "1" ? "" : "s"}`);
  return parts.join(" · ");
}

/** Separa as imagens por tipo pelo nome do arquivo (convencao atual dos assets). */
export function splitImages(images: string[]) {
  const plantas = images.filter((s) => s.includes("/planta"));
  const localizacao = images.filter((s) => /mapa-localizacao|foto-aerea|implantacao/.test(s));
  const galeria = images.filter((s) => !plantas.includes(s) && !localizacao.includes(s));
  return { galeria, plantas, localizacao };
}

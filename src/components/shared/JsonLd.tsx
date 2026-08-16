import { useEffect } from "react";

/**
 * Injeta um bloco de dados estruturados (JSON-LD) no <head> enquanto a pagina
 * estiver montada, e remove ao desmontar. Ajuda buscadores e assistentes de IA
 * a entenderem o conteudo (ex.: FAQPage nas paginas de bairro). O `id` evita
 * duplicar o mesmo bloco em re-render/navegacao.
 */
export function JsonLd({ id, data }: { id: string; data: unknown }) {
  useEffect(() => {
    const existing = document.getElementById(id);
    const script = existing ?? document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("id", id);
    script.textContent = JSON.stringify(data);
    if (!existing) document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [id, data]);

  return null;
}

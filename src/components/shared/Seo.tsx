import { useEffect } from "react";
import { tenant } from "@/tenants";

const { seo } = tenant;

type SeoProps = {
  title: string;
  description?: string;
};

/**
 * Define title e meta description da pagina, a partir do tenant ativo.
 * Leve o suficiente para a Fase 2 — sem dependencia externa.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = seo.titleTemplate.replace("%s", title);

    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
        return el;
      })();

    meta.setAttribute("content", description ?? seo.defaultDescription);

    // Canonical por pagina — atualiza na navegacao SPA. Evita a home e as rotas
    // serem tratadas como conteudo duplicado por parametros/variacoes de URL.
    if (seo.baseUrl) {
      const canonical =
        document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
        (() => {
          const el = document.createElement("link");
          el.setAttribute("rel", "canonical");
          document.head.appendChild(el);
          return el;
        })();
      const path = window.location.pathname.replace(/\/+$/, "") || "/";
      canonical.setAttribute("href", `${seo.baseUrl.replace(/\/+$/, "")}${path === "/" ? "/" : path}`);
    }
  }, [title, description]);

  return null;
}

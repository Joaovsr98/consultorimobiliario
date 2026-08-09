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
  }, [title, description]);

  return null;
}

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ConsentBanner } from "@/components/shared/ConsentBanner";
import { cn } from "@/lib/utils";

/** Shell da aplicacao: cabecalho, conteudo da rota, rodape e WhatsApp fixo. */
export function Layout() {
  const { pathname } = useLocation();
  // Na pagina de imovel (mobile) existe a barra fixa de conversao. Reservamos
  // espaco no fim do layout para o rodape nunca ficar escondido atras dela.
  const onPropertyDetail = /^\/imoveis\/[^/]+$/.test(pathname);

  // Rola para o topo a cada troca de rota.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col bg-surface",
        onPropertyDetail && "pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pb-0"
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </div>
  );
}

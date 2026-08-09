import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types";
import { tenant, identity } from "@/tenants";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/lib/button-styles";

/** Alguns tenants marcam itens ainda sem pagina propria com `enabled: false`. */
function isNavItemEnabled(item: NavItem): boolean {
  return (item as { enabled?: boolean }).enabled !== false;
}

const mainNav = tenant.navigation.main.filter(isNavItemEnabled);
const whatsapp = identity.contact.whatsapp;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Fecha o menu mobile ao trocar de rota.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive ? "text-brand" : "text-ink/70 hover:text-brand"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b transition-colors",
        scrolled
          ? "border-brand/10 bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-surface"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
        <Link to="/" aria-label="Ir para a pagina inicial">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegacao principal">
          {mainNav.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {whatsapp && (
          <div className="hidden md:block">
            <a
              href={buildWhatsappLink(whatsapp, defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "sm")}
            >
              Falar pelo WhatsApp
            </a>
          </div>
        )}

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-[calc(var(--radius-brand)/2)] text-brand md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-brand/10 bg-paper md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-[calc(var(--radius-brand)/2)] px-3 py-3 text-base font-medium transition-colors",
                      isActive ? "bg-brand/5 text-brand" : "text-ink/80 hover:bg-brand/5"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {whatsapp && (
                <a
                  href={buildWhatsappLink(whatsapp, defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("primary", "md", "mt-2 w-full")}
                >
                  Falar pelo WhatsApp
                </a>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

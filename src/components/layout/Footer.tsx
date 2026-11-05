import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import type { NavItem } from "@/types";
import { tenant, identity } from "@/tenants";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { openConsentSettings } from "@/lib/consent";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

/** Alguns tenants marcam itens ainda sem pagina propria com `enabled: false`. */
function isNavItemEnabled(item: NavItem): boolean {
  return (item as { enabled?: boolean }).enabled !== false;
}

const footerNav = tenant.navigation.footer
  .map((group) => ({ ...group, items: group.items.filter(isNavItemEnabled) }))
  .filter((group) => group.items.length > 0);

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = identity;

  return (
    <footer className="mt-auto bg-brand text-paper/80">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo tone="paper" />
          <p className="mt-4 text-sm leading-relaxed text-paper/70">
            Atendimento personalizado para ajudar você a entender as opções,
            organizar as etapas da compra e encontrar um imóvel compatível com a
            sua realidade financeira.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            {identity.serviceRegion && (
              <p className="flex items-center gap-2 text-paper/70">
                <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
                {identity.serviceRegion}
              </p>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
              >
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                {contact.email}
              </a>
            )}
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-paper">{group.title}</h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-paper/70 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-paper/10">
        <Container className="py-6 text-xs text-paper/60">
          {identity.academicNotice && (
            <p className="mb-4 text-paper/50">{identity.academicNotice}</p>
          )}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>
            &copy; {year} {identity.displayName}. Todos os direitos reservados.
            {identity.registrationLabel && !identity.academicNotice
              ? ` ${identity.registrationLabel}.`
              : ""}
            {" · "}
            <button
              type="button"
              onClick={openConsentSettings}
              className="underline transition-colors hover:text-paper"
            >
              Preferências de cookies
            </button>
          </p>
          <div className="flex items-center gap-4">
            {contact.instagram && (
              <a
                href={`https://instagram.com/${contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-paper"
              >
                <Instagram className="size-5" />
              </a>
            )}
            {contact.whatsapp && (
              <a
                href={buildWhatsappLink(contact.whatsapp, defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-colors hover:text-paper"
              >
                <MessageCircle className="size-5" />
              </a>
            )}
          </div>
          </div>
          {/* Crédito "Site feito por" — cartão no modelo do Bueno's House.
              pb extra no celular: o botão flutuante "Fale com minha equipe" fica por cima. */}
          <div className="mt-6 flex justify-center pb-20 sm:pb-0">
            <a
              href="https://www.instagram.com/inv.devs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Site feito por INV Devs (abre o Instagram @inv.devs)"
              className="group inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              <img
                src="/inv-devs.webp"
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="size-14 rounded-full shadow-[0_0_24px_rgba(56,189,248,.35)] transition group-hover:scale-110 group-hover:shadow-[0_0_32px_rgba(168,85,247,.55)] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span className="text-left leading-tight">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-paper/45">Site feito por</span>
                <span className="block text-lg font-bold text-paper">INV Devs</span>
                <span className="block text-xs text-cyan-300/80 transition-colors group-hover:text-cyan-200">@inv.devs no Instagram →</span>
              </span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}

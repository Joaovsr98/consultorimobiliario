import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { buttonClasses } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import {
  DENIED,
  GRANTED,
  OPEN_CONSENT_EVENT,
  getConsent,
  hasDecided,
  setConsent,
  type ConsentPrefs,
} from "@/lib/consent";

/**
 * Banner de consentimento (LGPD). Aparece na primeira visita e pode ser
 * reaberto pelo rodapé (evento OPEN_CONSENT_EVENT). Padrão negado; GA4/Pixel só
 * ligam conforme a escolha. Cookies estritamente necessários não passam aqui.
 */
export function ConsentBanner() {
  const { pathname } = useLocation();
  // Na página de imóvel (mobile) há a barra fixa de conversão; o banner fica
  // ACIMA dela, sem cobrir o CTA.
  const onPropertyDetail = /^\/imoveis\/[^/]+$/.test(pathname);
  const [open, setOpen] = useState(false);
  const [managing, setManaging] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(getConsent());

  useEffect(() => {
    if (!hasDecided()) setOpen(true);
    const reopen = () => {
      setPrefs(getConsent());
      setManaging(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (p: ConsentPrefs) => {
    setConsent(p);
    setOpen(false);
    setManaging(false);
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-50 px-4",
        onPropertyDetail
          ? "bottom-[calc(4.75rem+env(safe-area-inset-bottom))] pb-2 sm:bottom-0 sm:pb-[calc(1rem+env(safe-area-inset-bottom))]"
          : "bottom-0 pb-[calc(1rem+env(safe-area-inset-bottom))]"
      )}
    >
      <div className="mx-auto max-w-3xl rounded-card border border-brand/15 bg-paper p-4 shadow-[0_-8px_40px_-12px_rgba(13,27,42,0.35)] sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold text-brand">
              Sua privacidade
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">
              Usamos cookies necessários ao funcionamento do site e, com a sua
              autorização, ferramentas de medição (Google Analytics) e de
              marketing (Meta Pixel). Você escolhe. Saiba mais na{" "}
              <Link to="/privacidade" className="font-medium text-brand underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>

        {managing && (
          <div className="mt-4 space-y-3 rounded-image border border-brand/10 bg-surface/60 p-4">
            <ToggleRow
              label="Análise de uso (Google Analytics)"
              desc="Mede páginas visitadas e desempenho, sem identificar você."
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />
            <ToggleRow
              label="Marketing (Meta Pixel)"
              desc="Mede resultados de anúncios do Instagram/Facebook."
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            />
          </div>
        )}

        <div className="mt-4">
          {managing ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => decide(prefs)}
                className={cn(buttonClasses("primary", "md"), "w-full sm:w-auto")}
              >
                Salvar preferências
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex gap-2 sm:order-2">
                <button
                  type="button"
                  onClick={() => decide(DENIED)}
                  className={cn(buttonClasses("outline", "md"), "flex-1 sm:flex-none")}
                >
                  Recusar
                </button>
                <button
                  type="button"
                  onClick={() => decide(GRANTED)}
                  className={cn(buttonClasses("primary", "md"), "flex-1 sm:flex-none")}
                >
                  Aceitar
                </button>
              </div>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className={cn(buttonClasses("ghost", "sm"), "sm:order-1 sm:mr-auto")}
              >
                Gerenciar preferências
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-4 shrink-0 accent-[color:var(--brand-secondary)]"
      />
      <span>
        <span className="block text-sm font-medium text-brand">{label}</span>
        <span className="block text-xs text-ink/60">{desc}</span>
      </span>
    </label>
  );
}

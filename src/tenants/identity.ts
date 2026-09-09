import type { Broker } from "@/types";
import type { AgencyCompany, SiteIdentity, Tenant } from "./types";

/** Adapta um corretor individual para o formato normalizado que os componentes consomem. */
function brokerToIdentity(broker: Broker): SiteIdentity {
  return {
    displayName: broker.brandName,
    tagline: broker.role || undefined,
    registrationLabel: broker.creci ? `CRECI ${broker.creci}` : undefined,
    serviceRegion: broker.serviceRegion || undefined,
    photo: broker.photo || undefined,
    logo: broker.logo || undefined,
    mascot: broker.mascot || undefined,
    whatsappCta: broker.whatsappCta || "Falar pelo WhatsApp",
    academicNotice: broker.academicNotice || undefined,
    contact: {
      phone: broker.phone || undefined,
      // Ate aqui, o unico telefone do corretor E o canal de WhatsApp.
      whatsapp: broker.phone || undefined,
      email: broker.email || undefined,
      instagram: broker.instagram || undefined,
    },
  };
}

/**
 * Adapta uma imobiliaria para o formato normalizado. Depende SOMENTE de
 * `company`, a equipe (`team`) nunca alimenta a identidade global do site.
 * Cada corretor e resolvido no contexto próprio (pagina/atendimento), nao
 * aqui. `whatsapp` fica ausente ate o canal oficial ser confirmado; nao se
 * infere a partir de telefones institucionais genericos (0800, central etc.).
 */
function companyToIdentity(company: AgencyCompany): SiteIdentity {
  return {
    displayName: company.brandName,
    tagline: company.positioning || undefined,
    registrationLabel: company.legalCreci ? `CRECI ${company.legalCreci}` : undefined,
    whatsappCta: "Fale com nossa equipe",
    contact: {
      phone: company.contact.phone,
      whatsapp: company.contact.whatsapp,
      email: company.contact.email,
      instagram: company.contact.instagram,
    },
  };
}

export function getIdentity(tenant: Tenant): SiteIdentity {
  return tenant.kind === "individual"
    ? brokerToIdentity(tenant.broker)
    : companyToIdentity(tenant.company);
}

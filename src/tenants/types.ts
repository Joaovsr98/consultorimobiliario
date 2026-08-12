import type { Broker, NavItem, Property, SeoConfig, ThemeConfig } from "@/types";

export type TenantId = "joao-victor" | "ajuda-imoveis" | "shelby";

export type TenantNavigation = {
  main: NavItem[];
  footer: { title: string; items: NavItem[] }[];
};

/**
 * Conteudo da Hero (primeira dobra). Vive no tenant porque imagem e copy sao
 * dados de marca — o componente Hero e compartilhado e nunca os crava.
 *
 * `image` ausente -> fundo solido de marca, nunca uma foto generica fingindo
 * ser um empreendimento. `imageAlt` deve descrever o que a imagem realmente e,
 * sem afirmar um empreendimento especifico quando ela for so atmosfera.
 */
export type HeroConfig = {
  image?: string;
  imageAlt?: string;
  headline: string;
  subtitle?: string;
};

/**
 * Canais de contato, separados por proposito. `whatsapp` e o UNICO campo que
 * o botao flutuante e a mensagem do diagnostico podem usar — nunca
 * inferido de `phone` (que pode ser 0800, central comercial, fixo, etc.).
 * Ausente ate o canal oficial ser confirmado.
 */
export type ContactChannels = {
  phone?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
};

/**
 * Formato normalizado que componentes compartilhados (Header, Footer, Logo,
 * WhatsApp, SEO) realmente consomem. Nunca leem `Broker` ou `AgencyCompany`
 * diretamente — so `SiteIdentity`, produzido pelo adaptador em identity.ts.
 * Apenas `displayName` e obrigatório; o resto e opcional para nao forcar
 * strings vazias quando o dado simplesmente nao existe.
 */
export type SiteIdentity = {
  displayName: string;
  tagline?: string;
  registrationLabel?: string;
  serviceRegion?: string;
  /** Marca institucional (imobiliaria). Distinto de `photo` (pessoa fisica). */
  logo?: string;
  photo?: string;
  contact: ContactChannels;
};

export type IndividualTenant = {
  kind: "individual";
  broker: Broker;
  theme: ThemeConfig;
  seo: SeoConfig;
  navigation: TenantNavigation;
  properties: Property[];
  hero?: HeroConfig;
};

/**
 * Indica a origem/confianca de um dado publico levantado externamente.
 * "public-confirmed": visto explicitamente na fonte publica.
 * "pending-review": levantado, mas precisa de revisao/autorizacao final.
 */
export type SourceStatus = "public-confirmed" | "pending-review";

/**
 * Identidade institucional de uma imobiliaria (pessoa juridica). Distinta de
 * `Broker` (pessoa fisica): representa a empresa, nao um consultor individual.
 */
export type AgencyCompany = {
  brandName: string;
  /** Razao social. "CONFIRMAR COM O CLIENTE" ate confirmacao documental. */
  legalName: string;
  /** CRECI da pessoa juridica — nunca usado como CRECI pessoal de um corretor. */
  legalCreci: string;
  foundedAt: string;
  positioning: string;
  history: string[];
  services: string[];
  contact: ContactChannels;
  /** Telefones institucionais publicos (0800, central etc.) — nao sao WhatsApp. */
  institutionalPhones: string[];
  hours: string;
};

export type AgencyOffice = {
  id: string;
  name: string;
  addressLine: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  /** true somente para a unidade explicitamente identificada como Matriz na fonte. */
  isHeadquarters: boolean;
  isPublished: boolean;
  sourceStatus: SourceStatus;
};

/**
 * Corretor/consultor da equipe. Perfil institucional da empresa NAO entra
 * aqui — empresa e pessoa sao entidades diferentes (ver AgencyCompany).
 */
export type AgencyTeamMember = {
  id: string;
  name: string;
  creci?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  photo?: string;
  role?: string;
  specialties?: string[];
  biography?: string;
  propertyIds?: string[];
  isPublished: boolean;
};

export type AgencyRegion = {
  name: string;
  /** Origem da informacao (ex.: "site-search-highlight"), nunca apresentada como especialidade oficial sem confirmacao. */
  source: string;
};

export type AgencyTenant = {
  kind: "agency";
  company: AgencyCompany;
  offices: AgencyOffice[];
  team: AgencyTeamMember[];
  regions: AgencyRegion[];
  theme: ThemeConfig;
  /** false enquanto a paleta for um placeholder tecnico, nao a identidade oficial. */
  themeConfirmed: boolean;
  seo: SeoConfig;
  navigation: TenantNavigation;
  properties: Property[];
  hero?: HeroConfig;
};

export type Tenant = IndividualTenant | AgencyTenant;

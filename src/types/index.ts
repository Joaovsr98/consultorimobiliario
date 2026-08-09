/**
 * Tipos centrais do produto. Nenhum dado real vive aqui — apenas contratos.
 * Os dados concretos de cada cliente ficam em `src/tenants/<tenant>/*`.
 */

export type Broker = {
  /** Nome completo do profissional. */
  name: string;
  /** Nome pelo qual prefere ser chamado no atendimento (ex.: usado na saudacao do WhatsApp). */
  preferredName: string;
  /** Nome comercial / marca exibida no cabecalho. */
  brandName: string;
  /** Cargo. Enquanto nao houver CRECI, usar termo neutro (ex.: "Consultor imobiliario"). */
  role: string;
  /** Registro profissional. Vazio ate a regularizacao. */
  creci: string;
  /** Telefone no formato internacional, somente digitos (ex.: 5511999999999). */
  phone: string;
  email: string;
  city: string;
  /** Regiao de atuacao (ex.: "Zona Oeste de Sao Paulo"). */
  serviceRegion: string;
  /** Handle do Instagram sem @, ou string vazia. */
  instagram: string;
  /** Caminho da foto profissional. Vazio enquanto nao autorizada. */
  photo: string;
};

export type ThemeConfig = {
  colors: {
    /** Azul-marinho — cor de marca principal. */
    primary: string;
    /** Dourado discreto — cor de destaque. */
    secondary: string;
    /** Areia clara — superficie de fundo. */
    surface: string;
    /** Branco — cartoes e areas de leitura. */
    paper: string;
    /** Grafite — texto principal. */
    ink: string;
  };
  /** Raio de borda base (ex.: "18px"). */
  radius: string;
};

export type NavItem = {
  label: string;
  /** Rota interna (ex.: "/imoveis") ou ancora (ex.: "/#diagnostico"). */
  to: string;
};

export type PropertyStatus = "lancamento" | "em-obras" | "pronto";

export type Property = {
  id: string;
  /** Usado na rota /imoveis/:slug */
  slug: string;
  name: string;
  neighborhood: string;
  city: string;
  /** Ex.: "1 e 2 dormitorios" */
  bedrooms: string;
  /** Ex.: "27 a 41 m2" */
  area: string;
  /** Preco "a partir de". Opcional e sempre acompanhado de ressalva de atualizacao. */
  priceFrom?: number;
  /** Ex.: "Dez/2027" */
  delivery?: string;
  status?: PropertyStatus;
  description: string;
  features: string[];
  /** Caminhos de imagens autorizadas. */
  images: string[];
  featured: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  name: string;
  /** Contexto curto e autorizado (ex.: "Comprou o 1o imovel em 2025"). */
  context: string;
  quote: string;
};

export type Guide = {
  slug: string;
  title: string;
  /** Resumo curto usado nos cards e na meta description da pagina. */
  summary: string;
  /** Paragrafos do conteudo educativo. */
  content: string[];
};

export type SeoConfig = {
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  /** URL canonica base, sem barra final. */
  baseUrl: string;
  locale: string;
};

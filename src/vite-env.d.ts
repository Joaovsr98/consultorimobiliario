/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "joao-victor" | "ajuda-imoveis", valida-se em src/tenants/index.ts. */
  readonly VITE_TENANT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

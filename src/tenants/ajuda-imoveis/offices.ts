import type { AgencyOffice } from "../types";

/**
 * Unidades publicas levantadas. `isPublished: false` em todas ate revisao
 * final dos dados e autorizacao explicita de publicacao. `isHeadquarters`
 * so e true para a unidade que a fonte publica rotula explicitamente como
 * "Matriz", nenhuma outra classificacao foi inferida. CEP, telefone e
 * e-mail por unidade nao foram informados na fonte e ficam ausentes (nao
 * inventados).
 */
export const offices: AgencyOffice[] = [
  {
    id: "matriz",
    name: "Matriz",
    addressLine: "Avenida Paulista, 302, Conjunto 10",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    isHeadquarters: true,
    isPublished: false,
    sourceStatus: "public-confirmed",
  },
  {
    id: "itaim-bibi",
    name: "Unidade Itaim Bibi",
    addressLine: "Rua Dr. Renato Paes de Barros, 33",
    neighborhood: "Itaim Bibi",
    city: "São Paulo",
    state: "SP",
    isHeadquarters: false,
    isPublished: false,
    sourceStatus: "public-confirmed",
  },
  {
    id: "pinheiros",
    name: "Unidade Pinheiros",
    addressLine: "Rua dos Pinheiros, 498, 9o andar",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    isHeadquarters: false,
    isPublished: false,
    sourceStatus: "public-confirmed",
  },
  {
    id: "jardim-paulista",
    name: "Unidade Jardim Paulista",
    addressLine: "Alameda Ministro Rocha Azevedo, 912",
    neighborhood: "Jardim Paulista",
    city: "São Paulo",
    state: "SP",
    isHeadquarters: false,
    isPublished: false,
    sourceStatus: "public-confirmed",
  },
  {
    id: "jardim-europa",
    name: "Unidade Jardim Europa",
    addressLine: "Rua Amauri, 116, 1o andar",
    neighborhood: "Jardim Europa",
    city: "São Paulo",
    state: "SP",
    isHeadquarters: false,
    isPublished: false,
    sourceStatus: "public-confirmed",
  },
];

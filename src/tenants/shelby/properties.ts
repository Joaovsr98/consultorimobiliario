/**
 * Empreendimentos do Shelby, APENAS os Vibra (mesmos lançamentos do Bueno,
 * mesmas imagens). O Shelby NÃO vende os empreendimentos EXTO (alto padrão);
 * por isso reexporta só `vibraProperties`, não o catálogo completo do Bueno.
 * Assim novos Vibra entram automaticamente, mas EXTO nunca aparece aqui.
 */
export { vibraProperties as properties } from "../joao-victor/properties";

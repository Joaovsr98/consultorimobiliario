import { identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";

/**
 * Politica de privacidade real, refletindo o que o site de fato faz hoje —
 * nao um texto generico de template. Atualizar sempre que o fluxo de dados
 * mudar (ex.: se um backend/CRM entrar em uma fase futura).
 */
export function Privacy() {
  return (
    <Section>
      <Seo
        title="Politica de privacidade"
        description="Como os dados informados no site sao usados: nada e armazenado em servidor, o diagnostico do comprador so monta uma mensagem que voce mesmo envia pelo WhatsApp."
      />

      <article className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Privacidade
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          Politica de privacidade
        </h1>
        <p className="mt-4 text-sm text-ink/50">Ultima atualizacao: 07 de agosto de 2026.</p>

        <div className="mt-8 space-y-8 text-ink/80">
          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Quem e responsavel por este site
            </h2>
            <p className="mt-3 leading-relaxed">
              Este site e mantido por {identity.displayName}. Duvidas sobre
              privacidade podem ser enviadas para{" "}
              {identity.contact.email ? (
                <a href={`mailto:${identity.contact.email}`} className="text-brand underline">
                  {identity.contact.email}
                </a>
              ) : (
                "o e-mail de contato informado no rodape"
              )}
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Quais dados este site coleta
            </h2>
            <p className="mt-3 leading-relaxed">
              O diagnostico do comprador (formulario em 3 passos) pede:
              objetivo (morar ou investir), regiao de interesse, numero de
              dormitorios, renda familiar aproximada, entrada disponivel, se
              voce possui FGTS e o prazo de compra. Nao pedimos nome, CPF, RG,
              comprovantes ou qualquer documento sensivel — em nenhum
              formulario deste site.
            </p>
            <p className="mt-3 leading-relaxed">
              Se voce chegou por um link de campanha (ex.: Instagram, um
              anuncio), guardamos temporariamente a origem desse link
              (utm_source/utm_medium/utm_campaign) no armazenamento local do
              seu proprio navegador, so para identificar de onde veio o
              contato.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Como esses dados sao usados
            </h2>
            <p className="mt-3 leading-relaxed">
              As respostas do diagnostico so servem para montar uma mensagem
              de texto. Antes de qualquer envio, essa mensagem e exibida para
              voce revisar. Se voce clicar em "Continuar no WhatsApp", o seu
              proprio navegador abre o WhatsApp com essa mensagem
              pre-preenchida — e voce quem decide se envia. Nenhuma analise de
              credito ou aprovacao de financiamento acontece neste site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Onde esses dados ficam armazenados
            </h2>
            <p className="mt-3 leading-relaxed">
              Nesta fase, o site nao tem banco de dados nem servidor proprio
              guardando essas respostas. As respostas do diagnostico existem
              apenas na pagina, no seu navegador, enquanto voce preenche o
              formulario — nao sao enviadas a nenhum servidor nosso. A
              informacao de origem (UTM) fica no armazenamento local do
              navegador e e apagada quando essa sessao do navegador termina.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Compartilhamento com terceiros
            </h2>
            <p className="mt-3 leading-relaxed">
              Nao compartilhamos, vendemos nem alugamos essas informacoes.
              Quando voce opta por continuar no WhatsApp, a conversa passa a
              acontecer diretamente entre voce e {identity.displayName}{" "}
              atraves do WhatsApp, sujeita a politica de privacidade do
              proprio WhatsApp/Meta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Cookies e rastreamento
            </h2>
            <p className="mt-3 leading-relaxed">
              Este site nao usa cookies de rastreamento nem ferramentas de
              analytics no momento. Se isso mudar no futuro, esta pagina sera
              atualizada antes da mudanca entrar no ar.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Seus direitos
            </h2>
            <p className="mt-3 leading-relaxed">
              De acordo com a Lei Geral de Protecao de Dados (LGPD, Lei
              13.709/2018), voce pode pedir esclarecimentos sobre como seus
              dados sao tratados a qualquer momento pelo canal de contato
              informado acima. Como este site nao mantem banco de dados
              proprio, a unica informacao que eventualmente fica registrada e
              a conversa que voce mesmo iniciar pelo WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Alteracoes nesta politica
            </h2>
            <p className="mt-3 leading-relaxed">
              Se a forma como os dados sao tratados mudar — por exemplo, com a
              entrada de um sistema de gestao de leads em uma fase futura —
              esta pagina sera atualizada e a data no topo sera revisada.
            </p>
          </section>
        </div>
      </article>
    </Section>
  );
}

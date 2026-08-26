import { identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";

/**
 * Política de privacidade real, refletindo o que o site de fato faz hoje, 
 * não um texto genérico de template. Atualizar sempre que o fluxo de dados
 * mudar (ex.: se um backend/CRM entrar em uma fase futura).
 */
export function Privacy() {
  return (
    <Section>
      <Seo
        title="Política de privacidade"
        description="Como os dados informados no site são usados: nada é armazenado em servidor, o diagnóstico do comprador só monta uma mensagem que você mesmo envia pelo WhatsApp."
      />

      <article className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Privacidade
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          Política de privacidade
        </h1>
        <p className="mt-4 text-sm text-ink/50">Última atualização: 21 de agosto de 2026.</p>

        <div className="mt-8 space-y-8 text-ink/80">
          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Quem é responsável por este site
            </h2>
            <p className="mt-3 leading-relaxed">
              Este site é mantido por {identity.displayName}. Dúvidas sobre
              privacidade podem ser enviadas para{" "}
              {identity.contact.email ? (
                <a href={`mailto:${identity.contact.email}`} className="text-brand underline">
                  {identity.contact.email}
                </a>
              ) : (
                "o e-mail de contato informado no rodapé"
              )}
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Quais dados este site coleta
            </h2>
            <p className="mt-3 leading-relaxed">
              O diagnóstico do comprador (formulário em 3 passos) pede:
              objetivo (morar ou investir), região de interesse, número de
              dormitórios, renda familiar aproximada, entrada disponível, se
              você possui FGTS e o prazo de compra. Não pedimos nome, CPF, RG,
              comprovantes ou qualquer documento sensível, em nenhum
              formulário deste site.
            </p>
            <p className="mt-3 leading-relaxed">
              Se você chegou por um link de campanha (ex.: Instagram, um
              anúncio), guardamos temporariamente a origem desse link
              (utm_source/utm_medium/utm_campaign) no armazenamento local do
              seu próprio navegador, só para identificar de onde veio o
              contato.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Como esses dados são usados
            </h2>
            <p className="mt-3 leading-relaxed">
              As respostas do diagnóstico só servem para montar uma mensagem
              de texto. Antes de qualquer envio, essa mensagem é exibida para
              você revisar. Se você clicar em "Continuar no WhatsApp", o seu
              próprio navegador abre o WhatsApp com essa mensagem
              pré-preenchida, e você quem decide se envia. Nenhuma análise de
              crédito ou aprovação de financiamento acontece neste site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Onde esses dados ficam armazenados
            </h2>
            <p className="mt-3 leading-relaxed">
              Nesta fase, o site não tem banco de dados nem servidor próprio
              guardando essas respostas. As respostas do diagnóstico existem
              apenas na página, no seu navegador, enquanto você preenche o
              formulário, não são enviadas a nenhum servidor nosso. A
              informação de origem (UTM) fica no armazenamento local do
              navegador e é apagada quando essa sessão do navegador termina.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Compartilhamento com terceiros
            </h2>
            <p className="mt-3 leading-relaxed">
              Não compartilhamos, vendemos nem alugamos essas informações.
              Quando você opta por continuar no WhatsApp, a conversa passa a
              acontecer diretamente entre você e {identity.displayName}{" "}
              através do WhatsApp, sujeita à política de privacidade do
              próprio WhatsApp/Meta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Cookies e tecnologias de medição
            </h2>
            <p className="mt-3 leading-relaxed">
              Usamos cookies e armazenamento local <strong>estritamente
              necessários</strong> ao funcionamento do site (por exemplo, guardar
              a origem de um link de campanha e a sua própria escolha de
              consentimento). Esses não dependem de autorização.
            </p>
            <p className="mt-3 leading-relaxed">
              Mediante o seu <strong>consentimento</strong>, também utilizamos
              ferramentas de medição e marketing, que só são carregadas depois de
              você autorizar a categoria correspondente:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
              <li>
                <strong>Análise de uso, Google Analytics 4:</strong> mede
                páginas visitadas, origem do tráfego e desempenho do site, para
                melhorarmos a experiência. Categoria: <em>análise</em>.
              </li>
              <li>
                <strong>Marketing, Meta Pixel:</strong> mede o resultado de
                anúncios no Instagram/Facebook (ex.: quantas pessoas chegaram a um
                imóvel ou iniciaram um contato). Categoria: <em>marketing</em>.
              </li>
            </ul>
            <p className="mt-3 leading-relaxed">
              O padrão é <strong>negado</strong>: nada de análise ou marketing é
              ativado antes da sua escolha. Trabalhamos no modelo de consentimento
              do Google (Consent Mode), controlando os estados
              <em> analytics_storage</em>, <em>ad_storage</em>,
              <em> ad_user_data</em> e <em>ad_personalization</em>.
            </p>
            <p className="mt-3 leading-relaxed">
              Esses eventos registram apenas dados de contexto, qual imóvel foi
              visto e a origem da campanha (UTM). <strong>Nunca</strong> enviamos
              a essas ferramentas o seu nome, telefone, e-mail ou o texto que você
              digita no diagnóstico ou no WhatsApp.
            </p>
            <p className="mt-3 leading-relaxed">
              Você pode alterar a sua decisão a qualquer momento em
              <strong> “Preferências de cookies”</strong>, no rodapé de qualquer
              página.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Seus direitos
            </h2>
            <p className="mt-3 leading-relaxed">
              De acordo com a Lei Geral de Proteção de Dados (LGPD, Lei
              13.709/2018), você pode pedir esclarecimentos sobre como seus
              dados são tratados a qualquer momento pelo canal de contato
              informado acima. Como este site não mantém banco de dados
              próprio, a única informação que eventualmente fica registrada é
              a conversa que você mesmo iniciar pelo WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-brand">
              Alterações nesta política
            </h2>
            <p className="mt-3 leading-relaxed">
              Se a forma como os dados são tratados mudar, por exemplo, com a
              entrada de um sistema de gestão de leads em uma fase futura, 
              esta página será atualizada e a data no topo será revisada.
            </p>
          </section>
        </div>
      </article>
    </Section>
  );
}

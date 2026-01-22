import "./InsuranceDetails.css";

export default function InsuranceDetails() {
  return (
    <div className="ins-details">
      <div className="ins-details-top">
        Veja informações gerais, condições e coberturas{" "}
        <a className="ins-link" href="#" onClick={(e) => e.preventDefault()}>
          aqui
        </a>
        .
      </div>

      <div className="ins-table-wrap">
        <table className="ins-table">
          <tbody>
            <tr>
              <td className="ins-td-title">Morte</td>
              <td>
                Doenças Graves:
                <br />- Internação Hospitalar
                <br />- Fratura Óssea
                <br />- Cirurgia e Procedimentos Odontológicos
              </td>
              <td>
                Ausência por Outros Motivos:
                <br />- Ausência por Questão Legal
                <br />- Perturbação ou Falha Inesperada nos Transportes Públicos
                <br />- Atraso ou Cancelamento de Voo ou Transporte Rodoviário
                <br />- Pane Mecânica, Acidente, Incêndio ou Roubo/Furto de Automóvel
                <br />- Modificação Imprevista na Data de Prova ou Exame Educacional
              </td>
            </tr>

            <tr>
              <td className="ins-td-title">Inclusão de Acompanhante</td>
              <td>
                Perda de Renda:
                <br />- Desemprego Involuntário
                <br />- Incapacidade Física Temporária
              </td>
              <td />
            </tr>

            <tr>
              <td className="ins-td-title">Auxílio em caso de dano à propriedade</td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="ins-paragraph">
        Para consultar a íntegra das condições gerais do seguro, acesse o site da{" "}
        <a className="ins-link" href="#" onClick={(e) => e.preventDefault()}>
          Ingresso Seguro
        </a>
        .
      </p>

      <p className="ins-paragraph">
        O produto “Ingresso Seguro” é comercializado pela INGRESSO SEGURO LTDA através da
        Ticketmaster. Ao contratar esse serviço você receberá uma apólice em até 48H, emitida pela
        INGRESSO SEGURO LTDA, com o detalhamento das coberturas e canais de atendimento e você:
      </p>

      <div className="ins-section-title">Privacidade de Dados</div>

      <p className="ins-paragraph">
        Concorda com a{" "}
        <a className="ins-link" href="#" onClick={(e) => e.preventDefault()}>
          Política de Privacidade
        </a>{" "}
        e declara que leu e concordou que os dados pessoais por mim fornecidos, incluindo os dados
        pessoais sensíveis, serão tratados de acordo com a Política de Privacidade de Dados da
        INGRESSO SEGURO LTDA. Além disso, tais dados poderão ser compartilhados com empresas do
        grupo INGRESSO SEGURO LTDA e terceiros, dentro e fora do Brasil, para, dentre outros,
        oferecimento de produtos e serviços.
      </p>

      <div className="ins-section-title">Termos e Condições do Produto</div>

      <p className="ins-paragraph">
        Concorda com todos os{" "}
        <a className="ins-link" href="#" onClick={(e) => e.preventDefault()}>
          Termos e Condições
        </a>
        , reconhecendo que em caso de utilização do seguro, antes do evento, perderei o direito ao
        uso de todos os ingressos comprados pelo titular e, em caso de uso de qualquer ingresso da
        compra, o seguro estará cancelado.
      </p>

      <p className="ins-paragraph">
        Ainda, as disposições aqui referidas são uma breve descrição do seguro, bem como as
        restrições a ele aplicadas. O Produto está registrado na{" "}
        <strong>SUSEP 15414.606193/2025-89</strong> sob responsabilidade da{" "}
        <strong>BS2 SEGUROS S.A.</strong>, <strong>Código SUSEP 03794</strong>, CNPJ nr.{" "}
        <strong>07.163.211/0001-94</strong>. A íntegra das Condições Gerais do Produto está
        disponível no site da Ingresso Seguro clicando{" "}
        <a className="ins-link" href="#" onClick={(e) => e.preventDefault()}>
          aqui
        </a>
        .
      </p>

      <p className="ins-paragraph">
        O registro do produto é automático e não representa aprovação ou recomendação por parte da
        Susep. As condições contratuais/regulamento deste produto encontram-se registradas na SUSEP
        de acordo com o número de processo constante na apólice/proposta e poderão ser consultadas
        no endereço eletrônico <span className="ins-mono">www.susep.gov.br</span> ou pelo Atendimento
        Exclusivo ao Consumidor 0800-021-8484 (dias úteis, das 9:30h às 17:00h). A aceitação da
        proposta sujeita à análise do risco, após emitido o seguro, você receberá por e-mail o
        certificado comprovando o início da cobertura.
      </p>
    </div>
  );
}

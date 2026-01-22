import "./EventSalesInfo.css";

export default function EventSalesInfo() {
  return (
    <section className="tm-sales">
      <div className="tm-sales-container">
        <p className="tm-sales-fee">
          <strong>Taxa de administração:</strong> R$ 21,74
        </p>

        <p>
          Para eventos no Morumbis, haverá incidência de Taxa de Administração
          de acordo com definições da promotora do evento, a Live Nation Brasil
          Entretenimento Ltda., inscrita no CNPJ/ME sob o nº 23.956.300/0001-44
          (“Promotora”). A Taxa de Administração incide sobre todos os ingressos
          comercializados para shows realizados pela Promotora no Morumbis,
          tanto no Marketplace quanto em pontos de venda físicos, terá valor
          fixo pré-definido, repassado integralmente para a administração do
          Morumbis, com o propósito de realização de investimentos necessários
          de manutenção e melhorias das instalações. Para os eventos em que
          houver incidência de Taxa de Administração, você poderá consultar os
          valores antes, durante e após a conclusão do processo de compra de
          maneira individualizada. Esta receita é relacionada à administração
          do Morumbis, não havendo qualquer participação da Ticketmaster na
          mesma ou qualquer responsabilidade em relação à mesma.
        </p>

        <p className="tm-spacing">
          <strong>Limite de ingressos por CPF:</strong> Clientes podem comprar
          até 06 ingressos sendo 02 meias-entradas.
        </p>

        <h4>VENDA GERAL:</h4>

        <p>
          <strong>Início das Vendas:</strong> 10/09/2025 às 12h em{" "}
          <a href="#" className="tm-link">
            www.ticketmaster.com.br
          </a>{" "}
          e a partir das 13h na Bilheteria Oficial.
        </p>

        <h4>MÉTODOS DE PAGAMENTO:</h4>

        <p className="tm-subtitle">Para compras online:</p>

        <p>
          <strong>Clientes Santander:</strong> Cartões de crédito em até 5x sem
          juros; de 6 a 10x com juros
        </p>
        <p>
          <strong>Demais clientes:</strong> Cartões de crédito em até 3x sem
          juros; de 4 a 8x com juros e Pix
        </p>

        <p className="tm-subtitle tm-spacing">
          Para compras na Bilheteria Oficial:
        </p>

        <p>
          <strong>Clientes Santander:</strong> Cartões de crédito em até 5x sem
          juros e cartões de débito Santander.
        </p>
        <p>
          <strong>Demais clientes:</strong> Cartões de crédito em até 3x sem
          juros, cartões de débito e dinheiro.
        </p>

        <h4>Outras Informações</h4>

        <p>
          Atenção: cada ingresso dá direito a uma entrada única, não sendo
          possível retornar caso deixe o local do evento.
        </p>

        <p>
          Se você precisar de informações sobre meia-entrada,{" "}
          <a href="#" className="tm-link">
            acesse esta página
          </a>
          .
        </p>

        <p>
          Para auxílio sobre perfil/cadastro,{" "}
          <a href="#" className="tm-link">
            clique aqui
          </a>
          .
        </p>

        <p>
          As informações sobre o processo de compra,{" "}
          <a href="#" className="tm-link">
            estão neste artigo
          </a>
          .
        </p>

        <p>
          Para acessar informações sobre o Ingresso Seguro e a cobertura
          oferecida,{" "}
          <a href="#" className="tm-link">
            acesse esta página
          </a>
          .
        </p>

        <p className="tm-spacing">
          Os ingressos para compras online serão exclusivamente em formato
          digital, e estarão disponíveis em até 24 horas após a aprovação do
          pagamento. A funcionalidade de transferência, se{" "}
          <strong>permitida pelo promotor do evento</strong>, estará habilitada
          30 dias antes da sua realização. Confira todas as informações
          detalhadas em{" "}
          <a href="#" className="tm-link">
            Ingresso Digital - Quentro
          </a>
          .
        </p>
      </div>
    </section>
  );
}

import "./EventDetails.css";

export default function EventDetails() {
  return (
    <section className="tm-details">
      <div className="tm-details-container">
        <p><strong>São Paulo</strong></p>

        <p><strong>Apresentação:</strong> 30/04/2026 (quinta-feira)</p>
        <p><strong>Abertura dos portões:</strong> 16h</p>
        <p><strong>Horário do show:</strong> 21h</p>
        <p><strong>Local:</strong> Estádio do Morumbis</p>
        <p>
          <strong>Endereço:</strong> Praça Roberto Gomes Pedrosa, 1 - Morumbi,
          São Paulo - SP, 05653-070
        </p>

        <p className="tm-space" />

        <p>
          <strong>Classificação:</strong> 16 anos. Menores de 05 a 15 anos,
          apenas acompanhados dos pais ou responsáveis legais.
          <br />
          <span className="tm-muted">
            *Sujeito a alteração por Decisão Judicial.
          </span>
        </p>

        <p className="tm-space" />

        <p className="tm-link">
          <strong>Bilheteria Oficial – sem taxa de serviço</strong>
        </p>

        <p><strong>Shopping Ibirapuera</strong></p>
        <p>Av. Ibirapuera, 3103 – Indianópolis, São Paulo/SP</p>
        <p>Piso Jurupis (subsolo)</p>
        <p>
          Referência: próximo ao restaurante Frutaria e à academia Bio Ritmo
        </p>

        <p className="tm-space" />

        <p><strong>Funcionamento:</strong></p>
        <ul>
          <li>Terça a sábado: 10h às 22h</li>
          <li>Domingos e feriados: 14h às 20h</li>
          <li><strong>Não abre:</strong> segundas-feiras</li>
        </ul>

        <p className="tm-space" />

        <p className="tm-important">Importante:</p>
        <ul>
          <li>
            Para meia-entrada, apresente o comprovante na compra e na entrada do
            evento.
          </li>
          <li>
            Baixe o app Quentro antes de vir: facilita a compra do ingresso
            digital.
          </li>
        </ul>

        <div className="tm-highlight">
          <p><strong>Recesso de fim de ano</strong></p>
          <p>– Sem atendimento: 24/12/2025 a 01/01/2026</p>
          <p>– Retorno: 02/01/2026, nos horários habituais</p>
        </div>
      </div>
    </section>
  );
}

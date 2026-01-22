import "./InsuranceCard.css";
import InsuranceDetails from "./InsuranceDetails";

function brl(v) {
  return Number(v || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function InsuranceCard({ value, onChange, priceYes = 296.26 }) {
  const yesChecked = value === "yes";
  const noChecked = value === "no";

  return (
    <div className="ins-wrap">
      <label className={`ins-option ${yesChecked ? "is-active" : ""}`}>
        <span className={`ins-radio ${yesChecked ? "is-on" : ""}`} />

        <div className="ins-text">
          <div className="ins-line1">
            <strong>
              Sim, quero contratar o seguro para me proteger de imprevistos que me impeçam de ir ao
              evento.
            </strong>
          </div>
          <div className="ins-line2">
            Com o seguro você receberá reembolso do valor do ingresso + taxas nas situações cobertas
            pela apólice indicadas a seguir
          </div>
        </div>

        <div className="ins-price ins-green">R$ {brl(priceYes)}</div>

        <input
          className="ins-hidden"
          type="radio"
          name="insurance"
          checked={yesChecked}
          onChange={() => onChange?.("yes")}
        />
      </label>

      {/* 🔥 DETALHES APARECEM SOMENTE SE "SIM" ESTIVER SELECIONADO */}
      {yesChecked && <InsuranceDetails />}

      <label className={`ins-option ${noChecked ? "is-active" : ""}`}>
        <span className={`ins-radio ${noChecked ? "is-on" : ""}`} />

        <div className="ins-text">
          <div className="ins-line1">
            <strong>
              Não, com certeza irei ao evento e entendo que em caso de imprevistos ou emergências
              não tenho direito a qualquer reembolso por não comparecer.
            </strong>
          </div>
          <div className="ins-line2">
            Em caso de emergências ou imprevistos de força maior*, entendo que não tenho direito a
            qualquer reembolso.
          </div>
        </div>

        <div className="ins-price ins-muted">R$ {brl(0)}</div>

        <input
          className="ins-hidden"
          type="radio"
          name="insurance"
          checked={noChecked}
          onChange={() => onChange?.("no")}
        />
      </label>
    </div>
  );
}

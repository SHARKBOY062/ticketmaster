import "./SummaryCard.css";

function brl(v) {
  return Number(v || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SummaryCard({ data, totals, onCancel }) {
  const items = Array.isArray(data.items) ? data.items : [];
  const qtySum = items.reduce((s, it) => s + Number(it.qty || 0), 0);

  const first = items[0];

  return (
    <div className="sum-card">
      <div className="sum-head">
        <div className="sum-title">Resumo da seleção</div>
        <button className="sum-cancel" onClick={onCancel}>
          Cancelar seleção
        </button>
      </div>

      <div className="sum-body">
        <div className="sum-event">{data.selectionTitle}</div>

        {first && (
          <div className="sum-row">
            <div className="sum-left">
              {first.qty} x {first.sectorName} - {first.valueLabel} (R$ {brl(first.ticketUnit)})
            </div>
            <div className="sum-right">R$ {brl(first.ticketTotal)}</div>
          </div>
        )}

        <div className="sum-row muted">
          <div className="sum-left">Taxa de serviço</div>
          <div className="sum-right">R$ {brl(totals.fee)}</div>
        </div>

        <div className="sum-row muted">
          <div className="sum-left">{data.adminTax?.label}</div>
          <div className="sum-right">R$ {brl(totals.admin)}</div>
        </div>

        {/* ✅ aparece só se tiver seguro */}
        {totals.insurance > 0 && (
          <div className="sum-row muted">
            <div className="sum-left">Ingresso Seguro</div>
            <div className="sum-right">R$ {brl(totals.insurance)}</div>
          </div>
        )}

        <div className="sum-divider" />

        <div className="sum-total">
          <div className="sum-total-left">
            <span className="sum-pill">{qtySum || 1}</span>
            <span>Total</span>
          </div>
          <div className="sum-total-right">R$ {brl(totals.grandTotal)}</div>
        </div>
      </div>
    </div>
  );
}

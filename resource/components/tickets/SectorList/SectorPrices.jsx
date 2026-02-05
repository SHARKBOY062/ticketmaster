import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SectorPrices.css";

function parseBRLFromText(text) {
  // pega todos os valores do tipo 11.968,94 / 375,00 etc
  const matches = text.match(/\d{1,3}(?:\.\d{3})*,\d{2}/g) || [];
  const nums = matches.map((v) => Number(v.replace(/\./g, "").replace(",", ".")));
  return nums; // [ticket, fee]
}

function formatBRL(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SectorPrices({ sector, onClear }) {
  const navigate = useNavigate();

  // aceita sector como string OU objeto {name, price, discountedPriceText?}
  const sectorName = typeof sector === "string" ? sector : sector?.name || "";

  // ✅ AQUI: se existir discountedPriceText, ele vira a base do funil
  const sectorPriceText =
    typeof sector === "string"
      ? ""
      : sector?.discountedPriceText || sector?.price || "";

  const prices = useMemo(() => {
    // fallback (se vier vazio)
    let inteiraTicket = 375;
    let inteiraFee = 75;

    if (sectorPriceText) {
      const [t, f] = parseBRLFromText(sectorPriceText);
      if (Number.isFinite(t)) inteiraTicket = t;
      if (Number.isFinite(f)) inteiraFee = f;
    }

    const half = (n) => Number((n / 2).toFixed(2));

    const inteira = { ticket: inteiraTicket, fee: inteiraFee };
    const meia = { ticket: half(inteiraTicket), fee: half(inteiraFee) };
    const idoso = { ...meia };

    // PCD esgotado apenas nas cadeiras
    const pcdEnabled = !/Cadeira Inferior|Cadeira Superior/i.test(sectorName);

    return {
      inteira,
      meia,
      idoso,
      pcd: pcdEnabled ? { ...meia } : null,
    };
  }, [sectorName, sectorPriceText]);

  const [counts, setCounts] = useState({
    inteira: 0,
    meia: 0,
    idoso: 0,
    pcd: 0,
  });

  // tela: selector -> review (card do print)
  const [step, setStep] = useState("selector"); // "selector" | "review"

  const update = (key, value) =>
    setCounts((p) => ({ ...p, [key]: Math.max(0, value) }));

  const hasSelection = useMemo(
    () => Object.values(counts).some((v) => v > 0),
    [counts]
  );

  const total = useMemo(() => {
    let ticket = 0;
    let fee = 0;

    ["inteira", "meia", "idoso", "pcd"].forEach((k) => {
      if (!prices[k]) return;
      ticket += counts[k] * prices[k].ticket;
      fee += counts[k] * prices[k].fee;
    });

    return { ticket: Number(ticket.toFixed(2)), fee: Number(fee.toFixed(2)) };
  }, [counts, prices]);

  // qual “valor” mostrar no card (prioridade: meia -> inteira -> idoso -> pcd)
  const chosen = useMemo(() => {
    const order = ["meia", "inteira", "idoso", "pcd"];
    const labels = {
      inteira: "Inteira",
      meia: "Meia-Entrada",
      idoso: "Desc. 50% - Estatuto Idoso",
      pcd: "Meia-Entrada PCD",
    };

    for (const k of order) {
      if (counts[k] > 0) {
        return {
          key: k,
          label: labels[k],
          qty: counts[k],
          ticketUnit: prices[k]?.ticket ?? 0,
          feeUnit: prices[k]?.fee ?? 0,
        };
      }
    }
    return null;
  }, [counts, prices]);

  const clearAndBackToList = () => {
    setCounts({ inteira: 0, meia: 0, idoso: 0, pcd: 0 });
    setStep("selector");
    onClear?.(); // volta pro SectorList
  };

  const backToSelectorKeepCounts = () => setStep("selector");

  // 🔥 ÚLTIMO BOTÃO (da tela review) -> NOVA PAGE
  const goToOrderProtection = () => {
    const labels = {
      inteira: "Inteira",
      meia: "Meia-Entrada",
      idoso: "Desc. 50% - Estatuto Idoso",
      pcd: "Meia-Entrada PCD",
    };

    const keys = ["inteira", "meia", "idoso", "pcd"];

    const items = keys
      .filter((k) => counts[k] > 0 && prices[k])
      .map((k) => {
        const qty = counts[k];
        const ticketUnit = prices[k].ticket;
        const feeUnit = prices[k].fee;

        return {
          qty,
          sectorName,
          valueLabel: labels[k],
          ticketUnit,
          feeUnit,
          ticketTotal: Number((qty * ticketUnit).toFixed(2)),
          feeTotal: Number((qty * feeUnit).toFixed(2)),
        };
      });

    const safeItems =
      items.length > 0
        ? items
        : [
            {
              qty: 1,
              sectorName,
              valueLabel: chosen?.label || "Meia-Entrada",
              ticketUnit: chosen?.ticketUnit ?? prices.meia.ticket,
              feeUnit: chosen?.feeUnit ?? prices.meia.fee,
              ticketTotal: chosen?.ticketUnit ?? prices.meia.ticket,
              feeTotal: chosen?.feeUnit ?? prices.meia.fee,
            },
          ];

    const checkout = {
      selectionTitle: "The Weeknd - São Paulo - 30/04/2026",
      items: safeItems,
      adminTax: { label: "1 x Taxa de Administração MorumbiS", value: 21.74 },
      // opcional: se você quiser exibir depois em outra tela
      discountPercent: typeof sector === "object" ? sector?.discountPercent : undefined,
    };

    navigate("/checkout/protection", {
      state: { checkout },
    });
  };

  return (
    <div className="sector-prices">
      {/* HEADER */}
      <div className="prices-header">
        <h3>Selecionar valor</h3>
        <button onClick={clearAndBackToList}>Limpar seleção</button>
      </div>

      {/* CONTEÚDO */}
      {step === "selector" ? (
        <>
          <PriceRow
            label="Inteira"
            price={`R$ ${formatBRL(prices.inteira.ticket)} + R$ ${formatBRL(
              prices.inteira.fee
            )}`}
            value={counts.inteira}
            onChange={(v) => update("inteira", v)}
          />

          <PriceRow
            label="Meia-Entrada"
            price={`R$ ${formatBRL(prices.meia.ticket)} + R$ ${formatBRL(
              prices.meia.fee
            )}`}
            info
            value={counts.meia}
            onChange={(v) => update("meia", v)}
          />

          <PriceRow
            label="Desc. 50% - Estatuto Idoso"
            price={`R$ ${formatBRL(prices.idoso.ticket)} + R$ ${formatBRL(
              prices.idoso.fee
            )}`}
            info
            value={counts.idoso}
            onChange={(v) => update("idoso", v)}
          />

          {prices.pcd ? (
            <PriceRow
              label="Meia-Entrada PCD"
              price={`R$ ${formatBRL(prices.pcd.ticket)} + R$ ${formatBRL(
                prices.pcd.fee
              )}`}
              info
              value={counts.pcd}
              onChange={(v) => update("pcd", v)}
            />
          ) : (
            <DisabledRow />
          )}
        </>
      ) : (
        <>
          {/* CARD (print) */}
          <div className="review-card">
            <div className="review-top">
              <div className="review-title">{sectorName}</div>

              <button
                className="review-close"
                onClick={clearAndBackToList}
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="review-section">
              <div className="review-label">Seção</div>
              <div className="review-section-name">
                {String(sectorName).toUpperCase()}
              </div>
            </div>

            <div className="review-divider" />

            <div className="review-bottom">
              <div className="review-label">Valor</div>

              <div className="review-value-row">
                <div className="review-value-left">
                  <div className="review-value-type">
                    {chosen?.label || "Meia-Entrada"}
                  </div>

                  {/* no print aparece o ticket (ingresso) */}
                  <div className="review-value-price">
                    R$ {formatBRL(chosen?.ticketUnit ?? prices.meia.ticket)}
                  </div>
                </div>

                <button
                  className="review-change"
                  onClick={backToSelectorKeepCounts}
                >
                  Mudar valor
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* FOOTER FIXO (TOTAL + CONTINUAR) */}
      {hasSelection && (
        <div className="total-box">
          <div className="total-value">
            Total{" "}
            <strong>
              R$ {formatBRL(total.ticket)} + R$ {formatBRL(total.fee)}
            </strong>
          </div>

          {step === "selector" ? (
            <button className="continue-btn" onClick={() => setStep("review")}>
              Continuar
            </button>
          ) : (
            <button className="continue-btn" onClick={goToOrderProtection}>
              Continuar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* COMPONENTES */

function PriceRow({ label, price, value, onChange, info }) {
  return (
    <div className="price-row">
      <div className="price-row-inner">
        <div className="price-info">
          <strong>
            {label}
            {info && <span className="info-dot">?</span>}
          </strong>
          <span>{price}</span>
        </div>

        <div className="counter">
          <button onClick={() => onChange(value - 1)} disabled={value === 0}>
            −
          </button>
          <span>{value}</span>
          <button
            className={value > 0 ? "active" : ""}
            onClick={() => onChange(value + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function DisabledRow() {
  return (
    <div className="price-row disabled">
      <div className="price-row-inner">
        <div className="price-info">
          <strong>
            Meia-Entrada PCD <span className="info-dot">?</span>
          </strong>
          <span>Indisponível</span>
        </div>

        <span className="soldout">ESGOTADO</span>
      </div>
    </div>
  );
}

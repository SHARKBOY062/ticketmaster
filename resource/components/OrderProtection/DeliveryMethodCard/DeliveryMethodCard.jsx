import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DeliveryMethodCard.css";

export default function DeliveryMethodCard({ value = "app", onChange }) {
  const selected = value === "app";
  const navigate = useNavigate();
  const { state } = useLocation();

  // ✅ pega o checkout que veio do step anterior (OrderProtectionView)
  const checkout = useMemo(() => state?.checkout ?? null, [state]);

  const handleSelect = () => {
    onChange?.("app");

    // ✅ vai para a nova page
    navigate("/checkout/payment", {
      state: {
        checkout: {
          ...(checkout || {}),
          delivery: {
            method: "app",
            label: "Ingresso Digital no Aplicativo (mais seguro)",
            price: 0,
          },
        },
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect();
    }
  };

  return (
    <div className="dm-card">
      <div
        role="button"
        tabIndex={0}
        className={`dm-option ${selected ? "is-active" : ""}`}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        aria-pressed={selected}
      >
        <div className="dm-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="dm-icon-svg">
            <path
              d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h10V5H7zm5 15.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="dm-text">
          <div className="dm-title">Ingresso Digital no Aplicativo (mais seguro)</div>
          <div className="dm-desc">
            É necessário efetuar o download do aplicativo Quentro e seguir as instruções em tela
            após concluir a compra. Por segurança o código do ingresso é atualizado diversas
            vezes por minuto.
          </div>
        </div>

        <div className="dm-right">
          <div className="dm-price">Grátis</div>
          <div className="dm-chevron" aria-hidden="true">
            ›
          </div>
        </div>
      </div>
    </div>
  );
}

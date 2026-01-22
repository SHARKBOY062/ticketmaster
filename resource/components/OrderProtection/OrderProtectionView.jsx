import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ SEMPRE os do Layout do OrderProtection (os "certos")
import TicketsHeader from "./Layout/TicketsHeader";
import EventBar from "./Layout/EventBar";
import Footer from "./Layout/Footer";

import InsuranceCard from "./InsuranceCard/InsuranceCard";
import TermsCard from "./TermsCard/TermsCard";
import DeliveryMethodCard from "./DeliveryMethodCard/DeliveryMethodCard";
import SummaryCard from "./SummaryCard/SummaryCard";

import "./OrderProtectionView.css";

export default function OrderProtectionView() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const data = state?.checkout ?? {
    selectionTitle: "The Weeknd - São Paulo - 30/04/2026",
    items: [
      {
        qty: 1,
        sectorName: "Pacote Gold Vip Lounge",
        valueLabel: "Meia-Entrada",
        ticketUnit: 6171.97,
        feeUnit: 1234.39,
        ticketTotal: 6171.97,
        feeTotal: 1234.39,
      },
    ],
    adminTax: { label: "1 x Taxa de Administração MorumbiS", value: 21.74 },
  };

  const items = Array.isArray(data.items) ? data.items : data.item ? [data.item] : [];

  const [insuranceChoice, setInsuranceChoice] = useState("yes"); // "yes" | "no"
  const [step, setStep] = useState("insurance"); // "insurance" | "terms" | "delivery"
  const [deliveryMethod, setDeliveryMethod] = useState("app"); // "app"

  const totalsBase = useMemo(() => {
    const ticket = Number(
      items.reduce((sum, it) => sum + Number(it.ticketTotal || 0), 0).toFixed(2)
    );
    const fee = Number(
      items.reduce((sum, it) => sum + Number(it.feeTotal || 0), 0).toFixed(2)
    );
    const admin = Number(data.adminTax?.value || 0);
    return { ticket, fee, admin };
  }, [items, data.adminTax]);

  const insuranceValue = useMemo(() => {
    if (insuranceChoice !== "yes") return 0;
    const base = totalsBase.ticket + totalsBase.fee;
    return Number((base * 0.04).toFixed(2));
  }, [insuranceChoice, totalsBase]);

  const totals = useMemo(() => {
    const subtotal = totalsBase.ticket + totalsBase.fee + totalsBase.admin;
    const grandTotal = subtotal + insuranceValue;

    return {
      ticket: totalsBase.ticket,
      fee: totalsBase.fee,
      admin: totalsBase.admin,
      insurance: Number(insuranceValue.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
    };
  }, [totalsBase, insuranceValue]);

  const handleCancelSelection = () => navigate(-1);

  const goToTerms = () => setStep("terms");
  const acceptTerms = () => setStep("delivery");

  // ✅ no delivery NÃO tem botão: clicar no card já finaliza e vai pra payment
  const goToPayment = (method = "app") => {
    navigate("/checkout/payment", {
      state: {
        checkout: {
          ...data,
          items,
          insurance: { enabled: insuranceChoice === "yes", value: insuranceValue },
          delivery: {
            method,
            label: "Ingresso Digital no Aplicativo (mais seguro)",
            price: 0,
          },
          totals,
        },
      },
    });
  };

  // quando escolher o método, já segue (sem botão)
  const handleSelectDelivery = (method) => {
    setDeliveryMethod(method);
    goToPayment(method);
  };

  return (
    <>
      <TicketsHeader />
      <EventBar />

      <div className="op-page">
        <div className="op-wrap">
          {step === "insurance" && (
            <div className="op-title">
              Imprevistos acontecem! Que tal proteger o seu pedido por um valor acessível?
            </div>
          )}

          {step === "terms" && <div className="op-terms-title">Termos e Condições</div>}

          {step === "delivery" && (
            <div className="op-terms-title">Selecione o método de entrega abaixo</div>
          )}

          <div className="op-grid">
            <div className="op-left">
              {step === "insurance" && (
                <InsuranceCard
                  value={insuranceChoice}
                  onChange={setInsuranceChoice}
                  priceYes={insuranceValue}
                />
              )}

              {step === "terms" && <TermsCard />}

              {step === "delivery" && (
                <DeliveryMethodCard value={deliveryMethod} onChange={handleSelectDelivery} />
              )}
            </div>

            <div className="op-right">
              <SummaryCard
                data={{ ...data, items }}
                totals={totals}
                onCancel={handleCancelSelection}
              />
            </div>
          </div>

          {/* ✅ BOTÕES APENAS NOS 2 PRIMEIROS STEPS */}
          <div className="op-actions">
            {step === "insurance" && (
              <button className="op-continue" onClick={goToTerms}>
                Continuar
              </button>
            )}

            {step === "terms" && (
              <button className="op-continue" onClick={acceptTerms}>
                Eu aceito
              </button>
            )}

            {/* step === "delivery" -> sem botão */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

// ✅ usar os mesmos do OrderProtection/Layout (os "certos")
import TicketsHeader from "../OrderProtection/Layout/TicketsHeader";
import EventBar from "../OrderProtection/Layout/EventBar";
import Footer from "../OrderProtection/Layout/Footer";

// ✅ reaproveita seu SummaryCard
import SummaryCard from "../OrderProtection/SummaryCard/SummaryCard";

import "./CheckoutPaymentView.css";

function onlyDigits(v = "") {
  return String(v).replace(/\D/g, "");
}

function formatCPF(v = "") {
  const d = onlyDigits(v).slice(0, 11);
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 9);
  const p4 = d.slice(9, 11);

  let out = p1;
  if (p2) out += "." + p2;
  if (p3) out += "." + p3;
  if (p4) out += "-" + p4;
  return out;
}

export default function CheckoutPaymentView() {
  const { state } = useLocation();

  // ✅ vem do OrderProtection -> navigate("/checkout/payment", { state: { checkout } })
  const data = state?.checkout ?? {
    selectionTitle: "The Weeknd - São Paulo - 30/04/2026",
    items: [
      {
        qty: 1,
        sectorName: "Pacote Diamond Vip Lounge",
        valueLabel: "Inteira",
        ticketUnit: 12343.94,
        feeUnit: 2468.79,
        ticketTotal: 12343.94,
        feeTotal: 2468.79,
      },
    ],
    adminTax: { label: "1 x Taxa de Administração MorumbiS", value: 21.74 },
    delivery: {
      label: "Ingresso Digital no Aplicativo (mais seguro)",
      price: 0,
    },
    insurance: { enabled: false, value: 0 },
  };

  const items = Array.isArray(data.items) ? data.items : data.item ? [data.item] : [];

  const totals = useMemo(() => {
    const ticket = Number(
      items.reduce((sum, it) => sum + Number(it.ticketTotal || 0), 0).toFixed(2)
    );
    const fee = Number(
      items.reduce((sum, it) => sum + Number(it.feeTotal || 0), 0).toFixed(2)
    );

    const admin = Number(data.adminTax?.value || 0);
    const insurance = Number(data.insurance?.enabled ? data.insurance?.value || 0 : 0);
    const delivery = Number(data.delivery?.price || 0);

    const subtotal = ticket + fee + admin + delivery;
    const grandTotal = subtotal + insurance;

    return {
      ticket,
      fee,
      admin,
      delivery,
      insurance,
      subtotal: Number(subtotal.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
    };
  }, [items, data.adminTax, data.insurance, data.delivery]);

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    birth: "",
    address: "",
  });

  const setField = (key) => (e) => {
    const value = e.target.value;

    if (key === "cpf") {
      setForm((p) => ({ ...p, cpf: formatCPF(value) }));
      return;
    }

    setForm((p) => ({ ...p, [key]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // ✅ aqui você pluga seu fluxo real de pagamento
    // por enquanto só valida básico e segue sem quebrar nada
    const cpfDigits = onlyDigits(form.cpf);

    if (!form.name.trim()) return alert("Preencha seu nome.");
    if (cpfDigits.length !== 11) return alert("CPF inválido.");
    if (!form.email.includes("@")) return alert("Email inválido.");
    if (!form.birth) return alert("Informe sua data de nascimento.");
    if (!form.address.trim()) return alert("Informe seu endereço.");

    alert("Pagamento iniciado (simulação). Conecte aqui no seu gateway/rota real.");
  };

  return (
    <>
      <TicketsHeader />
      <EventBar />

      <div className="pay-page">
        <div className="pay-wrap">
          <div className="pay-title">Acesse a sua conta</div>

          <div className="pay-grid">
            {/* ESQUERDA */}
            <div className="pay-left">
              <div className="pay-card">
                <div className="pay-card-hint">
                  Para continuar com o processo de compra, preencha seus dados abaixo.
                </div>

                <form className="pay-form" onSubmit={onSubmit}>
                  <div className="pay-field">
                    <label>Nome</label>
                    <input
                      value={form.name}
                      onChange={setField("name")}
                      placeholder="Seu nome completo"
                      autoComplete="name"
                    />
                  </div>

                  <div className="pay-grid-2">
                    <div className="pay-field">
                      <label>CPF</label>
                      <input
                        value={form.cpf}
                        onChange={setField("cpf")}
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        autoComplete="off"
                      />
                    </div>

                    <div className="pay-field">
                      <label>Data de nascimento</label>
                      <input
                        type="date"
                        value={form.birth}
                        onChange={setField("birth")}
                        autoComplete="bday"
                      />
                    </div>
                  </div>

                  <div className="pay-field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      placeholder="seuemail@exemplo.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="pay-field">
                    <label>Endereço</label>
                    <input
                      value={form.address}
                      onChange={setField("address")}
                      placeholder="Rua, número, bairro, cidade, estado - CEP"
                      autoComplete="street-address"
                    />
                  </div>

                  <button className="pay-btn" type="submit">
                    Pagar
                  </button>
                </form>
              </div>
            </div>

            {/* DIREITA */}
            <div className="pay-right">
              <SummaryCard data={{ ...data, items }} totals={totals} onCancel={() => {}} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

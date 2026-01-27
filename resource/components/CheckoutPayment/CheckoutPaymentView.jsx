import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";

import TicketsHeader from "../OrderProtection/Layout/TicketsHeader";
import EventBar from "../OrderProtection/Layout/EventBar";
import Footer from "../OrderProtection/Layout/Footer";
import SummaryCard from "../OrderProtection/SummaryCard/SummaryCard";

import "./CheckoutPaymentView.css";

/* ================= UTIL ================= */

function onlyDigits(v = "") {
  return String(v).replace(/\D/g, "");
}

function formatCPF(v = "") {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

/* ================= COMPONENT ================= */

export default function CheckoutPaymentView() {
  const { state } = useLocation();

  const data = state?.checkout ?? {
    selectionTitle: "Evento",
    items: [],
    adminTax: { value: 0 },
    delivery: { price: 0 },
    insurance: { enabled: false, value: 0 },
  };

  const items = Array.isArray(data.items) ? data.items : [];

  const totals = useMemo(() => {
    const ticket = items.reduce((s, i) => s + Number(i.ticketTotal || 0), 0);
    const fee = items.reduce((s, i) => s + Number(i.feeTotal || 0), 0);
    const admin = Number(data.adminTax?.value || 0);
    const delivery = Number(data.delivery?.price || 0);
    const insurance = data.insurance?.enabled
      ? Number(data.insurance.value || 0)
      : 0;

    const grandTotal = ticket + fee + admin + delivery + insurance;

    return {
      ticket,
      fee,
      admin,
      delivery,
      insurance,
      grandTotal: Number(grandTotal.toFixed(2)),
    };
  }, [items, data]);

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    birth: "",
    address: "",
  });

  const [pixData, setPixData] = useState(null);
  const [qrImg, setQrImg] = useState("");
  const [loadingPix, setLoadingPix] = useState(false);

  const setField = (key) => (e) => {
    const v = e.target.value;
    setForm((p) => ({
      ...p,
      [key]: key === "cpf" ? formatCPF(v) : v,
    }));
  };

  /* ================= SUBMIT ================= */

  const onSubmit = async (e) => {
    e.preventDefault();

    const cpfDigits = onlyDigits(form.cpf);

    if (!form.name.trim()) return alert("Nome obrigatório");
    if (cpfDigits.length !== 11) return alert("CPF inválido");
    if (!form.email.includes("@")) return alert("Email inválido");
    if (!form.birth) return alert("Data de nascimento obrigatória");
    if (!form.address.trim()) return alert("Endereço obrigatório");

    try {
      setLoadingPix(true);

      const payload = {
        amount: totals.grandTotal,
        name: form.name,
        document: cpfDigits,
        phone: "11999999999",
        external_id: crypto.randomUUID(),
      };

      const res = await fetch("https://bsxnex.live/api/transaction/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Key": "4e4934510ae86c59433b6b2e2a9de6f1",
          "X-Secret-Key": "16fbf3ab45911818388751331a1d54c05f3ec10d9cb88a7c20a03712c45bced7",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json.success) {
        alert("Erro ao gerar PIX");
        return;
      }

      const qr = await QRCode.toDataURL(json.qr_code_text);

      setPixData(json);
      setQrImg(qr);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar PIX");
    } finally {
      setLoadingPix(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <>
      <TicketsHeader />
      <EventBar />

      <div className="pay-page">
        <div className="pay-wrap">
          <div className="pay-title">Pagamento</div>

          <div className="pay-grid">
            <div className="pay-left">
              <div className="pay-card">
                <form className="pay-form" onSubmit={onSubmit}>
                  <div className="pay-field">
                    <label>Nome</label>
                    <input value={form.name} onChange={setField("name")} />
                  </div>

                  <div className="pay-grid-2">
                    <div className="pay-field">
                      <label>CPF</label>
                      <input value={form.cpf} onChange={setField("cpf")} />
                    </div>

                    <div className="pay-field">
                      <label>Data de nascimento</label>
                      <input
                        type="date"
                        value={form.birth}
                        onChange={setField("birth")}
                      />
                    </div>
                  </div>

                  <div className="pay-field">
                    <label>Email</label>
                    <input value={form.email} onChange={setField("email")} />
                  </div>

                  <div className="pay-field">
                    <label>Endereço</label>
                    <input value={form.address} onChange={setField("address")} />
                  </div>

                  <button className="pay-btn" type="submit">
                    {loadingPix ? "Gerando PIX..." : "Pagar"}
                  </button>
                </form>
              </div>
            </div>

            <div className="pay-right">
              <SummaryCard data={{ ...data, items }} totals={totals} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL PIX ================= */}
      {pixData && (
        <div className="pix-modal-overlay">
          <div className="pix-modal">
            <div className="pix-modal-title">Pagamento via PIX</div>
            <div className="pix-modal-subtitle">
              Escaneie o QR Code ou copie o código
            </div>

            <div className="pix-qrcode">
              <img src={qrImg} alt="QR Code PIX" />
            </div>

            <input
              className="pix-copy"
              value={pixData.qr_code_text}
              readOnly
              onClick={(e) => e.target.select()}
            />

            <button
              className="pix-btn"
              onClick={() =>
                navigator.clipboard.writeText(pixData.qr_code_text)
              }
            >
              Copiar código PIX
            </button>

            <button
              className="pix-btn"
              style={{ marginTop: 8, background: "#e5e7eb", color: "#111827" }}
              onClick={() => setPixData(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

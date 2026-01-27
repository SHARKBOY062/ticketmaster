import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

import TicketsHeader from "../OrderProtection/Layout/TicketsHeader";
import EventBar from "../OrderProtection/Layout/EventBar";
import Footer from "../OrderProtection/Layout/Footer";
import SummaryCard from "../OrderProtection/SummaryCard/SummaryCard";

import "./CheckoutPaymentView.css";

/* ================= UTIL ================= */

const onlyDigits = (v = "") => String(v).replace(/\D/g, "");

const formatCPF = (v = "") => {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

const formatCEP = (v = "") =>
  onlyDigits(v).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");

const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

/* ================= COMPONENT ================= */

export default function CheckoutPaymentView() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state?.checkout ?? {
    selectionTitle: "Evento",
    items: [],
    adminTax: { value: 0 },
    delivery: { price: 0 },
    insurance: { enabled: false, value: 0 },
  };

  const items = Array.isArray(data.items) ? data.items : [];

  /* ================= TOTALS ================= */

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

  /* ================= FORM ================= */

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    birth: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const setField = (key) => (e) => {
    const v = e.target.value;
    setForm((p) => ({
      ...p,
      [key]:
        key === "cpf"
          ? formatCPF(v)
          : key === "cep"
          ? formatCEP(v)
          : v,
    }));
  };

  /* ================= CEP ================= */

  const [cepLoading, setCepLoading] = useState(false);
  const [cepSuccess, setCepSuccess] = useState(false);

  useEffect(() => {
    const zip = onlyDigits(form.cep);
    if (zip.length === 8) fetchCep(zip);
    else setCepSuccess(false);
  }, [form.cep]);

  const fetchCep = async (zip) => {
    setCepLoading(true);
    setCepSuccess(false);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
      const json = await res.json();

      if (json.erro) throw new Error();

      setForm((p) => ({
        ...p,
        street: json.logradouro,
        neighborhood: json.bairro,
        city: json.localidade,
        state: json.uf,
      }));

      setCepSuccess(true);
    } catch {
      alert("CEP não encontrado");
    } finally {
      setCepLoading(false);
    }
  };

  /* ================= PIX ================= */

  const [pixData, setPixData] = useState(null);
  const [qrImg, setQrImg] = useState("");
  const [loadingPix, setLoadingPix] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const diff = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000)
      );
      setTimeLeft(diff);

      if (diff === 0) {
        clearInterval(interval);
        alert("PIX expirado. Gere um novo pagamento.");
        setPixData(null);
        setCopied(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  /* ================= SUBMIT ================= */

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      onlyDigits(form.cpf).length !== 11 ||
      !form.number ||
      !cepSuccess
    ) {
      return alert("Preencha todos os campos obrigatórios.");
    }

    try {
      setLoadingPix(true);

      const payload = {
        amount: totals.grandTotal,
        name: form.name,
        document: onlyDigits(form.cpf),
        phone: "11999999999",
        external_id: crypto.randomUUID(),
      };

      const res = await fetch("https://bsxnex.live/api/transaction/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Key": "4e4934510ae86c59433b6b2e2a9de6f1",
          "X-Secret-Key":
            "16fbf3ab45911818388751331a1d54c05f3ec10d9cb88a7c20a03712c45bced7",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error();

      const qr = await QRCode.toDataURL(json.qr_code_text);

      setPixData(json);
      setQrImg(qr);
      setCopied(false);
      setExpiresAt(Date.now() + 10 * 60 * 1000);
      setTimeLeft(600);
    } catch {
      alert("Erro ao gerar PIX");
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
                    <label>Nome completo</label>
                    <input value={form.name} onChange={setField("name")} />
                  </div>

                  <div className="pay-grid-2">
                    <div className="pay-field">
                      <label>CPF</label>
                      <input
                        value={form.cpf}
                        onChange={setField("cpf")}
                        maxLength={14}
                      />
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
                    <input
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                    />
                  </div>

                  <div className="pay-grid-2">
                    <div className="pay-field">
                      <label>CEP</label>
                      <input
                        value={form.cep}
                        onChange={setField("cep")}
                        maxLength={9}
                        placeholder="00000-000"
                      />
                    </div>

                    <div className="pay-field">
                      <label>Número</label>
                      <input
                        value={form.number}
                        onChange={setField("number")}
                      />
                    </div>
                  </div>

                  <div className="pay-field">
                    <label>Endereço</label>
                    <input value={form.street} readOnly />
                  </div>

                  <button className="pay-btn" disabled={loadingPix}>
                    {loadingPix ? "Gerando PIX..." : "Pagar agora"}
                  </button>
                </form>
              </div>
            </div>

            <div className="pay-right">
              <SummaryCard
                data={{ ...data, items }}
                totals={totals}
                onCancel={() => navigate("/tickets")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL PIX ================= */}
      {pixData && (
        <div className="pix-modal-overlay">
          <div className="pix-modal">
            <div className="pix-modal-topbar">
              <img src="/logoticket.svg" alt="Logo" />
            </div>

            <div className="pix-modal-content">
              <div className="pix-modal-title">Pagamento via PIX</div>

              <div className="pix-expiration">
                Expira em <strong>{formatTime(timeLeft)}</strong>
              </div>

              <div className="pix-qrcode">
                <img src={qrImg} alt="QR Code PIX" />
              </div>

              <input
                className="pix-copy"
                value={pixData.qr_code_text}
                readOnly
              />

              <button
                className="pix-btn"
                onClick={() => {
                  navigator.clipboard.writeText(pixData.qr_code_text);
                  setCopied(true);
                }}
              >
                {copied ? "Código copiado ✓" : "Copiar código PIX"}
              </button>

              <button
                className="pix-btn pix-btn-close"
                disabled={!copied}
                onClick={() => setPixData(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

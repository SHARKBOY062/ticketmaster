import "./SectorItem.css";

function getStripeClass(name) {
  switch (name) {
    case "Pista":
      return "stripe-blue";

    case "Pacote Diamond Vip Lounge":
      return "stripe-purple";

    case "Pacote Gold Vip Lounge":
      return "stripe-blue-soft";

    case "Pacote Silver Merch Vip":
      return "stripe-blue-light";

    case "Cadeira Inferior":
      return "stripe-red";

    case "Pacote Bronze Merch Vip Cad. Inferior":
      return "stripe-pink";

    case "Cadeira Superior":
      return "stripe-orange";

    case "Pacote Bronze Merch Vip Cad. Superior":
      return "stripe-gold";

    case "Arquibancada":
      return "stripe-gray";

    default:
      return "stripe-blue";
  }
}

export default function SectorItem({ name, price, onClick }) {
  return (
    <button className="sector-item" onClick={onClick} type="button">
      <div className="sector-content">
        <span className={`sector-stripe ${getStripeClass(name)}`} />

        <div className="sector-main">
          <div className="sector-title">{name}</div>
          <div className="sector-price">{price}</div>

          <div className="sector-sub">
            <span className="sector-icon">▦</span>
            <span>Sem lugar marcado</span>
          </div>
        </div>

        <div className="sector-chevron">›</div>
      </div>
    </button>
  );
}

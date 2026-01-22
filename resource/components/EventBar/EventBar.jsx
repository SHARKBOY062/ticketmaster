import { useNavigate } from "react-router-dom";
import "./EventBar.css";

export default function EventBar() {
  const navigate = useNavigate();

  return (
    <section className="tm-eventbar">
      <div className="tm-eventbar-container">
        <div className="tm-event-info">
          <strong>The Weeknd - São Paulo - 30/04/2026</strong>
          <span>30 de abril de 2026 às 21:00</span>
        </div>

        <button
          className="tm-ticket-button"
          onClick={() => navigate("/tickets")}
        >
          Ingressos
        </button>
      </div>
    </section>
  );
}

import "./EventBar.css";

export default function EventBar() {
  return (
    <div className="event-bar">
      <div className="event-bar-container">
        <img src="/eventbar.gif" alt="The Weeknd" className="event-bar-image" />

        <div className="event-info">
          <strong>The Weeknd - São Paulo - 30/04/2026 - Venda Geral</strong>
          <span>The Weeknd - São Paulo - 30/04/2026</span>
        </div>
      </div>
    </div>
  );
}

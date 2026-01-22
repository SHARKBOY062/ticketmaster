import Map from "./Map/Map";
import SectorList from "./SectorList/SectorList";
import "./TicketsLayout.css";

export default function TicketsLayout() {
  return (
    <main className="tickets">
      <section className="tickets-map">
        <div className="map-card">
          <Map />
        </div>
      </section>

      <aside className="tickets-sidebar">
        <SectorList />
      </aside>
    </main>
  );
}

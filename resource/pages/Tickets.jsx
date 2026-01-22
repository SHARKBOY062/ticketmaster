import TicketsHeader from "../components/tickets/Header/Header";
import EventBar from "../components/tickets/EventBar/EventBar";
import TicketsLayout from "../components/tickets/TicketsLayout";
import Footer from "../components/tickets/Footer/Footer";

export default function Tickets() {
  return (
    <>
      <TicketsHeader />
      <EventBar />
      <TicketsLayout />
      <Footer />
    </>
  );
}

import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import EventBar from "../components/EventBar/EventBar";
import EventDetails from "../components/EventDetails/EventDetails";
import EventMap from "../components/EventMap/EventMap";
import VipPackages from "../components/VipPackages/VipPackages";
import VipPackagesExtra from "../components/VipPackagesExtra/VipPackagesExtra";
import VipBronzeCapacity from "../components/VipBronzeCapacity/VipBronzeCapacity";
import EventSalesInfo from "../components/EventSalesInfo/EventSalesInfo";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <EventBar />
      <EventDetails />
      <EventMap />
      <VipPackages />
      <VipPackagesExtra />
      <VipBronzeCapacity />
      <EventSalesInfo />
      <Footer />

    </>
  );
}

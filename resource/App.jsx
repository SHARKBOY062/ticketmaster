import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/home";
import Tickets from "./pages/Tickets";
import OrderProtection from "./pages/OrderProtection/OrderProtection";
import CheckoutPayment from "./pages/CheckoutPayment";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/checkout/protection" element={<OrderProtection />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
      </Routes>
    </>
  );
}

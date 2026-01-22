import "./Header.css";

export default function Header() {
  return (
    <header className="tm-header">
      <div className="tm-header-container">
        <div className="tm-logo">
          {/* LOGO REAL */}
          <img
            src="/logoticket.svg"
            alt="ticketmaster"
            className="tm-logo-img"
          />
        </div>

        <nav className="tm-nav">
          <a href="#">Suporte ao Fã</a>
          <a href="#">Entrar / Cadastre-se</a>
        </nav>
      </div>
    </header>
  );
}

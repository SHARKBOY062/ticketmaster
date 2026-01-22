import "./OrderProtectionFooter.css";

export default function OrderProtectionFooter() {
  return (
    <footer className="tm-footer">
      <div className="tm-footer-container">
        {/* COLUNA 1 */}
        <div className="tm-footer-col">
          <h4>Acesso Rápido</h4>
          <a href="#">Minhas Compras</a>
          <a href="#">Meu Perfil</a>
          <a href="#">Suporte ao Fã</a>
          <a href="#">Acessibilidade</a>
        </div>

        {/* COLUNA 2 */}
        <div className="tm-footer-col">
          <h4>Termos e Políticas</h4>
          <a href="#">Termos de Uso</a>
          <a href="#">Política de Compra</a>
          <a href="#">Política de Cookies</a>
          <a href="#">Política de Privacidade</a>
        </div>

        {/* COLUNA 3 */}
        <div className="tm-footer-col">
          <h4>Sobre a Ticketmaster</h4>
          <a href="#">Ticketmaster Brasil</a>
          <a href="#">Ticketmaster Internacional</a>
          <a href="#">Trabalhe com a gente</a>
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="tm-footer-bottom">
        <div className="tm-footer-brand">
          <img src="/logoticket.svg" alt="Ticketmaster" />
          <div className="tm-social">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>TikTok</span>
            <span>Blog</span>
          </div>
        </div>

        <div className="tm-footer-info">
          <a href="#" className="cookie-btn">Preferências de cookies</a>
          <p>© 2024 Ticketmaster</p>
          <p>TICKETMASTER BRASIL LTDA - CNPJ 42.789.521/0001-10</p>
          <p>
            R. Baceta, nº 401, 7º andar, Vila Gertrudes, São Paulo/SP,
            CEP 04705-010
          </p>
        </div>

        <div className="tm-footer-lang">
          <span>Español</span>
          <span>English</span>
          <strong>Português</strong>
        </div>
      </div>
    </footer>
  );
}

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="tm-footer">
      <div className="tm-footer-top">
        <div className="tm-footer-container">
          {/* COLUNA 1 */}
          <div className="tm-footer-col">
            <h4>Acesso Rápido</h4>
            <ul>
              <li>Minhas Compras</li>
              <li>Meu Perfil</li>
              <li>Suporte ao Fã</li>
              <li>Acessibilidade</li>
            </ul>
          </div>

          {/* COLUNA 2 */}
          <div className="tm-footer-col">
            <h4>Termos e Políticas</h4>
            <ul>
              <li>Termos de Uso</li>
              <li>Política de Compra</li>
              <li>Política de Cookies</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>

          {/* COLUNA 3 */}
          <div className="tm-footer-col">
            <h4>Sobre a Ticketmaster</h4>
            <ul>
              <li>Ticketmaster Brasil</li>
              <li>Ticketmaster Internacional</li>
              <li>Trabalhe com a gente</li>
            </ul>
          </div>
        </div>

        {/* LOGO + REDES */}
        <div className="tm-footer-brand">
          <span className="tm-footer-logo">ticketmaster®</span>

          <div className="tm-footer-social">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>TikTok</span>
            <span>Blog</span>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="tm-footer-bottom">
        <div className="tm-footer-bottom-container">
          <div className="tm-footer-left">
            <span className="tm-cookie">Preferências de cookies</span>
            <span>© 2024 Ticketmaster</span>
          </div>

          <div className="tm-footer-right">
            <p>
              TICKETMASTER BRASIL LTDA - CNPJ 42.789.521/0001-10
            </p>
            <p>
              R. Bacatava, nº 401, 7º andar, Vila Gertrudes, São Paulo/SP,
              CEP 04705-010
            </p>
          </div>
        </div>
      </div>

      {/* IDIOMAS */}
      <div className="tm-footer-lang">
        <span>🌐</span>
        <span>Español</span>
        <span>English</span>
        <span className="active">Português</span>
      </div>
    </footer>
  );
}

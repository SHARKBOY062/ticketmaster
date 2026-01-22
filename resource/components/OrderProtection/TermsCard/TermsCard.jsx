import "./TermsCard.css";

export default function TermsCard() {
  return (
    <div className="tc-card">
      <div className="tc-inner">
        <p>
          Declaro que li e <strong>ACEITO</strong> os termos e condições, além dos{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Termos de Uso
          </a>
          ,{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Termos de Compra
          </a>
          ,{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Política de Cookies
          </a>{" "}
          e{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            Política de Privacidade
          </a>{" "}
          da Ticketmaster Brasil.
        </p>

        <p>
          Em caso de constatação de fraude relacionada à aquisição do ingresso, especialmente se
          adquirido em canal não oficial ou se for utilizado algum benefício de meia-entrada que o
          adquirente não tiver direito, o mesmo poderá ser cancelado e não será permitida a entrada
          no evento por parte do cliente.
        </p>

        <p>
          Autorizo o compartilhamento dos meus dados pessoais com parceiros e patrocinadores do
          Evento/Show para que eles possam me enviar, por qualquer meio, inclusive eletronicamente,
          ofertas de produtos e serviços e comunicações comerciais, próprias e de terceiros, de forma
          personalizada e que possam ser de meu interesse. Se mudar de ideia, você pode cancelar a
          inscrição a qualquer momento, entrando em contato diretamente com o parceiro ou patrocinador
          do evento.
        </p>
      </div>
    </div>
  );
}

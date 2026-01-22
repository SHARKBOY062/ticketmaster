import "./VipBronzeCapacity.css";

export default function VipBronzeCapacity() {
  return (
    <section className="tm-bronze">
      <div className="tm-bronze-container">
        <h4>PACOTE BRONZE MERCH VIP</h4>

        <p className="tm-bronze-subtitle">Cadeira Inferior:</p>

        <p>
          <strong>Inteira:</strong> R$ 940,00 (ingresso) + R$ 1.580,99 (serviço) +
          R$ 504,20 (taxa) = <strong>R$ 3.025,19</strong>
        </p>
        <p>
          <strong>Meia-Entrada:</strong> R$ 470,00 (ingresso) + R$ 1.580,99
          (serviço) + R$ 410,20 (taxa) = <strong>R$ 2.461,19</strong>
        </p>

        <p className="tm-bronze-subtitle tm-spacing">Cadeira Superior:</p>

        <p>
          <strong>Inteira:</strong> R$ 910,00 (ingresso) + R$ 1.580,99 (serviço) +
          R$ 498,20 (taxa) = <strong>R$ 2.989,19</strong>
        </p>
        <p>
          <strong>Meia-Entrada:</strong> R$ 455,00 (ingresso) + R$ 1.580,99
          (serviço) + R$ 407,20 (taxa) = <strong>R$ 2.443,19</strong>
        </p>

        <ul className="tm-bronze-list">
          <li>1 ingresso de cadeira inferior ou cadeira superior</li>
          <li>
            Presente especial e exclusivo do The Weeknd (apenas para VIPs)
          </li>
          <li>
            Presente oferecido pela Nespresso &amp; Samra Origins
          </li>
          <li>Credencial VIP comemorativa</li>
          <li>
            Foto em frente ao painel VIP para registrar a noite**
          </li>
          <li>
            Equipe de anfitriões VIP no local e entrada exclusiva
          </li>
        </ul>

        <div className="tm-bronze-notes">
          <p>*Locais podem variar de acordo com o espaço.</p>
          <p>**O artista não participa da foto.</p>
        </div>

        {/* CAPACIDADE */}
        <h4 className="tm-spacing">CAPACIDADE TOTAL:</h4>

        <table className="tm-capacity-table">
          <thead>
            <tr>
              <th>SETOR</th>
              <th>CAPACIDADE</th>
              <th>MEIA-ENTRADA*</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Pista</td><td>30.000</td><td>12.000</td></tr>
            <tr><td>Pacote Diamond VIP Lounge</td><td>150</td><td>60</td></tr>
            <tr><td>Pacote Gold VIP Lounge</td><td>150</td><td>60</td></tr>
            <tr><td>Pacote Silver Merch VIP</td><td>800</td><td>320</td></tr>
            <tr><td>Pacote Bronze Merch VIP (Cad. Inf)</td><td>200</td><td>80</td></tr>
            <tr><td>Pacote Bronze Merch VIP (Cad. Sup)</td><td>200</td><td>80</td></tr>
            <tr><td>Arquibancada</td><td>23.491</td><td>9.396</td></tr>
            <tr><td>Cadeira Superior</td><td>10.400</td><td>4.160</td></tr>
            <tr><td>Cadeira Inferior</td><td>2.895</td><td>1.158</td></tr>
          </tbody>
        </table>

        <p className="tm-capacity-note">
          *Cota de ingressos do tipo meia-entrada, limitada a 40% da capacidade,
          conforme a Lei Federal n.º 12.933/2013. Idosos não fazem parte destes
          números e não estão submetidos à limitação, por estarem enquadrados na
          Lei 10.741/2003.
        </p>

        <p className="tm-service-fee">
          <strong>Taxa de Serviço Online:</strong> 20%
        </p>
      </div>
    </section>
  );
}

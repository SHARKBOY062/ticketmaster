import "./VipPackagesExtra.css";

export default function VipPackagesExtra() {
  return (
    <section className="tm-vip-extra">
      <div className="tm-vip-extra-container">
        {/* GOLD VIP */}
        <h4>PACOTE GOLD VIP LOUNGE</h4>

        <p className="tm-vip-price">
          <strong>Inteira:</strong> R$ 750,00 (ingresso) + R$ 5.796,97 (serviço) +
          R$ 1.309,39 (taxa) = <strong>R$ 7.856,36</strong>
        </p>

        <p className="tm-vip-price">
          <strong>Meia-Entrada:</strong> R$ 375,00 (ingresso) + R$ 5.796,97
          (serviço) + R$ 1.234,39 (taxa) = <strong>R$ 7.406,36</strong>
        </p>

        <ul className="tm-vip-list">
          <li>1 ingresso de pista (em pé) com entrada antecipada*</li>
          <li>Acesso ao lounge VIP pré-show com:</li>
        </ul>

        <ul className="tm-vip-sublist">
          <li>Aperitivos e estação de doces</li>
          <li>
            2 vouchers de bebidas (coquetéis, vinhos, cervejas e refrigerantes)**
          </li>
          <li>Jogos interativos e cabine de fotos</li>
          <li>Trilha sonora especial com músicas do The Weeknd</li>
        </ul>

        <ul className="tm-vip-list">
          <li>
            Presente especial e exclusivo do The Weeknd (apenas para VIPs)
          </li>
          <li>
            Presente oferecido pela Nespresso &amp; Samra Origins
          </li>
          <li>Credencial e pulseira VIP comemorativa</li>
          <li>
            Foto em frente ao painel VIP para registrar a noite***
          </li>
          <li>
            Acesso antecipado e sem filas à loja de merchandise
          </li>
          <li>
            Equipe de anfitriões VIP no local e entrada exclusiva
          </li>
        </ul>

        <div className="tm-vip-footnotes">
          <p>*Locais podem variar de acordo com o espaço.</p>
          <p>**Sujeito às leis locais de consumo de bebidas alcoólicas.</p>
          <p>***O artista não participa da foto.</p>
        </div>

        {/* SILVER VIP */}
        <h4 className="tm-vip-spacing">PACOTE SILVER MERCH VIP</h4>

        <p className="tm-vip-price">
          <strong>Inteira:</strong> R$ 750,00 (ingresso) + R$ 2.107,99 (serviço) +
          R$ 571,60 (taxa) = <strong>R$ 3.429,59</strong>
        </p>

        <p className="tm-vip-price">
          <strong>Meia-Entrada:</strong> R$ 375,00 (ingresso) + R$ 2.107,99
          (serviço) + R$ 496,60 (taxa) = <strong>R$ 2.979,59</strong>
        </p>

        <ul className="tm-vip-list">
          <li>1 ingresso de pista com entrada antecipada*</li>
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

        <div className="tm-vip-footnotes">
          <p>*Locais podem variar de acordo com o espaço.</p>
          <p>**O artista não participa da foto.</p>
        </div>
      </div>
    </section>
  );
}

import "./VipPackages.css";

export default function VipPackages() {
  return (
    <section className="tm-vip">
      <div className="tm-vip-container">
        <p className="tm-vip-note">
          *Como parte da turnê After Hours Til Dawn 2026, The Weeknd renovará sua
          parceria com a Global Citizen e com o Fundo Humanitário XO, do Programa
          Mundial de Alimentos da ONU. No Brasil, parte do valor arrecadado com a
          venda de ingressos — R$ 5 de cada ingresso de meia-entrada e R$ 10 de
          cada ingresso inteiro — será destinada pelo artista a essas duas
          organizações.
        </p>

        <h3>PACOTES VIP:</h3>

        <h4>PACOTE DIAMOND VIP LOUNGE</h4>

        <p className="tm-vip-price">
          <strong>Inteira:</strong> R$ 750,00 (ingresso) + R$ 11.593,94 (serviço) +
          R$ 2.468,79 (taxa) = <strong>R$ 14.812,73</strong>
        </p>

        <p className="tm-vip-price">
          <strong>Meia-Entrada:</strong> R$ 375,00 (ingresso) + R$ 11.593,94
          (serviço) + R$ 2.393,79 (taxa) = <strong>R$ 14.362,73</strong>
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
          <li>
            Trilha sonora especial com músicas do The Weeknd
          </li>
        </ul>

        <ul className="tm-vip-list">
          <li>
            Item exclusivo de merchandise VIP (somente para o pacote Diamond)
          </li>
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
          <p>
            **Sujeito às leis locais de consumo de bebidas alcoólicas.
          </p>
          <p>***O artista não participa da foto.</p>
        </div>
      </div>
    </section>
  );
}

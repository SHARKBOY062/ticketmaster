import { useState } from "react";
import SectorItem from "../SectorItem/SectorItem";
import SectorPrices from "./SectorPrices";
import "./SectorList.css";

const DISCOUNT = 0.3;

const sectors = [
  { name: "Pista", price: "A partir de R$ 375,00 + R$ 75,00" },
  { name: "Pacote Diamond Vip Lounge", price: "A partir de R$ 11.968,94 + R$ 2.393,79" },
  { name: "Pacote Gold Vip Lounge", price: "A partir de R$ 6.171,97 + R$ 1.234,39" },
  { name: "Pacote Silver Merch Vip", price: "A partir de R$ 2.482,99 + R$ 496,60" },
  { name: "Cadeira Inferior", price: "A partir de R$ 470,00 + R$ 94,00" },
  { name: "Cadeira Superior", price: "A partir de R$ 455,00 + R$ 91,00" },
  { name: "Pacote Bronze Merch Vip Cad. Inferior", price: "A partir de R$ 2.050,99 + R$ 410,20" },
  { name: "Pacote Bronze Merch Vip Cad. Superior", price: "A partir de R$ 2.035,99 + R$ 407,20" },
  { name: "Arquibancada", price: "A partir de R$ 275,00 + R$ 55,00" },
];

function parseBRLNumber(text) {
  // "11.968,94" -> 11968.94
  return parseFloat(text.replace(/\./g, "").replace(",", "."));
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// aplica desconto em TODOS os valores "R$ X" encontrados (ingresso + taxa)
function applyDiscountToPriceText(priceText, discount = DISCOUNT) {
  const matches = [...priceText.matchAll(/R\$\s*([\d.,]+)/g)];
  if (!matches.length) return null;

  const discountedPieces = matches.map((m) => {
    const num = parseBRLNumber(m[1]);
    const discounted = num * (1 - discount);
    return formatBRL(discounted);
  });

  // mantém o "A partir de" e o formato "R$ X + R$ Y"
  // troca cada ocorrência na ordem
  let idx = 0;
  const replaced = priceText.replace(/R\$\s*([\d.,]+)/g, () => discountedPieces[idx++]);

  return replaced;
}

export default function SectorList() {
  const [selectedSector, setSelectedSector] = useState(null);

  if (selectedSector) {
    return (
      <SectorPrices
        sector={selectedSector}
        onClear={() => setSelectedSector(null)}
      />
    );
  }

  return (
    <div className="sector-list">
      <h3>Selecionar setor</h3>

      {sectors.map((sector) => {
        const discountedPriceText = applyDiscountToPriceText(sector.price);

        return (
          <SectorItem
            key={sector.name}
            name={sector.name}
            price={sector.price}
            discountedPrice={discountedPriceText}
            onClick={() =>
              setSelectedSector({
                ...sector,
                discountedPriceText, // <-- AGORA O DESCONTO VIAJA PELO FUNIL
                discountPercent: 30,
              })
            }
          />
        );
      })}
    </div>
  );
}

import { useState } from "react";
import SectorItem from "../SectorItem/SectorItem";
import SectorPrices from "./SectorPrices";
import "./SectorList.css";

const sectors = [
  { name: "Arquibancada", price: "A partir de R$ 275,00 + R$ 55,00" },
  { name: "Pista", price: "A partir de R$ 375,00 + R$ 75,00" },
  { name: "Cadeira Inferior", price: "A partir de R$ 470,00 + R$ 94,00" },
  { name: "Cadeira Superior", price: "A partir de R$ 455,00 + R$ 91,00" },
  { name: "Pacote Diamond Vip Lounge", price: "A partir de R$ 11.968,94 + R$ 2.393,79" },
  { name: "Pacote Gold Vip Lounge", price: "A partir de R$ 6.171,97 + R$ 1.234,39" },
  { name: "Pacote Silver Merch Vip", price: "A partir de R$ 2.482,99 + R$ 496,60" },
  { name: "Pacote Bronze Merch Vip Cad. Inferior", price: "A partir de R$ 2.050,99 + R$ 410,20" },
];

// função para calcular 30% de desconto apenas para exibição
function getDiscountedPrice(priceText) {
  const match = priceText.match(/R\$ ([\d.,]+)/);
  if (!match) return null;

  const value = parseFloat(match[1].replace(".", "").replace(",", "."));
  const discounted = value * 0.7;

  return discounted.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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
        const discountedPrice = getDiscountedPrice(sector.price);

        return (
          <SectorItem
            key={sector.name}
            name={sector.name}
            price={sector.price}
            discountedPrice={discountedPrice}
            onClick={() => setSelectedSector(sector)}
          />
        );
      })}
    </div>
  );
}

import { useState } from "react";
import SectorItem from "../SectorItem/SectorItem";
import SectorPrices from "./SectorPrices";
import "./SectorList.css";

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

      {sectors.map((sector) => (
        <SectorItem
          key={sector.name}
          {...sector}
          onClick={() => setSelectedSector(sector)}
        />
      ))}
    </div>
  );
}

import { Coffee, Martini, CakeSlice } from "lucide-react";
import { itemById } from "../data/menu";
import { uiCopy, type Language } from "../i18n";
import { DishVisual } from "./DishVisual";
import { SectionHeader } from "./SectionHeader";

interface FinishSectionProps {
  language: Language;
  onOpenFinish: () => void;
}

const finishTiles = [
  {
    titleKey: "desserts",
    copyKey: "dessertsCopy",
    icon: CakeSlice,
    itemId: "gelado-cha-verde",
  },
  {
    titleKey: "teas",
    copyKey: "teasCopy",
    icon: Coffee,
    itemId: "cha-japones-genmaicha",
  },
  {
    titleKey: "drinks",
    copyKey: "drinksCopy",
    icon: Martini,
    itemId: "limoncello",
  },
] as const;

export function FinishSection({ language, onOpenFinish }: FinishSectionProps) {
  const t = uiCopy[language].finish;

  return (
    <section>
      <SectionHeader
        eyebrow={t.eyebrow}
        title={t.title}
        actionLabel={uiCopy[language].home.seeAll}
        onAction={onOpenFinish}
      />
      <div className="finish-grid">
        {finishTiles.map((tile) => {
          const Icon = tile.icon;
          const item = itemById(tile.itemId);

          return (
            <button className="finish-card" key={tile.titleKey} type="button" onClick={onOpenFinish}>
              <DishVisual item={item} theme="dessert" />
              <div>
                <Icon size={26} aria-hidden="true" />
                <h3>{t[tile.titleKey]}</h3>
                <p>{t[tile.copyKey]}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

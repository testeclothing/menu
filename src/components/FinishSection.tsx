import { Coffee, Martini, CakeSlice } from "lucide-react";
import { itemById } from "../data/menu";
import { DishVisual } from "./DishVisual";
import { SectionHeader } from "./SectionHeader";

interface FinishSectionProps {
  onOpenFinish: () => void;
}

const finishTiles = [
  {
    title: "Desserts",
    copy: "Sweet finish",
    icon: CakeSlice,
    itemId: "gelado-cha-verde",
  },
  {
    title: "Teas & Sake",
    copy: "Carefully selected harmonies",
    icon: Coffee,
    itemId: "cha-japones-genmaicha",
  },
  {
    title: "Drinks & Digestifs",
    copy: "To enjoy your moment",
    icon: Martini,
    itemId: "limoncello",
  },
];

export function FinishSection({ onOpenFinish }: FinishSectionProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Don't forget the finish"
        title="Complete the experience"
        actionLabel="See all"
        onAction={onOpenFinish}
      />
      <div className="finish-grid">
        {finishTiles.map((tile) => {
          const Icon = tile.icon;
          const item = itemById(tile.itemId);

          return (
            <button className="finish-card" key={tile.title} type="button" onClick={onOpenFinish}>
              <DishVisual item={item} theme="dessert" />
              <div>
                <Icon size={26} aria-hidden="true" />
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

import { AlertTriangle } from "lucide-react";
import type { MenuItem } from "../data/menu";
import { DishVisual } from "./DishVisual";
import { TagBadge } from "./TagBadge";

interface DishCardProps {
  item: MenuItem;
  compact?: boolean;
}

export function DishCard({ item, compact = false }: DishCardProps) {
  const tags = item.tags.filter((tag) => tag !== "needs_verification").slice(0, 3);

  return (
    <article className={`dish-card ${compact ? "dish-card--compact" : ""}`}>
      <DishVisual item={item} />
      <div className="dish-card__body">
        <div className="dish-card__topline">
          <h3>{item.name}</h3>
          <strong>{item.priceLabel}</strong>
        </div>
        <p>{item.descriptionEn}</p>
        <div className="dish-card__tags">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {item.verification === "needs_verification" ? (
            <span className="tag tag--needs_verification">
              <AlertTriangle size={12} aria-hidden="true" />
              Verify
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

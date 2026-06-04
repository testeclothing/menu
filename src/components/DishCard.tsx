import { AlertTriangle, Plus } from "lucide-react";
import type { MenuItem } from "../data/menu";
import { uiCopy, type Language } from "../i18n";
import type { TableDraftControls } from "../tableDraft";
import { DishVisual } from "./DishVisual";
import { TagBadge } from "./TagBadge";

interface DishCardProps {
  item: MenuItem;
  compact?: boolean;
  language: Language;
  draftControls?: TableDraftControls;
}

export function DishCard({ item, compact = false, language, draftControls }: DishCardProps) {
  const tags = item.tags.filter((tag) => tag !== "needs_verification").slice(0, 3);
  const description = language === "pt" ? item.descriptionPt : item.descriptionEn;
  const t = uiCopy[language].dish;
  const draftCopy = uiCopy[language].draft;

  return (
    <article className={`dish-card ${compact ? "dish-card--compact" : ""}`}>
      <DishVisual item={item} />
      <div className="dish-card__body">
        <div className="dish-card__topline">
          <h3>{item.name}</h3>
          <strong>{item.priceLabel}</strong>
        </div>
        <p>{description}</p>
        <div className="dish-card__tags">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} language={language} />
          ))}
          {item.verification === "needs_verification" ? (
            <span className="tag tag--needs_verification">
              <AlertTriangle size={12} aria-hidden="true" />
              {t.verify}
            </span>
          ) : null}
        </div>
        {draftControls ? (
          <div className="dish-card__draft">
            <button
              className="dish-card__add"
              type="button"
              onClick={() => draftControls.addItem(item.id)}
            >
              <Plus size={15} aria-hidden="true" />
              {draftCopy.addItem}
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

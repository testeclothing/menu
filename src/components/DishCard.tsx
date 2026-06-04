import { AlertTriangle, Minus, Plus } from "lucide-react";
import type { MenuItem } from "../data/menu";
import { uiCopy, type Language } from "../i18n";
import { getModifierOptions, type TableDraftControls } from "../tableDraft";
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
  const draftItem = draftControls?.itemsById[item.id];
  const modifierOptions = draftControls ? getModifierOptions(item, language) : [];

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
            {draftItem ? (
              <>
                <div className="dish-card__draft-row">
                  <div className="dish-card__stepper" aria-label={draftCopy.quantityLabel}>
                    <button
                      type="button"
                      aria-label={draftCopy.decrease}
                      onClick={() => draftControls.setQuantity(item.id, draftItem.quantity - 1)}
                    >
                      <Minus size={13} aria-hidden="true" />
                    </button>
                    <span>{draftItem.quantity}</span>
                    <button
                      type="button"
                      aria-label={draftCopy.increase}
                      onClick={() => draftControls.setQuantity(item.id, draftItem.quantity + 1)}
                    >
                      <Plus size={13} aria-hidden="true" />
                    </button>
                  </div>
                  <span className="dish-card__selected">{draftCopy.addedLabel}</span>
                </div>

                {modifierOptions.length > 0 ? (
                  <div className="dish-card__modifiers" aria-label={draftCopy.modifiersLabel}>
                    {modifierOptions.map((modifier) => {
                      const selected = draftItem.modifierIds.includes(modifier.id);

                      return (
                        <button
                          className={selected ? "is-selected" : ""}
                          key={modifier.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => draftControls.toggleModifier(item.id, modifier.id)}
                        >
                          {modifier.label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </>
            ) : (
              <button
                className="dish-card__add"
                type="button"
                onClick={() => draftControls.addItem(item.id)}
              >
                <Plus size={15} aria-hidden="true" />
                {draftCopy.addItem}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

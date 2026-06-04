import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { itemById, type MenuItem } from "../data/menu";
import { uiCopy, type Language } from "../i18n";
import { getModifierLabel, getModifierOptions, type TableDraftItem } from "../tableDraft";

interface TableDraftDrawerProps {
  language: Language;
  draftItems: TableDraftItem[];
  totalQuantity: number;
  onSetQuantity: (itemId: string, quantity: number) => void;
  onToggleModifier: (itemId: string, modifierId: string) => void;
}

function DraftDishThumb({ item }: { item: MenuItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="table-draft-card__thumb" aria-hidden="true">
      {item.imageUrl && !imageFailed ? (
        <img src={item.imageUrl} alt="" loading="lazy" onError={() => setImageFailed(true)} />
      ) : (
        <span />
      )}
    </div>
  );
}

export function TableDraftDrawer({
  language,
  draftItems,
  totalQuantity,
  onSetQuantity,
  onToggleModifier,
}: TableDraftDrawerProps) {
  const [open, setOpen] = useState(false);
  const t = uiCopy[language].draft;

  useEffect(() => {
    document.body.classList.toggle("has-table-draft-open", open);
    return () => document.body.classList.remove("has-table-draft-open");
  }, [open]);

  const rows = useMemo(
    () =>
      draftItems
        .map((draftItem) => {
          const item = itemById(draftItem.itemId);
          if (!item) return null;

          return {
            draftItem,
            item,
            modifiers: draftItem.modifierIds.map((modifierId) => getModifierLabel(modifierId, language)),
            modifierOptions: getModifierOptions(item, language),
          };
        })
        .filter((row): row is NonNullable<typeof row> => Boolean(row)),
    [draftItems, language],
  );

  return (
    <>
      <button className="table-draft-pill" type="button" onClick={() => setOpen(true)}>
        <span>{t.openButton}</span>
        {totalQuantity > 0 ? <b>{totalQuantity}</b> : null}
      </button>

      <div className={`table-draft-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="table-draft-backdrop" type="button" aria-label={t.close} onClick={() => setOpen(false)} />
        <section className="table-draft-sheet" role="dialog" aria-modal="true" aria-labelledby="table-draft-title">
          <div className="table-draft-sheet__handle" aria-hidden="true" />
          <div className="table-draft-sheet__header">
            <div>
              <span>{t.eyebrow}</span>
              <h2 id="table-draft-title">{t.title}</h2>
            </div>
            <button type="button" aria-label={t.close} onClick={() => setOpen(false)}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {rows.length > 0 ? (
            <div className="table-draft-list">
              {rows.map(({ draftItem, item, modifiers, modifierOptions }) => (
                <article className="table-draft-card" key={draftItem.itemId}>
                  <DraftDishThumb item={item} />
                  <div className="table-draft-card__copy">
                    <h3>
                      {draftItem.quantity}x {item.name}
                    </h3>
                    {modifiers.length > 0 ? <p>{modifiers.join(" | ")}</p> : null}
                    <div className="table-draft-stepper" aria-label={t.quantityLabel}>
                      <button
                        type="button"
                        aria-label={t.decrease}
                        onClick={() => onSetQuantity(item.id, draftItem.quantity - 1)}
                      >
                        <Minus size={13} aria-hidden="true" />
                      </button>
                      <span>{draftItem.quantity}</span>
                      <button
                        type="button"
                        aria-label={t.increase}
                        onClick={() => onSetQuantity(item.id, draftItem.quantity + 1)}
                      >
                        <Plus size={13} aria-hidden="true" />
                      </button>
                    </div>
                    {modifierOptions.length > 0 ? (
                      <div className="table-draft-modifiers" aria-label={t.modifiersLabel}>
                        {modifierOptions.map((modifier) => {
                          const selected = draftItem.modifierIds.includes(modifier.id);

                          return (
                            <button
                              className={selected ? "is-selected" : ""}
                              key={modifier.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => onToggleModifier(item.id, modifier.id)}
                            >
                              {modifier.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  <button
                    className="table-draft-card__status"
                    type="button"
                    onClick={() => onSetQuantity(item.id, 0)}
                  >
                    {t.selected}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="table-draft-empty">
              <h3>{t.emptyTitle}</h3>
              <p>{t.emptyCopy}</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

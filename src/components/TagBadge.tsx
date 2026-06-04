import type { DishTag } from "../data/menu";
import { getTagLabel, type Language } from "../i18n";

export function TagBadge({ tag, language }: { tag: DishTag; language: Language }) {
  return <span className={`tag tag--${tag}`}>{getTagLabel(tag, language)}</span>;
}

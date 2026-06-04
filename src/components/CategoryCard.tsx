import { ArrowRight } from "lucide-react";
import { itemsByCategory, type MenuCategory } from "../data/menu";
import { localizeCategory, type Language } from "../i18n";
import { DishVisual } from "./DishVisual";

interface CategoryCardProps {
  category: MenuCategory;
  language: Language;
  onOpen: () => void;
}

export function CategoryCard({ category, language, onOpen }: CategoryCardProps) {
  const localizedCategory = localizeCategory(category, language);
  const heroItem =
    itemsByCategory(category.id).find((item) => item.tags.includes("chef_pick")) ??
    itemsByCategory(category.id)[0];

  return (
    <button className="category-card" type="button" onClick={onOpen}>
      <DishVisual item={heroItem} theme={category.imageTheme} label={localizedCategory.title} />
      <div className="category-card__body">
        <span>{localizedCategory.experienceCue}</span>
        <h3>{localizedCategory.navTitle}</h3>
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </button>
  );
}

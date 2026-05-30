import { ArrowRight } from "lucide-react";
import { itemsByCategory, type MenuCategory } from "../data/menu";
import { DishVisual } from "./DishVisual";

interface CategoryCardProps {
  category: MenuCategory;
  onOpen: () => void;
}

export function CategoryCard({ category, onOpen }: CategoryCardProps) {
  const heroItem =
    itemsByCategory(category.id).find((item) => item.tags.includes("chef_pick")) ??
    itemsByCategory(category.id)[0];

  return (
    <button className="category-card" type="button" onClick={onOpen}>
      <DishVisual item={heroItem} theme={category.imageTheme} label={category.title} />
      <div className="category-card__body">
        <span>{category.experienceCue}</span>
        <h3>{category.navTitle}</h3>
        <ArrowRight size={16} aria-hidden="true" />
      </div>
    </button>
  );
}

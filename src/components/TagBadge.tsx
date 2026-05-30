import type { DishTag } from "../data/menu";

const tagLabels: Record<DishTag, string> = {
  classic: "Classic",
  new: "New",
  fresh: "Fresh",
  crispy: "Crispy",
  chef_pick: "Chef's pick",
  most_chosen: "Most chosen",
  to_share: "Great to share",
  premium: "Premium",
  summer: "Summer",
  vegetarian: "Vegetarian",
  hot: "Hot",
  dessert: "Dessert",
  tea: "Tea",
  digestif: "Digestif",
  needs_verification: "Verify",
};

export function TagBadge({ tag }: { tag: DishTag }) {
  return <span className={`tag tag--${tag}`}>{tagLabels[tag]}</span>;
}

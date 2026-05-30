import { useState } from "react";
import type { MenuItem } from "../data/menu";

interface DishVisualProps {
  item?: MenuItem;
  theme?: string;
  className?: string;
  label?: string;
}

export function DishVisual({ item, theme, className = "", label }: DishVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const themeName = theme ?? item?.categoryId ?? "signature";
  const hasImage = item?.imageUrl && !imageFailed;

  return (
    <div
      className={`dish-visual dish-visual--${themeName} ${className}`}
      role="img"
      aria-label={label ?? item?.name ?? "Confraria sushi dish"}
    >
      {hasImage ? (
        <img
          src={item.imageUrl}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : null}
      <span className="dish-visual__plate" aria-hidden="true" />
      <span className="dish-visual__shine" aria-hidden="true" />
    </div>
  );
}

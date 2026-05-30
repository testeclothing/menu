import { ChefHat, Leaf, Users } from "lucide-react";
import { itemById } from "../data/menu";
import { DishVisual } from "./DishVisual";

export function Hero() {
  const heroItem = itemById("usuzukuri-salmao");

  return (
    <section className="hero">
      <div className="hero__copy">
        <span className="hero__line" aria-hidden="true" />
        <h1>
          Virtual
          <span>Summer Menu</span>
        </h1>
        <p>Choose your path. We'll guide the experience.</p>
      </div>
      <DishVisual
        className="hero__visual"
        item={heroItem}
        theme="salmon"
        label="Usuzukuri Salmão"
      />
      <div className="hero__signals" aria-label="Menu qualities">
        <span>
          <Leaf size={22} aria-hidden="true" />
          Fresh daily
        </span>
        <span>
          <ChefHat size={22} aria-hidden="true" />
          Chef's creations
        </span>
        <span>
          <Users size={22} aria-hidden="true" />
          Made to share
        </span>
      </div>
    </section>
  );
}

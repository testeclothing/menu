import { ArrowRight } from "lucide-react";
import type { GuidedStep } from "../data/experiences";
import { itemById, type MenuItem } from "../data/menu";
import { DishCard } from "./DishCard";

interface GuidedPathProps {
  steps: GuidedStep[];
}

export function GuidedPath({ steps }: GuidedPathProps) {
  return (
    <div className="guided-path">
      {steps.map((step, index) => {
        const items = step.dishIds
          .map((id) => itemById(id))
          .filter((item): item is MenuItem => Boolean(item));

        return (
          <section className="guided-step" key={`${step.eyebrow}-${index}`}>
            <div className="guided-step__copy">
              <span className="step-number">{index + 1}</span>
              <span className="eyebrow">{step.eyebrow}</span>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
              {step.badge ? <b>{step.badge}</b> : null}
            </div>
            <div className="guided-step__items">
              {items.map((item) => (
                <DishCard key={item.id} item={item} compact />
              ))}
            </div>
            <ArrowRight className="guided-step__arrow" size={18} aria-hidden="true" />
          </section>
        );
      })}
    </div>
  );
}

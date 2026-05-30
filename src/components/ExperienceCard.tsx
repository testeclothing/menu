import { ArrowRight, Users } from "lucide-react";
import type { Experience } from "../data/experiences";
import { itemById } from "../data/menu";
import { DishVisual } from "./DishVisual";

interface ExperienceCardProps {
  experience: Experience;
  onOpen: () => void;
}

export function ExperienceCard({ experience, onOpen }: ExperienceCardProps) {
  const heroItem = itemById(experience.recommendedPath[0]);

  return (
    <button className="experience-card" type="button" onClick={onOpen}>
      <div className="experience-card__media">
        <DishVisual item={heroItem} theme={experience.heroTheme} label={experience.title} />
        <span>{experience.label}</span>
      </div>
      <div className="experience-card__body">
        <h3>{experience.shortTitle}</h3>
        <p>{experience.cardCopy}</p>
        <div>
          <small>
            <Users size={13} aria-hidden="true" />
            {experience.guests}
          </small>
          <ArrowRight size={18} aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}

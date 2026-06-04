import { ArrowRight, Users } from "lucide-react";
import type { Experience } from "../data/experiences";
import { itemById } from "../data/menu";
import { localizeExperience, type Language } from "../i18n";
import { DishVisual } from "./DishVisual";

interface ExperienceCardProps {
  experience: Experience;
  language: Language;
  onOpen: () => void;
}

export function ExperienceCard({ experience, language, onOpen }: ExperienceCardProps) {
  const localizedExperience = localizeExperience(experience, language);
  const heroItem = itemById(experience.recommendedPath[0]);

  return (
    <button className="experience-card" type="button" onClick={onOpen}>
      <div className="experience-card__media">
        <DishVisual item={heroItem} theme={experience.heroTheme} label={localizedExperience.title} />
        <span>{localizedExperience.label}</span>
      </div>
      <div className="experience-card__body">
        <h3>{localizedExperience.shortTitle}</h3>
        <p>{localizedExperience.cardCopy}</p>
        <div>
          <small>
            <Users size={13} aria-hidden="true" />
            {localizedExperience.guests}
          </small>
          <ArrowRight size={18} aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}

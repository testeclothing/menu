import { Globe2, Menu, X } from "lucide-react";
import { useState } from "react";
import { categories } from "../data/menu";
import { experiences } from "../data/experiences";
import {
  languageOptions,
  localizeCategory,
  localizeExperience,
  uiCopy,
  type Language,
} from "../i18n";

interface HeaderProps {
  language: Language;
  onHome: () => void;
  onCategory: (id: string) => void;
  onExperience: (id: string) => void;
  onLanguageChange: (language: Language) => void;
}

export function Header({
  language,
  onHome,
  onCategory,
  onExperience,
  onLanguageChange,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = uiCopy[language].header;

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <button className="brand" type="button" onClick={onHome}>
          <span className="brand__mark" aria-hidden="true" />
          <span>
            <strong>Confraria</strong>
            <small>Sushi</small>
          </span>
        </button>
        <div className="header-actions">
          <div className="language-toggle" aria-label={t.languageLabel}>
            <Globe2 size={15} aria-hidden="true" />
            {(["pt", "en"] as const).map((option) => (
              <button
                key={option}
                className={language === option ? "is-active" : ""}
                type="button"
                aria-pressed={language === option}
                onClick={() => onLanguageChange(option)}
              >
                {languageOptions[option].shortLabel}
              </button>
            ))}
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label={open ? t.closeNavigation : t.openNavigation}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={25} />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="mobile-nav">
          <div className="mobile-nav__panel">
            <span className="eyebrow">{t.guidedPaths}</span>
            {experiences.map((experience) => (
              <button
                key={experience.id}
                type="button"
                onClick={() => {
                  onExperience(experience.id);
                  close();
                }}
              >
                {localizeExperience(experience, language).title}
              </button>
            ))}
            <span className="eyebrow">{t.categories}</span>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onCategory(category.id);
                  close();
                }}
              >
                {localizeCategory(category, language).title}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

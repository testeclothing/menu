import { Globe2, Menu, X } from "lucide-react";
import { useState } from "react";
import { categories } from "../data/menu";
import { experiences } from "../data/experiences";

interface HeaderProps {
  onHome: () => void;
  onCategory: (id: string) => void;
  onExperience: (id: string) => void;
}

export function Header({ onHome, onCategory, onExperience }: HeaderProps) {
  const [open, setOpen] = useState(false);

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
          <div className="language-toggle" aria-label="Language">
            <Globe2 size={15} aria-hidden="true" />
            <span>PT</span>
            <b>EN</b>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={25} />}
          </button>
        </div>
      </header>

      {open ? (
        <div className="mobile-nav">
          <div className="mobile-nav__panel">
            <span className="eyebrow">Guided paths</span>
            {experiences.map((experience) => (
              <button
                key={experience.id}
                type="button"
                onClick={() => {
                  onExperience(experience.id);
                  close();
                }}
              >
                {experience.title}
              </button>
            ))}
            <span className="eyebrow">Categories</span>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onCategory(category.id);
                  close();
                }}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

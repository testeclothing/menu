import { ArrowRight, UserRound } from "lucide-react";
import { uiCopy, type Language } from "../i18n";

export function AskTeamBlock({ language }: { language: Language }) {
  const t = uiCopy[language].info;

  return (
    <section className="info-card">
      <div className="info-card__icon">
        <UserRound size={46} aria-hidden="true" />
      </div>
      <div>
        <h2>{t.askTitle}</h2>
        <p>{t.askCopy}</p>
      </div>
      <ArrowRight size={20} aria-hidden="true" />
    </section>
  );
}

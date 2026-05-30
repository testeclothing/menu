import { ArrowRight, UserRound } from "lucide-react";

export function AskTeamBlock() {
  return (
    <section className="info-card">
      <div className="info-card__icon">
        <UserRound size={46} aria-hidden="true" />
      </div>
      <div>
        <h2>Ask our team</h2>
        <p>We're here to recommend the perfect experience.</p>
      </div>
      <ArrowRight size={20} aria-hidden="true" />
    </section>
  );
}

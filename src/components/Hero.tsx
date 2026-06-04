import { ChefHat, Leaf, Users } from "lucide-react";
import { uiCopy, type Language } from "../i18n";

export function Hero({ language }: { language: Language }) {
  const t = uiCopy[language].hero;

  return (
    <section className="hero">
      <video
        className="hero__video"
        src="/menu/sushihero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__signals" aria-label={t.signalsLabel}>
        <span>
          <Leaf size={22} aria-hidden="true" />
          {t.fresh}
        </span>
        <span>
          <ChefHat size={22} aria-hidden="true" />
          {t.chef}
        </span>
        <span>
          <Users size={22} aria-hidden="true" />
          {t.share}
        </span>
      </div>
    </section>
  );
}

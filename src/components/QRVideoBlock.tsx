import { ArrowRight, PlayCircle } from "lucide-react";
import { uiCopy, type Language } from "../i18n";

export function QRVideoBlock({ language }: { language: Language }) {
  const t = uiCopy[language].info;

  return (
    <section className="info-card info-card--qr">
      <div className="qr-placeholder" aria-label={t.qrLabel}>
        {Array.from({ length: 49 }).map((_, index) => (
          <span key={index} className={index % 2 === 0 || index % 5 === 0 ? "is-dark" : ""} />
        ))}
      </div>
      <div>
        <PlayCircle size={30} aria-hidden="true" />
        <h2>{t.videoTitle}</h2>
        <p>{t.videoCopy}</p>
      </div>
      <ArrowRight size={20} aria-hidden="true" />
    </section>
  );
}

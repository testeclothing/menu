import { ArrowRight, PlayCircle } from "lucide-react";

export function QRVideoBlock() {
  return (
    <section className="info-card info-card--qr">
      <div className="qr-placeholder" aria-label="QR code placeholder">
        {Array.from({ length: 49 }).map((_, index) => (
          <span key={index} className={index % 2 === 0 || index % 5 === 0 ? "is-dark" : ""} />
        ))}
      </div>
      <div>
        <PlayCircle size={30} aria-hidden="true" />
        <h2>See our dishes in video</h2>
        <p>Scan the QR code with your phone.</p>
      </div>
      <ArrowRight size={20} aria-hidden="true" />
    </section>
  );
}

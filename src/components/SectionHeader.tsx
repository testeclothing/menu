import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
      </div>
      {actionLabel && onAction ? (
        <button className="text-action" type="button" onClick={onAction}>
          {actionLabel}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

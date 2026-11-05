import { highlights } from "@/data/portfolio.mock";
import { icon } from "@/components/retro/icons";

export function HighlightsSection() {
  return (
    <div className="rt-wrap">
      <ul className="rt-highlights" aria-label="Professional highlights">
        {highlights.map((h) => {
          const Icon = icon(h.icon);
          return (
            <li key={h.id} className="rt-hl">
              <span className="rt-hl-icon" style={{ background: `${h.tone}26`, color: h.tone }}><Icon aria-hidden="true" /></span>
              <div>
                <div className="rt-hl-value" style={{ color: h.tone }}>{h.value}</div>
                <div className="rt-hl-label">{h.label}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

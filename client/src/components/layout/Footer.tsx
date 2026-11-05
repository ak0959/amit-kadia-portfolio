import { ArrowUp } from "lucide-react";
import { footer, profile } from "@/data/portfolio.mock";

export function Footer() {
  return (
    <footer className="rt-footer">
      <div className="rt-wrap">
        <a href="#home" className="rt-logo" aria-label={`${profile.name} - back to top`}>
          <span className="rt-logo-name">{profile.name}</span>
        </a>
        <ul className="rt-foot-tags">
          {footer.taglines.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <a href="#home" className="top"><ArrowUp size={14} aria-hidden="true" />{footer.backToTop}</a>
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}

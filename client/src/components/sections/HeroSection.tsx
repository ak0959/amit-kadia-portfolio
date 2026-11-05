import { decorations, hero, resume } from "@/data/portfolio.mock";
import { icon } from "@/components/retro/icons";

export function HeroSection() {
  const { portrait } = hero;
  return (
    <section id="home" className="rt-hero">
      <img className="rt-deco rt-mosaic" src={decorations.pixelMosaic} alt="" aria-hidden="true" width={84} height={84} />
      <div className="rt-wrap rt-hero-grid">
        <div>
          <div className="rt-tagline">
            {hero.taglines.map((t) => <span key={t}>{t}</span>)}
          </div>
          <h1 className="rt-display rt-h1">
            Amit Kadia
            <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9C50 2 120 2 198 6" stroke="#e8553e" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>
          </h1>
          <p className="rt-role">{hero.title}</p>
          <p className="rt-intro">{hero.intro}</p>
          <div className="rt-badges">
            {hero.badges.map((b, i) => {
              const Icon = icon(b.icon);
              const cls = b.kind === "credential" ? "rt-badge-yellow" : i === 0 ? "rt-badge-green" : "rt-badge-lilac";
              return <span key={b.label} className={`rt-badge ${cls}`}><Icon aria-hidden="true" />{b.label}</span>;
            })}
          </div>
          <div className="rt-actions">
            {hero.actions.map((a) => {
              const Icon = icon(a.icon);
              const extra = a.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : a.download
                  ? { download: resume.downloadName, target: "_blank", rel: "noopener" }
                  : {};
              const scrollTo = a.href.startsWith("#")
                ? (e: React.MouseEvent) => { e.preventDefault(); document.querySelector(a.href)?.scrollIntoView({ behavior: "smooth" }); }
                : undefined;
              return (
                <a key={a.label} href={a.href} className={`rt-btn rt-btn-${a.variant}`} onClick={scrollTo} {...extra}>
                  <Icon aria-hidden="true" />{a.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="rt-art">
          <img className="rt-art-sun" src={decorations.sunset} alt="" aria-hidden="true" width={240} height={240} />
          <img className="rt-art-sky" src={decorations.skyline} alt="" aria-hidden="true" width={260} height={120} />
          <div className="rt-polaroid">
            <img className="frame" src={decorations.polaroid} alt="" aria-hidden="true" width={360} height={440} />
            <img className="portrait" src={portrait.src} srcSet={`${portrait.src} 1x, ${portrait.src2x} 2x`} width={portrait.width} height={portrait.height} alt={portrait.alt} decoding="async" {...{ fetchpriority: "high" }} />
          </div>
          <div className="rt-cassette">
            <img src={decorations.cassette} alt="" aria-hidden="true" width={420} height={270} />
            <span className="write" aria-hidden="true">{hero.cassetteLabel}</span>
            <span className="caption" aria-hidden="true">{hero.cassetteCaption}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

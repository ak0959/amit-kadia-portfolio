import { useCallback, useRef, useState } from "react";
import { icon } from "@/components/retro/icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { experience, experienceAchievements, experienceAchievementsMeta, type EarlierSlide, type RoleSlide } from "@/data/portfolio.mock";

function RoleCard({ slide, index, total }: { slide: RoleSlide; index: number; total: number }) {
  return (
    <article className="rt-xp-card" style={{ ["--accent" as string]: slide.accent }} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${slide.company}`}>
      <header className="rt-xp-head">
        <span className="rt-xp-mono" aria-hidden="true">{slide.monogram}</span>
        <div>
          <h3 className="rt-xp-company">{slide.company}</h3>
          <p className="rt-xp-title">{slide.title}</p>
        </div>
        <span className="rt-xp-period">{slide.period}</span>
      </header>
      <div className="rt-xp-body">
        <ul className="rt-xp-bullets">
          {slide.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </div>
    </article>
  );
}

function EarlierCard({ slide, index, total }: { slide: EarlierSlide; index: number; total: number }) {
  return (
    <article className="rt-xp-card is-earlier" style={{ ["--accent" as string]: slide.accent }} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${slide.label}`}>
      <header className="rt-xp-head">
        <span className="rt-xp-mono" aria-hidden="true">{"{…}"}</span>
        <div>
          <h3 className="rt-xp-company">{slide.label}</h3>
        </div>
        <span className="rt-xp-period">{slide.period}</span>
      </header>
      <div className="rt-xp-body">
        <ul className="rt-xp-earlier">
          {slide.entries.map((e) => (
            <li key={e.company}>
              <div className="who"><b>{e.company}</b><span>{e.title}</span><em>{e.period}</em></div>
              <p>{e.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const items = experience.items;

  const goTo = useCallback((i: number) => setActive(Math.max(0, Math.min(items.length - 1, i))), [items.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
  };
  const onTouchStart = (e: React.TouchEvent) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const t = touch.current; touch.current = null;
    if (!t) return;
    const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="experience" className="rt-sec">
      <div className="rt-wrap">
        <div className="rt-head">
          <div>
            <span className="rt-pill">{experience.label}</span>
            <h2 className="rt-display rt-h2">{experience.title}</h2>
          </div>
        </div>

        <div className="rt-xp" role="region" aria-roledescription="carousel" aria-label={experience.carouselLabel}>
          <div className="rt-xp-controls">
            <button type="button" className="rt-xp-arrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous role" aria-controls="rt-xp-track">
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="rt-xp-dots" role="group" aria-label="Choose role">
              {items.map((it, i) => (
                <button key={it.id} type="button" className="rt-xp-dot" aria-label={`Go to ${it.kind === "role" ? it.company : it.label}`} aria-current={active === i} onClick={() => goTo(i)} />
              ))}
            </div>
            <button type="button" className="rt-xp-arrow" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label="Next role" aria-controls="rt-xp-track">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          <div id="rt-xp-track" className="rt-xp-stage" tabIndex={0} onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-live="polite" aria-label="Experience cards. Use the left and right arrow keys to move between roles.">
            {items.map((it, i) => (
              <div key={it.id} className={`rt-xp-slot${active === i ? " is-active" : ""}`} aria-hidden={active !== i}>
                {it.kind === "role"
                  ? <RoleCard slide={it} index={i} total={items.length} />
                  : <EarlierCard slide={it} index={i} total={items.length} />}
              </div>
            ))}
          </div>
        </div>

        <div className="rt-ach">
          <h3 className="rt-display rt-ach-title">{experienceAchievementsMeta.heading}</h3>
          <ul className="rt-highlights rt-ach-band" aria-label={experienceAchievementsMeta.heading}>
            {experienceAchievements.map((a) => {
              const Icon = icon(a.icon);
              return (
                <li key={a.id} className="rt-hl">
                  <span className="rt-hl-icon" style={{ background: `${a.tone}26`, color: a.tone }}><Icon aria-hidden="true" /></span>
                  <div>
                    <div className="rt-hl-value" style={{ color: a.tone }}>{a.value}</div>
                    <div className="rt-hl-label">{a.label}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="rt-ach-note">{experienceAchievementsMeta.note}</p>
        </div>
      </div>
    </section>
  );
}

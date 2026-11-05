import { skills } from "@/data/portfolio.mock";
import { icon } from "@/components/retro/icons";

export function SkillsSection() {
  return (
    <section id="skills" className="rt-sec">
      <div className="rt-wrap">
        <div className="rt-head">
          <div>
            <span className="rt-pill">{skills.label}</span>
            <h2 className="rt-display rt-h2">{skills.title}</h2>
          </div>
        </div>

        <div className="rt-st">
          {/* SKILLS */}
          <div className="rt-st-half" aria-labelledby="rt-skills-h">
            <h3 id="rt-skills-h" className="rt-display rt-st-title">{skills.skillsHeading}</h3>
            <div className="rt-st-body">
              <ul className="rt-st-cards">
                {skills.tiles.map((t) => {
                  const Icon = icon(t.icon);
                  return (
                    <li key={t.label} className={`rt-sk-card t-${t.tone}`}>
                      <Icon aria-hidden="true" />
                      <span className="name">{t.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* TOOLS */}
          <div className="rt-st-half" aria-labelledby="rt-tools-h">
            <h3 id="rt-tools-h" className="rt-display rt-st-title">{skills.toolsHeading}</h3>
            <div className="rt-st-body">
              <ul className="rt-st-cards">
                {skills.tools.map((t) => {
                  const Icon = icon(t.icon);
                  return (
                    <li key={t.id} className={`rt-sk-card t-${t.tone}`} title={t.description}>
                      <Icon aria-hidden="true" />
                      <span className="txt">
                        <span className="name">{t.name}</span>
                        <span className="lvl">{t.knowledgeLevel}</span>
                      </span>
                      <span className="rt-sr">{t.description}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

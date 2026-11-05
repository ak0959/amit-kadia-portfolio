import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio.mock";
import { icon } from "@/components/retro/icons";

export function ProjectsSection() {
  return (
    <section id="projects" className="rt-sec">
      <div className="rt-wrap rt-proj-grid">
        <div>
          <span className="rt-pill">{projects.label}</span>
          <h2 className="rt-display rt-h2">{projects.title}</h2>
          <p style={{ fontSize: "0.85rem", margin: 0 }}>{projects.description}</p>
          <img className="rt-proj-deco" src={projects.decoration} alt="" aria-hidden="true" width={220} height={90} loading="lazy" />
        </div>
        <ul className="rt-proj-list">
          {projects.items.map((p, i) => {
            const Icon = icon(p.icon);
            const href = p.projectUrl || p.githubUrl;
            return (
              <li key={p.id}>
                <a className={`rt-proj rt-proj-${i % 5}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} (opens in a new tab)`}>
                  <Icon className="pi" aria-hidden="true" />
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <ArrowUpRight className="go" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

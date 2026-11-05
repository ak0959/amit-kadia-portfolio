import { about, decorations } from "@/data/portfolio.mock";

export function AboutSection() {
  return (
    <section id="about" className="rt-sec" style={{ marginTop: 22 }}>
      <img className="rt-deco" src={decorations.pixelMosaic} alt="" aria-hidden="true" width={56} height={56} style={{ right: "4%", top: 28, width: 56 }} />
      <div className="rt-wrap rt-about-grid">
        <div className="rt-photo-card">
          <img className="tape" src={decorations.washiTape} alt="" aria-hidden="true" width={110} height={32} />
          <img className="main" src={about.image} alt={about.imageAlt} width={680} height={380} loading="lazy" decoding="async" />
        </div>
        <div className="rt-about-text">
          <span className="rt-pill">{about.label}</span>
          <h2 className="rt-display rt-h2">{about.title}</h2>
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

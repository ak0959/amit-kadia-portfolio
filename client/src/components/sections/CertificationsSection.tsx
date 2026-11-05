import { useState, useRef, lazy, Suspense } from "react";
import { credentials, type CertificationDisc, type EducationItem, type ViewableDocument } from "@/data/portfolio.mock";

// The PDF viewer (and pdf.js) is only loaded when a document is opened.
const PdfCertificateModal = lazy(() => import("./PdfCertificateModal").then((m) => ({ default: m.PdfCertificateModal })));

/** Small retro folder-with-document icon. */
function FolderIcon() {
  return (
    <svg className="rt-ed-icon" viewBox="0 0 48 40" aria-hidden="true" focusable="false">
      <path d="M3 8a3 3 0 0 1 3-3h12l4 5h20a3 3 0 0 1 3 3v21a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" fill="#f2c36b" stroke="#1b2440" strokeWidth="2" strokeLinejoin="round" />
      <rect x="10" y="13" width="26" height="17" rx="1.5" fill="#fffaf4" stroke="#1b2440" strokeWidth="2" />
      <path d="M14 19h18M14 23h18M14 27h11" stroke="#1b2440" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 17h42v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z" fill="#f7d58f" stroke="#1b2440" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function Disc({ c }: { c: CertificationDisc }) {
  return (
    <span className="rt-disc" aria-hidden="true">
      <span className="rt-disc-face">
        {c.artwork.type === "image" ? (
          <img src={c.artwork.src} alt="" width={200} height={200} loading="lazy" decoding="async" draggable={false} />
        ) : (
          <span className="rt-disc-text">
            <b>{c.artwork.title}</b>
            {c.artwork.subtitle && <i>{c.artwork.subtitle}</i>}
          </span>
        )}
      </span>
    </span>
  );
}

export function CertificationsSection() {
  const [selected, setSelected] = useState<ViewableDocument | null>(null);
  const triggers = useRef<Map<string, HTMLButtonElement>>(new Map());
  const register = (id: string) => (el: HTMLButtonElement | null) => { if (el) triggers.current.set(id, el); };

  const openEducation = (e: EducationItem) =>
    setSelected({ id: e.id, displayName: e.qualification, issuer: `${e.institution} · ${e.dates}`, pdfUrl: e.pdfUrl });

  // Return focus to the item that opened the viewer.
  const close = () => {
    const id = selected?.id;
    setSelected(null);
    if (id) setTimeout(() => triggers.current.get(id)?.focus(), 50);
  };

  return (
    <section id="credentials" className="rt-sec">
      <div className="rt-wrap">
        <div className="rt-head">
          <div>
            <span className="rt-pill">{credentials.label}</span>
            <h2 className="rt-display rt-h2">{credentials.title}</h2>
            <p className="rt-cred-desc">{credentials.description}</p>
          </div>
        </div>

        <div className="rt-st rt-cred-split">
          {/* EDUCATION */}
          <div className="rt-st-half" aria-labelledby="rt-edu-h">
            <h3 id="rt-edu-h" className="rt-display rt-st-title">{credentials.educationHeading}</h3>
            <ul className="rt-ed-list">
              {credentials.education.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    ref={register(e.id)}
                    className={`rt-ed t-${e.tone}`}
                    aria-haspopup="dialog"
                    aria-label={`View document: ${e.qualification}, ${e.institution}, ${e.dates}`}
                    onClick={() => openEducation(e)}
                  >
                    <FolderIcon />
                    <span className="rt-ed-text">
                      <span className="rt-ed-q">{e.qualification}</span>
                      <span className="rt-ed-i">{e.institution}</span>
                      <span className="rt-ed-m">{e.detail} · {e.dates}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PROFESSIONAL CERTIFICATIONS */}
          <div className="rt-st-half" aria-labelledby="rt-cert-h">
            <h3 id="rt-cert-h" className="rt-display rt-st-title">{credentials.certificationsHeading}</h3>
            <ul className="rt-cred-list">
              {credentials.certifications.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    ref={register(c.id)}
                    className="rt-cred"
                    aria-haspopup="dialog"
                    aria-label={`View certificate: ${c.displayName}, issued by ${c.issuer}`}
                    onClick={() => setSelected(c)}
                  >
                    <Disc c={c} />
                    <span className="rt-cred-name">{c.displayName}</span>
                    <span className="rt-cred-issuer">{c.issuer}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="rt-notice">{credentials.notice}</p>
      </div>

      {selected && (
        <Suspense fallback={null}>
          <PdfCertificateModal credential={selected} onClose={close} />
        </Suspense>
      )}
    </section>
  );
}

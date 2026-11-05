import { Download, FileText } from "lucide-react";
import { resumeSection as r } from "@/data/portfolio.mock";

/** Left half of the merged Resume + Contact section: the label pill and the teal floppy (the only download). */
export function ResumeSection() {
  return (
    <div id="resume" className="rt-rc-left">
      <span className="rt-pill">{r.label}</span>
      <div className="rt-resume-art">
        <a className="rt-floppy" href={r.href} download={r.downloadName} aria-label={`${r.buttonLabel}: ${r.cardTitle}`}>
          <img src={r.primaryDisk} alt="" aria-hidden="true" width={302} height={256} loading="lazy" />
          <span className="lab">
            <FileText aria-hidden="true" />
            <b>{r.cardTitle}</b>
            <em>{r.cardDescription}</em>
            <span className="dl"><Download aria-hidden="true" />{r.buttonLabel}</span>
          </span>
        </a>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ViewableDocument } from "@/data/portfolio.mock";

interface Props { credential: ViewableDocument; onClose: () => void }

type PdfPage = {
  getViewport: (o: { scale: number }) => { width: number; height: number };
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<unknown>; cancel: () => void };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<PdfPage> };

/**
 * View-only document viewer. The current PDF page is rendered to a canvas (pdf.js), scaled to fit the
 * available area, so there is no browser PDF toolbar and no download / print / open-in-tab control.
 * Multi-page documents get previous / next controls. (This does not technically prevent retrieving
 * the public file; it only removes the viewing UI for it.)
 */
export function PdfCertificateModal({ credential, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const pages = doc?.numPages ?? 1;

  // Keyboard: Escape closes; arrows change page; Tab cycles through the dialog's own buttons.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowRight") setPageNo((n) => Math.min(pages, n + 1));
      if (e.key === "ArrowLeft") setPageNo((n) => Math.max(1, n - 1));
      if (e.key === "Tab") {
        const f = Array.from(document.querySelectorAll<HTMLElement>(".rt-pdf-dialog button:not(:disabled)"));
        if (f.length === 0) return;
        e.preventDefault();
        const i = f.indexOf(document.activeElement as HTMLElement);
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, pages]);

  // Load the document.
  useEffect(() => {
    let cancelled = false;
    setDoc(null); setPageNo(1); setStatus("loading");
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const worker = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = worker;
        const d = (await pdfjs.getDocument(credential.pdfUrl).promise) as unknown as PdfDoc;
        if (!cancelled) setDoc(d);
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [credential.pdfUrl]);

  // Draw the current page, fitted to the stage; redraw when the stage is resized.
  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    let task: { cancel: () => void } | null = null;
    let ro: ResizeObserver | undefined;
    (async () => {
      const page = await doc.getPage(pageNo);
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      const draw = () => {
        const stage = stageRef.current, canvas = canvasRef.current;
        if (!stage || !canvas) return;
        const cs = getComputedStyle(stage);
        const aw = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const ah = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        if (aw < 10 || ah < 10) return;
        const fit = Math.min(aw / base.width, ah / base.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const vp = page.getViewport({ scale: fit * dpr });
        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        canvas.style.width = `${Math.floor(base.width * fit)}px`;
        canvas.style.height = `${Math.floor(base.height * fit)}px`;
        task?.cancel();
        const t = page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp });
        task = t;
        t.promise.then(() => { if (!cancelled) setStatus("ready"); }).catch(() => { /* superseded by a newer draw */ });
      };
      draw();
      ro = new ResizeObserver(draw);
      if (stageRef.current) ro.observe(stageRef.current);
    })().catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; task?.cancel(); ro?.disconnect(); };
  }, [doc, pageNo]);

  return (
    <div className="rt-pdf-backdrop" onClick={onClose}>
      <div className="rt-pdf-dialog" role="dialog" aria-modal="true" aria-labelledby="rt-pdf-title" onClick={(e) => e.stopPropagation()}>
        <header className="rt-pdf-head">
          <div>
            <h3 id="rt-pdf-title" className="rt-display">{credential.displayName}</h3>
            <p>{credential.issuer}</p>
          </div>
          <button ref={closeRef} type="button" className="rt-pdf-close" onClick={onClose} aria-label="Close document viewer">
            <X aria-hidden="true" />
          </button>
        </header>
        <div ref={stageRef} className="rt-pdf-stage" onContextMenu={(e) => e.preventDefault()}>
          {status === "loading" && <p className="rt-pdf-msg" role="status">Loading document…</p>}
          {status === "error" && <p className="rt-pdf-msg" role="alert">The document could not be displayed.</p>}
          <canvas ref={canvasRef} className="rt-pdf-canvas" role="img" aria-label={`${credential.displayName}, page ${pageNo} of ${pages}`} hidden={status !== "ready"} />
        </div>
        {pages > 1 && (
          <footer className="rt-pdf-pager">
            <button type="button" onClick={() => setPageNo((n) => Math.max(1, n - 1))} disabled={pageNo === 1} aria-label="Previous page"><ChevronLeft aria-hidden="true" /></button>
            <span aria-live="polite">Page {pageNo} of {pages}</span>
            <button type="button" onClick={() => setPageNo((n) => Math.min(pages, n + 1))} disabled={pageNo === pages} aria-label="Next page"><ChevronRight aria-hidden="true" /></button>
          </footer>
        )}
      </div>
    </div>
  );
}

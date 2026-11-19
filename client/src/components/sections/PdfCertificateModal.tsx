import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import type { ViewableDocument } from "@/data/portfolio.mock";
import { loadPdfDocument, recordPdfMetric, type PdfDoc, type PdfPage } from "./pdfService";

interface Props {
  credential: ViewableDocument;
  onClose: () => void;
}

export function PdfCertificateModal({ credential, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [metrics, setMetrics] = useState<{ fromCache: boolean; workerMs: number; docMs: number }>({
    fromCache: false,
    workerMs: 0,
    docMs: 0,
  });

  const tOpenRef = useRef<number>(performance.now());
  const pages = doc?.numPages ?? 1;

  // Keyboard navigation: Escape closes; arrows flip page; Tab traps focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") setPageNo((n) => Math.min(pages, n + 1));
      if (e.key === "ArrowLeft") setPageNo((n) => Math.max(1, n - 1));
      if (e.key === "Tab") {
        const buttons = Array.from(
          document.querySelectorAll<HTMLElement>(".rt-pdf-dialog button:not(:disabled)")
        );
        if (buttons.length === 0) return;
        e.preventDefault();
        const idx = buttons.indexOf(document.activeElement as HTMLElement);
        buttons[(idx + (e.shiftKey ? buttons.length - 1 : 1)) % buttons.length].focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, pages]);

  // Load document using shared worker & session cache
  useEffect(() => {
    let cancelled = false;
    tOpenRef.current = performance.now();
    setDoc(null);
    setPageNo(1);
    setStatus("loading");

    (async () => {
      try {
        const { doc: loadedDoc, fromCache, workerMs, docMs } = await loadPdfDocument(credential.pdfUrl);
        if (!cancelled) {
          setMetrics({ fromCache, workerMs, docMs });
          setDoc(loadedDoc);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[PDF Viewer Error]", err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [credential.pdfUrl]);

  // Render currently selected page
  const renderCurrentPage = useCallback(
    async (targetPageNo: number) => {
      if (!doc) return;
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;

      // Cancel previous render task if still in flight
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Task cancellation
        }
        renderTaskRef.current = null;
      }

      const tPageStart = performance.now();
      let page: PdfPage;
      try {
        page = await doc.getPage(targetPageNo);
      } catch {
        return;
      }
      const pageMs = performance.now() - tPageStart;

      const cs = getComputedStyle(stage);
      const aw = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const ah = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      if (aw < 10 || ah < 10) return;

      const base = page.getViewport({ scale: 1 });
      const fit = Math.min(aw / base.width, ah / base.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale: fit * dpr });

      canvas.width = Math.floor(vp.width);
      canvas.height = Math.floor(vp.height);
      canvas.style.width = `${Math.floor(base.width * fit)}px`;
      canvas.style.height = `${Math.floor(base.height * fit)}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const tRenderStart = performance.now();
      const task = page.render({ canvasContext: ctx, viewport: vp });
      renderTaskRef.current = task;

      try {
        await task.promise;
        const renderMs = performance.now() - tRenderStart;
        setStatus("ready");

        const totalMs = performance.now() - tOpenRef.current;
        recordPdfMetric({
          url: credential.pdfUrl,
          displayName: credential.displayName,
          fromCache: metrics.fromCache,
          workerMs: metrics.workerMs,
          docMs: metrics.docMs,
          pageMs,
          renderMs,
          totalMs,
          timestamp: Date.now(),
        });
      } catch (err: unknown) {
        // If superseded/canceled, ignore; otherwise report error
        if (err && typeof err === "object" && "name" in err && (err as { name: string }).name === "RenderingCancelledException") {
          return;
        }
      }
    },
    [doc, credential.displayName, credential.pdfUrl, metrics]
  );

  useEffect(() => {
    if (!doc) return;
    let cancelled = false;

    renderCurrentPage(pageNo);

    // ResizeObserver solely for window/container size changes (debounced to avoid double draws)
    let resizeTimer: number | null = null;
    const stage = stageRef.current;
    let lastWidth = stage ? stage.clientWidth : 0;
    let lastHeight = stage ? stage.clientHeight : 0;

    const ro = new ResizeObserver((entries) => {
      if (cancelled || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = Math.round(entry.contentRect.width);
      const newHeight = Math.round(entry.contentRect.height);

      // Only re-draw if dimensions actually changed
      if (Math.abs(newWidth - lastWidth) > 2 || Math.abs(newHeight - lastHeight) > 2) {
        lastWidth = newWidth;
        lastHeight = newHeight;
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          if (!cancelled) renderCurrentPage(pageNo);
        }, 80);
      }
    });

    if (stage) ro.observe(stage);

    return () => {
      cancelled = true;
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Cleanup
        }
      }
      ro.disconnect();
    };
  }, [doc, pageNo, renderCurrentPage]);

  return (
    <div className="rt-pdf-backdrop" onClick={onClose}>
      <div
        className="rt-pdf-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rt-pdf-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="rt-pdf-head">
          <div>
            <h3 id="rt-pdf-title" className="rt-display">
              {credential.displayName}
            </h3>
            <p>{credential.issuer}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="rt-pdf-close"
            onClick={onClose}
            aria-label="Close document viewer"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div ref={stageRef} className="rt-pdf-stage" onContextMenu={(e) => e.preventDefault()}>
          {status === "loading" && (
            <div className="rt-pdf-loading" role="status">
              <Loader2 className="rt-pdf-spinner" aria-hidden="true" />
              <p className="rt-pdf-msg">Loading document…</p>
            </div>
          )}
          {status === "error" && (
            <p className="rt-pdf-msg rt-pdf-error" role="alert">
              The document could not be displayed.
            </p>
          )}
          <canvas
            ref={canvasRef}
            className="rt-pdf-canvas"
            role="img"
            aria-label={`${credential.displayName}, page ${pageNo} of ${pages}`}
            style={{ display: status === "ready" ? "block" : "none" }}
          />
        </div>

        {pages > 1 && (
          <footer className="rt-pdf-pager">
            <button
              type="button"
              onClick={() => setPageNo((n) => Math.max(1, n - 1))}
              disabled={pageNo === 1}
              aria-label="Previous page"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <span aria-live="polite">
              Page {pageNo} of {pages}
            </span>
            <button
              type="button"
              onClick={() => setPageNo((n) => Math.min(pages, n + 1))}
              disabled={pageNo === pages}
              aria-label="Next page"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

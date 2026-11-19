import type { PDFDocumentProxy, PDFPageProxy, RenderTask } from "pdfjs-dist";

export type PdfPage = {
  getViewport: (o: { scale: number }) => { width: number; height: number };
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => RenderTask;
};

export type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<PdfPage>;
  destroy?: () => Promise<void>;
};

export interface PdfViewerMetric {
  url: string;
  displayName: string;
  fromCache: boolean;
  workerMs: number;
  docMs: number;
  pageMs: number;
  renderMs: number;
  totalMs: number;
  timestamp: number;
}

declare global {
  interface Window {
    __PDF_VIEWER_STATS__?: PdfViewerMetric[];
  }
}

// Bounded document cache (max 8 documents for the 8 portfolio credentials)
const MAX_DOC_CACHE = 8;
const docCache = new Map<string, { doc: PdfDoc; timestamp: number }>();

let pdfjsModulePromise: Promise<typeof import("pdfjs-dist")> | null = null;

/**
 * Singleton loader for PDF.js and its worker. Reuses the module and worker URL across all opens.
 */
export function getPdfjs(): Promise<typeof import("pdfjs-dist")> {
  if (!pdfjsModulePromise) {
    pdfjsModulePromise = (async () => {
      const pdfjs = await import("pdfjs-dist");
      const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
      return pdfjs;
    })();
  }
  return pdfjsModulePromise;
}

/**
 * Preloads the PDF engine when idle or on user interaction (hover/focus).
 */
export function preloadPdfEngine(): void {
  getPdfjs().catch(() => {
    // Non-fatal prefetch failure
  });
}

/**
 * Loads a PDF document using the singleton worker and session LRU cache.
 */
export async function loadPdfDocument(
  url: string
): Promise<{ doc: PdfDoc; fromCache: boolean; workerMs: number; docMs: number }> {
  // Check in-memory cache first
  const cached = docCache.get(url);
  if (cached) {
    cached.timestamp = Date.now();
    return { doc: cached.doc, fromCache: true, workerMs: 0, docMs: 0 };
  }

  const tStart = performance.now();
  const pdfjs = await getPdfjs();
  const tWorker = performance.now();
  const workerMs = tWorker - tStart;

  const loadingTask = pdfjs.getDocument(url);
  const pdfDoc = (await loadingTask.promise) as unknown as PdfDoc;
  const docMs = performance.now() - tWorker;

  // Manage bounded cache
  if (docCache.size >= MAX_DOC_CACHE) {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    docCache.forEach((val, key) => {
      if (val.timestamp < oldestTime) {
        oldestTime = val.timestamp;
        oldestKey = key;
      }
    });
    if (oldestKey) {
      const evicted = docCache.get(oldestKey);
      try {
        evicted?.doc.destroy?.();
      } catch {
        // Ignore destroy error
      }
      docCache.delete(oldestKey);
    }
  }

  docCache.set(url, { doc: pdfDoc, timestamp: Date.now() });

  return { doc: pdfDoc, fromCache: false, workerMs, docMs };
}

/**
 * Record viewer performance metric
 */
export function recordPdfMetric(metric: PdfViewerMetric): void {
  if (typeof window !== "undefined") {
    if (!window.__PDF_VIEWER_STATS__) {
      window.__PDF_VIEWER_STATS__ = [];
    }
    window.__PDF_VIEWER_STATS__.push(metric);
  }
  console.info(
    `[PDF Performance] ${metric.displayName} rendered in ${metric.totalMs.toFixed(1)}ms ` +
      `(Cache: ${metric.fromCache ? "HIT" : "MISS"}, Worker: ${metric.workerMs.toFixed(1)}ms, ` +
      `Doc: ${metric.docMs.toFixed(1)}ms, Page: ${metric.pageMs.toFixed(1)}ms, Render: ${metric.renderMs.toFixed(1)}ms)`
  );
}

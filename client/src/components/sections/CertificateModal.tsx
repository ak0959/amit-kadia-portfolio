import { useEffect, useRef } from "react";
import { X, ShieldCheck } from "lucide-react";
import { CertificationItem } from "@/types/portfolio";

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Listen for Escape key and trap Tab focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalContentRef.current) {
        const focusables = modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-5xl bg-[#160d29] border border-purple-800/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/40 bg-[#120b22]">
          <div className="flex items-center gap-3 pr-4 overflow-hidden">
            <div className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-accent flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <div className="truncate">
              <h3 id="certificate-modal-title" className="text-lg sm:text-xl font-bold text-white truncate">
                {certificate.title}
              </h3>
              <p className="text-xs sm:text-sm text-accent font-medium">
                {certificate.provider}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close certificate modal"
            className="p-2 rounded-xl bg-purple-900/30 hover:bg-purple-800/60 text-purple-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Display Area */}
        <div 
          className="relative flex-1 p-4 sm:p-6 overflow-auto bg-[#0a0613] flex items-center justify-center select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <img
            src={certificate.image}
            alt={`${certificate.title} - ${certificate.provider}`}
            loading="eager"
            decoding="async"
            className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl pointer-events-none"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* Footer Notice */}
        <div className="px-6 py-3 bg-[#120b22] border-t border-purple-900/40 text-center text-xs text-purple-300/60">
          Official Credential Verification View • Watermarked & Protected
        </div>
      </div>
    </div>
  );
}

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
        className="relative w-full max-w-5xl bg-[#172536] border border-[#94B4C1]/30 rounded-2xl shadow-[0_20px_50px_rgba(11,19,31,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking modal
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#94B4C1]/20 bg-[#0B131F]">
          <div className="flex items-center gap-3 pr-4 overflow-hidden">
            <div className="p-2 rounded-lg bg-[#24756D]/20 border border-[#24756D]/40 text-[#24756D] flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#24756D]" />
            </div>
            <div className="truncate">
              <h3 id="certificate-modal-title" className="text-lg sm:text-xl font-bold text-[#F8FAFC] truncate">
                {certificate.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8DAA96] font-medium">
                {certificate.provider}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close certificate modal"
            className="p-2 rounded-xl bg-[#213448] hover:bg-[#24756D] text-[#DDE3E8] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24756D]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Display Area */}
        <div 
          className="relative flex-1 p-4 sm:p-6 overflow-auto bg-[#0B131F] flex items-center justify-center select-none"
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
        <div className="px-6 py-3 bg-[#0B131F] border-t border-[#94B4C1]/20 text-center text-xs text-[#94B4C1]">
          Official Credential Verification View • Watermarked & Protected
        </div>
      </div>
    </div>
  );
}
